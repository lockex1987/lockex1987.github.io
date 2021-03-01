/*
Make resizable div by Hung Nguyen

https://medium.com/the-z/making-a-resizable-div-in-js-is-not-easy-as-you-think-bda19a1bc53d
https://lockex1987.github.io/posts/ui%20-%20resizable%20div%201%20direction/resize.htm
https://lockex1987.github.io/posts/ui%20-%20resizable%20div%208%20direction/genresize.htm
*/
function makeResizableDiv(divCssSelector) {
    const element = document.querySelector(divCssSelector);
    const resizers = document.querySelectorAll(divCssSelector + ' .resizer');
    const minimumSize = 20;

    let originalWidth = 0;
    let originalHeight = 0;
    let originalX = 0;
    let originalY = 0;
    let originalMouseX = 0;
    let originalMouseY = 0;

    for (let i = 0; i < resizers.length; i++) {
        const currentResizer = resizers[i];

        currentResizer.addEventListener('mousedown', (evt) => {
            evt.preventDefault();

            originalWidth = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
            originalHeight = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
            originalX = element.getBoundingClientRect().left;
            originalY = element.getBoundingClientRect().top;
            originalMouseX = evt.pageX;
            originalMouseY = evt.pageY;

            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        });

        function resize(evt) {
            if (currentResizer.classList.contains('bottom-right')) {
                const width = originalWidth + (evt.pageX - originalMouseX);
                const height = originalHeight + (evt.pageY - originalMouseY);
                if (width > minimumSize) {
                    element.style.width = width + 'px';
                }
                if (height > minimumSize) {
                    element.style.height = height + 'px';
                }
            } else if (currentResizer.classList.contains('bottom-left')) {
                const height = originalHeight + (evt.pageY - originalMouseY);
                const width = originalWidth - (evt.pageX - originalMouseX);
                if (height > minimumSize) {
                    element.style.height = height + 'px';
                }
                if (width > minimumSize) {
                    element.style.width = width + 'px';
                    element.style.left = originalX + (evt.pageX - originalMouseX) + 'px';
                }
            } else if (currentResizer.classList.contains('top-right')) {
                const width = originalWidth + (evt.pageX - originalMouseX);
                const height = originalHeight - (evt.pageY - originalMouseY);
                if (width > minimumSize) {
                    element.style.width = width + 'px';
                }
                if (height > minimumSize) {
                    element.style.height = height + 'px';
                    element.style.top = originalY + (evt.pageY - originalMouseY) + 'px';
                }
            } else {
                const width = originalWidth - (evt.pageX - originalMouseX);
                const height = originalHeight - (evt.pageY - originalMouseY);
                if (width > minimumSize) {
                    element.style.width = width + 'px';
                    element.style.left = originalX + (evt.pageX - originalMouseX) + 'px';
                }
                if (height > minimumSize) {
                    element.style.height = height + 'px';
                    element.style.top = originalY + (evt.pageY - originalMouseY) + 'px';
                }
            }
        }

        function stopResize() {
            window.removeEventListener('mousemove', resize);
        }
    }
}

makeResizableDiv('.resizable');
