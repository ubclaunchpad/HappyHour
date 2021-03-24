import { Calendar } from "@/calendar/client";

export interface Event {
  users: string[];
  owners: string[];
  scheduleWindow: {
    startTime: Date;
    endTime: Date;
  };
  id: string;
  calendar: Calendar;
  title: string;
  timezone: string;
}

// TODO: Fill this in with methods
const client = {
  getEventById(id: string): Event {
    return {
      users: [],
      owners: [],
      scheduleWindow: {
        startTime: new Date("November 2, 2020 09:00:00"),
        endTime: new Date("November  8, 2020 21:30:00")
      },
      id,
      calendar: {
        blocks: []
      },
      title: "Cool event",
      timezone: "PST - Vancouver time"
    };
  },
  addUserAvailability(calendar: Calendar) {
    console.warn("NOT IMPLEMENTED - addUserAvailability");
    console.log(calendar);
  },
  addEvent() {
    // stub
  },
  deleteEvent() {
    // stub
  }
};

export default client;
