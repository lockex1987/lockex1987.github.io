package main

import (
	"log"
	"time"
)

func track() time.Time {
	return time.Now()
}

func duration(msg string, start time.Time) {
	log.Printf("%v: %v\n", msg, time.Since(start))
}

func foo() {
	defer duration("foo", track())
	time.Sleep(3 * time.Second)
	log.Println("Thực hiện xong hàm")
}

func main() {
	foo()
}
