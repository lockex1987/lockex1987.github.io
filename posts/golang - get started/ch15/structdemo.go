package main

import (
	"fmt"
	"strconv"
	"time"
)

type Employee struct {
	ID        int
	Name      string
	Address   string
	DoB       time.Time
	Position  string
	Salary    int
	ManagerID int
}

// TODO: Viết hoa chữ đầu
func (e Employee) getInfo() string {
	return "ID: " + strconv.Itoa(e.ID) + ", Name: " + e.Name
}

func main() {
	dilbert := Employee{
		ID:   1,
		Name: "Dilbert",
	}
	dilbert.Salary = 5000
	fmt.Println(dilbert.getInfo())
}
