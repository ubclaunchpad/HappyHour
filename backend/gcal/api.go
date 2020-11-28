package gcal

import (
	"context"
	"io/ioutil"
	"log"
	"time"
	"github.com/ubclaunchpad/when3meet/backend/data/clients/firebase"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/calendar/v3"
	"errors"
	"github.com/ubclaunchpad/when3meet/backend/data/schema"
)

func GetBusySlots(srv *calendar.Service, timeMin string, timeMax string) (*calendar.FreeBusyResponse, error) {
	req := &calendar.FreeBusyRequest{
		TimeMin: timeMin,
		TimeMax: timeMax,
		TimeZone: "PST", //do not hardcode
		Items: []*calendar.FreeBusyRequestItem{
			{Id: "primary"},
		},
	}
	res, err := srv.Freebusy.Query(req).Do()
	if err != nil {
		return nil, err
	}

	log.Println("printing busy times!!")
	for i, slot := range res.Calendars["primary"].Busy {
		log.Printf("busy %v: start %v, end %v", i, slot.Start, slot.End)
	}
	return res, nil
}

type Slot struct {
	startTime string
	endTime string
}

func GetFreeSlots (res *calendar.FreeBusyResponse, timeMin string, timeMax string) []Slot {
	busy := res.Calendars["primary"].Busy
	var free []Slot

	if len(busy) < 1 {
		free = append(free, Slot{startTime: timeMin, endTime: timeMax})
	} else {
		for i, slot := range busy {
			if i == 0 && timeMin < slot.Start {
				free = append(free, Slot{startTime: timeMin, endTime: slot.Start})
			} else if i > 0 && busy[i - 1].End < slot.Start {
				free = append(free, Slot{startTime: busy[i - 1].End,
					endTime: slot.Start})
			}

			if i == len(busy) - 1 && slot.End < timeMax {
				free = append(free, Slot{startTime: slot.End, endTime: timeMax})
			}
		}
	}

	//print free for ref
	log.Println("printing free times!!")
	for i, freeSlot := range free {
		log.Printf("free %v: start %v, end %v", i, freeSlot.startTime,
			freeSlot.endTime)

	}

	return free
}

func GetBlockStart(t time.Time) time.Time {
	min := t.Minute()
	if min > 0 && min < 30 {
		t1 := time.Date(t.Year(), t.Month(), t.Day(), t.Hour(), 30, 0, 0, t.Location())
		return t1
	} else if min > 30 && min < 60 {
		t1 := time.Date(t.Year(), t.Month(), t.Day(), t.Hour() + 1, 0, 0, 0, t.Location())
		return t1
	}
	return t
}

func GetBlockEnd(t time.Time) time.Time {
	min := t.Minute()
	if min > 0 && min < 30 {
		t1 := time.Date(t.Year(), t.Month(), t.Day(), t.Hour(), 0, 0, 0, t.Location())
		return t1
	} else if min > 30 && min < 60 {
		t1 := time.Date(t.Year(), t.Month(), t.Day(), t.Hour(), 30, 0, 0, t.Location())
		return t1
	}
	return t
}

//requires a valid block start time (min is 0 or 30)
func GetNextBlock(t time.Time) (time.Time, error) {
	min := t.Minute()
	if min == 0 {
		t1 := time.Date(t.Year(), t.Month(), t.Day(), t.Hour(), 30, 0, 0, t.Location())
		return t1, nil
	} else if min == 30 {
		t1 := time.Date(t.Year(), t.Month(), t.Day(), t.Hour() + 1, 0, 0, 0, t.Location())
		return t1, nil
	} else {
		return t, errors.New("invalid block start time provided!")
	}
}

func GetFreeBlocks(startTime string, endTime string, userId string) ([]schema.Block,
	error) {
	start, err := time.Parse(time.RFC3339, startTime)
	if err != nil {
		log.Printf("could not parse startTime!")
		return nil, err
	}
	end, err := time.Parse(time.RFC3339, endTime)
	if err != nil {
		log.Printf("could not parse endTime!")
		return nil, err
	}
	s := GetBlockStart(start)
	e := GetBlockEnd(end)

	var freeBlocks []schema.Block
	for s.Before(e) {
		freeBlocks = append(freeBlocks, schema.Block{
			StartTime: schema.Timestamp(s.Format(time.RFC3339)),
			Users: []string{
				userId,
			},
		})
		s, err = GetNextBlock(s)
		if err != nil {
			log.Printf("could not get next block: %v", s)
			return nil, err
		}
	}
	return freeBlocks, nil
}

func CreateCalendar(freeSlots []Slot, userId string) (*schema.Calendar, error) {
	var allBlocks []schema.Block
	for _, freeSlot := range freeSlots {
		blocks, err := GetFreeBlocks(freeSlot.startTime, freeSlot.endTime, userId)
		if err != nil {
			log.Printf("couldnt get blocks for a free slot!")
			return nil, err
		}
		allBlocks = append(allBlocks, blocks...)
	}
	cal := schema.Calendar{
		Blocks: allBlocks,
	}
	return &cal, nil
}

func PrintCalendar(cal *schema.Calendar) {
	for i, block := range cal.Blocks {
		log.Printf("block %v, startTime: %v, users: %v", i, block.StartTime,
			block.Users)
	}
}

func GetGCal(filename string, token *oauth2.Token) *calendar.Service {
	f, err := ioutil.ReadFile(filename)
	if err != nil {
		log.Fatalf("unable to read client secret file: %v", err)
	}

	//get read & write permission
	config, err := google.ConfigFromJSON(f, calendar.CalendarScope)
	if err != nil {
		log.Fatalf("unable to parse client secret file to config: %v", err)
	}

	client := config.Client(context.Background(), token)

	srv, err := calendar.New(client)
	if err != nil {
		log.Fatalf("unable to retrieve calendar client: %v", err)
	}

	return srv
}

func UpdateCalendar(filename string, user *firebase.User) (*firebase.User, error){
	//1. read access token
	token := oauth2.Token{AccessToken: user.AccessToken}

	//2. get user's calendar
	srv := GetGCal(filename, &token)

	//3. get user's busy slots
	timeMin := GetBlockStart(time.Now())
	timeMax := time.Date(timeMin.Year(), timeMin.Month(), timeMin.Day() + 1,
		timeMin.Hour(), 0,0, 0, timeMin.Location())
	min := timeMin.Format(time.RFC3339)
	max := timeMax.Format(time.RFC3339)

	busy, err := GetBusySlots(srv, min, max)
	if err != nil {
		log.Printf("unable to get busy slots of user: %v", err)
		return nil, err
	}

	//4. get user's free slots from busy slots
	free := GetFreeSlots(busy, min, max)

	//5. convert free slots to Calendar
	userId := user.FirebaseID
	cal, err := CreateCalendar(free, userId)
	if err != nil {
		log.Printf("unable to save calendar of user: %v", err)
		return nil, err
	}
	PrintCalendar(cal) //only for testing

	//6. update the user
	err = user.Get()
	if err != nil {
		//should not happen
		log.Printf("user could not be found: %v", err)
		return nil, err
	}
	user.Calendar = *cal
	err = user.Update()
	if err != nil {
		log.Printf("Failed to update user : %v", err)
		return nil, err
	}

	//7. send back updated user
	return user, nil
}

func CreateEvent(srv *calendar.Service, e *firebase.Event,
	userIDs []string) (*firebase.Event,
	error) {
	//get attendees
	var attendees []*calendar.EventAttendee
	for _, attendee := range userIDs {
		attendees = append(attendees, &calendar.EventAttendee{Email: attendee})
	}
	//create event
	event := &calendar.Event{
		Summary: e.Summary,
		Description: e.Description,
		Start: &calendar.EventDateTime{
			DateTime: string(e.ConfirmedWindow.StartTime),
		},
		End: &calendar.EventDateTime{
			DateTime: string(e.ConfirmedWindow.EndTime),
		},
		Attendees: attendees,
	}

	_, err := srv.Events.Insert("primary", event).Do()
	return e, err
}

func GetEvents(srv *calendar.Service, timeMin string,
	timeMax string) ([]firebase.Event, error) {
	events, err := srv.Events.List("primary").ShowDeleted(false).
		SingleEvents(true).TimeMin(timeMin).TimeMax(timeMax).OrderBy("startTime").Do()
	if err != nil {
		return nil, err
	}
	log.Printf("retrieved %v events!", len(events.Items))
	var result []firebase.Event
	for _, item := range events.Items {
		//get event attendees
		var attendees []string
		for _, attendee := range item.Attendees {
			attendees = append(attendees, attendee.Email)
		}
		e := firebase.Event{
			Summary: item.Summary,
			Description: item.Description,
			ConfirmedWindow: schema.TimeWindow{
				StartTime: schema.Timestamp(item.Start.DateTime),
				EndTime: schema.Timestamp(item.End.DateTime),
			},
			Owners: []string{item.Creator.Email},
			Users: attendees,
		}
		log.Printf("event %v, attendees %v", item.Summary, attendees)
		result = append(result, e)
	}
	return result, nil
}