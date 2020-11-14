package firebase

import (
	"context"

	"cloud.google.com/go/firestore"
	log "github.com/sirupsen/logrus"
	"github.com/ubclaunchpad/when3meet/data/schema"

	firebase "firebase.google.com/go"

	"google.golang.org/api/option"
)

// module type wrapper around schemas
type User schema.User
type Event schema.Event

// App is the firebase app struct, will be initialized on module import
var App *firebase.App

// Client is the Firestore client through which we make read/write requests
var Client *firestore.Client
var opt option.ClientOption

// initializes package level App struct from credentials
func init() {
	opt = option.WithCredentialsFile("./ServiceAccountKey.json")

	var err error
	// todo: update context to make more sense
	App, err = firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		log.Fatalf("error initializing firebase app: %v", err)
		log.Info("you most likely forgot to add the ServiceAccountKey.json to root")
	}

	// todo: update context to make more sense
	Client, err = App.Firestore(context.Background())
	if err != nil {
		log.Fatalf("error initializing firestore client: %v", err)
	}
}
