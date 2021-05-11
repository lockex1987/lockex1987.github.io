package main

import (
	"fmt"
	"log"
	"net/http"
)

type Person struct {
	Name string
	Age  int
}

func ServeHTTP(w http.ResponseWriter, r *http.Request) {
	/*
		// Declare a new Person struct.
		var p Person

		// Try to decode the request body into the struct. If there is an error,
		// respond to the client with the error message and a 400 status code.
		err := json.NewDecoder(r.Body).Decode(&p)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
	*/

	var status int
	var data string
	switch r.Method {

	case "GET":
		status = http.StatusOK
		data = `{"message": "get called"}`
	case "POST":
		status = http.StatusCreated
		data = `{"message": "post called"}`
	case "PUT":
		status = http.StatusAccepted
		data = `{"message": "put called"}`
	case "DELETE":
		status = http.StatusOK
		data = `{"message": "delete called"}`
	default:
		status = http.StatusNotFound
		data = `{"message": "not found"}`
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	fmt.Fprintf(w, data)
	// json.NewEncoder(w).Encode(object)
}

func main() {
	http.HandleFunc("/", ServeHTTP)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
