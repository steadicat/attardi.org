package web

import (
	"net/http"
)

func init() {
	http.HandleFunc("/email", emailHandler)
}

func emailHandler(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "mailto:hi@attardi.org", http.StatusMovedPermanently)
}
