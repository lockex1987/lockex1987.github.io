moment.locale('vi');

const CATEGORIES = [
    { col: 'A', ignore: true },
    { col: 'B', ignore: true },
    { col: 'C', label: 'Thức ăn' },
    { col: 'D', label: 'Xăng' },
    { col: 'E', label: 'Điện thoại' },
    { col: 'F', ignore: true },
    { col: 'G', label: 'Ăn vặt' },
    { col: 'H', label: 'Đi chơi' },
    { col: 'I', label: 'Liên hoan' },
    { col: 'J', ignore: true },
    { col: 'K', label: 'Xe máy' },
    { col: 'L', label: 'Gas' },
    { col: 'M', label: 'Điện' },
    { col: 'N', label: 'Nước' },
    { col: 'T', ignore: true },
    { col: 'U', label: 'Khác' },
    { col: 'V', label: 'Tổng' }
];

const START_ROW = 5;
const START_DATE = moment('2018-03-01');
var today = moment().startOf('day'); // loại bỏ phần giờ phút giây cho dễ xử lý

document.querySelector("#todayLabel").textContent = today.format("dddd, DD/MM/YYYY");
var diff = today.diff(START_DATE, 'days');
var todayRow = START_ROW + diff - 2;

// Hằng số để truy cập
var CLIENT_ID = '845276834372-68t3j8gvengur43fa6qnvrlih43411ij.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBtnsXQAr8OJIIiDAX1R10iM0VP07TL4M4';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";
var SPREADSHEET_ID = '18lujjbf_tsj_d3xhrb9OYd6xtPDVt4-dkduVFXb-NUI';


/**
 *  Hàm này sẽ được gọi khi load xong thư viện Google API để kiểm tra trạng thái đăng nhập của người dùng.
 */
function handleClientLoad() {
    gapi.load('client:auth2', function () {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(function () {
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    });
}

/**
 * Hàm này được gọi khi trạng thái đăng nhập thay đổi (khi đó cập nhật lại giao diện phù hợp).
 * Sau khi đăng nhập, hàm này được gọi.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        document.body.classList.add("logged");
        document.body.classList.remove("not-logged");

        getTodayData();
        //demoUpdate();
    } else {
        document.body.classList.remove("logged");
        document.body.classList.add("not-logged");
    }
}

/**
 * Người dùng nhấn nút đăng nhập.
 */
function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 * Người dùng nhấn nút đăng xuất.
 */
function handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Đọc dữ liệu.
 */
function getTodayData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'daily!C' + todayRow + ':V' + todayRow,
    }).then(function (response) {
        let range = response.result;
        if (range.values.length > 0) {
            appendPre('Giá trị: ' + JSON.stringify(range.values));
            for (let i = 0; i < range.values.length; i++) {
                let row = range.values[i];
                for (let j = 0; j < CATEGORIES.length; j++) {
                    let cat = CATEGORIES[j];
                    //console.log(JSON.stringify(cat) + ", " + !cat.ignore + ", " + (j < row.length));
                    if (!cat.ignore && j < row.length) {
                        let n = row[j];
                        console.log(JSON.stringify(row) + ", " + n);
                        appendPre(cat.label + ": " + n);
                        if (n) {

                        }
                    }
                }
            }
        } else {
            appendPre('Chưa có dữ liệu');
        }
    }, function (response) {
        appendPre('Error: ' + response.result.error.message);
    });
}

/**
 * Cập nhật dữ liệu.
 */
function demoUpdate() {
    var params = {
        spreadsheetId: SPREADSHEET_ID,
        range: 'earn!D1',
        valueInputOption: 'USER_ENTERED'
    };
    var value = "Got you";
    var body = {
        values: [
            [
                value
            ]
        ]
    };

    gapi.client.sheets.spreadsheets.values.update(
        params, body
    ).then(function (response) {
        appendPre("Cập nhật thành công");
        console.log(response.result);
    }, function (response) {
        console.error('Error: ' + response.result.error.message);
    });
}

/**
 * Hiển thị log cho người dùng.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}
