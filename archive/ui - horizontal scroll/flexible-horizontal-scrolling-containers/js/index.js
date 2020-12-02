var root = document.documentElement;
const lists = document.querySelectorAll('.hs'); 

lists.forEach(el => {
  const listItems = el.querySelectorAll('li');
  const n = el.children.length;
  el.style.setProperty('--total', n);
});