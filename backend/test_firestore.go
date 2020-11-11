package main

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
	"github.com/ubclaunchpad/when3meet/data/clients/firebase"
)

//TODO: Discuss error handling policy / approach  with team
func CreateUser(w http.ResponseWriter, r *http.Request) {
	// return json
	w.Header().Set("Content-type", "application/json")

	// unmarshal the JSON in the request to the data struct
	// to access the key-value pairs
	var exampleUser firebase.User
	err := json.NewDecoder(r.Body).Decode(&exampleUser)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Fatalf("failed to decode the request: %v", err)
	}

	err = exampleUser.Write()
	if err != nil {
		log.Fatalf("failed to add user : %v", err)
	}

	w.WriteHeader(http.StatusCreated)
	// marshal the data struct to JSON to send as response
	json.NewEncoder(w).Encode(exampleUser)
}

func CreateEvent(w http.ResponseWriter, r *http.Request) {
	event := &firebase.Event{}
	err := json.NewDecoder(r.Body).Decode(&event)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		log.Warnf("Failed to decode the request: %v", err)
		return
	}
	log.Infof("Creating event with data: %+v", event)
	err = event.Write()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Warnf("Failed to create event with data: %v", err)
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(event)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	// return json
	w.Header().Set("Content-type", "application/json")

	vars := mux.Vars(r)
	if vars["id"] == "" {
		log.Fatal("no document id provided")
	}

	// dummy id
	user := &firebase.User{FirebaseID: vars["id"]}
	err := user.Get()
	if err != nil {
		log.Fatalf("failed to get user : %v", user)
	}

	w.WriteHeader(http.StatusOK)
	// marshal the data struct to JSON to send as response
	json.NewEncoder(w).Encode(user)
}

func GetEvent(w http.ResponseWriter, r *http.Request) {
	// return json
	w.Header().Set("Content-type", "application/json")

	vars := mux.Vars(r)
	if vars["id"] == "" {
		w.WriteHeader(http.StatusBadRequest)
		log.Warnf("No event ID provided")
		return
	}

	event := &firebase.Event{FirebaseID: vars["id"]}
	err := event.Get()
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		log.Warnf("Failed to get event : %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	// marshal the data struct to JSON to send as response
	json.NewEncoder(w).Encode(event)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	if vars["id"] == "" {
		log.Fatal("no document id provided")
	}
	user := &firebase.User{FirebaseID: vars["id"]}
	err := user.Delete()
	if err != nil {
		log.Fatalf("failed to delete user : %v", err)
	}
	w.WriteHeader(http.StatusNoContent)
}

func DeleteEvent(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	if vars["id"] == "" {
		w.WriteHeader(http.StatusBadRequest)
		log.Warnf("No document id provided")
	}
	event := &firebase.Event{FirebaseID: vars["id"]}
	err := event.Delete()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Warnf("Failed to delete event : %v", err)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}


func UpdateUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	if vars["id"] == "" {
		log.Fatal("no document id provided")
	}
	user := firebase.User{FirebaseID: vars["id"]}
	err := json.NewDecoder(r.Body).Decode(&user)
	log.Printf("user is liek this: %+v", user)
	err = user.Update()
	if err != nil {
		log.Fatalf("failed to update user : %v", user)
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}

func UpdateEvent(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	if vars["id"] == "" {
		log.Fatal("No document id provided")
	}
	event := firebase.Event{FirebaseID: vars["id"]}
	err := json.NewDecoder(r.Body).Decode(&event)
	log.Printf("Event to update: %+v", event)
	err = event.Update()
	if err != nil {
		log.Warnf("Failed to update event : %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(event)
}
