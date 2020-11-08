package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/calendar/v3"
)

// example to use the functions in api.go

//retrieve a token, save the token, return the generated client
func getClient(config *oauth2.Config) *http.Client {
	tokFile := "token.json"
	tok, err := tokenFromFile(tokFile)
	if err != nil {
		tok = getTokenFromWeb(config)
		saveToken(tokFile, tok)
	}
	return config.Client(context.Background(), tok)
}

//request a token, return the retrieved token
func getTokenFromWeb(config *oauth2.Config) *oauth2.Token {
	authURL := config.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	fmt.Printf("go to %v and type your authorization code!\n", authURL)

	var authCode string
	if _, err := fmt.Scan(&authCode); err != nil {
		log.Fatalf("unable to read authorization code: %v", err)
	}

	tok, err := config.Exchange(context.TODO(), authCode)
	if err != nil {
		log.Fatalf("unable to retrieve token from web: %v", err)
	}
	return tok
}

//retrieve a token from a local file
func tokenFromFile(file string) (*oauth2.Token, error) {
	f, err := os.Open(file)
	defer f.Close()
	if err != nil {
		return nil, err
	}
	tok := &oauth2.Token{}
	err = json.NewDecoder(f).Decode(tok)
	return tok, err
}

//save a token to a file
func saveToken(path string, token *oauth2.Token) {
	fmt.Printf("saving credential file to: %s\n", path)
	f, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
	defer f.Close()
	if err != nil {
		log.Fatalf("Unable to cache OAuth token: %v", err)
	}
	json.NewEncoder(f).Encode(token)
}

func main() {
	f, err := ioutil.ReadFile("credentials.json")
	if err != nil {
		log.Fatalf("unable to read client secret file: %v", err)
	}

	//get read & write permission
	config, err := google.ConfigFromJSON(f, calendar.CalendarScope)
	if err != nil {
		log.Fatalf("unable to parse client secret file to config: %v", err)
	}
	client := getClient(config)

	srv, err := calendar.New(client)
	if err != nil {
		log.Fatalf("unable to retrieve calendar client: %v", err)
	}

	//get list of events
	events, err := GetEvents(srv)
	if err != nil {
		log.Fatalf("unable to retrieve user's events: %v", err)
	}
	for _, event := range events {
		fmt.Println(event)
	}

	//create a new event
	event, err := CreateEvent(srv, Event{
		Summary: "new event",
		Description: "join this event!",
		StartTime: "2020-11-08T13:00:00-08:00",
		EndTime: "2020-11-08T15:00:00-08:00",
		Attendees: []string{
			"gokcebackup@gmail.com"},
	})
	if err != nil {
		log.Fatalf("unable to create an event: %v", err)
	}
	fmt.Println(event)
}