var canvas = document.getElementById('canvas');

var winMin = Math.min(window.innerWidth,window.innerHeight);
canvas.width = winMin;
canvas.height = winMin;

var ctx = canvas.getContext('2d');

/* globalCompositeOperation :
  normal | multiply | screen | overlay | 
  darken | lighten | color-dodge | color-burn | hard-light | 
  soft-light | difference | exclusion | hue | saturation | 
  color | luminosity
*/
ctx.globalCompositeOperation = 'multiply';

//magenta
ctx.fillStyle = 'rgb(255,0,255)';
ctx.beginPath();
ctx.arc(100, 100, 100, 0, Math.PI*2, true); 
ctx.closePath();
ctx.fill();

//cyan
ctx.fillStyle = 'rgb(0,255,255)';
ctx.beginPath();
ctx.arc(200, 100, 100, 0, Math.PI*2, true); 
ctx.closePath();
ctx.fill();

//yellow
ctx.fillStyle = 'rgb(255,255,0)';
ctx.beginPath();
ctx.arc(150, 200, 100, 0, Math.PI*2, true); 
ctx.closePath();
ctx.fill();