import "firebase/auth";
import userClient from "../user/client";

/* helpers, not exported */
interface Slot {
  startTime: Date;
  endTime: Date;
}

/* requires a valid 30-min block start time */
/* returns the next 30-min block start time */
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

/* splits a given startTime - endTime interval/slot into 30-min blocks */
const getBusyBlocks = (startTime: Date, endTime: Date): Block[] => {
  const busyBlocks: Block[] = [];
  while (startTime < endTime) {
    busyBlocks.push({
      startTime: startTime,
      availableUsers: []
    });
    startTime = getNextBlock(startTime);
  }
  return busyBlocks;
};

/* creates 30-min blocks from a list of slots */
const generateBusyBlocks = (slots: Slot[]): Block[] => {
  let busyBlocks: Block[] = [];
  for (const slot of slots) {
    const blocks = getBusyBlocks(slot.startTime, slot.endTime);
    busyBlocks = busyBlocks.concat(blocks);
  }
  return busyBlocks;
};

/* creates 30-min free blocks between timeMin & timeMax, given the busy blocks
 between timeMin & timeMax */
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

/* makes a free-busy request to GCAL API using the current user's access token */
/* returns a list of busy times of the user between timeMin & timeMax */
const freeBusyRequest = async (
  timeMin: Date,
  timeMax: Date
): Promise<gapi.client.calendar.TimePeriod[]> => {
  return new Promise<gapi.client.calendar.TimePeriod[]>((resolve, reject) => {
    gapi.load("client", async () => {
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

/* converts GCAL time periods to slots */
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
  /* pass in a 30-min slot start time for timeMin & timeMax */
  findBusyBlocks(timeMin: Date, timeMax: Date): Promise<Block[]> {
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
  /* pass in a 30-min slot start time for timeMin & timeMax */
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
