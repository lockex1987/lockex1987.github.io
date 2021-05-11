package main

type Triangle struct {
	width  float64
	height float64
}

type Rectangle struct {
	width  float64
	height float64
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

func main() {

}
