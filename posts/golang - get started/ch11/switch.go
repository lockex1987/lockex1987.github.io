package main

import (
	"fmt"
	"runtime"
)

func main() {
	os := runtime.GOOS
	switch os {
	case "windows":
		fmt.Println("Windows")
	case "darwin":
		fmt.Println("Mac")
	case "linux":
		fmt.Println("Linux")
	default:
		fmt.Println(os)
	}
}
