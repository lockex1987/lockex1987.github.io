package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano())
	num := 5 + rand.Intn(10)
	var desc string
	if num > 0 {
		desc = "positive"
	} else if num == 0 {
		desc = "zero"
	} else {
		desc = "negative"
	}
	fmt.Println("The number", num, "is", desc)
}
