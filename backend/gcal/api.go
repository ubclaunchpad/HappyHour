package gcal

import (
	"context"
	"io/ioutil"
	"log"
	"time"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/calendar/v3"
	"errors"
	"github.com/ubclaunchpad/when3meet/data/schema"
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
			} else if busy[i - 1].End < slot.Start {
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

func GetFreeBlocks(startTime string, endTime string) ([]schema.Block, error) {
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
				"", //todo
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

func CreateCalendar(freeSlots []Slot) (*schema.Calendar, error) {
	var allBlocks []schema.Block
	for _, freeSlot := range freeSlots {
		blocks, err := GetFreeBlocks(freeSlot.startTime, freeSlot.endTime)
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

//srv refers to a particular user's calendar!!!
func CreateEvent(srv *calendar.Service, e schema.Event) (schema.Event,
	error) {
	//need to know the particular start & end time of the event (
	//once its confirmed!)
	event := &calendar.Event{
		Summary: e.Summary,
		Description: e.Description,
		Start: &calendar.EventDateTime{
			DateTime: e.StartTime,
		},
		End: &calendar.EventDateTime{
			DateTime: e.EndTime,
		},
		Attendees: nil, //need to change
	}

	_, err := srv.Events.Insert("primary", event).Do()
	return e, err
}