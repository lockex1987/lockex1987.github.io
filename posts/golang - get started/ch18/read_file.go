package main

import (
	"fmt"
	"io/ioutil"
)

func main() {
	data, _ := ioutil.ReadFile("data.txt")
	s := string(data)
	fmt.Println(data)
	fmt.Println(s)
}
