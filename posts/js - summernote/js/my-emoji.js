function createEmojiPlugin(folder, noOfFiles, extention) {
    const pluginName = folder + 'Emoji';

    $.extend($.summernote.plugins, {
        [pluginName]: function (context) {
            const self = this;
            const ui = $.summernote.ui;

            // Nút ở toolbar
            context.memo('button.' + pluginName, function () {
                return ui.buttonGroup({
                    children: [
                        ui.button({
                            className: 'dropdown-toggle',
                            // contents: '<i class="la la-smile-o"></i>',
                            contents: '<img src="images/emoji/' + folder + '/001.' + extention + '" style="height: 1.5rem" />',
                            tooltip: folder + ' emoji',
                            data: {
                                toggle: 'dropdown'
                            },
                            click: function () {
                                // Lưu vị trí con trỏ vì vị trí này sẽ bị mất khi dropdown được mở
                                context.invoke('editor.saveRange');
                            }
                        }),
                        ui.dropdown({
                            items: '<div class="my-emoji-list custom-scrollbar"></div>',
                            callback: function ($dropdown) {
                                console.log($dropdown);
                                self.$list = $('.my-emoji-list', $dropdown);
                            }
                        })
                    ]
                }).render();
            });

            // Khởi tạo
            self.initialize = function () {
                for (let i = 1; i <= noOfFiles; i++) {
                    const url = 'images/emoji/' + folder + '/' + i.toString().padStart(3, '0') + '.' + extention;

                    const img = document.createElement('img');
                    img.className = 'my-emoji-button';
                    img.src = url;
                    img.addEventListener('click', (evt) => {
                        evt.preventDefault();
                        context.invoke(pluginName + '.insertEmoji', url);
                    });

                    self.$list.append(img);
                }
            };

            // Thêm ảnh emoji
            self.insertEmoji = function (url) {
                const img = new Image();
                img.src = url;
                img.className = 'my-emoji-inline';

                // Trả về vị trí con trỏ, focus vào editor, thêm ảnh
                context.invoke('editor.restoreRange');
                context.invoke('editor.focus');
                context.invoke('editor.insertNode', img);
            };
        }
    });
}

createEmojiPlugin('meo', 105, 'png');
createEmojiPlugin('meogif', 69, 'gif');
createEmojiPlugin('tho', 69, 'gif');
createEmojiPlugin('voz', 50, 'png');
