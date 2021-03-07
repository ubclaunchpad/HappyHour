import firebase from "firebase";
import { app } from "@/db";
import "firebase/auth";

const Auth = app.auth();

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

const generateFreeSlots = (
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

const getBusyBlocks = (startTime: Date, endTime: Date): Block[] => {
  let s = getBlockEnd(startTime);
  const e = getBlockStart(endTime);

  /* create blocks between s & e */
  const busyBlocks: Block[] = [];
  while (s < e) {
    busyBlocks.push({
      startTime: s,
      availableUsers: []
    });
    s = getNextBlock(s);
  }
  return busyBlocks;
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

const createBusyCalendar = (slots: Slot[]): Calendar => {
  let calendarBlocks: Block[] = [];
  for (const slot of slots) {
    const blocks = getBusyBlocks(slot.startTime, slot.endTime);
    calendarBlocks = calendarBlocks.concat(blocks);
  }
  const cal: Calendar = {
    blocks: calendarBlocks
  };
  return cal;
};

const createFreeCalendar = (slots: Slot[]): Calendar => {
  let calendarBlocks: Block[] = [];
  for (const slot of slots) {
    const blocks = getFreeBlocks(slot.startTime, slot.endTime);
    calendarBlocks = calendarBlocks.concat(blocks);
  }
  const cal: Calendar = {
    blocks: calendarBlocks
  };
  return cal;
};

const freeBusyRequest = async (
  timeMin: Date,
  timeMax: Date
): Promise<gapi.client.calendar.TimePeriod[]> => {
  return new Promise<gapi.client.calendar.TimePeriod[]>((resolve, reject) => {
    gapi.load("client:auth2", () => {
      gapi.auth2.authorize(
        {
          // eslint-disable-next-line @typescript-eslint/camelcase
          client_id: googleCalendarClient.clientId,
          scope: googleCalendarClient.scope,
          prompt: "none"
        },
        async authResponse => {
          if (authResponse.error) {
            return reject(authResponse.error);
          }
          try {
            const token =
              "ya29.a0AfH6SMCabhZA7109mLH-RVAzhEVE_gcviSsyy2Pbe_RrlisfwZzRSL-TxWf6iWXHnQDXPfnNuKsIn3ZgDcx5TOokOCjqiLV_XD1iZVnsmPVNJdbZbnnvcJGkSiTm-lefNEGcWgssOJC6_jXc3vKYmlGV4KP-";
            const res = await gapi.client.request({
              path: "https://www.googleapis.com/calendar/v3/freeBusy",
              method: "POST",
              body: {
                timeMin: timeMin.toISOString(),
                timeMax: timeMax.toISOString(),
                timeZone: "PST",
                items: [{ id: "primary" }]
              },
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            if (res.result.calendars && res.result.calendars.primary.busy) {
              const busyTimes = res.result.calendars.primary.busy;
              console.log(busyTimes);
              return resolve(busyTimes);
            }
          } catch (err) {
            console.log("request error: " + err);
            return reject(err);
          }
        }
      );
    });
  });
};
const freeBusyRequestNew = async (
  timeMin: Date,
  timeMax: Date
): Promise<gapi.client.calendar.TimePeriod[]> => {
  return new Promise<gapi.client.calendar.TimePeriod[]>((resolve, reject) => {
    gapi.load("client:auth2", async () => {
      // try {
      //   const res = await gapi.client.request({
      //     path: "https://www.googleapis.com/calendar/v3/freeBusy",
      //     method: "POST",
      //     body: {
      //       timeMin: timeMin.toISOString(),
      //       timeMax: timeMax.toISOString(),
      //       timeZone: "PST",
      //       items: [{ id: "primary" }]
      //     },
      //     headers: {
      //       Authorization: `Bearer ${token}`
      //     }
      //   });
      //   if (res.result.calendars && res.result.calendars.primary.busy) {
      //     const busyTimes = res.result.calendars.primary.busy;
      //     console.log(busyTimes);
      //     return resolve(busyTimes);
      //   }
      // } catch (err) {
      //   console.log("request error: ");
      //   console.log(err);
      //   return reject(err);
      // }
      if (Auth.currentUser) {
        console.log("current user exists");
        console.log(Auth.currentUser);
        // return resolve(Auth.currentUser);
        return resolve();
      } else {
        console.log("current user doesnt exist");
        console.log(Auth.currentUser);
        return reject();
      }
      // gapi.auth2.authorize(
      //   {
      //     // eslint-disable-next-line @typescript-eslint/camelcase
      //     client_id: googleCalendarClient.clientId,
      //     scope: googleCalendarClient.scope,
      //     prompt: "none"
      //   },
      //   async authResponse => {
      //     if (authResponse.error) {
      //       return reject(authResponse.error);
      //     }
      //     try {
      //       // const token = "ya29.a0AfH6SMCabhZA7109mLH-RVAzhEVE_gcviSsyy2Pbe_RrlisfwZzRSL-TxWf6iWXHnQDXPfnNuKsIn3ZgDcx5TOokOCjqiLV_XD1iZVnsmPVNJdbZbnnvcJGkSiTm-lefNEGcWgssOJC6_jXc3vKYmlGV4KP-";
      //       const res = await gapi.client.request({
      //         path: "https://www.googleapis.com/calendar/v3/freeBusy",
      //         method: "POST",
      //         body: {
      //           timeMin: timeMin.toISOString(),
      //           timeMax: timeMax.toISOString(),
      //           timeZone: "PST",
      //           items: [{ id: "primary" }]
      //         },
      //         headers: {
      //           Authorization: `Bearer ${token}`
      //         }
      //       });
      //       if (res.result.calendars && res.result.calendars.primary.busy) {
      //         const busyTimes = res.result.calendars.primary.busy;
      //         console.log(busyTimes);
      //         return resolve(busyTimes);
      //       }
      //     } catch (err) {
      //       console.log("request error: ");
      //       console.log(err);
      //       return reject(err);
      //     }
      //   }
      // );
    });
  });
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
  async testFreeBusy(timeMin: Date, timeMax: Date) {
    timeMin = getBlockStart(timeMin);
    timeMax = getBlockStart(timeMax);
    return freeBusyRequestNew(timeMin, timeMax)
      .then(() => {
        console.log("resolved");
      })
      .catch(err => {
        console.log("rejected");
        console.log(err);
      });
  },
  async getBusySlots(timeMin: Date, timeMax: Date): Promise<Slot[]> {
    timeMin = getBlockStart(timeMin);
    timeMax = getBlockStart(timeMax);
    return freeBusyRequest(timeMin, timeMax)
      .then(busyTimes => {
        const busy = retrieveSlots(busyTimes);
        console.log("printing busy slots: ");
        console.log(busy);
        return busy;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },
  async getFreeSlots(timeMin: Date, timeMax: Date): Promise<Slot[]> {
    return this.getBusySlots(timeMin, timeMax)
      .then(busySlots => {
        const free = generateFreeSlots(busySlots, timeMin, timeMax);
        console.log("printing free slots: ");
        console.log(free);
        return free;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },
  convertToBusyCalendar(slots: Slot[]): Calendar {
    const calendar = createBusyCalendar(slots);
    for (let i = 0; i < calendar.blocks.length; i++) {
      console.log(`BUSY block ${i} - start: `);
      console.log(calendar.blocks[i]);
    }
    return calendar;
  },
  convertToFreeCalendar(slots: Slot[]): Calendar {
    const calendar = createFreeCalendar(slots);
    for (let i = 0; i < calendar.blocks.length; i++) {
      console.log(`FREE block ${i} - start: `);
      console.log(calendar.blocks[i]);
    }
    return calendar;
  }
};

export default client;
