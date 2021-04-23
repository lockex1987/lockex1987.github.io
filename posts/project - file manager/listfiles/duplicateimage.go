package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

// Tên các thuộc tính phải là kiểu CamelCase
type PathAndHash struct {
	Path string
	Hash string
}

func isTextFile(path string) bool {
	file, _ := os.Open(path)
	defer file.Close()

	buff := make([]byte, 512)
	file.Read(buff)
	file.Seek(0, 0)
	filetype := http.DetectContentType(buff)
	fmt.Println(filetype)
	return false
}

func main() {
	folderPath := "D:/htdocs/lockex1987.github.io/posts/"
	f, _ := os.Open(folderPath)
	files, _ := f.Readdir(-1)
	f.Close()
	for _, file := range files {
		fmt.Println(file.Name(), file.IsDir(), file.Size())
	}
	data, _ := json.Marshal(files)
	fmt.Println(data) // 34.2355ms

}
