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
