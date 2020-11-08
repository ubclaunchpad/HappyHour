package firebase

import (
	"context"
	log "github.com/sirupsen/logrus"
)

func (u *User) Delete() error {
	log.Infof("Deleting user: %+v", u)
	_, err := Client.Collection("users").Doc(u.FirebaseID).Delete(context.Background())
	return err
}

func (e *Event) Delete() error {
	log.Infof("Deleting user: %+v", e)
	_, err := Client.Collection("events").Doc(e.FirebaseID).Delete(context.Background())
	return err
}
