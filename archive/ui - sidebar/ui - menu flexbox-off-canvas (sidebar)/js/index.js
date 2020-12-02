document.addEventListener('click', (evt) => {
    let target = evt.target;
    if (target.classList && target.classList.contains('menu-button')) {
        let wrapper = document.querySelector('.wrapper');
        wrapper.classList.toggle('openned');
    }
});