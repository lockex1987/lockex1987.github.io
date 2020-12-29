const ALPHABET = [
    'apple',
    'bird',
    'cake',
    'dog',
    'egg',
    'flower',
    'gift',
    'hat',
    'ice-cream',
    'jam',
    'key',
    'lemon',
    'monkey',
    'nuts',
    'orange',
    'pen',
    'question',
    'rose',
    'sock',
    'tree',
    'umbrella',
    'violin',
    'watermelon',
    'xylophone',
    'yacht',
    'zeppelin'
];


const fragment = document.createDocumentFragment();

ALPHABET.forEach((word, idx) => {
    const letter = word.substring(0, 1);

    const span = CommonUtils.createElement(
        'span',
        {
            className: 'font-fredoka d-block text-center font-size-2',
            textContent: letter.toUpperCase() + letter
        }
    );
    const img = CommonUtils.createElement(
        'img',
        {
            className: 'mx-auto illustration d-block',
            src: 'images/' + word + '.svg'
        }
    );
    const div = CommonUtils.createElement(
        'div',
        {
            className: 'letter m-1 py-2 px-3 bg-color-' + (idx % 10)
        },
        [
            span,
            img
        ]
    );
    fragment.appendChild(div);
});

document.querySelector('.alphabet').appendChild(fragment);
