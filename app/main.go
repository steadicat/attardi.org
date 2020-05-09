package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/email", emailHandler)
	http.HandleFunc("/labels", labelsHandler)
	http.HandleFunc("/labels2", labelsHandler)
	http.HandleFunc("/labels/", labelsHandler)
	http.HandleFunc("/labels2/", labelsHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	log.Printf("Listening on port %s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}

func emailHandler(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "mailto:hi@attardi.org", http.StatusMovedPermanently)
}

func labelsHandler(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "http://steadicat.github.io/labels/", http.StatusMovedPermanently)
}
