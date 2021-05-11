package main

import "fmt"

func rangeArray() {
	numbers := []int{0, 1, 2, 3, 4, 5, 6, 7, 8}
	for i, e := range numbers {
		fmt.Println("Slice item", i, "is", e)
	}
}

func rangeMap() {
	countryCapitalMap := map[string]string{
		"France": "Paris",
		"Italy":  "Rome",
		"Japan":  "Tokyo",
	}
	for country, capital := range countryCapitalMap {
		fmt.Println("Capital of", country, "is", capital)
	}
}

func rangeString() {
	s := "Tuấn"
	for _, c := range s {
		fmt.Println(c)
		fmt.Printf("%c\n", c)
	}
}

func rangeChannel() {
	ch := make(chan int)
	go func() {
		ch <- 5
		ch <- 6
		ch <- 7
		close(ch)
	}()
	for n := range ch {
		fmt.Println(n)
	}
}

func main() {
	rangeArray()
	rangeMap()
	rangeString()
	rangeChannel()
}
