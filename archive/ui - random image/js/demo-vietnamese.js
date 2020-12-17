function getRandomIndex(n) {
    return Math.floor(Math.random() * n);
}

document.querySelector('#theImage').src = VIETNAMESE_GIRLS[getRandomIndex(VIETNAMESE_GIRLS.length)];
