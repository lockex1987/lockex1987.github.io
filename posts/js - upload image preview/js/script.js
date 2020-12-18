function showImagePreview(fileInput) {

    // Cách 1: Sử dụng FileReader
    const cach1 = (file, img) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
            img.src = evt.target.result;
        }
        reader.readAsDataURL(file);
    };

    // Cách 2: Sử dụng ObjectURL
    const cach2 = (file, img) => {
        img.src = URL.createObjectURL(file);
    };

    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const img = document.querySelector('.upload-file-preview img');
        cach1(file, img);
        // cach2(file, img);
    }
}

function init() {
    document.querySelector('#uploadFile').addEventListener('change', function () {
        showImagePreview(this);
    });
}

init();
