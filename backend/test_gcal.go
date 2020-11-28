package main

import (
	"encoding/json"
	"net/http"
	"time"
	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
	"github.com/ubclaunchpad/when3meet/backend/data/clients/firebase"
	"github.com/ubclaunchpad/when3meet/backend/gcal"
	"golang.org/x/oauth2"
)

func GetGCalEvents(w http.ResponseWriter,
	r *http.Request) {
	w.Header().Set("Content-type", "application/json")

	//1. get user from user id
	vars := mux.Vars(r)
	if vars["id"] == "" {
		log.Warn("No document id provided")
		http.Error(w,"No ID provided",http.StatusBadRequest)
		return
	}
	user := &firebase.User{FirebaseID: vars["id"]}
	err := user.Get()
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		log.Warnf("Failed to get user : %v", err)
		http.Error(w,"Could not find user with the given id",http.StatusNotFound)
		return
	}

	//2. get access token
	token := oauth2.Token{AccessToken: user.AccessToken}

	//3. get user's calendar
	srv := gcal.GetGCal("GoogleAPI.json", &token)

	//4. get all events
	timeMin := time.Now()
	timeMax := time.Date(timeMin.Year() + 1, timeMin.Month(), timeMin.Day(),
		timeMin.Hour(), 0,0, 0, timeMin.Location())
	min := timeMin.Format(time.RFC3339)
	max := timeMax.Format(time.RFC3339)

	events, err := gcal.GetEvents(srv, min, max)
	if err != nil {
		log.Fatalf("failed to get events: %v", err)
	}
	for i, event := range events {
		log.Printf("event %v: summary: %v, descr: %v, start: %v, end: %v", i,
			event.Summary, event.Description, event.ConfirmedWindow.StartTime,
			event.ConfirmedWindow.EndTime)
	}

	//5. send back all events
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(events)
}

func TestUpdateCal(w http.ResponseWriter,
	r *http.Request) {
	w.Header().Set("Content-type", "application/json")

	// get the user
	vars := mux.Vars(r)
	if vars["id"] == "" {
		log.Warn("No document id provided")
		http.Error(w,"No ID provided",http.StatusBadRequest)
		return
	}
	user := &firebase.User{FirebaseID: vars["id"]}
	err := user.Get()
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		log.Warnf("Failed to get user : %v", err)
		http.Error(w,"Could not find user with the given id",http.StatusNotFound)
		return
	}

	// update user's calendar
	log.Println("updating calendar!")
	u, err := gcal.UpdateCalendar("GoogleAPI.json", user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Fatalf("failed to update user's calendar: %v", err)
	}

	// send back the updated user
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(u)
}

//given event id, find the event, find the attendees,
//create gcal event with event details in each attendee's gcal
func TestConfirmEvent(w http.ResponseWriter,
	r *http.Request) {
	w.Header().Set("Content-type", "application/json")

	//0. get event id
	vars := mux.Vars(r)
	if vars["id"] == "" {
		log.Warn("No document id provided")
		http.Error(w,"No ID provided",http.StatusBadRequest)
		return
	}

	//NOTE frontend also needs to send us confirmed start & end

	//1. find event
	event := &firebase.Event{FirebaseID: vars["id"]}
	err := event.Get()
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		log.Warnf("Failed to get event : %v", err)
		http.Error(w,"Could not find event with the given id",
			http.StatusNotFound)
		return
	}

	//NOTE we need to update the event here (to set confirmed start & end)

	//2. find users associated with the event
	userIDs := append(event.Owners, event.Users...)
	log.Printf("found users: %v", userIDs)

	//3. for each user:
	for _, uid := range userIDs {
		//3a. get the user
		user := &firebase.User{FirebaseID: uid}
		err := user.Get()
		if err != nil {
			w.WriteHeader(http.StatusNotFound)
			log.Warnf("Failed to get user : %v", err)
			http.Error(w,"Could not find user with the given id",http.StatusNotFound)
			return
		}

		//3b. construct calendar srv
		token := oauth2.Token{AccessToken: user.AccessToken}
		srv := gcal.GetGCal("GoogleAPI.json", &token)

		//3c. create gcal event
		_, err = gcal.CreateEvent(srv, event, userIDs)
		if err != nil {
			log.Fatalf("failed to create gcal event: %v", err)
		}

		//3d. update user's calendar TODO

		//3e. update user's availabilities for each event they are part of TODO
	}

	//4. send back the confirmed event
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(event)

}
