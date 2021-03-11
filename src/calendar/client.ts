import "firebase/auth";
import userClient from "../user/client";

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
      const slot: Slot = {
        startTime: new Date(startTime),
        endTime: new Date(endTime)
      };
      slots.push(slot);
    }
  }
  return slots;
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

const generateBusyBlocks = (slots: Slot[]): Block[] => {
  let busyBlocks: Block[] = [];
  for (const slot of slots) {
    const blocks = getBusyBlocks(slot.startTime, slot.endTime);
    busyBlocks = busyBlocks.concat(blocks);
  }
  return busyBlocks;
};

const generateFreeBlocks = (
  busyBlocks: Block[],
  timeMin: Date,
  timeMax: Date
): Block[] => {
  const freeBlocks: Block[] = [];
  const busyStartTimes = busyBlocks.map(busyBlock =>
    busyBlock.startTime.getTime()
  );
  while (timeMin < timeMax) {
    if (!busyStartTimes.includes(timeMin.getTime())) {
      freeBlocks.push({ startTime: timeMin, availableUsers: [] });
    }
    timeMin = getNextBlock(timeMin);
  }
  return freeBlocks;
};

const freeBusyRequest = async (
  timeMin: Date,
  timeMax: Date
): Promise<gapi.client.calendar.TimePeriod[]> => {
  return new Promise<gapi.client.calendar.TimePeriod[]>((resolve, reject) => {
    gapi.load("client:auth2", async () => {
      try {
        const accessToken = await userClient.getAccessToken();
        console.log("access token in calendar: " + accessToken);
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
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (res.result.calendars && res.result.calendars.primary.busy) {
          const busyTimes = res.result.calendars.primary.busy;
          return resolve(busyTimes);
        }
      } catch (err) {
        console.log("request error: ");
        console.log(err);
        return reject(err);
      }
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
  findBusyBlocks(timeMin: Date, timeMax: Date): Promise<Block[]> {
    timeMin = getBlockStart(timeMin);
    timeMax = getBlockStart(timeMax);
    return freeBusyRequest(timeMin, timeMax)
      .then(busyTimes => {
        return retrieveSlots(busyTimes);
      })
      .then(busySlots => {
        return generateBusyBlocks(busySlots);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },
  findFreeBlocks(timeMin: Date, timeMax: Date): Promise<Block[]> {
    return this.findBusyBlocks(timeMin, timeMax)
      .then(busyBlocks => {
        return generateFreeBlocks(busyBlocks, timeMin, timeMax);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },
  createCalendar(blocks: Block[]): Calendar {
    const cal: Calendar = {
      blocks: blocks
    };
    return cal;
  }
};

export default client;
