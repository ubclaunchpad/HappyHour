import firebase from "firebase/app";
import { Block, Calendar } from "@/calendar/client";
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
  },
  saveResponse({
    userId,
    eventId,
    availability
  }: {
    userId: string;
    eventId: string;
    availability: Block[];
  }) {
    return dbRef.doc(eventId).update({
      users: firebase.firestore.FieldValue.arrayUnion(userId),
      calendar: { blocks: availability }
    });
  },
  getEventsOfOwner(userId: string) {
    return dbRef.where("owners", "array-contains", userId).get();
  },
  getEventsOfParticipant(userId: string) {
    return dbRef.where("owners", "array-contains", userId).get();
  }
};

export default client;
