const container = document.getElementById('exampleModal');
const theModal = new bootstrap.Modal(container);

container.addEventListener('show.bs.modal', (evt) => {
    const button = evt.relatedTarget;
    const recipient = button ? button.getAttribute('data-whatever') : '';
    const title = container.querySelector('.modal-title');
    const input = container.querySelector('.modal-body input');
    title.textContent = 'New message to ' + recipient;
    input.value = recipient;
    input.focus();
});


function openModal() {
    theModal.show();
}

function closeModal() {
    theModal.hide();
}
