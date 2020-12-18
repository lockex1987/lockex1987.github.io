const container = document.querySelector('#treeContainer');
const tree = container.querySelector('.tree');


function processZoom() {
    let currentScale = 1;

    container.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        const delta = 0.1 * (Math.max(-1, Math.min(1, evt.deltaY)));
        currentScale -= delta;
        currentScale = Math.max(0.5, currentScale);
        currentScale = Math.min(5, currentScale);
        tree.style.transform = `scale(${currentScale})`;
    });
}

processZoom();


/**
 * Lấy tọa độ của chuột.
 * @param {Event} evt 
 */
function getMouseCoordinates(evt) {
    return {
        x: evt.pageX,
        y: evt.pageY
    };
}

/**
 * Drag để thay đổi vị trí.
 */
function dragPosition() {

    // Đánh dấu có đang drag hay không
    let dragLock = false;

    // Phần tử DOM
    let element = null;

    // Vị trí tương đối của chuột so với phần tử đang được drag
    let originalX;
    let originalY;
    let originalLeft;
    let originalTop;

    tree.addEventListener('mousedown', (evt) => {
        // console.log(evt.target);
        // if (tree.contains(evt.target)) {}
        element = container;

        const { x, y } = getMouseCoordinates(evt);
        originalX = x;
        originalY = y;
        originalLeft = element.scrollLeft;
        originalTop = element.scrollTop;

        // Đánh dấu drag
        dragLock = true;
    });

    document.addEventListener('mousemove', (evt) => {
        // Nếu là đang drag thì thay đổi vị trí của phần tử
        if (dragLock) {
            const { x, y } = getMouseCoordinates(evt);
            element.scrollLeft = originalLeft + (originalX - x);
            element.scrollTop = originalTop + (originalY - y);
        }
    });

    document.addEventListener('mouseup', () => {
        // Bỏ đánh dấu drag
        dragLock = false;
    });
}

dragPosition();

function startBuildHtml() {
    const marry = marriages[0];
    const p1 = personMap[marry.couple[0]];
    const p2 = personMap[marry.couple[1]];

    const ulTag = CommonUtils.create({
        tag: 'ul',
        children: [
            processMarry(p1, p2, marry)
        ]
    });

    tree.appendChild(ulTag);
}

function buildHtmlStructure(personCode) {
    const person = personMap[personCode];
    const marry = marriages.find(m => m.couple.includes(personCode));
    // console.log(person.code, marry);
    if (marry) {
        const p1 = person;
        const p2 = personMap[marry.couple[1] != personCode ? marry.couple[1] : marry.couple[0]];
        return processMarry(p1, p2, marry);
    } else {
        return processSinglePerson(person);
    }
}

function processSinglePerson(person) {
    const liTag = CommonUtils.create({
        tag: 'li',
        children: [
            CommonUtils.create({
                tag: 'span',
                textContent: person.fullName,
                className: 'person ' + person.gender + ' p-' + person.code,
                id: 'person-' + person.code
            })
        ]
    });
    return liTag;
}

function processMarry(p1, p2, marry) {
    const liTag = CommonUtils.create({
        tag: 'li',
        children: [
            CommonUtils.create({
                tag: 'span',
                textContent: p1.fullName,
                className: 'person ' + p1.gender + ' p-' + p1.code,
                id: 'person-' + p1.code
            }),
            CommonUtils.create({
                tag: 'span',
                textContent: p2.fullName,
                className: 'person ' + p2.gender + ' p-' + p2.code,
                id: 'person-' + p2.code
            }),
            CommonUtils.create({
                tag: 'ul',
                children: [
                    ...marry.children.map(childCode => buildHtmlStructure(childCode))
                ]
            })
        ]
    });
    return liTag;
}

startBuildHtml();
