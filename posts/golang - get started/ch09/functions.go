package main

import (
	"fmt"
	"math/rand"
	"time"
)

func fToC(f float64) float64 {
	return (f - 32) * 5 / 9
}

/**
 * Hàm có thể trả về nhiều giá trị
 */
func threeRandom() (int, int, int) {
	rand.Seed(time.Now().UnixNano())
	x := rand.Intn(10)
	y := rand.Intn(10)
	z := rand.Intn(10)
	return x, y, z
}

func main() {
	const freezingF = 32.0
	const boilingF = 212.0
	fmt.Printf("%g°F = %g°C\n", freezingF, fToC(freezingF))
	fmt.Printf("%g°F = %g°C\n", boilingF, fToC(boilingF))

	r1, r2, r3 := threeRandom()
	fmt.Println(r1, r2, r3)
}
