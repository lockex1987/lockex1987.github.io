const status1 = document.querySelector('#status1');
const status2 = document.querySelector('#status2');
const status3 = document.querySelector('#status3');

let count1 = 0;
let count2 = 0;
let count3 = 0;


const normalFunction1 = () => {
    count1++;
    status1.textContent = count1;
};

const normalFunction2 = () => {
    count2++;
    status2.textContent = count2;
};

const normalFunction3 = () => {
    count3++;
    status3.textContent = count3;
};

const throttledFn = CommonUtils.throttle(normalFunction2, 500);
const debouncedFn = CommonUtils.debounce(normalFunction3, 500);

window.addEventListener('scroll', normalFunction1);
window.addEventListener('scroll', throttledFn);
window.addEventListener('scroll', debouncedFn);
