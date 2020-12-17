function showMessage(messageHtml) {
	$('#chat-box').append(messageHtml);
}

$(document).ready(function () {
	const websocket = new WebSocket('ws://localhost:8090/demo/php-socket.php');

	websocket.onopen = () => {
		showMessage('<div class="text-success">Connection is established!</div>');
	};

	websocket.onclose = () => {
		showMessage('<div class="text-info">Connection closed</div>');
	};

	websocket.onerror = () => {
		showMessage('<div class="text-danger">Problem due to some error</div>');
	};

	websocket.onmessage = (evt) => {
		const data = JSON.parse(evt.data);
		showMessage('<div class="' + data.type + '">' + data.message + '</div>');

		$('#chatMessage').val('');
	};

	$('#frmChat').on('submit', (evt) => {
		evt.preventDefault();

		$('#chatUser').attr('type', 'hidden');

		const messageJSON = {
			chat_user: $('#chatUser').val(),
			chat_message: $('#chatMessage').val()
		};
		websocket.send(JSON.stringify(messageJSON));
	});
});
