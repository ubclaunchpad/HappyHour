package firebase

import (
	"context"

	log "github.com/sirupsen/logrus"
)

func (u User) Write() error {
	// todo: consider logging ref or actual document info here
	log.Infof("writing user to firestore: %+v", u)

	_, _, err := Client.Collection("users").Add(context.Background(), u)
	return err
}

func (e Event) Write() error {
	// todo: consider logging ref or actual document info here
	log.Infof("writing event to firestore: %+v", e)

	_, _, err := Client.Collection("events").Add(context.Background(), e)
	return err
}
