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

	// serve on port 8080
	log.Info("server started on 8080")
	http.ListenAndServe(":8080", r)
}

func HelloWorldHandler(w http.ResponseWriter, r *http.Request) {
	// return Hello World!
	log.Info("request received")
	w.Write([]byte("Hello World!\n"))
}
