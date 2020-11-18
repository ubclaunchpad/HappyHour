package main

import (
	"encoding/json"
	"net/http"

	log "github.com/sirupsen/logrus"
	"github.com/ubclaunchpad/when3meet/data/schema"
	"github.com/ubclaunchpad/when3meet/gcal"
	"golang.org/x/oauth2"
)

func CreateUserCalendar(w http.ResponseWriter,
	r *http.Request) {
	// 0. return json
	w.Header().Set("Content-type", "application/json")

	// 1. decode the user & read the access token
	var user schema.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Fatalf("failed to decode the request: %v", err)
	}
	token := oauth2.Token{AccessToken: user.AccessToken}

	//2. get user's calendar
	srv := gcal.GetGCal("credentials.json", &token)

	//3. get user's busy slots
	timeMin := "2020-11-15T00:00:00-08:00"
	timeMax := "2020-11-16T12:59:00-08:00"
	busy, err := gcal.GetBusySlots(srv, timeMin, timeMax)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Fatalf("unable to get busy slots of user: %v", err)
	}

	//4. get user's free slots from busy slots
	free := gcal.GetFreeSlots(busy, timeMin, timeMax)

	//5. convert free slots to Calendar
	cal, err := gcal.CreateCalendar(free)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Fatalf("unable to save calendar of user: %v", err)
	}
	gcal.PrintCalendar(cal)

	//6. update the user
	//todo: get req & update req or create req

	//7. send back updated user
	//todo
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("success!"))
}

//func ConfirmEventTest(w http.ResponseWriter,
//	r *http.Request) {
//	// 0. return json
//	w.Header().Set("Content-type", "application/json")
//
//	// 1. decode the user & read the access token
//	var user schema.User
//	err := json.NewDecoder(r.Body).Decode(&user)
//	if err != nil {
//		w.WriteHeader(http.StatusInternalServerError)
//		log.Fatalf("failed to decode the request: %v", err)
//	}
//	token := oauth2.Token{AccessToken: user.AccessToken}
//
//	//2. get user's calendar
//	srv := gcal.GetGCal("credentials.json", &token)
//
//	//3. create event
//	e, err := gcal.CreateEvent(srv, schema.Event{
//		Summary: "test event",
//		Description: "i hope it works!",
//		StartTime: "2020-11-17T12:00:00-08:00",
//		EndTime: "2020-11-17T13:00:00-08:00",
//	})
//	if err != nil {
//		w.WriteHeader(http.StatusInternalServerError)
//		log.Fatalf("unable to create an event: %v", err)
//	}
//
//	w.WriteHeader(http.StatusOK)
//	json.NewEncoder(w).Encode(e)
//}

//func ConfirmEvent(w http.ResponseWriter,
//	r *http.Request) {
//	w.Header().Set("Content-type", "application/json")
//
//	//0. get event id
//	vars := mux.Vars(r)
//	if vars["id"] == "" {
//		log.Warn("No document id provided")
//		http.Error(w,"No ID provided",http.StatusBadRequest)
//		return
//	}
//
//	//1. find event
//	event := &firebase.Event{FirebaseID: vars["id"]} //ask how to get this correctly!! (type mismatch)
//	err := event.Get()
//	if err != nil {
//		w.WriteHeader(http.StatusNotFound)
//		log.Warnf("Failed to get event : %v", err)
//		http.Error(w,"Could not find event with the given id",
//			http.StatusNotFound)
//		return
//	}
//
//	//2. find users associated with the event
//	userIDs := append(event.Owners, event.Users...)
//
//	//3. for each user:
//	for _, uid := range userIDs {
//		//3a. get the User
//		//todo: request to GetUser
//		var user schema.User //needs to be changed
//
//		//3b. construct calendar srv
//		token := oauth2.Token{AccessToken: user.AccessToken}
//		srv := gcal.GetGCal("credentials.json", &token)
//
//		//3c. create gcal event: need to fix firebase.Event vs schema.
//		//Event logic!
//		e, err := gcal.CreateEvent(srv, event)
//
//		//3d. update user's calendar
//		//todo: request to /createUserCalendar
//
//	}
//
//}
