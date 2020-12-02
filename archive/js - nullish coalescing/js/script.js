const arr = [
	false,
	null,
	undefined,
	NaN,
	0,
	'',
	'Messi'
];

arr.forEach(e => {
	console.log(e, e || 'Ronaldo CR7', e ?? 'Ronaldo CR7');
});
