package main

import "fmt"

func main() {
	x := 1
	p := &x // p, of type *int, points to x
	fmt.Println(p)
	fmt.Println(*p) // "1"
	*p = 2          // equivalent to x = 2
	fmt.Println(x)  // "2"
}
