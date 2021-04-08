import { ref, UnwrapRef } from "vue";
import firebase from "firebase/app";

import { FirebaseCalendar, toHappyHourCalendar } from "@/calendar/utils";
import { Event, dbRef } from "./client";

/**
 * All dates in Firebase are stored Firestore `Timestamp`s objects rather than
 * dates, so we have to reflect that in the type.
 */
type FirebaseEvent = Omit<Event, "scheduleWindow" | "calendar"> & {
  scheduleWindow: {
    startTime: firebase.firestore.Timestamp;
    endTime: firebase.firestore.Timestamp;
  };
  calendar: FirebaseCalendar;
};

/**
 * Given an event ID, returns the associated Event object that is synchronized to
 * the firebase model.
 *
 * @param id is id of the event
 * @returns a reactive event object
 */
export function useEvent(id: string) {
  const event = ref<Event | null>(null);

  dbRef.doc(id).onSnapshot(snapshot => {
    if (snapshot.exists) {
      const newEvent = snapshot.data() as UnwrapRef<FirebaseEvent>;
      const {
        scheduleWindow: { startTime, endTime },
        calendar
      } = newEvent;

      /**
       * Convert the Firestore timestamps to dates for use in the rest
       * of the app.
       */
      event.value = {
        ...newEvent,
        calendar: toHappyHourCalendar(calendar),
        scheduleWindow: {
          startTime: startTime.toDate(),
          endTime: endTime.toDate()
        }
      };
    }
  });

  return event;
}
