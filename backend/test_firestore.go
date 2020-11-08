package main

import (
	"encoding/json"
	"net/http"

	log "github.com/sirupsen/logrus"
	"github.com/ubclaunchpad/when3meet/data/schema"
)

// example document definition
type Data struct {
	Key   string
	Value string
}

func AddData(w http.ResponseWriter, r *http.Request) {
	// return json
	w.Header().Set("Content-type", "application/json")

	// unmarshal the JSON in the request to the data struct
	// to access the key-value pairs
	exampleUser := schema.User{
		Username: "testUser",
		Email:    "test@gmail.com",
	}

	err := exampleUser.Write()
	if err != nil {
		log.Fatal("failed to add data : %v", err)
	}

	w.WriteHeader(http.StatusOK)
	// marshal the data struct to JSON to send as response
	json.NewEncoder(w).Encode(exampleUser)
}
