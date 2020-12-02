const uploads = []
const fileSelector = document.getElementById('file-selector')

fileSelector.addEventListener('change', (event) => {
	console.time('FileOpen');
	const file = event.target.files[0]
	const filereader = new FileReader()
	filereader.onloadend = function(evt) {
		if (evt.target.readyState === FileReader.DONE) {
			const uint = new Uint8Array(evt.target.result)
			
			// Sử dụng thư viện file-type
			//console.log('Sử dụng thư viện file-type', fileType(uint))

			let bytes = []
			uint.forEach((byte) => {
				bytes.push(byte.toString(16))
			})
			const hex = bytes.join('').toUpperCase()
			uploads.push({
				filename: file.name,
				filetype: file.type ? file.type : 'Unknown/Extension missing',
				binaryFileType: getMimetype(hex),
				hex: hex
			})
			render()
		}
		console.timeEnd('FileOpen');
	}
	const blob = file.slice(0, 4);
	filereader.readAsArrayBuffer(blob);

	//filereader.readAsArrayBuffer(file);
})

const render = () => {
	const uploadedFiles = uploads.map((file) => {
		return `
			<div>
				<strong>${file.filename}</strong>
				<br>
				Filetype from file object: ${file.filetype}
				<br>
				Filetype from binary: ${file.binaryFileType}
				<br>
				Hex: <em>${file.hex}</em>
			</div>`
	})
	const container = document.getElementById('files')
	container.innerHTML = uploadedFiles.join('')
}

const getMimetype = (signature) => {
	switch (signature) {
		case '89504E47':
			return 'image/png'
		case '47494638':
			return 'image/gif'
		case '25504446':
			return 'application/pdf'
		case 'FFD8FFDB':
		case 'FFD8FFE0':
		case 'FFD8FFE1':
			return 'image/jpeg'
		case '504B0304':
			return 'application/zip'
		default:
			return 'Unknown filetype'
	}
}
