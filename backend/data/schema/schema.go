// Schema Definitions for Firestore Documents
package schema

import "time"

// User describes a single when3meet user and includes their personal
// availability calendar
type User struct {
	Username string
	Email    string
	Calendar Calendar // default user calendar
}

// Event describes a single event/meeting and includes.
type Event struct {
	Users  []User // who is in this event
	Owners []User // who owns this event

	// time window during which event can be scheduled
	ScheduleWindow struct {
		StartTime Timestamp
		EndTime   Timestamp
	}

	Link string // link to this event

	// user shared calendar, created on event init but modified when users are added/removed
	Calendar Calendar
}

// Calendar describes a group of availabilities in 30min time blocks
type Calendar struct {
	Blocks []Block
}

// Block describes a single 30min time block along with users which are available during that time
type Block struct {
	StartTime Timestamp
	users     []string // list of UserIDs of which users are free during this block
}

// TimeStamp is a thin wrapper around a timestamp string.
type Timestamp string

// TimeFormat dictates datestring format that our module tries to parse
// time from
const TimeFormat string = time.RFC3339

// Parse returns time.Time from timestamp string
func (t Timestamp) Parse() (time.Time, error) {
	return time.Parse(TimeFormat, string(t))
}
