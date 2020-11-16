package main

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"

	log "github.com/sirupsen/logrus"
	"github.com/ubclaunchpad/when3meet/data/schema"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/calendar/v3"
)

func getUserCalendar(filename string, token *oauth2.Token) *calendar.Service {
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

func CreateUserCalendar(w http.ResponseWriter,
	r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	// 0. return json
	w.Header().Set("Content-type", "application/json")

	//test
	var user schema.User
	log.Println(r.Header)
	log.Println(r.Body)
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Fatalf("failed to decode the request: %v", err)
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)

	// 1. read the access token
	//var token oauth2.Token
	//err := json.NewDecoder(r.Body).Decode(&token)
	//if err != nil {
	//	w.WriteHeader(http.StatusInternalServerError)
	//	log.Fatalf("failed to decode the request: %v", err)
	//}
	////2. get user's calendar
	//srv := getUserCalendar("credentials.json", &token)
	//
	////3. get user's busy slots
	//timeMin := "2020-11-15T00:00:00-08:00"
	//timeMax := "2020-11-16T12:59:00-08:00"
	//busy, err := gcal.GetBusySlots(srv, timeMin, timeMax)
	//if err != nil {
	//	w.WriteHeader(http.StatusInternalServerError)
	//	log.Fatalf("unable to get busy slots of user: %v", err)
	//}
	//
	////4. get user's free slots from busy slots
	//free := gcal.GetFreeSlots(busy, timeMin, timeMax)
	//
	////5. convert free slots to Calendar
	//cal, err := gcal.CreateCalendar(free)
	//if err != nil {
	//	w.WriteHeader(http.StatusInternalServerError)
	//	log.Fatalf("unable to save calendar of user: %v", err)
	//}
	//gcal.PrintCalendar(cal)
	//
	////6. update the user
	////todo: get req & update req or create req
	//
	////7. send back updated user
	////todo
	//log.Println("reached here??")
	//w.WriteHeader(http.StatusOK)
	//w.Write([]byte("success!"))
}
