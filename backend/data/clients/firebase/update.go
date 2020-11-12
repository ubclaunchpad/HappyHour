package firebase

import (
	"context"
	log "github.com/sirupsen/logrus"
)

func (u *User) Update() error {
	log.Infof("updating user in firestore: %+v", u)
	id := u.FirebaseID
	_, err := Client.Collection("users").Doc(id).Set(context.Background(),u)
	return err
}

func (e *Event) Update() error {
	log.Infof("updating event in firestore: %+v", e)
	id := e.FirebaseID
	_, err := Client.Collection("users").Doc(id).Set(context.Background(),e)
	return err
}
