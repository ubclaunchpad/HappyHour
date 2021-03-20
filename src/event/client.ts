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

function saveEvent(event: Event) {
  return db.ref("events/").push(event);
  // return db.ref("events/" + "xyz").set(event);
}

// function createEventObject(title: string, startTime: Date, endTime: Date, timezone: string): Event {
//   return {
//     users: [],
//     // calendar: null,
//     id: "",
//     owners: [],
//     scheduleWindow: { endTime, startTime },
//     timezone,
//     title
//   };
// }

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
  addEvent(
    title: string,
    startTime: Date,
    endTime: Date,
    timezone: string
  ): Promise<Event> {
    // stub
    return new Promise((resolve, reject) => {
      const newEvent: Event = {
        users: [],
        calendar: {
          blocks: []
        },
        id: "",
        owners: [],
        scheduleWindow: { endTime, startTime },
        timezone,
        title
      };
      saveEvent(newEvent)
        .then(() => {
          console.log("saved event");
          return resolve(newEvent);
        })
        .catch(err => {
          console.log("error saving event");
          console.log(err);
          return reject(err);
        });
    });
  },
  deleteEvent() {
    // stub
  }
};

export default client;
