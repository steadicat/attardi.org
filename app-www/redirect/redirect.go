package redirect

import (
	"fmt"
	"net/http"
)

func init() {
	http.HandleFunc("/", redirect)
}

func redirect(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, fmt.Sprintf("https://attardi.org%s", r.URL.RequestURI()), http.StatusMovedPermanently)
}
