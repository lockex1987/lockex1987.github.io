// Xử lý menu
function myFunction(x) {
    x.classList.toggle('closed');
}

// Khi click vào menu to thì ẩn hiện menu con
document.addEventListener('click', (evt) => {
    let target = evt.target;
    if (target.classList && target.classList.contains('dropdown-btn')) {
        target.classList.toggle('active');
    }
});