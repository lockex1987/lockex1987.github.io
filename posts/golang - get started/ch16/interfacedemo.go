package main

import "fmt"

type Triangle struct {
	width  float64
	height float64
}

type Rectangle struct {
	width  float64
	height float64
}

type Circle struct {
	radius float64
}

func (t Triangle) GetArea() float64 {
	return t.width * t.height / 2
}

func (r Rectangle) GetArea() float64 {
	return r.width * r.height
}

type Area interface {
	GetArea(p []byte) (n int, err error)
}

// ----------------------------------------------

type Human struct {
	name  string
	age   int
	phone string
}

type Student struct {
	Human
	school string
	loan   float32
}

type Employee struct {
	Human
	company string
	salary  float32
}

// Interface Men sẽ được implement bởi Human, Student, Employee
type Men interface {
	SayHi()
	Sing(lyrics string)
}

// Bạn phải implement các phương thức như sau
// nếu không khi gán sẽ bị lỗi compile
func (h Human) SayHi() {
	fmt.Printf("Xin chào, tôi là %s. Bạn có thể gọi tôi theo số điện thoại %s\n", h.name, h.phone)
}

func (h Human) Sing(lyrics string) {
	fmt.Println("La la la la...", lyrics)
}

func (e Employee) SayHi() {
	fmt.Printf("Xin chào, tôi là %s. Tôi làm việc ở %s\n",
		e.name,
		e.company)
}

func main() {
	mike := Student{Human{"Mike", 25, "222-222-XXX"}, "MIT", 0.00}
	paul := Student{Human{"Paul", 25, "222-222-XXX"}, "Harvard", 100}
	sam := Employee{Human{"Sam", 25, "222-222-XXX"}, "Golang Inc.", 1000}
	tom := Employee{Human{"Tom", 25, "222-222-XXX"}, "Things Ltd.", 5000}

	var men Men

	// men có thể chứa Student
	men = mike
	fmt.Println("Đây là Mike, một sinh viên")
	men.SayHi()
	men.Sing("November rain")

	// men cũng có thể chứa Employee
	men = tom
	fmt.Println("Đây là Tom, một nhân viên")
	men.SayHi()
	men.Sing("Bé bé bồng bông")

	arr := [...]Men{
		paul,
		sam,
		mike,
	}
	for _, e := range arr {
		e.SayHi()
	}
}
