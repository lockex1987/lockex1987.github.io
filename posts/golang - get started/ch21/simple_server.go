package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
)

func HelloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World")
}

func main() {
	port := 8080
	http.HandleFunc("/", HelloHandler)
	log.Fatal(http.ListenAndServe(":"+strconv.Itoa(port), nil))
}
