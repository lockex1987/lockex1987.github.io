(function () {

    const fileList = [];
    const selectedFiles = document.querySelector('#selectedFiles');

    function handleSubmitForm() {
        document.querySelector('#frm').addEventListener('submit', (evt) => {
            evt.preventDefault();
    
            const formData = new FormData();
            formData.append('name', 'Huyên test');
            fileList.forEach((f) => {
                formData.append('fileList[]', f);
            });
    
            const request = new XMLHttpRequest();
            request.addEventListener('load', function () {
                if (200 <= request.status && request.status < 300) {
                    console.log('Completed');
                    fileList = [];
                    selectedFiles.innerHTML = '';
                }
            });
            request.upload.addEventListener('progress', function (evt) {
                if (evt.lengthComputable) {
                    const percent = evt.loaded * 100 / evt.total;
                    console.log('Percent: ' + percent);
                }
            });
            request.open('POST', 'https://jsonplaceholder.typicode.com/photos'); 
            // request.setRequestHeader('Content-Type', 'multipart/form-data');
            // request.setRequestHeader('X-CSRF-TOKEN', getCsrfToken());
            request.send(formData);
        });
    }

    function handleAddFiles() {
        document.querySelector('#uploadFiles').addEventListener('change', (evt) => {
            const fileInput = evt.target;
            const files = fileInput.files;
    
            for (let i = 0; i < files.length; i++) {
                const f = files[i];
                fileList.push(f);
    
                const div = document.createElement('div');
                div.className = 'd-flex justify-content-between mb-1';
                div.innerHTML = `
                        <span>
							<i class="la la-file"></i>
                            ${f.name}
                        </span>
                        <span class="cursor-pointer text-danger font-weight-bold delete-attachment-icon" title="Xóa" style="margin: 0 10px; cursor: pointer">
                            &times;
                        </span>`;
                selectedFiles.appendChild(div);
            }
			
			fileInput.value = '';
        });
    }

    function handleRemoveFile() {
        document.addEventListener('click', (evt) => {
            const target = evt.target;
            if (target.classList && target.classList.contains('delete-attachment-icon')) {
                const div = target.parentNode;
                let idx = 0;
                let prev = div;
                while ( (prev = prev.previousSibling) != null ) {
                    idx++;
                }
                fileList.splice(idx, 1);
    
                div.parentNode.removeChild(div);
            }
        });
    }

    handleSubmitForm();
    handleAddFiles();
    handleRemoveFile();
})();