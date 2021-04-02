import './uploadfile.js';
import './my-emoji.js';


function HelloButton(context) {
    const ui = $.summernote.ui;

    // create button
    const button = ui.button({
        contents: '<i class="la la-child"/> Hello',
        tooltip: 'hello',
        click: function () {
            // invoke insertText method with 'hello' on editor module.
            // context là undefined ở version 0.8.12
            context.invoke('editor.insertText', 'hello');
        }
    });

    // return button as jquery object
    return button.render();
}


$.ajax({
    url: 'https://api.github.com/emojis',
    async: false
}).then(function (data) {
    window.emojis = Object.keys(data);
    window.emojiUrls = data;
});


export default {
    template: '<textarea></textarea>',

    props: {
        value: {
            // type: String,
            default: ''
        },

        placeholder: {
            // type: String,
            default: 'Nhập nội dung'
        }
    },

    data() {
        return {
            // Không dùng
            isChanging: false
        };
    },

    mounted() {
        this.init();
    },

    watch: {
        value() {
            // Nếu thiết lập lại ở đây thì sẽ bị gọi nhiều lần
            // if (!this.isChanging) {
                this.isChanging = true;
                // $(this.$el).summernote('code', this.value);
                this.isChanging = false;
            // }
        }
    },

    methods: {
        init() {
            const vm = this;

            $(this.$el).summernote({
                // airMode: true,

                // for summernote in modal
                dialogsInBody: true,
                minHeight: 300,
                maxHeight: null, // Tự động điều chỉnh độ dài theo nội dung

                placeholder: this.placeholder,
                lang: 'vi-VN', // Tiếng Việt
                // Không kéo thả ảnh
                disableDragAndDrop: true,

                toolbar: [
                    ['style', ['bold', 'italic', 'underline', 'clear']],
                    // ['font', ['strikethrough', 'superscript', 'subscript']],
                    // ['fontname', ['fontname']],
                    ['fontsize', ['fontsize']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    // ['height', ['height']],
                    // ['table', ['table']],
                    ['insert', ['link', 'picture', 'video']],
                    ['view', ['fullscreen', 'codeview', 'help']],
                    ['mybutton', ['hello', 'uploadfile', 'meoEmoji', 'meogifEmoji', 'thoEmoji', 'vozEmoji']]
                ],

                buttons: {
                    hello: HelloButton
                },

                callbacks: {
                    /**
                     * Khi thay đổi thì kiểm tra độ dài lớn nhất.
                     * @param contents
                     * @param $editable
                     */
                    onChange: function (contents, $editable) {
                        // const text = $editable[0].innerText;
                        // console.log('onChange:', contents, $editable);
                        // console.log('onChange:', text);

                        // vm.$emit('input', contents);
                        // vm.$emit('change');
                        const code = contents;
                        // const code = $(vm.el).summernote('code');
                        // const code = vm.$el.value; // bị mất ký tự cuối

                        // if (!vm.isChanging) {
                            vm.isChanging = true;
                            vm.$emit('input', code);
                            vm.$nextTick(() => {
                                vm.isChanging = false;
                            });
                        // }
                    },

                    /**
                     * Paste dạng HTML, giữ định dạng và ảnh.
                     * Khi bạn nhấn chuột phải và copy ảnh ở một trang web và paste vào editor
                     * thì sẽ bị duplicate thành 2 ảnh.
                     * @param {*} evt Đối tượng Event
                     */
                    onPasteX: function (evt) {
                        evt.stopPropagation();

                        // Chèn văn bản, bỏ qua các format
                        evt.preventDefault();

                        /*
                        const buffer = evt.originalEvent.clipboardData;
                        const items = buffer.items;
                        // evt.preventDefault();
                        console.log(items);

                        items.forEach(v => {
                            console.log(v);
                            if (v.type.indexOf("image") != -1) {
                                const blob = v.getAsFile();
                                // uploadImageFile(blob, insertImg);
                            };
                        });
                        return;
                        */

                        const originalHtmlCode = ((evt.originalEvent || evt).clipboardData || window.clipboardData).getData('text/html');
                        console.log(originalHtmlCode);

                        // Copy trực tiếp file
                        if (!originalHtmlCode) {
                            return;
                        }

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
                        cleanedHtmlCode = cleanedHtmlCode.replace(/<!--StartFragment-->/gi, '');
                        cleanedHtmlCode = cleanedHtmlCode.replace(/<!--EndFragment-->/gi, '');
                        console.log(cleanedHtmlCode);

                        $('#content').summernote('pasteHTML', cleanedHtmlCode);
                    },

                    /**
                     * Paste text bình thường (không ảnh, không định dạng).
                     */
                    onPasteY: function (evt) {
                        evt.preventDefault();
                        const bufferText = ((evt.originalEvent || evt).clipboardData || window.clipboardData).getData('text');
                        document.execCommand('insertText', false, bufferText);
                    },

                    onPaste: function (e) {
                        const bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                        $(vm.$el).summernote('insertText', bufferText);

                        e.preventDefault();
                    },

                    onImageUpload: function (files) {
                        // upload image to server and create imgNode...
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
                                // Thêm thẻ img
                                const url = '/storage/' + response.path;
                                const image = $('<img class="preview-image">').attr('src', url).addClass('img-responsive');
                                $(vm.$el).summernote('insertNode', image[0]);
                            },
                            error: function (data) {
                            }
                        });
                    },

                    onImageUploadX: function (files) {
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
                },

                hint1: {
                    words: ['spring', 'summer', 'autumn', 'winter'],
                    match: /\b(\w{1,})$/,
                    search: function (keyword, callback) {
                        callback($.grep(this.words, function (item) {
                            return item.indexOf(keyword) === 0;
                        }));
                    }
                },

                hint2: {
                    match: /:([-+\w]+)$/,
                    search: function (keyword, callback) {
                        callback($.grep(emojis, function (item) {
                            return item.indexOf(keyword) === 0;
                        }));
                    },
                    template: function (item) {
                        const content = emojiUrls[item];
                        return '<img src="' + content + '" width="20" /> :' + item + ':';
                    },
                    content: function (item) {
                        const url = emojiUrls[item];
                        if (url) {
                            return $('<img />').attr('src', url).css('width', 20)[0];
                        }
                        return '';
                    }
                },

                hint: {
                    mentions: ['Peter Paker', 'Tony Stark', 'Bruce Banner', 'Thor', 'Steve Roger'],
                    match: /\B@(\w*)$/,
                    search: function (keyword, callback) {
                        callback($.grep(this.mentions, function (item) {
                            return item.indexOf(keyword) == 0;
                        }));
                    },
                    content: function (item) {
                        return '@' + item;
                    }
                }
            });
        },

        getCode() {
            const code = $(this.$el).summernote('code');
            return code;
        },

        setCode(code) {
            $(this.$el).summernote('code', code);
        }
    }
};
