/**
 * Lấy danh sách các node liền kề của 1 người (danh sách mã những người quan hệ trực tiếp).
 * Đó là: bố, mẹ, vợ/chồng, anh/chị/em, con
 * @param {Object} person Đối tượng người
 */
function getAdjacentNodes(person) {
    return Object.keys(person.relTo);
}

/**
 * Tìm kiếm Breadth First Search, tìm đường đi ngắn nhất giữa 2 đỉnh trong đồ thị không có trọng số.
 * @param {Map} personMap Map người
 * @param {String} startCode Mã đỉnh bắt đầu
 * @param {String} finishCode Mã đỉnh kết thúc
 * @return Trả về mảng các mã đỉnh từ đỉnh bắt đầu đến đỉnh kết thúc
 */
function breadthFirstSearch(personMap, startCode, finishCode) {
    // Hàng đợi các đỉnh để từ đó thăm tiếp các đỉnh khác
    const queueToExplore = [];

    // Đánh dấu các đỉnh đã thăm
    // Ban đầu đánh dấu các đỉnh là chưa thăm
    const visited = {};

    // Lưu thêm biến pred lưu đỉnh liền trước,
    // để về sau còn truy dấu đường đi
    const pred = {};

    // Đã đến đỉnh đích hay chưa
    let isFinish = false;

    // Thăm đỉnh bắt đầu (startCode)
    queueToExplore.push(startCode);
    visited[startCode] = true;

    // Đi thăm tiếp các đỉnh khác
    while (queueToExplore.length > 0 && !isFinish) {
        // Lấy ra đỉnh "cũ nhất" ra khỏi queue
        var currentCode = queueToExplore.shift();

        // Lấy ra danh sách các đỉnh liền kề
        const adjList = getAdjacentNodes(personMap[currentCode]);

        // Xét tất cả các đỉnh kề
        adjList.forEach(function (childIndex) {
            // Nếu đỉnh kề này chưa được thăm
            if (!visited[childIndex]) {
                // Đánh dấu và đẩy vào queue
                queueToExplore.push(childIndex);
                visited[childIndex] = true;

                // Ghi lại đỉnh nodeIndex và liền trước của đỉnh childIndex
                pred[childIndex] = currentCode;

                // Dừng lại nếu đã tìm thấy đỉnh đích
                if (childIndex == finishCode) {
                    isFinish = true;
                }
            }
        });
    }

    if (!isFinish) {
        // Không tìm thấy đường
        return [];
    } else {
        // Trả lại đường đi
        return constructPath(pred, finishCode);
    }
}

/**
 * Xây dựng lại đường đi của thuật toán Breadth First Search.
 * @param {Map} pred Mảng đỉnh liền trước (để truy ngược đường đi)
 * @param {String} dest Mã đỉnh kết thúc
 */
function constructPath(pred, dest) {
    const path = [];
    path.push(dest);

    let idx = dest;
    while (pred[idx] != undefined) {
        path.push(pred[idx]);
        idx = pred[idx];
    }

    return path.reverse();
}

/**
 * Tính toán quan hệ giữa 2 người.
 * Người startCode là gì với người finishCode.
 * @param {String} startCode Mã người 1
 * @param {String} finishCode Mã người 2
 */
function calculateRelation(startCode, finishCode) {
    const path = breadthFirstSearch(personMap, startCode, finishCode);
    const optimalPath = path.reverse();

    let currentTrackCode = optimalPath[0];
    let prevRel;
    let currentRelation = RELATIONSHIP;
    for (let i = 1; i < optimalPath.length; i++) {
        const nextTrackCode = optimalPath[i];

        const currentPerson = personMap[currentTrackCode];
        const nextPerson = personMap[nextTrackCode];
        const relTo = currentPerson.relTo[nextPerson.code];
        prevRel = currentRelation;
        currentRelation = currentRelation[relTo];

        if (!currentRelation) {
            // console.log(optimalPath, currentTrackCode, nextTrackCode, relTo, currentRelation, prevRel);
            return 'UNK';
        }

        currentTrackCode = nextTrackCode;
    }

    if (typeof currentRelation == 'string') {
        return currentRelation;
    } else {
        return currentRelation._;
    }
}


