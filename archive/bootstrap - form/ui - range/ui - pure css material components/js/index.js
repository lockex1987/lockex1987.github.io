document.querySelectorAll('.checkboxes > label:last-child > input').forEach((item) => item.indeterminate = true);

const progress = document.querySelector('.progresses > progress');
setInterval(() => {
    progress.value = progress.value === 100 ? 0 : progress.value + 10;
}, 1000);

// https://codegolf.stackexchange.com/a/150252
const hsl2rgb = (H,S,L)=>[5,3,1].map(i=>A(L*2)*S*([1,Y,0,0,Y,1][(i-~H)%6]-.5)+L,Y=(A=n=>n>1?2-n:n)((H/=60)%2));

document.querySelector('#primary > input').oninput = (event) => {
    const rgb = hsl2rgb(event.target.value, 0.897, 0.541);
    document.body.style.setProperty('--pure-material-primary-rgb', `${Math.round(rgb[0] * 255)}, ${Math.round(rgb[1] * 255)}, ${Math.round(rgb[2] * 255)}`);
};

document.querySelector('#on-primary > input').oninput = (event) => {
    const value = event.target.value;
    document.body.style.setProperty('--pure-material-onprimary-rgb', `${value}, ${value}, ${value}`);
};

document.querySelector('#surface > input').oninput = (event) => {
    const value = event.target.value;
    document.body.style.setProperty('--pure-material-surface-rgb', `${value}, ${value}, ${value}`);
};

document.querySelector('#on-surface > input').oninput = (event) => {
    const value = event.target.value;
    document.body.style.setProperty('--pure-material-onsurface-rgb', `${value}, ${value}, ${value}`);
};

const theming = document.querySelector('.theming');

document.querySelector('#toggle > input').onchange = (event) => {
    if (event.target.checked) {
        theming.classList.remove('hidden');
    } else {
        theming.classList.add('hidden');
    }
};