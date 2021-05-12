package main

import (
	"fmt"
	"sync"
	"time"
)

func getRemoteResource(idx int, wg *sync.WaitGroup, nums chan int) {
	// Chờ cho đến khi hàm thực hiện xong thì đánh dấu là Done
	defer wg.Done()

	time.Sleep(3 * time.Second)
	fmt.Println("Finish goroutine", idx)

	// Gửi giá trị đến unbuffered channel
	nums <- idx
}

func main() {
	// Khai báo một unbuffered channel
	nums := make(chan int)

	var wg sync.WaitGroup

	// Thêm 2 goroutine
	wg.Add(1)

	go getRemoteResource(1, &wg, nums)
	// go getRemoteResource(2, &wg, nums)

	// Read the value from unbuffered channel
	fmt.Println(<-nums)

	// Chờ cho các goroutine thực thi xong
	wg.Wait()

	// Đóng channel
	close(nums)
}
