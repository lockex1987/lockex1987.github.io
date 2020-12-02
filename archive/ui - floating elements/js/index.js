function domReady() {

  // VAR INIT
  
  var floatingSectionEl = document.querySelector('#floatingElSection'),
      floatingImgElR = document.querySelector('#floatingElImgR'),
      floatingImgElL = document.querySelector('#floatingElImgL'),
      floatingElWrapper = document.querySelector('#floatingElWrapper'), 
      ticking = false;

  // FUNCTIONS
  
  function calculateOffsetPercentage(el, perc, wrapper, offset){
    const percentageFromTop = ((wrapper.getBoundingClientRect().top + wrapper.getBoundingClientRect().height) * 100 / (window.innerHeight + wrapper.getBoundingClientRect().height)) - 50;
    return (percentageFromTop * perc) - 50 + offset;
  }

  function calculateOffsetPixels(el, amount, wrapper, offset){
    const percentageFromTop = ((wrapper.getBoundingClientRect().top + wrapper.getBoundingClientRect().height) * 100 / (window.innerHeight + wrapper.getBoundingClientRect().height));
    const maxPercentage = amount * 100 / window.innerHeight;
    return ((maxPercentage * percentageFromTop / 100) - (maxPercentage / 2)) - 50 + offset;
  }

  function moveElement(el, wrapper){
    const movementType = _.find(el.attributes, { 'nodeName': 'data-movement-type' }) !== undefined ? _.find(el.attributes, { 'nodeName': 'data-movement-type' }).nodeValue : 'perc';
    const finalTime = _.find(el.attributes, { 'nodeName': 'data-movement-time' }) !== undefined ? parseFloat(_.find(el.attributes, { 'nodeName': 'data-movement-time' }).nodeValue) : 1;
    const finalAddedOffset = _.find(el.attributes, { 'nodeName': 'data-movement-offset' }) !== undefined ? parseFloat(_.find(el.attributes, { 'nodeName': 'data-movement-offset' }).nodeValue) : 0;
    let finalValueOffset;
    switch(movementType) {
      case 'px':
          let pixelAmount = _.find(el.attributes, { 'nodeName': 'data-movement-pixel-amount' }) !== undefined ? parseFloat(_.find(el.attributes, { 'nodeName': 'data-movement-pixel-amount' }).nodeValue) : 100;
          finalValueOffset = calculateOffsetPixels(el, pixelAmount, wrapper, finalAddedOffset);
          break;
      case 'perc':
          let percAmount = _.find(el.attributes, { 'nodeName': 'data-movement-perc-amount' }) !== undefined ? parseFloat(_.find(el.attributes, { 'nodeName': 'data-movement-perc-amount' }).nodeValue) : 1;
          finalValueOffset = calculateOffsetPercentage(el, percAmount, wrapper, finalAddedOffset);
          break;
      default:
          let defaultAmount = _.find(el.attributes, { 'nodeName': 'data-movement-perc-amount' }) !== undefined ? parseFloat(_.find(el.attributes, { 'nodeName': 'data-movement-perc-amount' }).nodeValue) : 1;
          finalValueOffset = calculateOffsetPercentage(el, defaultAmount, wrapper, finalAddedOffset);
    }
    const tl = new TimelineMax();
    tl.to(el, finalTime, {transform: "translate3d(0%," + finalValueOffset + "% ,0)", ease: Power2.easeOut});
  }
  
  function moveItMoveIt() {
    //Move Text
    moveElement(floatingSectionEl, floatingElWrapper);
    //Move Img
    moveElement(floatingImgElR, floatingElWrapper);
    moveElement(floatingImgElL, floatingElWrapper);
  }
  
  // EVENT LISTENERS
  
  window.addEventListener('scroll', function(e) {
    moveItMoveIt();
  });
  
  window.addEventListener('resize', function(e) {
    moveItMoveIt();
  });
  
}


// Dom ready implementation
// Mozilla, Opera, Webkit
if (document.addEventListener) {
  document.addEventListener(
    "DOMContentLoaded",
    function() {
      document.removeEventListener("DOMContentLoaded", arguments.callee, false);
      domReady();
    },
    false
  );

  // If IE event model is used
} else if (document.attachEvent) {
  // ensure firing before onload
  document.attachEvent("onreadystatechange", function() {
    if (document.readyState === "complete") {
      document.detachEvent("onreadystatechange", arguments.callee);
      domReady();
    }
  });
}