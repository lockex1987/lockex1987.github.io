// Client ID and API key from the Developer Console
var CLIENT_ID = '845276834372-68t3j8gvengur43fa6qnvrlih43411ij.apps.googleusercontent.com';
// var API_KEY = 'AIzaSyBtnsXQAr8OJIIiDAX1R10iM0VP07TL4M4';

const API_KEY = 'UhqgUEE_22Z2ByEfUsOTXMKj';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];

// Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
// Using one of the following scopes:
//   'https://www.googleapis.com/auth/drive'
//   'https://www.googleapis.com/auth/drive.file'
//   'https://www.googleapis.com/auth/spreadsheets'
//   'https://www.googleapis.com/auth/spreadsheets.readonly'
var SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

//var SPREADSHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
var SPREADSHEET_ID = '18lujjbf_tsj_d3xhrb9OYd6xtPDVt4-dkduVFXb-NUI';


/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    var authorizeButton = document.getElementById('authorize-button');
    var signoutButton = document.getElementById('signout-button');
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';

        demoRead();
        demoUpdate();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Đọc dữ liệu.
 */
function demoRead() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        //range: 'Class Data!A2:E',
        range: 'daily!C7:C10',
    }).then(function (response) {
        var range = response.result;
        if (range.values.length > 0) {
            appendPre('Thức ăn');
            for (i = 0; i < range.values.length; i++) {
                var row = range.values[i];
                var n = row[0];
                if (n) {
                    appendPre(row[0]);
                }
            }
        } else {
            appendPre('No data found.');
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
        // How the input data should be interpreted
        valueInputOption: 'USER_ENTERED'
    };
    var value = 'Got you';
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
        appendPre('Cập nhật thành công');
        console.log(response.result);
    }, function (response) {
        console.error('Error: ' + response.result.error.message);
    });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}
