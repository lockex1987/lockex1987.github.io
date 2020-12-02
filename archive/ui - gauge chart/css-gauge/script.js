$(document).ready(runAllGauges());

$('.reset').on('click', function(e){
  e.preventDefault();
  $(this).toggleClass('active');
  if ( $(this).hasClass('active') ){
    $(this).text('Run');
    resetAllGauges();
  } else {
    $(this).text('Reset');
    runAllGauges();
  }
});


function runAllGauges()
{
  var gauges = $('.gauge-cont');
  $.each(gauges, function(i, v){
    var self = this;
		setTimeout(function(){
        setGauge(self);
    },i * 700);
  });
}

function resetAllGauges()
{
  var gauges = $('.gauge-cont').get().reverse();
  $.each(gauges, function(i, v){
    var self = this;
		setTimeout(function(){
        resetGauge(self);
    },i * 700);
  });
}

function resetGauge(gauge)
{
  var spinner = $(gauge).find('.spinner');
  var pointer = $(gauge).find('.pointer');
  $(spinner).attr({
    style: 'transform: rotate(0deg)'
  });
  $(pointer).attr({
    style: 'transform: rotate(-90deg)'
  });
}

function setGauge(gauge)
{
  var percentage = $(gauge).data('percentage') / 100;
  var degrees = 180 * percentage;
  var pointerDegrees = degrees - 90;
  var spinner = $(gauge).find('.spinner');
  var pointer = $(gauge).find('.pointer');
  $(spinner).attr({
    style: 'transform: rotate(' + degrees + 'deg)'
  });
  $(pointer).attr({
    style: 'transform: rotate(' + pointerDegrees + 'deg)'
  });
}