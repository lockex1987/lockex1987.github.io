const container = document.querySelector('#treeContainer');
const tree = container.querySelector('.tree');


/**
 * Khi cuộn chuột giữa thì zoom biểu đồ.
 */
function processZoom() {
    let currentScale = 1;

    container.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        const delta = 0.1 * (Math.max(-1, Math.min(1, evt.deltaY)));
        currentScale -= delta;
        const MIN_SCALE = 0.5;
        const MAX_SCALE = 5;
        currentScale = Math.max(MIN_SCALE, currentScale);
        currentScale = Math.min(MAX_SCALE, currentScale);
        tree.style.transform = `scale(${currentScale})`;
    });
}

processZoom();


/**
 * Lấy tọa độ của chuột.
 * @param {Event} evt Đối tượng Event
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


/**
 * Build mã HTML của cây.
 */
function startBuildHtml() {
    // Bắt đầu từ cuộc hôn nhân gốc
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

/**
 * Mã HTML để hiển thị của một người nào đó.
 * @param {Object} personCode Mã người
 */
function buildHtmlStructure(personCode) {
    const person = personMap[personCode];
    const marry = marriages.find(m => m.couple.includes(personCode));
    // console.log(person.code, marry);
    if (marry) {
        // Nếu người đó đã kết hôn thì xử lý cuộc hôn nhân
        const p1 = person;
        const p2 = personMap[marry.couple[1] != personCode ? marry.couple[1] : marry.couple[0]];
        return processMarry(p1, p2, marry);
    } else {
        // Xử lý một người độc thân
        return processSinglePerson(person);
    }
}

/**
 * Mã HTML để hiển thị của một người độc thân.
 * @param {Object} person Đối tượng người
 */
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

/**
 * Xử lý cuộc hôn nhân
 * @param {Object} p1 Người phối ngẫu thứ nhất
 * @param {Object} p2 Người phối ngẫu thứ hai
 * @param {Object} marry Cuộc hôn nhân
 */
function processMarry(p1, p2, marry) {
    const liTag = CommonUtils.create({
        tag: 'li',
        children: [
            // Người thứ nhất
            CommonUtils.create({
                tag: 'span',
                textContent: p1.fullName,
                className: 'person ' + p1.gender + ' p-' + p1.code,
                id: 'person-' + p1.code
            }),
            // Người thứ hai
            CommonUtils.create({
                tag: 'span',
                textContent: p2.fullName,
                className: 'person ' + p2.gender + ' p-' + p2.code,
                id: 'person-' + p2.code
            }),
            // Danh sách con
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
