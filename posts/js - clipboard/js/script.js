function renderImage(imageBlob) {
    var img = new Image();
    var URLApi = window.URL || window.webkitURL;
    img.src = URLApi.createObjectURL(imageBlob);
    document.getElementById('gallery').appendChild(img);
}

window.addEventListener('paste', (evt) => {
    let clipboardData = evt.clipboardData; // evt.originalEvent.clipboardData
    if (clipboardData) {
        let items = clipboardData.items;
        if (items) {
            /// items thường có độ dài là 2, với type khác nhau
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                console.log(item);

                // Skip content if not image
                if (item.type.indexOf('image') == -1) {
                    continue;
                }

                // Retrieve image on clipboard as blob
                let blob = item.getAsFile();
                renderImage(blob);
            }
        }
    }
});