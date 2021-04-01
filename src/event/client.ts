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
  async getEventsOfOwner(userId: string) {
    const ownerEvents = await dbRef
      .where("owners", "array-contains", userId)
      .get();
    console.log("getting owner events: ");
    // const ids = ownerEvents.docs.map(doc => doc.id);
    // console.log(ids);
    const res = ownerEvents.docs.map(doc => {
      return { eventData: doc.data(), eventId: doc.id };
    });
    console.log(res);
    return res;
    // return ownerEvents.docs.map(doc => doc.data());
  },
  async getEventsOfParticipant(userId: string) {
    const participantEvents = await dbRef
      .where("users", "array-contains", userId)
      .get();
    // return participantEvents.docs.map(doc => doc.data());
    const res = participantEvents.docs.map(doc => {
      return { eventData: doc.data(), eventId: doc.id };
    });
    console.log(res);
    return res;
  }
};

export default client;
