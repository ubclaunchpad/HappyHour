package firebase

import (
	"context"
)

func (u *User) Get() error {
	// get document ref
	id := u.FirebaseID
	userDoc := Client.Collection("users").Doc(id)

	// get document snapshot
	snapshot, err := userDoc.Get(context.Background())
	if err != nil {
		return err
	}

	// unmarshal to own user struct
	err = snapshot.DataTo(&u)
	u.FirebaseID = id
	return err
}

func (e *Event) Get() error {
	// get document ref
	id := e.FirebaseID
	userDoc := Client.Collection("users").Doc(id)

	// get document snapshot
	snapshot, err := userDoc.Get(context.Background())
	if err != nil {
		return err
	}

	// unmarshal to own event struct
	err = snapshot.DataTo(&e)
	e.FirebaseID = id
	return err
}
