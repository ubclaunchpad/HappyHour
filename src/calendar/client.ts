const googleCalendarClient = {
  apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  discoveryDocs: [process.env.VUE_APP_GOOGLE_DISCOVERY_DOC],
  scope: process.env.VUE_APP_GOOGLE_SCOPE
};

/* helpers, not exported */
interface Slot {
  startTime: Date;
  endTime: Date;
}

const getBlockStart = (d: Date): Date => {
  const min = d.getMinutes();
  if (min > 0 && min < 30) {
    return new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours(),
      30
    );
  } else if (min > 30 && min < 60) {
    return new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours() + 1
    );
  } else {
    return d;
  }
};

const getBlockEnd = (d: Date): Date => {
  const min = d.getMinutes();
  if (min > 0 && min < 30) {
    return new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours(),
      0
    );
  } else if (min > 30 && min < 60) {
    return new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours(),
      30
    );
  } else {
    return d;
  }
};

/* requires a valid 30-min block start time */
/* return the next 30-min block start */
const getNextBlock = (d: Date): Date => {
  const min = d.getMinutes();
  if (min == 0) {
    return new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours(),
      30
    );
  } else if (min == 30) {
    return new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours() + 1
    );
  } else {
    return d;
  }
};

const retrieveSlots = (
  timePeriod: gapi.client.calendar.TimePeriod[]
): Slot[] => {
  const slots: Slot[] = [];
  for (const period of timePeriod) {
    const startTime = period.start?.toString();
    const endTime = period.end?.toString();
    if (startTime !== undefined && endTime !== undefined) {
      console.log(new Date(startTime));
      console.log(new Date(endTime));
      const slot: Slot = {
        startTime: new Date(startTime),
        endTime: new Date(endTime)
      };
      slots.push(slot);
    }
  }
  return slots;
};

const getBusyTimes = async (timeMin: Date, timeMax: Date): Promise<Slot[]> => {
  try {
    const res = await gapi.client.calendar.freebusy.query({
      resource: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        timeZone: "PST",
        items: [{ id: "primary" }]
      }
    });
    if (res.result.calendars && res.result.calendars.primary.busy) {
      const busyTimes = res.result.calendars.primary.busy;
      console.log("printing busy times: ");
      console.log(busyTimes);
      return retrieveSlots(busyTimes);
    } else {
      return [];
    }
  } catch (err) {
    console.log(`error with freebusy request: `);
    console.log(err);
    return [];
  }
};

const getFreeSlots = (
  busySlots: Slot[],
  timeMin: Date,
  timeMax: Date
): Slot[] => {
  const freeSlots: Slot[] = [];
  if (busySlots.length < 1) {
    freeSlots.push({
      startTime: timeMin,
      endTime: timeMax
    });
  } else {
    for (let i = 0; i < busySlots.length; i++) {
      const slot = busySlots[i];
      if (i == 0 && timeMin < slot.startTime) {
        freeSlots.push({
          startTime: timeMin,
          endTime: slot.startTime
        });
      } else if (i > 0 && busySlots[i - 1].endTime < slot.startTime) {
        freeSlots.push({
          startTime: busySlots[i - 1].endTime,
          endTime: slot.startTime
        });
      }
      if (i == busySlots.length - 1 && slot.endTime < timeMax) {
        freeSlots.push({
          startTime: slot.endTime,
          endTime: timeMax
        });
      }
    }
  }
  return freeSlots;
};

const getFreeBlocks = (startTime: Date, endTime: Date): Block[] => {
  let s = getBlockStart(startTime);
  const e = getBlockEnd(endTime);

  /* create blocks between s & e */
  const freeBlocks: Block[] = [];
  while (s < e) {
    freeBlocks.push({
      startTime: s,
      availableUsers: []
    });
    s = getNextBlock(s);
  }
  return freeBlocks;
};

const createCalendar = (freeSlots: Slot[]): Calendar => {
  let calendarBlocks: Block[] = [];
  for (const slot of freeSlots) {
    const blocks = getFreeBlocks(slot.startTime, slot.endTime);
    calendarBlocks = calendarBlocks.concat(blocks);
  }
  const cal: Calendar = {
    blocks: calendarBlocks
  };
  return cal;
};

/* exported */

export interface Block {
  startTime: Date;
  availableUsers: string[];
}

export interface Calendar {
  blocks: Block[];
}

export interface Time {
  hour: number;
  minutes: number;
}

const client = {
  // function to fetch 10 upcoming events (only used for testing)
  async getAllEvents() {
    gapi.load("client:auth2", () => {
      gapi.auth2.authorize(
        {
          // eslint-disable-next-line @typescript-eslint/camelcase
          client_id: googleCalendarClient.clientId,
          scope: googleCalendarClient.scope,
          prompt: "none"
        },
        authResponse => {
          if (authResponse.error) {
            console.log("here's the error: " + authResponse.error);
          }
          gapi.client
            .request({
              path:
                "https://www.googleapis.com/calendar/v3/calendars/primary/events",
              params: {
                timeMin: new Date().toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 10,
                orderBy: "startTime"
              }
            })
            .then(res => {
              console.log("response!");
              console.log(res.body);
            })
            .catch(err => {
              console.log("error!");
              console.log(err);
            });
        }
      );
    });
  },
  async updateCalendar() {
    /* get user's busy slots */
    const timeMin: Date = getBlockStart(new Date());
    const timeMax: Date = new Date(
      timeMin.getFullYear(),
      timeMin.getMonth(),
      timeMin.getDate() + 1,
      timeMin.getHours(),
      timeMin.getMinutes()
    );
    console.log(`min: ${timeMin}, max: ${timeMax}`);
    gapi.load("client:auth2", () => {
      gapi.auth2.authorize(
        {
          // eslint-disable-next-line @typescript-eslint/camelcase
          client_id: googleCalendarClient.clientId,
          scope: googleCalendarClient.scope,
          prompt: "none"
        },
        authResponse => {
          if (authResponse.error) {
            console.log("here's the error: " + authResponse.error);
          }
          /* get user's busy slots */
          gapi.client
            .request({
              path: "https://www.googleapis.com/calendar/v3/freeBusy",
              method: "POST",
              body: {
                timeMin: timeMin.toISOString(),
                timeMax: timeMax.toISOString(),
                timeZone: "PST",
                items: [{ id: "primary" }]
              }
            })
            .then(res => {
              console.log("freebusy response!");
              console.log(res);
              if (res.result.calendars && res.result.calendars.primary.busy) {
                const busyTimes = res.result.calendars.primary.busy;
                const busy = retrieveSlots(busyTimes);
                console.log("printing busy times: ");
                console.log(busy);
                /* get user's free slots from busy slots */
                const free = getFreeSlots(busy, timeMin, timeMax);
                console.log("free!");
                console.log(free);

                /* get the new calendar based on gcal info */
                const calendar = createCalendar(free);
                console.log(calendar.blocks.length);
                for (let i = 0; i < calendar.blocks.length; i++) {
                  console.log(`block ${i} - start: `);
                  console.log(calendar.blocks[i]);
                }
              } else {
                console.log("no busy times!");
              }
            })
            .catch(err => {
              console.log("freebusy error!");
              console.log(err);
            });
        }
      );
    });
  }
};

export default client;
