/**
 * Types as per Week 4 meeting:
 *  - https://www.notion.so/Team-4-New-Wireframes-c3e68fecf847456a8ca91c7d1514fb38
 */

export interface Block {
  startTime: Date;
  availableUsers: string[];
}

export interface Calendar {
  blocks: Block[];
}

export interface User {
  username: string;
  email: string;
  calendar: Calendar;
}

export interface Event {
  users: string[];
  owners: string[];
  scheduleWindow: {
    startTime: Date;
    endTime: Date;
  };
  link: string;
  calendar: Calendar;
  title: string;
  timezone: string;
}

export interface Time {
  hour: number;
  minutes: number;
}
