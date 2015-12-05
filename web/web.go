package web

import (
	"net/http"
)

func init() {
	http.HandleFunc("/email", emailHandler)
	http.HandleFunc("/labels", labelsHandler)
	http.HandleFunc("/labels2", labelsHandler)
}

func emailHandler(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "mailto:hi@attardi.org", http.StatusMovedPermanently)
}

func labelsHandler(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "http://steadicat.github.io/labels/", http.StatusMovedPermanently)
}
