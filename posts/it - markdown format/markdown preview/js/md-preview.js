const edit = document.getElementById('edit');
const preview = document.getElementById('preview');

function livePreview() {
    preview.innerHTML = marked(edit.value);
}

edit.onkeyup = livePreview;
// edit.onchange = livePreview;

edit.focus();
