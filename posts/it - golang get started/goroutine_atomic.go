package main

import (
	"fmt"
	"runtime"
	"sync"
	"sync/atomic"
)

var (
	counter int32
	wg      sync.WaitGroup
)

func increment(name string) {
	defer wg.Done()

	for range name {
		// Đảm bảo chỉ một goutine có thể thực hiện
		// tại một thời điểm
		atomic.AddInt32(&counter, 1)

		// counter++

		// Yield the thread and be placed back in queue
		runtime.Gosched()
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
