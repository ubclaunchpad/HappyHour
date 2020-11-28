// Schema Definitions for Firestore Documents
// NOTE: do not use directly, instead use exported schemas from
// appropriate client (e.g. clients/firebase)
package schema

import "time"

// User describes a single when3meet user and includes their personal
// availability calendar
type User struct {
	//TODO: Remove the FirebaseID field since it is the same as a user's email - for now we keep it since all our endpoints are using this
	AccessToken string
	FirebaseID string
	Username   string
	Email      string
	Events		[]string // FirebaseID of events that this user is attending or the owner of
	Calendar   Calendar // default user calendar
}

type TimeWindow struct {
	StartTime Timestamp
	EndTime   Timestamp
}

// Event describes a single event/meeting and includes.
type Event struct {
	FirebaseID string
	Users      []string // FirebaseID of users is in this event
	Owners     []string // FirebaseID of event owners

	// time window during which event can be scheduled
	ScheduleWindow TimeWindow

	Link string // link to this event

	// user shared calendar, created on event init but modified when users are added/removed
	Calendar Calendar

	Summary string
	Description string

	// confirmed time window of the event
	ConfirmedWindow TimeWindow

	// confirmed or not
	Confirmed bool
}

// Calendar describes a group of availabilities in 30min time blocks
type Calendar struct {
	Blocks []Block
}

// Block describes a single 30min time block along with users which are available during that time
type Block struct {
	StartTime Timestamp
	Users     []string // list of UserIDs of which users are free during this block
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
