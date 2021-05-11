package main

import (
	"fmt"
	"io/ioutil"
	"log"
)

func main() {
	s := "Nguyễn Anh Tuấn"
	data := []byte(s)
	filename := "data.txt"
	// perm := 0644
	err := ioutil.WriteFile(filename, data, 0644)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Done")
}
