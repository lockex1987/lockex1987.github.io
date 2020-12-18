document.querySelector('#markAsReadButton').addEventListener('click', function (evt) {
    evt.stopPropagation();

    document.querySelectorAll('#userNotifications .unread').forEach(div => {
        div.classList.remove('unread');
        div.classList.remove('bg-light');
    });

    console.log('Cập nhật DB trên server');
});
