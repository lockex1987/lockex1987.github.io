function demoEscapeHtml() {
    const s = '<b>Xâu</b> bị <i>XSS</i>';
    CommonUtils.$('#demo1').innerHTML = s;
    CommonUtils.$('#demo2').innerHTML = CommonUtils.escapeHtml(s);
}

demoEscapeHtml();

function formatThousandsDemo() {
    console.info(CommonUtils.formatThousands(2665)); // 2,665
    console.info(CommonUtils.formatThousands(102665)); // 102,665
    console.info(CommonUtils.formatThousands(111102665)); // 111,102,665
    console.info(CommonUtils.formatThousands(1240.5)); // 1,240.5
    console.info(CommonUtils.formatThousands(1000240.5)); // 1,000,240.5
    console.info(CommonUtils.formatThousands(1.234567)); // 1.234,567
}

formatThousandsDemo();

function prettifyNumberDemo() {
    console.log(CommonUtils.prettifyNumber(123400, 3)); // 123
    console.log(CommonUtils.prettifyNumber(123, 1)); // 123
    console.log(CommonUtils.prettifyNumber(1234, 1)); // 1.2k
    console.log(CommonUtils.prettifyNumber(100000000, 1)); // 100M
    console.log(CommonUtils.prettifyNumber(299792458, 1)); // 299.8M

    console.log(CommonUtils.prettifyNumber(456)); // 456
    console.log(CommonUtils.prettifyNumber(1002)); // 1k
    console.log(CommonUtils.prettifyNumber(47000123.848393)); // 47M
    console.log(CommonUtils.prettifyNumber(9999999999)); // 10B
    console.log(CommonUtils.prettifyNumber(123123123123123)); // 123T
}

prettifyNumberDemo();

function demoDate() {
    const s1 = '2014-12-23T00:00:00+07:00';
    // const s1 = '27-7-2019';
    // const s1 = '27/7/2019';
    const s2 = CommonUtils.normalizeDate(s1);
    CommonUtils.$('#demo3').textContent = s1 + ' → ' + s2;
}


const demo4 = () => {
    const demoDiv = CommonUtils.$('#demo4');

    // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    console.log(demoDiv.nodeType);
    console.log(Element.prototype);
    console.log(demoDiv.on);

    const btn = CommonUtils.createElement('button', {
        textContent: 'Click me',
        id: 'btn',
        className: 'btn btn-primary mb-3'
    });
    btn.on('click', (evt) => {
        const target = evt.target;
        console.log(target.id);
    }).on('mouseover', (evt) => {
        console.log('Mouse over');
    });

    demoDiv.appendChild(btn);

    for (let i = 0; i < 10; i++) {
        demoDiv.appendChild(CommonUtils.createElement('p', {
            className: 'paragraph',
            id: 'paragraph' + i,
            textContent: 'Đoạn văn ' + i
        }));
    }

    CommonUtils.$$('.paragraph').forEach(p => {
        console.log(p.id);
    });

    const arr = CommonUtils.$$('.paragraph').map(p => p.id);
    console.log(arr);


    demoDiv
        .on('click', (evt) => {
            // evt.stopPropagation();
            console.log('Click demo');
        })
        .delegate('click', '.paragraph', (evt, p) => {
            console.log('Click paragraph ' + p.id);
        });

    CommonUtils.delegateDocument('click', '#demoDiv', (evt, demoDiv) => {
        console.log('Click demo from document');
    });
};

demo4();
