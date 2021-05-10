package main

import "fmt"

func fToC(f float64) float64 {
	return (f - 32) * 5 / 9
}

func main() {
	const freezingF = 32.0
	const boilingF = 212.0
	fmt.Printf("%g°F = %g°C\n", freezingF, fToC(freezingF))
	fmt.Printf("%g°F = %g°C\n", boilingF, fToC(boilingF))
}
