var perslider = document.getElementById("perspective-slider"),
perpic = document.getElementById("model1"),
persamount = document.getElementById("perspective-amount"),
container = document.getElementById("perspective-container");

perslider.addEventListener("input", changePers, false);

function changePers() {
  perspective = perslider.value;
  container.style.webkitPerspective = perspective+"px";
  container.style.perspective = perspective+"px";
  persamount.innerHTML = perspective;
}