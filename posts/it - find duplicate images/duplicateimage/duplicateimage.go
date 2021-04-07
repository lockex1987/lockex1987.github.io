package main

import (
	"encoding/json"
	"fmt"
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"github.com/corona10/goimagehash"
)

// Tên các thuộc tính phải là kiểu CamelCase
type PathAndHash struct {
	Path string
	Hash string
}

type PathHashDuplicate struct {
	Path         string
	Hash         *goimagehash.ImageHash
	IsDuplicated bool
}

func ScanImagesInFolder(folderPath string) []string {
	startTime := time.Now()
	var images []string
	filepath.Walk(folderPath, func(path string, info os.FileInfo, err error) error {
		extension := filepath.Ext(path)
		if !info.IsDir() && (extension == ".jpg" || extension == ".jpeg" || extension == ".png" || extension == ".gif") {
			images = append(images, path)
		}
		return nil
	})
	elapsed := time.Since(startTime)
	fmt.Println("Tìm thấy", len(images), "ảnh trong", elapsed) // 34.2355ms
	return images
}

func CalculateHashOfImage(path string) string {
	file, _ := os.Open(path)
	defer file.Close()

	buff := make([]byte, 512) // why 512 bytes? see http://golang.org/pkg/net/http/#DetectContentType
	file.Read(buff)
	file.Seek(0, 0)
	filetype := http.DetectContentType(buff)

	var img image.Image
	switch filetype {
	case "image/jpeg", "image/jpg":
		img, _ = jpeg.Decode(file)
	case "image/gif":
		img, _ = gif.Decode(file)
	case "image/png":
		img, _ = png.Decode(file)
	}

	// hash, _ := goimagehash.AverageHash(img)
	hash, _ := goimagehash.DifferenceHash(img)
	return hash.ToString()
}

// Biến toàn cục
var hashes []PathAndHash
var numberOfImages int

/**
 * Sử dụng Go goroutine cho nhanh.
 */
func CalculateHash(images []string, goroutineIndex int, goroutineNumber int, wg *sync.WaitGroup) {
	defer wg.Done()

	for i, path := range images {
		if i%goroutineNumber == goroutineIndex {
			hash := CalculateHashOfImage(path)
			fmt.Println(numberOfImages, hash)
			numberOfImages--
			obj := PathAndHash{
				path,
				hash,
			}
			hashes = append(hashes, obj)
		}
	}
}

func FindDuplicateImages() {
	startTime := time.Now()

	data, _ := ioutil.ReadFile("../data/hashes-go.json")
	var hashes []PathAndHash
	json.Unmarshal(data, &hashes)

	var arr []PathHashDuplicate
	for _, e := range hashes {
		hash, _ := goimagehash.ImageHashFromString(e.Hash)
		obj := PathHashDuplicate{
			strings.ReplaceAll(e.Path, "\\", "/"),
			hash,
			false,
		}
		arr = append(arr, obj)
	}

	duplicateMap := make(map[string][]string)
	count := len(arr)
	for idx1 := 0; idx1 < count-1; idx1++ {
		for idx2 := idx1 + 1; idx2 < count; idx2++ {
			// Chú ý phải thiết lập con trỏ ở đây
			// nếu không sẽ không cập nhật IsDuplicated được
			obj1 := &arr[idx1]
			obj2 := &arr[idx2]
			if !obj2.IsDuplicated {
				distance, _ := obj1.Hash.Distance(obj2.Hash)
				// fmt.Printf("Distance between images: %v\n", distance)
				threshold := 2
				if distance <= threshold {
					// Đánh dấu để không xét lại nữa
					obj2.IsDuplicated = true
					path1 := obj1.Path
					path2 := obj2.Path
					previousValue := duplicateMap[path1]
					duplicateMap[path1] = append(previousValue, path2)
				}
			} else {
				// fmt.Printf("Vào đây")
			}
		}
	}

	var duplicateList [][]string
	for key, value := range duplicateMap {
		var arr []string
		arr = append(arr, key)
		for _, s := range value {
			arr = append(arr, s)
		}
		duplicateList = append(duplicateList, arr)
	}

	data, _ = json.Marshal(duplicateList)
	ioutil.WriteFile("../data/duplicates.json", data, 0777)

	elapsed := time.Since(startTime)
	fmt.Println("Tìm các ảnh trùng trong", elapsed) // 25.5646ms
}

func CalculateHashConcurrently(images []string) {
	numberOfImages = len(images)
	startTime := time.Now()
	goroutineNumber := 4 // bằng số core của máy
	var wg sync.WaitGroup
	for i := 0; i < goroutineNumber; i++ {
		fmt.Println(i)
		wg.Add(1)
		go CalculateHash(images, i, goroutineNumber, &wg)
	}
	wg.Wait()
	data, _ := json.Marshal(hashes)
	ioutil.WriteFile("../data/hashes-go.json", data, 0777)
	elapsed := time.Since(startTime)
	// Không dùng goroutine hết 5m22.0392643s, 5m20.4359442s, 5m55.8138841s
	// Dùng 4 goroutine hết 2m9.8319182s
	// Dùng 10 goroutine hết 1m53.8043867s
	// Dùng 8 goroutine hết 2m3.3053772s
	fmt.Println("Tính toán hash của ảnh trong", elapsed)
}

func main() {
	/*
		folderPath := "D:/archive/last comani/dragon ball color"
		images := ScanImagesInFolder(folderPath)
		CalculateHashConcurrently(images)
	*/
	FindDuplicateImages()
}
