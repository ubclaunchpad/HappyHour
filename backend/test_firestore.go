package main

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
	"github.com/ubclaunchpad/when3meet/data/clients/firebase"
)

func CreateUser(w http.ResponseWriter, r *http.Request) {
	// return json
	w.Header().Set("Content-type", "application/json")

	// unmarshal the JSON in the request to the data struct
	// to access the key-value pairs
	var user firebase.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		log.Warnf("Failed to decode the request: %v", err)
		http.Error(w,"Failed to decode the provided user",http.StatusBadRequest)
		return
	}

	log.Infof("Creating user with data: %+v", user)
	err = user.Write()
	if err != nil {
		log.Warnf("Failed to add user : %v", err)
		http.Error(w, "Something went wrong creating the user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	// marshal the data struct to JSON to send as response
	json.NewEncoder(w).Encode(user)
}

func CreateEvent(w http.ResponseWriter, r *http.Request) {
	event := &firebase.Event{}
	err := json.NewDecoder(r.Body).Decode(&event)
	if err != nil {
		log.Warnf("Failed to decode the request: %v", err)
		http.Error(w,"Failed to decode the provided event", http.StatusBadRequest)
		return
	}
	log.Infof("Creating event with data: %+v", event)
	err = event.Write()
	if err != nil {
		log.Warnf("Failed to create event with data: %v", err)
		http.Error(w,"Something went wrong creating the event", http.StatusInternalServerError)
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
		log.Warn("No document id provided")
		http.Error(w,"No ID provided",http.StatusBadRequest)
		return
	}

	// dummy id
	user := &firebase.User{FirebaseID: vars["id"]}
	err := user.Get()
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		log.Warnf("Failed to get event : %v", err)
		http.Error(w,"Could not find user with the given id",http.StatusNotFound)
		return
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
		log.Warn("No document id provided")
		http.Error(w,"No ID provided",http.StatusBadRequest)
		return
	}

	event := &firebase.Event{FirebaseID: vars["id"]}
	err := event.Get()
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		log.Warnf("Failed to get event : %v", err)
		http.Error(w, "Could not find an event with the given ID", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	// marshal the data struct to JSON to send as response
	json.NewEncoder(w).Encode(event)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	if vars["id"] == "" {
		log.Warnf("No document id provided")
		http.Error(w,"No ID provided",http.StatusBadRequest)
		return
	}
	user := &firebase.User{FirebaseID: vars["id"]}
	err := user.Delete()
	if err != nil {
		log.Warnf("Failed to delete user : %v", err)
		http.Error(w,"Something went wrong deleting this user",http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func DeleteEvent(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	if vars["id"] == "" {
		log.Warnf("No document id provided")
		http.Error(w,"No ID provided",http.StatusBadRequest)
		return
	}
	event := &firebase.Event{FirebaseID: vars["id"]}
	err := event.Delete()
	if err != nil {
		log.Warnf("Failed to delete event : %v", err)
		http.Error(w,"Something went wrong deleting this event",http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}


func UpdateUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	if vars["id"] == "" {
		log.Warnf("No document id provided")
		http.Error(w,"No ID provided",http.StatusBadRequest)
		return
	}
	user := firebase.User{FirebaseID: vars["id"]}
	err := json.NewDecoder(r.Body).Decode(&user)
	log.Infof("Updating user with data: %+v", user)
	err = user.Update()
	if err != nil {
		log.Warnf("Failed to update user : %v", err)
		http.Error(w,"Something went wrong updating this event",http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}

func UpdateEvent(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	if vars["id"] == "" {
		log.Warnf("No document id provided")
		http.Error(w,"No ID provided",http.StatusBadRequest)
		return
	}
	event := firebase.Event{FirebaseID: vars["id"]}
	err := json.NewDecoder(r.Body).Decode(&event)
	log.Infof("Updating event with data: %+v", event)
	err = event.Update()
	if err != nil {
		log.Warnf("Failed to update event : %v", err)
		http.Error(w,"Something went wrong updating this event",http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(event)
}
