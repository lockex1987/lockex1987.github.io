function checkImageType(imagePath) {
    fetch(imagePath)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                console.log(imagePath)
                var arrayBufferView = new Uint8Array(buffer)
                checkFileTypeFromBuffer(arrayBufferView)
                createImageFromBuffer(arrayBufferView)
            })
}

function checkFileTypeFromBuffer(arrayBufferView) {
    var obj = fileType(arrayBufferView)
    console.log(obj)
}

function createImageFromBuffer(arrayBufferView) {
    // Tạo đối tượng img và thêm vào bài viết
    var blob = new Blob([ arrayBufferView ]) // , { type: "image/jpeg" }
    var img = document.createElement('img')
    img.src = window.URL.createObjectURL(blob)
    document.querySelector("#demo2").appendChild(img)
}

checkImageType('images/unicorn.png')
checkImageType('images/unicorn.jpg')