// import { app, BrowserWindow, Notification, ipcMain, dialog } from 'electron';
// import fs from 'fs';
const { app, BrowserWindow, Notification, ipcMain, dialog } = require('electron');
const fs = require('fs');


// Main lắng nghe yêu cầu từ Renderer
ipcMain.on("chooseFile", (event, arg) => {
    const result = dialog.showOpenDialog({
        properties: [
            "openFile"
        ],
        filters: [
            {
                name: "Images",
                extensions: [
                    "png",
                    "jpg",
                    "jpeg"
                ]
            }
        ]
    });

    result.then(({ canceled, filePaths, bookmarks }) => {
        const base64 = fs.readFileSync(filePaths[0]).toString('base64');

        // Main trả lại kết quả cho Renderer
        event.reply("chosenFile", base64);
    });
});

/**
 * Tạo một cửa sổ mới.
 */
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // Cho phép truy cập Node API
            nodeIntegration: true
        },

        // Ẩn tiêu đề, các nút close, minimize, maximize
        // Khi ẩn thì không thể di chuyển cửa sổ được
        // frame: false
    });

    // Không có menu
    // Khi đó không nhấn F11 để fullscreen được
    // Không thể nhấn Ctrl + W để đóng
    // Vẫn có thể nhấn Ctrl + F4 để đóng
    win.setMenu(null);

    // Hiển thị Developer Tools
    win.openDevTools();

    // Load file HTML
    win.loadFile('index.html');
}

/**
 * Sử dụng Notification module.
 */
function showNotification() {
    new Notification({
        title: 'Basic Notification',
        body: 'Notification from the Main process'
    }).show();
}

// Tạo cửa sổ mới
app.whenReady()
    .then(createWindow)
    // .then(showNotification)
    ;

// Đóng
app.on('window-all-closed', () => {
    // Nếu không phải là hệ điều hành Mac
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    // Chỉ tạo một cửa sổ
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
