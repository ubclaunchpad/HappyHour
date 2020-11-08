package firebase

import (
	"context"
)

func (u *User) Get() error {
	// get document ref
	userDoc := Client.Collection("users").Doc(u.FirebaseID)

	// get document snapshot
	snapshot, err := userDoc.Get(context.Background())
	if err != nil {
		return err
	}

	// unmarshal to own user struct
	return snapshot.DataTo(&u)
}

func (e *Event) Get() error {
	// get document ref
	userDoc := Client.Collection("users").Doc(e.FirebaseID)

	// get document snapshot
	snapshot, err := userDoc.Get(context.Background())
	if err != nil {
		return err
	}

	// unmarshal to own event struct
	return snapshot.DataTo(&e)
}
