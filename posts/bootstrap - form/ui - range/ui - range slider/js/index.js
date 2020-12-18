function rangeslider() {
  var obj = document.querySelector('.slider');
  var barProcess = document.querySelector('.bar-process');
  var barBtn = document.querySelector('.bar-btn');

  function updateSlider() {
    var value = obj.value;
    var min = obj.min; // 0
    var max = obj.max; // 100
    var range = Math.round(max - min);
    var percentage = Math.round((value - min) * 100 / range);
    //console.log(percentage);

    barProcess.style.width = percentage + "%";
    barBtn.style.left = percentage + "%";
  }

  obj.addEventListener('input', updateSlider);
  
  updateSlider();
}

rangeslider();