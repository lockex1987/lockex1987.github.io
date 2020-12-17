$('#content').summernote({
    minHeight: 300,
    maxHeight: null, // Tự động điều chỉnh độ dài theo nội dung
    placeholder: 'Hello bootstrap 4',
    lang: 'vi-VN', // Tiếng Việt

    // Không kéo thả ảnh
    disableDragAndDrop: true,

    toolbar: [
        // ['style', ['style']],
        ['font', ['bold', 'italic', 'underline', 'clear']],
        // ['fontname', ['fontname']],
        // ['fontsize', ['fontsize']],
        // ['color', ['color']],
        // ['para', ['ul', 'ol', 'paragraph']],
        // ['height', ['height']],
        // ['table', ['table']],
        ['insert', ['link' /*, 'picture', 'video', 'hr'*/]],
        // ['view', ['fullscreen', 'codeview' /*, 'help'*/]],
    ],

    callbacks: {
        onPasteX: function (evt) {
            // Chèn văn bản, bỏ qua các format
            evt.preventDefault();
            const originalHtmlCode = ((evt.originalEvent || evt).clipboardData || window.clipboardData).getData('text/html');
            // console.log(originalHtmlCode);

            const parser = new DOMParser();
            const doc = parser.parseFromString(originalHtmlCode, 'text/html');

            const attributes = [
                'style',
                'class',
                'id',
                // 'name',
                'ng-if',
                'ng-click',
                'ng-non-bindable',
                'spellcheck',
                'border',
                'cellpadding',
                'cellspacing',
                'data-lazy-type',
                'data-lazy-src',
                'data-lazy-srcset',
                'data-lazy-sizes',
                'data-file',
                'data-filename',
                // 'rel',
                'height',
                'width',
                'alt',
                'scope',
                'srcset'
            ];

            attributes.forEach(attr => {
                doc.querySelectorAll(`[${attr}]`).forEach(ele => ele.removeAttribute(attr));
            });

            let cleanedHtmlCode = doc.body.innerHTML;
            cleanedHtmlCode = cleanedHtmlCode.replace(/&nbsp;/gi, ' ');
            // cleanedHtmlCode = cleanedHtmlCode.replace(/<!--StartFragment-->/gi, '');
            // cleanedHtmlCode = cleanedHtmlCode.replace(/<!--EndFragment-->/gi, '');

            $('#content').summernote('pasteHTML', cleanedHtmlCode);
        },

        /**
         * Paste text bình thường (không ảnh, không định dạng).
         */
        onPaste: function (evt) {
            evt.preventDefault();
            const bufferText = ((evt.originalEvent || evt).clipboardData || window.clipboardData).getData('text');
            document.execCommand('insertText', false, bufferText);
        },

        /**
         * Khi thay đổi thì kiểm tra độ dài lớn nhất.
         * @param contents 
         * @param $editable 
         */
        onChange: function (contents, $editable) {
            const text = $editable[0].innerText;
            // console.log('onChange:', contents, $editable);
            // console.log('onChange:', text);
        },

        onImageUploadx: function (files) {
            // Upload ảnh lên server
            const data = new FormData();
            data.append('image', files[0]);

            $.ajax({
                url: '/media/upload-image',
                cache: false,
                contentType: false,
                processData: false,
                data: data,
                type: 'post',
                success: function (response) {
                    // Tạo thẻ img và thêm vào editor
                    const url = '/storage/' + response.path;
                    const image = $('<img class="preview-image">').attr('src', url).addClass('img-responsive');
                    $('#content').summernote('insertNode', image[0]);
                }
            });
        }
    }
});


/**
 * Thiết lập mã HTML.
 */
function setCode() {
    const markupStr = '<p>hello world</p>';
    $('#content').summernote('code', markupStr);
}


/**
 * Lấy mã HTML.
 */
function getCode() {
    const markupStr = $('#content').summernote('code');
    alert(markupStr);
}
