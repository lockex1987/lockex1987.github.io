const subtitle = '[00:00.00]Bài Hát: Ngắm Hoa Lệ Rơi [00:02.00]Ca Sĩ: Châu Khải Phong [00:04.00] [00:42.89]Dẫu biết đôi ta đã từng trải qua [00:45.06]Bao nhiêu năm thiết tha yêu như vậy [00:47.78]Mà bây giờ lại xa lạ [00:52.23] [00:53.02]Con đường tình giờ anh một mình [00:55.58]Đành lặng thinh [00:57.76]Nhìn em bước về [00:58.98]Tay cầm tay vui đùa cùng với ai [01:02.43] [01:02.67]Ánh mắt đôi môi [01:04.05]Ta đã trót trao [01:05.23]Nhưng tại sao [01:05.85]Đến hôm nay lúc hiện tại [01:09.05]Em đã không còn được nhẫn nại [01:12.14] [01:13.08]Bên cạnh người tình mới [01:15.21]Em đã quên rồi [01:17.37]Để anh khoác lên [01:18.37]Thân mình màu đơn côi [01:21.45] [01:21.85]Ta đã từng hứa yêu nhau [01:24.57]Đến muôn đời sau [01:27.49]Anh vẫn luôn khắc sâu [01:28.98]Nhưng hôm nay ân tình phai màu [01:32.47]Còn gì nữa đâu [01:34.76]Và đành buông lơi những câu [01:37.48]Ta phải xa rời nhau [01:38.97]Như hoa kia dần úa màu [01:41.84]Trong lòng buồn mỗi khi [01:44.28]Anh ngắm hoa nhưng dòng lệ rơi [01:47.52]Em giờ đang khác đi [01:49.02]Anh biết chắc chắn [01:49.91]Sẽ không còn cơ hội [01:52.47]Đành vậy thế thôi [01:54.95]Ân tình nay vỡ đôi [01:57.51]Anh chúc em luôn [01:58.76]Nở nụ cười yên vui [02:02.31] [02:42.73]Dẫu biết đôi ta đã từng trải qua [02:45.28]Bao nhiêu năm thiết tha yêu như vậy [02:47.79]Mà bây giờ lại xa lạ [02:51.84] [02:53.06]Con đường tình giờ anh một mình [02:55.62]Đành lặng thinh [02:57.80]Nhìn em bước về [02:59.02]Tay cầm tay vui đùa cùng với ai [03:02.47] [03:02.71]Ánh mắt đôi môi [03:04.09]Ta đã trót trao [03:05.27]Nhưng tại sao [03:05.89]Đến hôm nay lúc hiện tại [03:09.09]Em đã không còn được nhẫn nại [03:12.18] [03:13.12]Bên cạnh người tình mới [03:15.25]Em đã quên rồi [03:17.41]Để anh khoác lên [03:18.41]Thân mình màu đơn côi [03:21.40] [03:21.89]Ta đã từng hứa yêu nhau [03:24.61]Đến muôn đời sau [03:27.53]Anh vẫn luôn khắc sâu [03:28.97]Nhưng hôm nay ân tình phai màu [03:32.50]Còn gì nữa đâu [03:34.80]Và đành buông lơi những câu [03:37.52]Ta phải xa rời nhau [03:39.01]Như hoa kia dần úa màu [03:41.88]Trong lòng buồn mỗi khi [03:44.32]Anh ngắm hoa nhưng dòng lệ rơi [03:47.56]Em giờ đang khác đi [03:49.06]Anh biết chắc chắn [03:49.95]Sẽ không còn cơ hội [03:52.51]Đành vậy thế thôi [03:54.99]Ân tình nay vỡ đôi [03:57.41]Anh chúc em luôn [03:58.55]Nở nụ cười yên vui  [04:01.76]Ta đã từng hứa yêu nhau [04:04.48]Đến muôn đời sau [04:07.53]Anh vẫn luôn khắc sâu [04:08.97]Nhưng hôm nay ân tình phai màu [04:12.50]Còn gì nữa đâu [04:14.80]Và đành buông lơi những câu [04:17.52]Ta phải xa rời nhau [04:19.00]Như hoa kia dần úa màu [04:21.88]Trong lòng buồn mỗi khi [04:24.38]Anh ngắm hoa nhưng dòng lệ rơi [04:27.56]Em giờ đang khác đi [04:29.06]Anh biết chắc chắn [04:29.95]Sẽ không còn cơ hội [04:32.51]Đành vậy thế thôi [04:34.99]Ân tình nay vỡ đôi [04:37.55]Anh chúc em luôn [04:38.80]Nở nụ cười yên vui [04:42.45]Anh chúc em luôn [04:43.88]Nở nụ cười yên vui [04:51.16]';
const regex = /\[(\d\d:\d\d\.\d\d)\]([^\[]+)/g;
let arr;
const lines = [];
while ((arr = regex.exec(subtitle)) !== null) {
    // console.log(arr);
    const time = arr[1];
    const text = arr[2].trim();
    lines.push({
        time: null,
        text: text
    });
    // console.log(time, s);
}

console.log(lines);

/*
document.addEventListener('keydown', (evt) => {
    evt.preventDefault();

    // console.log(evt.key, evt.keyCode, evt.char, evt.charCode, evt.which);
    const keyName = evt.key;

    if (keyName === 'Control') {
        // do not alert when only Control key is pressed.
        return;
    }

    if (evt.ctrlKey) {
        // Even though event.key is not 'Control' (e.g., 'a' is pressed),
        // event.ctrlKey may be true if Ctrl key is pressed at the same time.
        console.log(`Combination of ctrlKey + ${keyName}`);
    } else if (evt.keyCode == 32) {
        // Space không có tên, phải dùng keyCode 32
        console.log('Space');
    } else {
        console.log(keyName);
    }
}, false);


document.addEventListener('keyup', (event) => {
    const keyName = event.key;

    // As the user releases the Ctrl key, the key is no longer active,
    // so event.ctrlKey is false.
    if (keyName === 'Control') {
        // console.log('Control key was released');
    }
}, false);

// Không dùng keypress
*/

new Vue({
    el: '#app',

    data() {
        return {
            lines: lines,
            currentIndex: 0
        };
    },

    mounted() {
        this.handleKeyEvent();
    },

    methods: {
        handleKeyEvent() {
            document.addEventListener('keydown', (evt) => {
                evt.preventDefault();
                const key = evt.key;
                if (evt.keyCode == 32) {
                    if (this.currentIndex < this.lines.length - 1) {
                        // Space
                        this.currentIndex++;
                        this.lines[this.currentIndex].time = this.$refs.theAudio.currentTime;
                    }
                }
                if (key == 'Backspace') {
                    if (this.currentIndex > 0) {
                        this.currentIndex--;
                    }
                }
            });         
        }
    }
});