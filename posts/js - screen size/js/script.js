const demoTableBody = document.querySelector('#demoTable tbody');

/**
 * Lấy kích thước màn hình.
 */
function getScreenWidth() {
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return w;
}

function bindDemoTable() {
    const methods = [
        // Kích thước màn hình máy tính
        'window.screen.width',
        'window.screen.availWidth',
        // Kích thước trình duyệt
        'window.innerWidth',
        'window.outerWidth',
        // Kích thước phần tử window và document bằng jQuery
        '$(window).width()',
        '$(document).width()',

        'document.documentElement.clientWidth',
        'document.documentElement.offsetWidth',
        'document.documentElement.scrollWidth',

        'document.body.clientWidth',
        'document.body.offsetWidth',
        'document.body.scrollWidth'

        /*
        '$(window).height()',
        '$(document).height()',
        'window.screen.height',
        'window.screen.availHeight',
        'window.innerHeight',
        'document.documentElement.clientHeight',
        'document.body.clientHeight',
        */
    ];
    let html = '';
    methods.forEach(s => {
        html += `
                <tr>
                    <td><code>${s}</code></td>
                    <td>${eval(s)}</td>
                </tr>`;
    });
    demoTableBody.innerHTML = html;

    console.log(demoTableBody.getBoundingClientRect());
    console.log(getComputedStyle(demoTableBody));
}

bindDemoTable();

window.addEventListener('resize', bindDemoTable);
