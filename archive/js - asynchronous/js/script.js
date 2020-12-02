let result = document.querySelector('#result');

function logResult(txt) {
    result.innerHTML += txt + '\n';
}

function waitCallback(ms, cb) {
    setTimeout(cb, ms);
}

function waitPromise(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function waitAsync(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function executeCallback() {
    logResult('sắp rồi...');
    waitCallback(2007, () => {
        logResult('chờ tí...');
        waitCallback(2012, () => {
            logResult('thêm chút nữa thôi...');
            waitCallback(2016, () => {
                logResult('xong rồi đấy!');
            });
        });
    });
}

function executePromise() {
    logResult('sắp rồi...');
    waitPromise(2007)
        .then(() => {
            logResult('chờ tí...');
            return waitPromise(2007);
        })
        .then(() => {
            logResult('thêm chút nữa thôi...');
            return waitPromise(2012);
        })
        .then(() => {
            logResult('thêm chút nữa thôi...');
            return waitPromise(2016);
        })
        .then(() => {
            logResult('xong rồi đấy!');
        });
}

async function executeAsync() {
    logResult('sắp rồi...');
    await waitAsync(2007);
    logResult('chờ tí...');
    await waitAsync(2012);
    logResult('thêm chút nữa thôi...');
    await waitAsync(2016);
    logResult('xong rồi đấy!');
}

function executeFunction() {
    let callType = document.querySelector('input[type=radio][name=callType]:checked').value;
    logResult('callType: ' + callType);
    if (callType === 'callback') {
        executeCallback();
    } else if (callType === 'promise') {
        executePromise();
    } else if (callType === 'async') {
        executeAsync();
    }
}
