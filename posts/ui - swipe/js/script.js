
let mySwipe = initSwipe(document.querySelector('.my-swipe'));

document.querySelector('#btnPrevious').addEventListener('click', () => {
    mySwipe.gotoPrevious();
});

document.querySelector('#btnNext').addEventListener('click', () => {
    mySwipe.gotoNext();
});

document.querySelector('#btnGo').addEventListener('click', () => {
    mySwipe.gotoItem(parseInt(document.querySelector('#itemInput').value));
});

let node = document.createElement('div');
node.innerHTML = '<img src="https://images.unsplash.com/photo-1503843778847-2b8bdce2ed3d?ixlib=rb-0.3.5&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;ixid=eyJhcHBfaWQiOjE0NTg5fQ&amp;s=d547781176ce182eeeb7303bac05abf4" />';
mySwipe.addItem(node);
