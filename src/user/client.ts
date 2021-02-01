import "firebase/auth";
import { db } from "@/db";
import { Calendar } from "@/calendar/client";

export interface User {
  username: string;
  email: string;
  calendar: Calendar;
}

// TODO: Fill this in with methods
const client = {
  // stub
};

export default client;

export const Auth = db.auth();
