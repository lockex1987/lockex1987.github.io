var edit = document.getElementById("edit");
var preview = document.getElementById("preview");

function livePreview() {
  preview.innerHTML = marked(edit.value);
}

edit.onkeyup = livePreview;
//edit.onchange = livePreview;

edit.focus();
