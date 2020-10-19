package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"google.golang.org/api/option"
	"firebase.google.com/go"
)

type Data struct {
	Key string
	Value string
}

func AddData(w http.ResponseWriter, r *http.Request) {
	// return json
	w.Header().Set("Content-type", "application/json")

	//initialize the admin sdk
	sa := option.WithCredentialsFile("." +
		"/ServiceAccountKey.json")
	app, err := firebase.NewApp(context.Background(),
		nil, sa)

	client, err := app.Firestore(context.Background())
	if err != nil {
		log.Fatalln(err)
	}

	defer client.Close()

	//save random data to firestore -- TODO!
	var data Data
	err = json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Fatalln("failed to decode the request: %v", err)
	}

	_, _ ,err = client.Collection("test").Add(context.
		Background(), map[string]interface{} {
		"key": data.Key,
		"value": data.Value,
	})
	if err != nil {
		log.Fatalln("failed to add data : %v", err)
	}

	log.Println("request body: %v", data)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(data)
}
