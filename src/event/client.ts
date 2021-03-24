import { Calendar } from "@/calendar/client";
import { db } from "@/db";
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

const BasePath = "events";

export const dbRef = db.collection(BasePath);

const client = {
  updateEvent(id: string, event: Partial<Event>) {
    return dbRef.doc(id).update(event);
  },
  addEvent(event: Event) {
    return dbRef.add(event).then(doc => doc.id);
  }
};

export default client;
