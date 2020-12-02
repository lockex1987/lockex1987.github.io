document.addEventListener('mousemove', (e) => {
  var div = e.target;
  if (div.classList.contains('follow-mouse') && div.classList.contains('tooltip-container')) {
    //console.log(div.className);  
    var tooltip = div.querySelector('.tooltip');
    if (tooltip) {
      var containerRect = div.getBoundingClientRect();
      var xOffset = 10;
      var yOffset = 20;
      tooltip.style.top = (e.clientY - containerRect.top - xOffset) + 'px';
      tooltip.style.left = (e.clientX - containerRect.left + yOffset) + 'px';
    }
  }
});