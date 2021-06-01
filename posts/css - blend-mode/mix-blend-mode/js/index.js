var modeList = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity'
],
	elem = document.querySelector('.box'),
  propertyName = 'mix-blend-mode',
  modeElem = document.querySelector('.mode-name'),
  duration = 2500;

var i = 0;
var activate = setInterval(function() {
  if (i == modeList.length) i = 0;
  var mode = modeList[i]
  elem.style.mixBlendMode = mode;
  modeElem.innerText = mode;
  i++;
},duration);

activate();