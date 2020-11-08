package main

import (
	"encoding/json"
	"net/http"

	log "github.com/sirupsen/logrus"
	"github.com/ubclaunchpad/when3meet/data/clients/firebase"
)

// example document definition
type Data struct {
	Key   string
	Value string
}

func AddData(w http.ResponseWriter, r *http.Request) {
	// return json
	w.Header().Set("Content-type", "application/json")

	// dummy data
	exampleUser := &firebase.User{
		Username: "yoink",
		Email:    "yeet@yeet.com",
	}

	err := exampleUser.Write()
	if err != nil {
		log.Fatal("failed to add data : %v", err)
	}

	w.WriteHeader(http.StatusOK)
	// marshal the data struct to JSON to send as response
	json.NewEncoder(w).Encode(exampleUser)
}

func GetData(w http.ResponseWriter, r *http.Request) {
	// return json
	w.Header().Set("Content-type", "application/json")

	// dummy id
	user := &firebase.User{FirebaseID: "HcaULSAvFPTRNvKqj1Hy"}
	err := user.Get()
	if err != nil {
		log.Fatal("failed to get user : %v", user)
	}

	w.WriteHeader(http.StatusOK)
	// marshal the data struct to JSON to send as response
	json.NewEncoder(w).Encode(user)
}
