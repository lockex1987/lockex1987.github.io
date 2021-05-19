package main

import (
	"fmt"
	"time"
)

func send1(c1 chan<- string) {
	for {
		c1 <- "from 1"
		time.Sleep(2 * time.Second)
	}
}

func send2(c2 chan<- string) {
	for {
		c2 <- "from 2"
		time.Sleep(3 * time.Second)
	}
}

func receive(c1 <-chan string, c2 <-chan string) {
	for {
		select {
		case msg1 := <-c1:
			fmt.Println(msg1)
		case msg2 := <-c2:
			fmt.Println(msg2)
		}
	}
}

func main() {
	c1 := make(chan string)
	c2 := make(chan string)

	go send1(c1)
	go send2(c2)
	go receive(c1, c2)

	// Chờ người dùng nhấn Enter
	var input string
	fmt.Scanln(&input)
}
