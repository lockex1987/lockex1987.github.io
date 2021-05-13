package rti

func RomanToInt(s string) int {
	characterMap := map[byte]int{
		'I': 1,
		'V': 5,
		'X': 10,
		'L': 50,
		'C': 100,
		'D': 500,
		'M': 1000,
	}

	length := len(s)

	if length == 0 {
		return 0
	}

	if length == 1 {
		return characterMap[s[0]]
	}

	sum := characterMap[s[length-1]]
	for i := length - 2; i >= 0; i-- {
		left := characterMap[s[i]]
		right := characterMap[s[i+1]]
		if left < right {
			sum -= left
		} else {
			sum += left
		}
	}
	return sum
}
