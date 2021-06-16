function showMessage(messageHtml) {
    const div = document.createElement('div');
    div.innerHTML = messageHtml;
    document.querySelector('#chat-box').appendChild(div);
}


const webSocket = new WebSocket('ws://localhost:8000');

webSocket.addEventListener('open', () => {
    showMessage('<div class="text-success">Connection is established</div>');
});

webSocket.addEventListener('close', () => {
    showMessage('<div class="text-info">Connection closed</div>');
});

webSocket.addEventListener('error', () => {
    showMessage('<div class="text-danger">Problem due to some error</div>');
});

webSocket.addEventListener('message', (evt) => {
    showMessage(evt.data);
});

document.querySelector('#frmChat').addEventListener('submit', (evt) => {
    evt.preventDefault();

    document.querySelector('#chatUser').type = 'hidden';
    const user = document.querySelector('#chatUser').value;
    const message = document.querySelector('#chatMessage').value.trim();

    webSocket.send('<div class="text-info"><b>' + user + '</b>: ' + message + '</div>');
    showMessage('<div class="text-warning"><b>Bạn</b>: ' + message + '</div></div>');

    document.querySelector('#chatMessage').value = '';
});
