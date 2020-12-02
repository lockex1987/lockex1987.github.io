var text;
$("#text").text("FAST READ");

var index = 0;
var speed = 1000;
var timer;
var stopFlag = 0;

function fastRead() {
  if (index < text.length) {
    $("#text").text(text[index].toUpperCase());
  } else {
    clearInterval(timer);
    timer = null;
    text = null;
    stopFlag = 0;
  }
  index++;
}

var splitSeparator = " ";

$("#text").click(function () {
  if (stopFlag == 0) {
    if (text == null) {
      index = 0;
      text = $("#area").val().split(splitSeparator);
    }
    timer = setInterval(fastRead, speed);
    stopFlag = 1;
  } else {
    clearInterval(timer);
    timer = null;
    stopFlag = 0;
  }
});

$("#text").dblclick(function () {
  stopFlag = 0;
  clearInterval(timer);
  text = null;
  timer = null;
  $("#text").text("YOU HAVE DOUBLE CLICKED TO END READING");
});

$("#text").hover(function () {
  $(".tooltip .tooltipText").css("visibility", "visible");
}, function () {
  $(".tooltip .tooltipText").css("visibility", "hidden");
});

var languageFlag = 1;
var language;
var angle;

var buttonClick = function () {
  if (languageFlag == 1) {
    language = "中";
    languageFlag = 0;
    angle = 180;
    splitSeparator = "";
  } else {
    language = "Eng";
    languageFlag = 1;
    angle = 360;
    splitSeparator = " ";
  }
  $("button.circleButton").css("transform", "rotateY(0deg) rotateY(" + angle + "deg)");
  $("button.circleButton").text(language);;
}

$("button.circleButton").dblclick(function () {
  buttonClick();
});


$("button.circleButton").hover(function () {
  $("div.bar").css("visibility", "visible");
  $("div.flag").css("visibility", "visible");
  $("div.label").css("visibility", "visible");
  $('div.flag').text(speed + "ms");
}, function () {
  $("div.bar").css("visibility", "hidden");
  $("div.flag").css("visibility", "hidden");
  $("div.label").css("visibility", "hidden");
})

var fastLimit = 100;
var slowLimit = 1000;

$('button.circleButton').mousedown(function () {
  document.onmousemove = function (e) {
    $("div.bar").css("visibility", "visible");
    $("div.flag").css("visibility", "visible");
    $("div.label").css("visibility", "visible");

    e = e || event;
    let top = e.pageY - 30;
    if (top < 280)
      top = 280;
    if (top > 750)
      top = 750;

    $('button.circleButton').css("top", top + 'px');
    $('div.flag').css("top", top + 25 + 'px')
    $('div.label').css("top", top + 35 + 'px')
    if (top >= 500)
      speed = Math.ceil(top * 800 / 250 - 1400);
    else
      speed = Math.ceil(top * 100 / 220 + 200 - 5000 / 22);
    $('div.flag').text(speed + 'ms');
  }

  document.onmouseup = function () {
    document.onmousemove = null;
    //$("div.bar").css("visibility", "hidden");
    //$("div.flag").css("visibility", "hidden");
    //$("div.label").css("visibility", "hidden");    
  }
});