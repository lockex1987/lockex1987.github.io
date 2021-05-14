[...document.querySelectorAll('.placeholder')].forEach(paragraph => {
    paragraph.innerHTML = paragraph.textContent
        .split(' ')
        .map(text => `<span class="placeholder__word">${text}</span>`)
        .join(' ');
});
