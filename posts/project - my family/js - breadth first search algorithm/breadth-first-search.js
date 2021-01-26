function breadthFirstSearch(nodes, src, dest) {
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

    // Thăm đỉnh bắt đầu (src)
    queueToExplore.push(src);
    visited[src] = true;

    // Đi thăm tiếp các đỉnh khác
    while (queueToExplore.length > 0 && !isFinish) {
        // Lấy ra đỉnh "cũ nhất" ra khỏi queue
        var currentIndex = queueToExplore.shift();

        // Lấy ra danh sách các đỉnh liền kề
        const adjList = nodes[currentIndex].links;

        // Xét tất cả các đỉnh kề
        adjList.forEach(function (childIndex) {
            // Nếu đỉnh kề này chưa được thăm
            if (!visited[childIndex]) {
                // Đánh dấu và đẩy vào queue
                queueToExplore.push(childIndex);
                visited[childIndex] = true;

                // Ghi lại đỉnh nodeIndex và liền trước của đỉnh childIndex
                pred[childIndex] = currentIndex;

                // Dừng lại nếu đã tìm thấy đỉnh đích
                if (childIndex == dest) {
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
        return constructPath(pred, dest);
    }
}

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

function demo() {
    const nodes = [
        {
            links: [1] // node 0 is linked to node 1
        },
        {
            links: [0, 2], // node 1 is linked to node 0 and 2
            path: []
        }
    ];

    console.log(breadthFirstSearch(nodes, 0, 2));
}


demo();

// TODO: Tìm quan hệ giữa 2 người trên cây gia đình
// Không dùng Dijkstra nữa
// https://www.npmjs.com/package/js-graph-algorithms
