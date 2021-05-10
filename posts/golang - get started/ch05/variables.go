package main

import "fmt"

func main() {
	// Khai báo, sau đó gán giá trị
	var s1 string
	s1 = "s1"

	// Vừa khai báo vừa khởi tạo
	var s2 string = "s2"

	// Có thể bỏ qua kiểu dữ liệu
	var s3 = "s3"

	// Có thể bỏ qua từ khóa var
	s4 := "s4"

	// Lần sau gán lại giá trị cho biến, chúng ta chỉ sử dụng =, không sử dụng :=
	s4 = "s4 updated"

	fmt.Println(s1)
	fmt.Println(s2)
	fmt.Println(s3)
	fmt.Println(s4)
}
