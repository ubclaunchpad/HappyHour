package firebase

import (
	"context"

	log "github.com/sirupsen/logrus"
)

func (u *User) Write() error {
	// todo: consider logging ref or actual document info here
	log.Infof("writing user to firestore: %+v", u)

	ref, _, err := Client.Collection("users").Add(context.Background(), u)
	u.FirebaseID = ref.ID

	return err
}

func (e *Event) Write() error {
	// todo: consider logging ref or actual document info here
	log.Infof("writing event to firestore: %+v", e)

	ref, _, err := Client.Collection("events").Add(context.Background(), e)
	e.FirebaseID = ref.ID

	return err
}
