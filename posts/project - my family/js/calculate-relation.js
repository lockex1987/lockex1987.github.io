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
  var queueToExplore = [];

  // Đánh dấu các đỉnh đã thăm
  // Ban đầu đánh dấu các đỉnh là chưa thăm
  var visited = {};

  // Lưu thêm biến pred lưu đỉnh liền trước,
  // để về sau còn truy dấu đường đi
  var pred = {};

  // Đã đến đỉnh đích hay chưa
  var isFinish = false;

  // Thăm đỉnh bắt đầu (startCode)
  queueToExplore.push(startCode);
  visited[startCode] = true;

  // Đi thăm tiếp các đỉnh khác
  while (queueToExplore.length > 0 && !isFinish) {
      // Lấy ra đỉnh "cũ nhất" ra khỏi queue
      var currentCode = queueToExplore.shift();

      // Lấy ra danh sách các đỉnh liền kề
      var adjList =  getAdjacentNodes(personMap[currentCode]);

      // Xét tất cả các đỉnh kề
      adjList.forEach(function(childIndex) {
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
  var path = [];
  path.push(dest);

  var idx = dest;
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
  var path = breadthFirstSearch(personMap, startCode, finishCode);
  var optimalPath = path.reverse();

  var currentTrackCode = optimalPath[0];
  var prevRel;
  var currentRelation = RELATIONSHIP;
  for (var i = 1; i < optimalPath.length; i++) {
    var nextTrackCode = optimalPath[i];

    var currentPerson = personMap[currentTrackCode];
    var nextPerson = personMap[nextTrackCode];
    var relTo = currentPerson.relTo[nextPerson.code];
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
    return currentRelation['_'];
  }
}


