// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
// https://www.jstips.co/en/javascript/sorting-strings-with-accented-characters/

let arr = [
    'An',
    'Doanh nghiệp',
    'điện than',
    'Da',
    'Z'
];

//arr.sort();
//arr.sort((a, b) => a.localeCompare(b));
//arr.sort((a, b) => a.localeCompare(b, 'vi'));
//arr.sort(Intl.Collator().compare);
arr.sort(Intl.Collator('vi').compare);


console.log(arr);


function removeVietnam(s) {
	let r = s.toLowerCase().replace(/\s+/g, '-');
	let non_asciis = {
		'-': '[`~!@#$%^&*()_|+=?;:",.<>/]',
		'a': '[ảàạảãàáâãäåắặẳằẵấầẩẫậâă]',
		'ae': 'æ',
		'c': 'ç',
		'e': '[èéẹẽẻềệếểễê]',
		'd': '[đ]',
		'i': '[ìíîïị]',
		'n': 'ñ',
		'o': '[òóôõöộồốổỗơởợỡờớôơ]',
		'oe': 'œ',
		'u': '[ùúûűüủụưửựứừữư]',
		'y': '[ýỳỷỵỹ]'
	};
	for (let i in non_asciis) {
		r = r.replace(new RegExp(non_asciis[i], 'gi'), i);
	}
	r = r.replace(/[^\w\s]/gi, '-')
	return r
};

