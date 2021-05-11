package main

import "fmt"

func printSlice(a []int) {
	for _, v := range a {
		fmt.Println(v)
	}
}

func main() {
	var a1 []int = []int{1, 2, 3}

	// Sử dụng dấu ba chấm thì không cần chỉ định độ dài
	a2 := []int{
		1,
		2,
		3, // phải có dấu phảy ở cuối khi khai báo trên nhiều dòng
	}
	printSlice(a1)
	printSlice(a2)

	var runes []rune
	for _, r := range "Hello, BF" {
		runes = append(runes, r)
	}
	fmt.Printf("%q\n", runes) // "['H'' e'' l'' l'' o'' ,'''' B'' F']"
}
