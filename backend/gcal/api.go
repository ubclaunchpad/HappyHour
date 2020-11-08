package main

import (
	"fmt"
	"time"
	"google.golang.org/api/calendar/v3"
)

type Event struct {
	Summary string
	Description string
	StartTime string
	EndTime string
	Attendees []string
}

func GetEvents(srv *calendar.Service) ([]Event, error) {
	var result []Event
	t := time.Now().Format(time.RFC3339)
	events, err := srv.Events.List("primary").ShowDeleted(false).
		SingleEvents(true).TimeMin(t).MaxResults(10).OrderBy("startTime").Do()
	if err != nil {
		return nil, err
	}
	fmt.Println("Upcoming events:")
	if len(events.Items) == 0 {
		fmt.Println("No upcoming events found.")
	} else {
		for _, item := range events.Items {
			date := item.Start.DateTime
			if date == "" {
				date = item.Start.Date
			}
			//create a type Event obj from item
			var emails []string
			for _, attendee := range item.Attendees {
				emails = append(emails, attendee.Email)
			}
			e := Event{item.Summary, item.Description, item.Start.DateTime,
				item.End.DateTime, emails}
			result = append(result, e)
		}
	}
	return result, nil
}

func CreateEvent(srv *calendar.Service, event Event) (Event, error) {
	var attendees []*calendar.EventAttendee
	for _, attendee :=  range event.Attendees {
		attendees = append(attendees, &calendar.EventAttendee{Email: attendee})
	}
	e := &calendar.Event{
		Summary: event.Summary,
		Description: event.Description,
		Start: &calendar.EventDateTime{
			DateTime: event.StartTime,
		},
		End: &calendar.EventDateTime{
			DateTime: event.EndTime,
		},
		Attendees: attendees,
	}
	e, err := srv.Events.Insert("primary", e).Do()
	return event, err
}




