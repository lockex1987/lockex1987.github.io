/**
 * Mở nhiều tab, chờ cho các tab lấy hết xong dữ liệu, sau đó lấy danh sách ảnh của từng tab.
 * Trong một số trường hợp, chúng ta phải chờ trang web load xong ảnh thì mới lấy đúng danh sách ảnh.
 * Ví dụ khi ảnh không có.
 */
document.querySelector('#getImagesSingleButton').addEventListener('click', () => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
        for (let i = 0; i < tabs.length; i++) {
            chrome.tabs.sendMessage(tabs[i].id, { message: 'getImagesSingle' });
        }
    });
});
