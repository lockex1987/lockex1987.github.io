package main

import "fmt"

// Khai báo []int (không để kích thước) sẽ bị lỗi
func printArray(a [3]int) {
	for _, v := range a {
		fmt.Println(v)
	}
}

func main() {
	var a1 [3]int = [3]int{1, 2, 3}

	// Sử dụng dấu ba chấm thì không cần chỉ định độ dài
	a2 := [...]int{
		1,
		2,
		3, // phải có dấu phảy ở cuối khi khai báo trên nhiều dòng
	}
	printArray(a1)
	printArray(a2)
}
