package main

import "fmt"

func main() {
	// Khai báo luôn
	ages1 := map[string]int{
		"alice":   31,
		"charlie": 34,
	}
	for person, age := range ages1 {
		fmt.Println(person, ": ", age)
	}

	// Hoặc phải có hàm make
	ages2 := make(map[string]int)
	ages2["alice"] = 31
	ages2["charlie"] = 34

	delete(ages2, "alice")
}
