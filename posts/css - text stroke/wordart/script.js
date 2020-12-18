const styleSelect = document.querySelector('#wordart-style');
const styleChange = document.querySelector('section');
const text = document.querySelector('#text');
const previews = document.querySelectorAll('.preview');

styleSelect.addEventListener('change',function(e){
  previews.forEach(preview => {
    styleChange.removeAttribute('class');
styleChange.classList.add('style-' + this.value);
  });
})

function changePreview(e) {
  previews.forEach(preview => {
    if (preview.getAttribute('data-content') == preview.textContent) {
      preview.textContent =  preview.setAttribute('data-content', e.target.value);
    }
    preview.textContent = e.target.value;
  });
}

text.addEventListener('keyup', changePreview);