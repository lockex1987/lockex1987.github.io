function twoWayDataBinding(inputTag) {
    const originalObj = {
        value: ''
    };

    // Khi thay đổi input thì thay đổi object
    inputTag.addEventListener('input', () => {
        console.log('x');
        originalObj.value = inputTag.value;
    });

    // Khi thay đổi object thì thay đổi input
    const inputHandler = {
        set: function (target, prop, newValue) {
            if (prop == 'value') {
                console.log('y');
                target[prop] = newValue;
                inputTag.value = newValue;
                return true;
            }
            return false;
        }
    }

    const proxyObj = new Proxy(originalObj, inputHandler);
    return proxyObj;
}

function demo() {
    var inputTag = document.getElementById('inputName');
    var proxyObj = twoWayDataBinding(inputTag);

    document.querySelector('#btn1').addEventListener('click', () => {
        proxyObj.value = 'Nguyễn Anh Tuấn';
    });

    document.querySelector('#btn2').addEventListener('click', () => {
        alert(proxyObj.value);
    });
}

demo();
