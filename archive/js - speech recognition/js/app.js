// https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

var final_transcript = '';

// Đối tượng webkitSpeechRecognition
var recognition;
var recognizing = false;
var ignore_onend;


function processText(text) {
    var str = text.trim().toLowerCase();
		//console.log('INPUT:', str);
        
		var obj = VoiceInput.extractFields(str);
		if (obj) {
			processFields(obj.time, obj.action, obj.number);
			calculateTotal();
        }
        
    if (/xóa đi/gi.test(text)) {
        log('Đã xóa');
    } else if (/màu đỏ/gi.test(text)) {
        document.body.style.backgroundColor = 'red';
    } else if (/màu xanh/gi.test(text)) {
        document.body.style.backgroundColor = 'blue';
    } else if (/màu trắng/gi.test(text)) {
        document.body.style.backgroundColor = 'white';
    }
}

function init_2() {
    if (!('webkitSpeechRecognition' in window)) {
        // Ẩn loa
        document.querySelector('#start_button').style.visibility = 'hidden';

        // Phải sử dụng Chrome
        showInfo('info_upgrade');
    } else {
        // Hiển thị loa
        document.querySelector('#start_button').style.display = 'inline-block';
        
        // Khởi tạo đối tượng webkitSpeechRecognition
        recognition = new webkitSpeechRecognition();
        recognition.lang = 'vi-VN'; //select_dialect.value;

        // The default value for continuous is false,
        // meaning that when the user stops talking,
        // speech recognition will end.
        // This mode is great for simple text like short input fields.
        // In this demo, we set it to true, so that recognition will
        // continue even if the user pauses while speaking.
        recognition.continuous = true;

        // The default value for interimResults is false, meaning that the only results
        // returned by the recognizer are final and will not change.
        // The demo sets it to true so we get early, interim results that may change.
        // Watch the demo carefully, the grey text is the text that is interim and does sometimes change,
        // whereas the black text are responses from the recognizer that are marked final and will not change.
        recognition.interimResults = false;

        recognition.maxAlternatives = 1;
    
        // Icon loa
        var start_img = document.querySelector('#start_img');

        // Số đếm
        var count = 0;
    
        // Bắt đầu nhận dạng
        recognition.onstart = function() {
            recognizing = true;
            showInfo('info_speak_now');
            start_img.src = 'images/mic-animate.gif';
        };
    
        // Có lỗi
        recognition.onerror = function(event) {
            if (event.error == 'no-speech') {
                start_img.src = 'images/mic.gif';
                showInfo('info_no_speech');
            } else if (event.error == 'audio-capture') {
                start_img.src = 'images/mic.gif';
                showInfo('info_no_microphone');
            } else if (event.error == 'not-allowed') {
                showInfo('info_denied');
            }
        };
    
        // Kết thúc
        recognition.onend = function() {
            recognizing = false;
            document.querySelector('#interim_span').innerHTML += final_transcript;

            

            showInfo('info_start');
            start_img.src = 'images/mic.gif';

            // Tiếp tục lắng nghe
            log('Restart');
            startListen();
        };
    
        // Đang xử lý và có kết quả tạm thời
        recognition.onresult = function(event) {
            // Nếu không nhận dạng được
            if (typeof(event.results) == 'undefined') {
                recognition.onend = null;
                recognition.stop();
                showInfo('info_upgrade');
                return;
            }
    
            /*
            var interim_transcript = '';
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }
            */
    
            // Chỉ lấy ra 1 kết quả cuối cùng

            final_transcript = '';
            if (event.results.length > 0) {
                // Kiểm tra nếu nó bị lặp
                if (event.results.length > 1) {
                    var firstText = event.results[0][0].transcript.toLowerCase();
                    var lastText = event.results[event.results.length - 1][0].transcript.toLowerCase();
                    if (lastText.indexOf(firstText) === 0) {
                        return;
                    }
                }

                var last = event.results[event.results.length - 1];
                if (last.isFinal) {
                    final_transcript = last[0].transcript;
                }

                

                document.querySelector('#final_span').innerHTML = final_transcript;

                processText(final_transcript);

                //log(last[0].confidence);

                //log(event.resultindex);

                log(event.results.length);
                //log(JSON.stringify(event.results));
                //log(JSON.stringify(last[0]) + ': ' + last.isFinal);
                //log(event.isFinal);
    
                //log(count);
                //count++;
            }
        };

        // Bắt đầu lắng nghe luôn
        startListen();
    }
}

function startButton(event) {
    // Chủ động kết thúc
    if (recognizing) {
        //recognition.stop();
        return;
    }

    startListen();
}

function startListen() {
    //final_transcript = '';
    //document.querySelector('#final_span').innerHTML = '';
    //document.querySelector('#start_img').src = 'mic-slash.gif';
    showInfo('info_allow');

    recognition.start();
}

function showInfo(s) {
    var info = document.querySelector('#info');
    if (s) {
        for (var child = info.firstChild; child; child = child.nextSibling) {
            if (child.style) {
                child.style.display = child.id == s ? 'inline' : 'none';
            }
        }
        info.style.visibility = 'visible';
    } else {
        info.style.visibility = 'hidden';
    }
}

function log(text) {
    //var obj = document.querySelector('#logs');
    //obj.innerHTML = text + '\n' + obj.innerHTML;
}

init_2();
