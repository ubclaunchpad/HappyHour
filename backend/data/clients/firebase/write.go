package firebase

import (
	"context"
	"errors"

	log "github.com/sirupsen/logrus"
)

func (u *User) Write() error {
	// todo: consider logging ref or actual document info here
	log.Infof("writing user to firestore: %+v", u)
	// check if user with provided email already exists
	ref, err := Client.Collection("users").Doc(u.Email).Get(context.Background())
	if ref.Exists() {
		log.Warnf("A user with this email already exists")
		return errors.New("A user with this email already exists")
	}

	// create a user with document ID set to email - this overwrites the document!
	_, err = Client.Collection("users").Doc(u.Email).Set(context.Background(),u)
	u.FirebaseID = u.Email
	return err
}

func (e *Event) Write() error {
	// todo: consider logging ref or actual document info here
	log.Infof("writing event to firestore: %+v", e)

	ref, _, err := Client.Collection("events").Add(context.Background(), e)
	e.FirebaseID = ref.ID

	return err
}
