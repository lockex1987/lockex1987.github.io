// Xử lý favicion
{
    const OFFSET_ANGLE = 1.5 * Math.PI; // starting position[angle] for circle drawing

    // Đối tượng favicon
    let lnk = document.querySelector('link[rel*="icon"]');

    // Tạo đối tượng canvas
    let canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    let ctx = canvas.getContext('2d');

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'fuchsia';

    function updateFaviconProgress(ratio) {
        ctx.clearRect(0, 0, 16, 16);
        ctx.beginPath();
        ctx.arc(8, 8, 6, OFFSET_ANGLE, OFFSET_ANGLE + ratio * 2 * Math.PI);
        ctx.stroke();

        // Quan trọng là cái này
        // Update favicon
        lnk.href = canvas.toDataURL('image/png');
    }
}

// Demo local
{
    let tc; // interval object
    let pct; // angle

    let updateLoaderLocal = function() {
        updateFaviconProgress(pct / 100);

        if (pct === 100) {
            clearInterval(tc);
            loadEnd();
        } else {
            pct++;
        }
    };

    function demoLocal() {
        pct = 0; 
        tc = setInterval(updateLoaderLocal, 30);

        loadStart();
    }
}

// Demo AJAX
{
    let updateLoaderAjax = function(evt) {
        console.log(evt.loaded);
        updateFaviconProgress(evt.loaded / evt.total);
    };

    function demoAjax() {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('progress', updateLoaderAjax);
        //xhr.open('GET', 'http://www.hongkiat.com/blog/animated-favicon-loader-javascript/');
        xhr.open('GET', 'test.xlsx');
        xhr.send();
    }
}

// Xử lý button
{
    let btn = document.querySelector('#lbtn');

    function loadStart() {
        btn.textContent = 'Loading';
        btn.style.backgroundColor = '#999';
        btn.setAttribute('disabled', '');
    }

    function loadEnd() {
        btn.textContent = 'Load';
        btn.style.backgroundColor = 'fuchsia';
        btn.removeAttribute('disabled');
    }

    var _init = function() {
        if (btn.disabled) {
            btn.removeAttribute('disabled'); // enable btn on page refresh
        }

        btn.addEventListener('click', demoLocal);
        //btn.addEventListener('click', demoAjax);
    }

    _init();
}

// Khởi tạo
{
    // Reset the favicon
    updateFaviconProgress(0);
}