package main

import (
	"fmt"
	"time"
)

func pinger(c chan string) {
	for i := 0; ; i++ {
		// Đẩy dữ liệu vào channel
		c <- "ping"
	}
}

func printer(c chan string) {
	for {
		// Lấy dữ liệu từ channel
		msg := <-c
		fmt.Println(msg)
		time.Sleep(1 * time.Second)
	}
}

func main() {
	// Khởi tạo channel
	c := make(chan string)

	// Chạy goroutine
	go pinger(c)
	go printer(c)

	// Đợi người dùng nhấn Enter
	var input string
	fmt.Scanln(&input)
}
