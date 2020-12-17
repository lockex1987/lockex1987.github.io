var menu = document.querySelector('.navigation-menu');
var header = document.querySelector('.site-header');

var observer = new IntersectionObserver((entries, observer) => {
  if (entries[0].isIntersecting) {
    menu.classList.remove('title-visible');
  } else {
    menu.classList.add('title-visible');
  }
});

observer.observe(header);