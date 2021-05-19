package rti

import (
	"fmt"
	"testing"
)

// You have to initialize the project before you can run test:
// go test
func TestRomanToInt(t *testing.T) {
	data := map[string]int{
		"III":     3,
		"IV":      4,
		"IX":      9,
		"LVIII":   58,
		"MCMXCIV": 1994,
	}
	for k, v := range data {
		i := RomanToInt(k)
		fmt.Println(k, i)
		if i != v {

			t.Errorf("got %d, want %d", i, v)
		}
	}
}
