package main

import "fmt"

func main() {
	msg := make(chan string, 2)

	msg <- "1"
	msg <- "2"

	fmt.Println(msg)
	fmt.Println(msg)
}
