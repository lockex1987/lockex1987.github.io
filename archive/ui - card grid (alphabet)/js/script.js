let alphabet = [
    "apple",
    "bird",
    "cake",
    "dog",
    "egg",
    "flower",
    "gift",
    "hat",
    "ice-cream",
    "jam",
    "key",
    "lemon",
    "monkey",
    "nuts",
    "orange",
    "pen",
    "question",
    "rose",
    "sock",
    "tree",
    "umbrella",
    "violin",
    "watermelon",
    "xylophone",
    "yacht",
    "zeppelin"
];


let fragment = document.createDocumentFragment();

alphabet.forEach((word, idx) => {
    let letter = word.substring(0, 1);

    let span = _.create({
        tag: 'span',
        className: 'font-fredoka d-block text-center font-size-2',
        textContent: letter.toUpperCase() + letter
    });

    let img = _.create({
        tag: 'img',
        className: 'mx-auto illustration d-block',
        src: 'images/' + word + '.svg'
    });

    let div = _.create({
        tag: 'div',
        className: 'letter m-1 py-2 px-3 bg-color-' + (idx % 10),
        children: [
            span,
            img
        ]
    });

    fragment.appendChild(div);
});

document.querySelector('.alphabet').appendChild(fragment);
