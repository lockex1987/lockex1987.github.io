
const butReq = document.getElementById('butRequest');
const ulResults = document.getElementById('results');

butReq.addEventListener('click', getContacts);

const supported = ('contacts' in navigator && 'ContactsManager' in window);

if (supported) {
    butReq.removeAttribute('disabled');
    document.querySelector('#supportDiv').style.display = '';
} else {
    document.querySelector('#notSupportDiv').style.display = '';
}

async function getContacts() {
    const props = [
        'name',
        'email',
        'tel',
        //'address',
        //'icon'
    ];
    
    const opts = {
        multiple: true
    };

    try {
        const contacts = await navigator.contacts.select(props, opts);
        handleResults(contacts);
    } catch (ex) {
        ulResults.classList.toggle('error', true);
        ulResults.classList.toggle('success', false);
        ulResults.innerText = ex.toString();
    }
}

function handleResults(contacts) {
    ulResults.classList.toggle('success', true);
    ulResults.classList.toggle('error', false);
    ulResults.innerHTML = '';
    renderResults(contacts);
}

function renderResults(contacts) {
    contacts.forEach((contact) => {
        const lines = [];
        if (contact.name) {
            lines.push(`<b>Name:</b> ${contact.name.join(', ')}`);
        }
        if (contact.email) {
            lines.push(`<b>E-mail:</b> ${contact.email.join(', ')}`);
        }
        if (contact.tel) {
            lines.push(`<b>Telephone:</b> ${contact.tel.join(', ')}`);
        }
        if (contact.address) {
            contact.address.forEach((address) => {
                lines.push(`<b>Address:</b> ${JSON.stringify(address)}`);
            });
        }
        if (contact.icon) {
            contact.icon.forEach((icon) => {
                const imgURL = URL.createObjectURL(icon);
                lines.push(`<b>Icon:</b> <img src="${imgURL}">`);
            });
        }
        lines.push(`<b>Raw:</b> <code>${JSON.stringify(contact)}</code>`);

        const li = document.createElement('li');
        li.innerHTML = lines.join('<br>');
        ulResults.appendChild(li);
    });

    const strContacts = JSON.stringify(contacts, null, 2);
    console.log(strContacts);
}
