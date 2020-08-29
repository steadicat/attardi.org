package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"strconv"
)

type okResponse struct {
	Ok bool `json:"ok"`
}

type errorResponse struct {
	Ok      bool   `json:"ok"`
	Message string `json:"message"`
}

type updateBody struct {
	Records []recordUpdate `json:"records"`
}

type recordUpdate struct {
	ID     string `json:"id"`
	Fields fields `json:"fields"`
}

type fields struct {
	Address string
	Adults  int
	Kids    int
}

type apiError struct {
	Error struct {
		Type    string `json:"type"`
		Message string `json:"message"`
	} `json:"error"`
}

const apiKey = "*****************"
const base = "appX8ncwIIqYiABo7"
const baseName = "Save the date"

func handleServerError(err error, message string, w http.ResponseWriter) {
	w.WriteHeader(500)
	encoder := json.NewEncoder(w)
	if err := encoder.Encode(errorResponse{Ok: false, Message: "Something went wrong, please email savethedate@jamesandstefano.com"}); err != nil {
		log.Printf("Could not send error response: %v", err)
	} else {
		log.Printf("%s: %v", message, err)
	}
}

func handleBadRequest(err error, message string, w http.ResponseWriter) {
	w.WriteHeader(400)
	encoder := json.NewEncoder(w)
	if err := encoder.Encode(errorResponse{Ok: false, Message: message}); err != nil {
		log.Printf("Could not send error response: %v", err)
	} else {
		log.Printf("%s: %v", message, err)
	}
}

func rsvpHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id := r.PostFormValue("id")
	address := r.PostFormValue("address")
	adults, err := strconv.Atoi(r.PostFormValue("adults"))
	if err != nil {
		handleBadRequest(err, "Invalid number of adults. Please try again.", w)
		return
	}
	kids, err := strconv.Atoi(r.PostFormValue("kids"))
	if err != nil {
		handleBadRequest(err, "Invalid number of kids. Please try again.", w)
		return
	}

	url := fmt.Sprintf(`https://api.airtable.com/v0/%s/%s`, url.PathEscape(base), url.PathEscape(baseName))

	log.Printf("%s %s %s %s", url, address, adults, kids)

	body, err := json.Marshal(updateBody{
		Records: []recordUpdate{
			recordUpdate{
				ID: id,
				Fields: fields{
					Address: address,
					Adults:  adults,
					Kids:    kids,
				},
			},
		},
	})

	log.Println(string(body))

	req, err := http.NewRequest("PATCH", url, bytes.NewBuffer(body))
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", apiKey))
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		handleServerError(err, "Could not create patch request", w)
		return
	}

	client := http.Client{}
	res, err := client.Do(req)
	if err != nil {
		handleServerError(err, "Could not perform patch request", w)
		return
	}

	defer res.Body.Close()

	resBody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		handleServerError(err, "Could not read response body", w)
		return
	}

	log.Println(string(resBody))

	if res.StatusCode != 200 {
		log.Printf("Got non 200 error code: %d", res.StatusCode)
		var apiError apiError
		err := json.Unmarshal(resBody, &apiError)
		if err != nil {
			handleServerError(err, "Could not parse error response body", w)
			return
		}
		w.WriteHeader(400)
		encoder := json.NewEncoder(w)
		if err := encoder.Encode(errorResponse{Ok: false, Message: "Something went wrong, please email savethedate@jamesandstefano.com"}); err != nil {
			log.Printf("Could not send error response: %v", err)
			return
		}
		return
	}

	encoder := json.NewEncoder(w)
	if err := encoder.Encode(okResponse{Ok: true}); err != nil {
		handleServerError(err, "Could not send response body", w)
		return
	}
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	http.HandleFunc("/rsvp", rsvpHandler)

	http.HandleFunc("/save-the-date/main.js", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./main.js")
	})

	fs1 := http.FileServer(http.Dir("./images"))
	http.Handle("/save-the-date/images/", http.StripPrefix("/save-the-date/images/", fs1))

	fs2 := http.FileServer(http.Dir("./save-the-date"))
	http.Handle("/save-the-date/", http.StripPrefix("/save-the-date/", fs2))

	log.Printf("Listening on port %s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
