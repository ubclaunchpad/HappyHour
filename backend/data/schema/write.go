package schema

import (
	"context"

	log "github.com/sirupsen/logrus"

	"github.com/ubclaunchpad/when3meet/data/clients/firebase"
)

type FirestoreObject interface {
	Write() error
}

func (u User) Write() error {
	// todo: consider logging ref or actual document info here
	log.Infof("writing user to firestore: %+v", u)

	_, _, err := firebase.Client.Collection("users").Add(context.Background(), u)
	return err
}

func (e Event) Write() error {
	log.Infof("writing event to firestore: %+v", e)

	_, _, err := firebase.Client.Collection("events").Add(context.Background(), e)
	return err
}
