import { getHours, getMinutes, isEqual } from "date-fns";
import { Block, Calendar } from "./client";

export const formatHour = (hour: number, minutes: number) => {
  let formattedMinutes = String(minutes);
  if (minutes < 10) {
    formattedMinutes = `0${minutes}`;
  }
  return `${hour}:${formattedMinutes}`;
};

export const toTime = (date: Date) => {
  return {
    hour: getHours(date),
    minutes: getMinutes(date)
  };
};

export const createBlock = (startTime: Date, ...users: string[]): Block => {
  return {
    startTime,
    availableUsers: users
  };
};

/**
 * Merges two calendars together, combining the users of blocks with the same start
 * time.
 */
export const merge = (source: Calendar, other: Calendar) => {
  const intersection: Block[] = [];

  for (const block of source.blocks) {
    const otherBlock = other.blocks.find(other =>
      isEqual(other.startTime, block.startTime)
    );
    if (otherBlock) {
      const uniqueUsers = new Set([
        ...block.availableUsers,
        ...otherBlock.availableUsers
      ]);
      intersection.push(createBlock(block.startTime, ...uniqueUsers));
    } else {
      intersection.push(block);
    }
  }

  // Here, there may be blocks in `other` that's not added yet
  const notAddedYet = other.blocks.filter(
    block =>
      !intersection.find(currentBlock =>
        isEqual(currentBlock.startTime, block.startTime)
      )
  );
  notAddedYet.forEach(block => intersection.push(block));

  return { blocks: intersection };
};
