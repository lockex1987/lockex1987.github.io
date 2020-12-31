import { NATIONALS, CLUBS } from './data.js';

function bindList(divId, subFolder, list) {
    let html = '';
    list.forEach(s => {
        html += `
                <figure class="m-3">
                    <img src="../../images/football ${subFolder}/${s}" class="object-fit-contain"/>
                    <figcaption class="text-center text-muted font-size-0.75 py-1 text-capitalize">${normalizeName(s)}</figcaption>
                </figure>`;
    });
    const div = document.querySelector('#' + divId);
    div.className = 'd-flex flex-wrap justify-content-evenly icons';
    div.innerHTML = html;
}

function normalizeName(name) {
    return name.replace('.svg', '');
}

bindList('nationalsDiv', 'nationals', NATIONALS);
bindList('clubsDiv', 'clubs', CLUBS);
