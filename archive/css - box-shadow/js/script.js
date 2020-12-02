const options = [
    'none',
    '0 1px 2px rgba(34, 25, 25, 0.4)',
    '10px 10px black',
    '50px 50px black',
    '50px 50px 5px black',
    '50px 50px 10px black',
    '50px 50px 20px black',
    '50px 50px 50px black',
    '50px 50px 50px 5px black',
    '50px 50px 50px 10px black',
    '50px 50px 50px 20px black',
    '50px 50px 50px 20px red',
    '50px 50px 50px 20px blue',
    '50px 50px 50px 20px pink',
    '40px 40px 50px 20px pink',
    '20px 20px 50px 20px pink',
    '10px 10px 50px 20px pink inset',
    '10px 10px 30px 20px pink inset',
    '10px 10px 5px 20px pink inset',
    '10px 10px 5px 10px pink inset',
    '10px 10px 5px 5px pink inset',
    'initial'
];

function bindOptions() {
    let optionList = $('#optionList');

    options.forEach(s => {
        optionList.appendChild(_.create({
            tag: 'div',
            className: 'radio',
            children: [
                _.create({
                    tag: 'label',
                    children: [
                        _.create({
                            tag: 'input',
                            type: 'radio',
                            name: 'options',
                            value: s
                        }),
                        document.createTextNode(' ' + s)
                    ]
                })
            ]
        }));
    });

    optionList.delegate('click', 'input', (evt, input) => {
        updateBoxShadow(input.value);
    });
}

function updateBoxShadow(val) {
    $('#resultDiv').style.boxShadow = val;
}

bindOptions();
