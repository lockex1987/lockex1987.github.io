/**
 * Nâng cấp chạy từng chữ từng chữ một
 */


// Tách thành các dòng
// Các thẻ span chứa từ trong câu
var words;
// Vị trí từ hiện tại
var idx;
// Vị trí câu hiện tại
var lineIndex;
// Thời gian bắt đầu
var startTime;
// Mảng các từ và thời gian bắt đầu
var timeSequence = [];

/**
 * Tách xâu lời bài hát thành mảng xâu các câu.
 * @param {String} lyric 
 */
function splitLinesFromLyric(lyric) {
  var lines = [];
  lyric.split("\n").forEach(s => {
    s = s.trim();
    if (s) {
      lines.push(s);
    }
  });
  return lines;
}

/**
 * Thêm hiển thị các câu vào trang web.
 * @param {DOM} container Đối tượng chứa của trang
 * @param {Array} lines Mảng xâu các câu
 */
function buildLines(container, lines) {
  lines.forEach(s => {
    var div = document.createElement('div');
    div.className = 'karaoke-caption';
    div.textContent = s;
    div.style.display = 'none';
    container.appendChild(div);
  });
}

/**
 * Tách các câu thành các từ,
 * mỗi từ ở trong thẻ span.
 */
function splitWordsOfLines() {
  // Wrap every letter in a span
  document.querySelectorAll('.karaoke-caption').forEach(text => {
    var html = text.textContent.trim();
    html = html.replace(/\S+/g, "<span class='word'>$&</span>");
    text.innerHTML = html;
  });
}

/**
 * Khi người dùng nhấn Enter hoặc Space thì thực hiện tiếp.
 */
function addKeyEvent() {
  document.addEventListener('keypress', evt => {
    var keyCode = evt.which;
    if ([13, 32].includes(keyCode)) {
      highlightWord();
    }
  });
}

/**
 * Highlight từ tiếp theo.
 */
function highlightWord() {
  // Tính toán thời gian timeout dựa vào độ dài và dấu
  if (idx >= 0 && idx < words.length) {
    var currentWord = words[idx];
    var value = currentWord.textContent;
    var timeout = value.length * 50 + (value.indexOf(',') < 0 ? 0 : 600);

    // Bỏ highlight của từ cũ
    currentWord.classList.remove('highlighting');
    currentWord.classList.add('highlighted');
  }
  

  // Hightlight từ mới
  idx++;
  if (idx >= words.length) {
    //idx = -1;
    //words.forEach(w => w.classList.remove('highlighted'));

    // Chuyển sang dòng khác
    lineIndex++;
    showCurrentLine();
  }

  //console.log(idx, words.length);

  if (idx >= 0 && idx < words.length) {
    var nextWord = words[idx];
    nextWord.classList.add('highlighting');


    if (!startTime) {
      startTime = new Date();
    }
    var milliSecond = new Date() - startTime;
    timeSequence.push({
      word: nextWord.textContent,
      milliSecond: milliSecond
    });
  }

  // Xử lý lặp
  //setTimeout(highlightWord, timeout);
}

/**
 * Hiển thị câu (dòng) hiện tại.
 */
function showCurrentLine() {
  // Ẩn tất cả
  var lines = document.querySelectorAll('.karaoke-caption');
  lines.forEach(div => div.style.display = 'none');

  if (lineIndex < lines.length) {
    // Hiện ra
    var currentLine = lines[lineIndex];
    currentLine.style.display = 'block';

    // Reset lại các biến
    words = currentLine.querySelectorAll('.word');
    idx = -1;
  } else {
    console.log(timeSequence);
  }
}

/**
 * Khởi tạo.
 */
function init() {
  // Lời bài hát
  var lyric = `
      Vì sao con mèo rửa mặt

      Mèo con ra vại nước 
      Bàn chân nó vuốt vuốt 
      Xoa mấy sợi râu cước
      Rồi vào bên bếp tro
      Vì sao con mèo rửa mặt 
      Vì sợ đau mắt
      Không ai dám đến gần mèo
      
      Mèo con ra vại nước 
      Bàn chân nó vuốt vuốt 
      Xoa mấy sợi râu cước
      Rồi vào bên bếp tro
      Vì sao con mèo rửa mặt 
      Vì sợ đau mắt
      Không ai dám đến gần mèo
      
      Mèo con ra vại nước 
      Bàn chân nó vuốt vuốt 
      Xoa mấy sợi râu cước
      Rồi vào bên bếp tro
      Vì sao con mèo rửa mặt 
      Vì sợ đau mắt
      Không ai dám đến gần mèo
      
      Vì sao con mèo rửa mặt 
      Vì sợ đau mắt
      Không ai dám đến gần mèo`;

  var lines = splitLinesFromLyric(lyric);
  var container = document.querySelector('.karaoke-wrapper');
  buildLines(container, lines);
  splitWordsOfLines();
  addKeyEvent();

  lineIndex = 0;

  showCurrentLine();
}

init();
//highlightWord();
