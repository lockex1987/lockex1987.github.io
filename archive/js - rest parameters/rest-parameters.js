function demo(p1, p2, ...others) {
	console.log(p1);
	console.log(p2);
	if (others) {
		others.forEach(e => console.log(e));
	}

	// Iterator for...of de duyet mang
	// Iterator for...in de duyet doi tuong
	for (let e of others) {
		console.log(e);
	}
}

demo("Facebook", "Google", "Zalo", "Apple", "LinkedIn");