package main

import (
	"net/http"

	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
)

func main() {
	// new mux router
	r := mux.NewRouter()
	r.HandleFunc("/", HelloWorldHandler)
	http.Handle("/", r)

	// test route to add data to firestore
	r.HandleFunc("/users", CreateUser).Methods("POST")
	r.HandleFunc("/users/{id}", GetUser).Methods("GET")
	r.HandleFunc("/users/{id}", DeleteUser).Methods("DELETE")
	r.HandleFunc("/users/{id}", UpdateUser).Methods("PATCH")

	//Event endpoints
	r.HandleFunc("/events", CreateEvent).Methods("POST")
	r.HandleFunc("/events/{id}", GetEvent).Methods("GET")
	r.HandleFunc("/events/{id}", DeleteEvent).Methods("DELETE")
	r.HandleFunc("/events/{id}", UpdateEvent).Methods("PATCH")

	// serve on port 8080
	log.Info("server started on 8080")
	err := http.ListenAndServe(":8080", r)
	if err != nil {
		log.Fatalf("failed to start server: %s", err.Error())
	}
}

func HelloWorldHandler(w http.ResponseWriter, r *http.Request) {
	// return Hello World!
	log.Info("request received")
	w.Write([]byte("Hello World!\n"))
}
