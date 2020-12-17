function loadLink(link, idx) {
    fetch(link)
        .then(res => res.text())
        .then(response => {
            $('.content').html(response);
        });
}

$('.chapter-list a').on('click', function(event) {
    event.preventDefault();
    var link = this.href;
    //console.log(link);
    loadLink(link);
    $('#listScreen').hide();
    $('#contentScreen').show();
});
