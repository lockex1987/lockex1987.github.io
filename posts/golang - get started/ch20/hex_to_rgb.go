package main

import (
	"fmt"
	"strings"
)

func hexToRgb(hex string) {
	var r, g, b int
	patterns := "#" + strings.Repeat("%02x", 3)
	_, err := fmt.Sscanf(hex, patterns, &r, &g, &b)
	fmt.Println(hex, err, r, g, b)
}

func main() {
	hexArr := []string{
		"#112233",
		"#123",
		"#000233",
		"#023",
		"invalid",
		"#abcd",
		"#-12",
	}
	for _, hex := range hexArr {
		hexToRgb(hex)
	}
}
