import {
  add,
  eachDayOfInterval,
  eachHourOfInterval,
  getHours,
  getMinutes,
  isBefore,
  isEqual,
  set
} from "date-fns";
import "firebase/auth";

import userClient from "../user/client";
import { createBlock } from "./utils";

/* helpers, not exported */
interface Slot {
  startTime: Date;
  endTime: Date;
}

/**
 * Converts a slot into a list of blocks that spans the entire time period defined
 * by the slot.
 */
function convertSlotToBlocks(
  { startTime, endTime }: Slot,
  userId: string
): Block[] {
  if (!isBefore(startTime, endTime)) {
    return [];
  }

  const blocks: Block[] = [];

  const intervals = eachHourOfInterval({ start: startTime, end: endTime });
  intervals.forEach((hour, index) => {
    if (isBefore(hour, endTime)) {
      blocks.push(createBlock(hour, userId));
      if (index < intervals.length - 1) {
        blocks.push(createBlock(add(hour, { minutes: 30 }), userId));
      }
    }
  });

  const [firstBlock] = blocks;
  if (isBefore(firstBlock.startTime, startTime)) {
    blocks.shift();
  }

  return blocks;
}

/* creates 30-min free blocks between timeMin & timeMax, given the busy blocks
 between timeMin & timeMax */
const generateFreeBlocks = (
  busyBlocks: Block[],
  timeMin: Date,
  timeMax: Date,
  userId: string
): Block[] => {
  const slots = eachDayOfInterval({ start: timeMin, end: timeMax }).map(
    day => ({
      startTime: set(day, {
        hours: getHours(timeMin),
        minutes: getMinutes(timeMin)
      }),
      endTime: set(day, {
        hours: getHours(timeMax),
        minutes: getMinutes(timeMax)
      })
    })
  );

  return slots
    .flatMap(slot => convertSlotToBlocks(slot, userId))
    .filter(
      block =>
        !busyBlocks.find(busyBlock =>
          isEqual(busyBlock.startTime, block.startTime)
        )
    );
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
  findBusyBlocks(
    timeMin: Date,
    timeMax: Date,
    userId: string
  ): Promise<Block[]> {
    return freeBusyRequest(timeMin, timeMax)
      .then(busyTimes => {
        return retrieveSlots(busyTimes);
      })
      .then(busySlots => {
        return busySlots.flatMap(slot => convertSlotToBlocks(slot, userId));
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },
  /* pass in a 30-min slot start time for timeMin & timeMax */
  findFreeBlocks(
    timeMin: Date,
    timeMax: Date,
    userId: string
  ): Promise<Block[]> {
    return this.findBusyBlocks(timeMin, timeMax, userId)
      .then(busyBlocks => {
        return generateFreeBlocks(busyBlocks, timeMin, timeMax, userId);
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
