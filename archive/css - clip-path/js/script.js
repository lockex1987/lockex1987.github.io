const clipPathSelect = document.getElementById('clipPath');
clipPathSelect.addEventListener('change', (evt) => {
    document.getElementById('clipped').style.clipPath = evt.target.value;
});




const boxes = document.querySelector('.boxes');

const box1 = document.createElement('div');
box1.className = 'box box1';
box1.textContent = 'CTTD';

const box2 = document.createElement('div');
box2.className = 'box box2';
box2.textContent = 'NAT';
boxes.appendChild(box1);

document.querySelector('#goBtn').addEventListener('click', () => {
    box2.classList.add('shutters-enter-active');
    boxes.appendChild(box2);
});
