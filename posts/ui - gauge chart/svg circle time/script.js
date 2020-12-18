class Clock {
  constructor(id) {
    const el = document.getElementById(id);
    this.unitHr = el.querySelector('.clock__unit--hours');
    this.unitMin = el.querySelector('.clock__unit--minutes');
    this.unitSec = el.querySelector('.clock__unit--seconds');
    this.timeText = el.querySelector('.time');
    this.timeFormat = el.querySelector('.time-format');

    this.setTime();
    this.init();
  }

  buildTimeRings(h, m, s) {
    const hours = h / 24 * 100;
    const minutes = m / 60 * 100;
    const seconds = s / 60 * 100;

    this.progress(this.unitHr, hours);
    this.progress(this.unitMin, minutes);
    this.progress(this.unitSec, seconds);
  }

  checkTime(unit) {
    if (unit < 10) unit = `0${unit}`;
    return unit;
  }

  formatHours(hours) {
    if (this.timeFormat.checked) {
      hours = hours % 12;
      hours = hours ? hours : 12;
    }

    return hours;
  }

  progress(unit, percent) {
    const radius = unit.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    unit.style.strokeDasharray = `${circumference} ${circumference}`;
    unit.style.strokeDashoffset = circumference - percent / 100 * circumference;

    if (percent < 1) {
      unit.style.transitionTimingFunction = 'cubic-bezier(0.85, 0, 0.05, 1)';
    } else {
      unit.style.transitionTimingFunction = 'linear';
    }
  }

  setTime() {
    const now = new Date();
    const hours = this.checkTime(now.getHours());
    const minutes = this.checkTime(now.getMinutes());
    const seconds = this.checkTime(now.getSeconds());

    this.buildTimeRings(hours, minutes, seconds);
    this.timeText.innerHTML = `${this.formatHours(hours)}:${minutes}`;
  }

  init() {
    setInterval(this.setTime.bind(this), 10);
  }}


let clock = new Clock("clock");