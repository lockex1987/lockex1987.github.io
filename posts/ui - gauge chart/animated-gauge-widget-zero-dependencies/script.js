var gauge1 = Gauge(
  document.getElementById("gauge1"), {
    max: 100,
    dialStartAngle: -90,
    dialEndAngle: -90.001,
    value: 100,
    label: function(value) {
      return Math.round(value * 100) / 100;
    }
  }
);

var gauge2 = Gauge(
  document.getElementById("gauge2"), {
    min: -50,
    max: 50,
    dialStartAngle: 180,
    dialEndAngle: 0,
    value: 50,
     color: function(value) {
        if(value < -25) {
          return "#5ee432";
        }else if(value < 0) {
          return "#fffa50";
        }else if(value < 25) {
          return "#f7aa38";
        }else {
          return "#ef4655";
        }
      }
  }
);

var gauge3 = Gauge(
  document.getElementById("gauge3"), {
    max: 100,
    value: 50
  }
);

var gauge4 = Gauge(
  document.getElementById("gauge4"), {
    max: 30000,
    dialStartAngle: 90,
    dialEndAngle: 0,
    value: 50
  }
);

var gauge5 = Gauge(
  document.getElementById("gauge5"), {
    max: 200,
    dialStartAngle: 0,
    dialEndAngle: -180,
    value: 50
  }
);

var gauge6 = Gauge(
  document.getElementById("gauge6"), {
    max: 100,
    dialStartAngle: 90.01,
    dialEndAngle: 89.99,
    dialRadius: 10,
    showValue: false,
    value: 50
  }
);


var gauge7 = Gauge(
  document.getElementById("gauge7"), {
    max: 100,
    dialStartAngle: -90,
    dialEndAngle: -90.001,
    value: 100,
    showValue: false,
    label: function(value) {
      return Math.round(value * 100) / 100;
    }
  }
);


(function loop() {
  var value1 = Math.random() * 100,
      value2 = Math.random() * 100,
      value3 = Math.random() * 100,
      value4 = Math.random() * 100,
      value5 = Math.random() * 100;

  // setValueAnimated(value, durationInSecs);
  gauge1.setValueAnimated(value1, 1);
  gauge2.setValueAnimated(50 - value2, 2);
  gauge3.setValueAnimated(value3, 1.5);
  gauge4.setValueAnimated(value4 * 300, 2);
  gauge5.setValueAnimated(value5 * 2, 1);
  gauge6.setValueAnimated(value1, 1);
  gauge7.setValueAnimated(value1, 1);
  window.setTimeout(loop, 6000);
})();