$('#sortable1').sortable();

$('#sortable2, #sortable3').sortable({
    connectWith: '.connectedSortable'
});

$('#sortable4').sortable();

$('#sortable5').sortable({
    placeholder: 'bg-warning border'
});

$('#sortable6, #sortable8').sortable({
    connectWith: 'ul'
});

$('#sortable7').sortable({
    connectWith: 'ul',
    dropOnEmpty: false
});

$('.column').sortable({
    connectWith: '.column',
    handle: '.portlet-header',
    cancel: '.portlet-toggle',
    placeholder: 'portlet-placeholder ui-corner-all'
});

$('.portlet')
    .addClass('ui-widget ui-widget-content ui-helper-clearfix ui-corner-all')
    .find('.portlet-header')
    .addClass('ui-widget-header ui-corner-all')
    .prepend('<span class="ui-icon ui-icon-minusthick portlet-toggle"></span>');

$('.portlet-toggle').on('click', function () {
    var icon = $(this);
    icon.toggleClass('ui-icon-minusthick ui-icon-plusthick');
    icon.closest('.portlet').find('.portlet-content').toggle();
});


$('#sortableTable tbody').sortable({
    handle: '.handle',
    // Chỉ di chuyển theo chiều dọc, không di chuyển theo chiều ngang
    // axis: 'y',
    // Chuyển cursor khi đang kéo
    cursor: 'move',
    // ?
    placeholder: 'sortable-placeholder',
    // Giữ nguyên chiều rộng các ô khi đang kéo
    helper: function (evt, trTag) {
        const tdTags = trTag.children();
        const newTrTag = trTag.clone();
        newTrTag.children().each(function (idx) {
            // Thiết lập chiều rộng từng ô bằng kích thước ban đầu
            // Chiều rộng tính cả border và padding
            const width = tdTags.eq(idx).outerWidth();
            $(this).width(width);
        });
        return newTrTag;
    }
});
