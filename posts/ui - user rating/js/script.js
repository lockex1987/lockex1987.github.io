const data = [
    { star: 5, num: 150 },
    { star: 4, num: 63 },
    { star: 3, num: 15 },
    { star: 2, num: 6 },
    { star: 1, num: 20 }
];

const backgroundColors = [
    'bg-danger',
    'bg-warning',
    'bg-info',
    'bg-primary',
    'bg-success'
];

let total = 0;
data.forEach((e) => {
    total += e.num;
});

data.forEach((e, i) => {
    let percent = e.num * 100 / total;
    percent = percent.toFixed(2);
    e.percent = percent;
});

let average = total / 5;

let html = `
    ${data.map((e, i) => `
        <div class="rating-row mt-2 clearfix">
            <div class="pull-left w-15">
                ${e.star} star
            </div>

            <div class="pull-left w-70 bg-light">
                <div class="bar ${backgroundColors[e.star - 1]}"
                        style="width: ${e.percent}%"></div>
            </div>

            <div class="pull-left w-15 text-right font-weight-500">
                ${e.num}
            </div>
        </div>
    `).join('')}
    `;

document.querySelector('#userRating').innerHTML = html;
document.querySelector('#average').textContent = average;
document.querySelector('#total').textContent = total;
