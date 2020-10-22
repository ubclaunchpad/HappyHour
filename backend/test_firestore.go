package main

import (
	"context"
	"encoding/json"
	log "github.com/sirupsen/logrus"
	"net/http"
	"google.golang.org/api/option"
	"firebase.google.com/go"
)

// example document definition
type Data struct {
	Key string
	Value string
}

func AddData(w http.ResponseWriter, r *http.Request) {
	// return json
	w.Header().Set("Content-type", "application/json")

	// initialize the admin sdk
	sa := option.WithCredentialsFile("./ServiceAccountKey.json")
	app, err := firebase.NewApp(context.Background(),
		nil, sa)

	client, err := app.Firestore(context.Background())
	if err != nil {
		log.Fatal(err)
	}

	defer client.Close()

	// save an example document to firestore
	var data Data

	// unmarshal the JSON in the request to the data struct
	// to access the key-value pairs
	err = json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Fatal("failed to decode the request: %v", err)
	}

	_, _ ,err = client.Collection("test").Add(context.
		Background(), map[string]interface{} {
		"key": data.Key,
		"value": data.Value,
	})
	if err != nil {
		log.Fatal("failed to add data : %v", err)
	}

	w.WriteHeader(http.StatusOK)
	// marshal the data struct to JSON to send as response
	json.NewEncoder(w).Encode(data)
}
