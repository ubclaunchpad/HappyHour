import { ref, UnwrapRef } from "vue";
import firebase from "firebase/app";

import { db } from "@/db";
import { Event } from "./client";

const BasePath = "events";

/**
 * The `scheduleWindow` in Firebase is stored as an object of Firestore `Timestamp`s
 * rather than dates, so we have to reflect that in the type.
 */
type FirebaseEvent = Omit<Event, "scheduleWindow"> & {
  scheduleWindow: {
    startTime: firebase.firestore.Timestamp;
    endTime: firebase.firestore.Timestamp;
  };
};

/**
 * Given an event ID, returns the associated Event object that is synchronized to
 * the firebase model.
 *
 * @param id id of the event
 * @returns a reactive event object
 */
export function useEvent(id: string) {
  const event = ref<Event | null>(null);

  db.collection(BasePath)
    .doc(id)
    .onSnapshot(snapshot => {
      if (snapshot.exists) {
        const newEvent = snapshot.data() as UnwrapRef<FirebaseEvent>;
        const {
          scheduleWindow: { startTime, endTime }
        } = newEvent;

        /**
         * Convert the Firestore timestamps to dates for use in the rest
         * of the app.
         */
        event.value = {
          ...newEvent,
          scheduleWindow: {
            startTime: startTime.toDate(),
            endTime: endTime.toDate()
          }
        };
      }
    });

  return event;
}
