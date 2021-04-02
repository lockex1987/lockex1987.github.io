// Plugin của summernote
// Đính kèm file bất kỳ
$.extend($.summernote.plugins, {
    uploadfile: function (context) {
        const self = this;
        const ui = $.summernote.ui;

        const extensions = [
            'mp4', 'mov',
            'jpeg', 'jpg', 'bmp', 'png', 'gif', 'tiff',
            'doc', 'docx', 'xls', 'xlsx', 'pdf'
        ];
        // const editor = context.layoutInfo.editor[0];

        context.memo('button.uploadfile', function () {
            const button = ui.button({
                contents: '<i class="la la-upload"/>',
                tooltip: 'Upload file (' + extensions.join(', ') + ')',
                container: false,
                click: function () {
                    if (self.$input != null) {
                        self.$input.trigger('click');
                    }
                }
            });
            return button.render();
        });

        // You can create elements for plugin
        this.initialize = function () {
            this.$input = $('<input type="file" accept="' + extensions.map(s => '.' + s).join(',') + '" style="display: none;"/>');
            this.$input.appendTo('body');

            this.$input.change(function (e) {
                const files = e.target.files || e.dataTransfer.files;
                if (files.length > 0) {
                    const file = files[0];

                    const fd = new FormData();
                    fd.append('fileUpload', file);

                    // Hiển thị processing
                    /*
                    mApp.block(editor, {
                        overlayColor: '#000000',
                        type: 'loader',
                        state: 'primary',
                        message: 'Đang tải...'
                    });
                    */

                    axios.post('/media/upload-file', fd)
                        .then(function (response) {
                            // Upload thành công
                            // Tạo link
                            context.invoke('editor.createLink', {
                                text: response.data.name,
                                url: '/storage/' + response.data.path,
                                isNewWindow: true
                            });

                            // $(document).trigger(context.options.uploadfile.eventName, [response.data]);

                            // Tắt processing
                            // mApp.unblock(editor);
                        })
                        .catch(function (error) {
                            console.log(error);

                            // Thông báo lỗi
                            // noti.error('Upload tập tin lỗi, vui lòng thử lại sau!');

                            // Tắt processing
                            // mApp.unblock(editor);
                        });
                }
            });
        };

        this.destroy = function () {
            this.$input.remove();
            this.$input = null;
        };
    }
});
