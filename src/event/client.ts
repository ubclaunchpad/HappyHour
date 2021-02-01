import { Calendar } from "@/calendar/client";

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

// TODO: Fill this in with methods
const client = {
  addEvent() {
    // stub
  },
  deleteEvent() {
    // stub
  }
};

export default client;
