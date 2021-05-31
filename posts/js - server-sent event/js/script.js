const evtSource = new EventSource('get-info.php');

// Event khi clien connect thành công đến server
evtSource.addEventListener('open', (evt) => {
    console.log('Connection was opened');
});

// Khi có lỗi xảy ra (VD: connection closed)
// Client tự động connect lại sau (mặc định) 3 giây
evtSource.addEventListener('error', (evt) => {
    if (evt.eventPhase == EventSource.CLOSED) {
        console.log('Connection was closed');
    }
});

// Event khi server gửi dữ liệu, tên event mặc định là message
evtSource.addEventListener('message', (evt) => {
    const data = evt.data; // or JSON.parse(event.data) if json
    console.log(data);
    const dataId = evt.lastEventId; // Id được gửi server. Khi kết nối lại,
    // client sẽ tự dộng gửi kèm trong header Last-Event-Id
    if (dataId == 'CLOSED') {
        // Ngăn client không kết nối lại server
        evtSource.close();
    }
});

// Custom event, server trả về sự kiện với tên: custom-event
evtSource.addEventListener('cpu', (evt) => {
    const data = evt.data;
    console.log(data);
    // ...
});
