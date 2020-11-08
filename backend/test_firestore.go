package main

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
	"github.com/ubclaunchpad/when3meet/data/clients/firebase"
)

func AddData(w http.ResponseWriter, r *http.Request) {
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
		log.Fatalf("failed to add data : %v", err)
	}

	w.WriteHeader(http.StatusOK)
	// marshal the data struct to JSON to send as response
	json.NewEncoder(w).Encode(exampleUser)
}

func GetData(w http.ResponseWriter, r *http.Request) {
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

func DeleteData(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	if vars["id"] == "" {
		log.Fatal("no document id provided")
	}
	user := &firebase.User{FirebaseID: vars["id"]}
	err := user.Delete()
	if err != nil {
		log.Fatalf("failed to delete user : %v", user)
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
