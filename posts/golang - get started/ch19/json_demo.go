package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	Id   int
	Name string
	Job  string
	// Tên trường mà bắt đầu bằng chữ thường
	// sẽ không hiển thị ở JSON output
	desc string
}

func outputJson() {
	u1 := User{1, "John Doe", "gardener", "Sẽ không hiển thị ở JSON"}
	data, _ := json.Marshal(u1)
	fmt.Println(string(data))
}

func parseJson() {
	s := `{
        "Id" : 1,
        "Name": "John Doe",
        "Job": "gardener"
    }`
	data := []byte(s)
	var u2 User
	json.Unmarshal(data, &u2)
	fmt.Println(u2.Name, u2.Job)
}

func main() {
	outputJson()
	parseJson()
}
