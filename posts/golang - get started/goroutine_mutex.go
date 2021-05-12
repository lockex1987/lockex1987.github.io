package main

import (
	"fmt"
	"sync"
)

var (
	counter int32
	wg      sync.WaitGroup
	mutex   sync.Mutex
)

func increment(lang string) {
	defer wg.Done()

	for i := 0; i < 3; i++ {
		mutex.Lock()
		{
			fmt.Println(lang)
			counter++
		}
		mutex.Unlock()
	}
}

func main() {
	wg.Add(3)

	go increment("Python")
	go increment("Java")
	go increment("Golang")

	wg.Wait()
	fmt.Println(counter)
}
