/*
 * popbox by Boris Popoff (http://gueschla.com)
 *
 * Based on Cody Lindley's Thickbox, MIT License
 *
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */

// on page




window.addEvent('domready', POP_init);


// prevent javascript error before the content has loaded
POP_WIDTH = 0;
POP_HEIGHT = 0;
var POP_doneOnce = 0 ;

// add popbox to href elements that have a class of .popbox
function POP_init(){
	$$("a.popbox").each(function(el){el.onclick=POP_bind});
}

function POP_bind(event) {
	var event = new Event(event);
	// stop default behaviour
	event.preventDefault();
	// remove click border
	this.blur();
	// get caption: either title or name attribute
	var caption = this.title || this.name || "";
	// get rel attribute for image groups
	var group = this.rel || false;
	// display the box for the elements href
	POP_show(caption, this.href, group);
	this.onclick=POP_bind;
	return false;
}


// called when the user clicks on a popbox link
function POP_show(caption, url, rel) {
		
		
		
	// create iframe, overlay and box if non-existent

	if ( !$("POP_overlay") )
	{
		new Element('iframe').setProperty('id', 'POP_HideSelect').injectInside(document.body);
		$('POP_HideSelect').setOpacity(0.2) //make it 50% transparent
		new Element('div').setProperty('id', 'POP_overlay').injectInside(document.body);
		$('POP_overlay').setOpacity(0.2) //make it 50% transparent
		POP_overlaySize();
		new Element('div').setProperty('id', 'POP_load').injectInside(document.body);
		$('POP_load').innerHTML = "<img src='plugins/content/bot_mb/images/loading.gif' />";
             	POP_load_position();
		new Fx.Style('POP_overlay', 'opacity',{duration: 400, transition: Fx.Transitions.sineInOut}).start(0,0.6);

	}
	
	if ( !$("POP_load") )
	{		
		new Element('div').setProperty('id', 'POP_load').injectInside(document.body);
		$('POP_load').innerHTML = "<img src='plugins/content/bot_mb/images/loading.gif' />";
		POP_load_position();
	}
	
	if ( !$("POP_window") )
	{
		new Element('div').setProperty('id', 'POP_window').injectInside(document.body);
		$('POP_window').setOpacity(0.2) //make it 50% transparent
		$('POP_window').setStyle('top', '150px');
	}
	
	$("POP_overlay").onclick=POP_remove;
	window.onscroll=POP_positionEffect;

	// check if a query string is involved
	var baseURL = url.match(/(.+)?/)[1] || url;

	// regex to check if a href refers to an image
	var imageURL = /\.(jpe?g|png|gif|bmp)/gi;

	// check for images
	if ( baseURL.match(imageURL) ) {
		var dummy = { caption: "", url: "", html: "" };
		
		var prev = dummy,
			next = dummy,
			imageCount = "";
			
		// if an image group is given
		if ( rel ) {
			function getInfo(image, id, label) {
				return {
					caption: image.title,
					url: image.href,
					html: "<span id='POP_" + id + "'>&nbsp;&nbsp;<a href='#'>" + label + "</a></span>"
				}
			}
		
			// find the anchors that point to the group
			var imageGroup = [] ;
			$$("a.popbox").each(function(el){
				if (el.rel==rel) {imageGroup[imageGroup.length] = el ;}
			})

			var foundSelf = false;
			
			// loop through the anchors, looking for ourself, saving information about previous and next image
			for (var i = 0; i < imageGroup.length; i++) {
				var image = imageGroup[i];
				var urlTypeTemp = image.href.match(imageURL);
				
				// look for ourself
				if ( image.href == url ) {
					foundSelf = true;
					imageCount = "Image " + (i + 1) + " of "+ (imageGroup.length);
				} else {
					// when we found ourself, the current is the next image
					if ( foundSelf ) {
						next = getInfo(image, "next", "<img id='next' src='plugins/content/bot_mb/images/right.png' />");
						// stop searching
						break;
					} else {
						// didn't find ourself yet, so this may be the one before ourself
						prev = getInfo(image, "prev", "<img  id='prev' src='plugins/content/bot_mb/images/left.png' />");
					}
				}
			}
		}
		
		imgPreloader = new Image();
		imgPreloader.onload = function() {
			imgPreloader.onload = null;

			// Resizing large images
			var x = window.getWidth() - 150;
			var y = window.getHeight() - 150;
			var imageWidth = imgPreloader.width;
			var imageHeight = imgPreloader.height;
			if (imageWidth > x) {
				imageHeight = imageHeight * (x / imageWidth); 
				imageWidth = x; 
				if (imageHeight > y) { 
					imageWidth = imageWidth * (y / imageHeight); 
					imageHeight = y; 
				}
			} else if (imageHeight > y) { 
				imageWidth = imageWidth * (y / imageHeight); 
				imageHeight = y; 
				if (imageWidth > x) { 
					imageHeight = imageHeight * (x / imageWidth); 
					imageWidth = x;
				}
			}
			// End Resizing
			
			// TODO don't use globals
			POP_WIDTH = imageWidth + 30;
			POP_HEIGHT = imageHeight + 60;
			
			// TODO empty window content instead
			$("POP_window").innerHTML += "<a href='' id='POP_ImageOff' title='Close'><img id='POP_Image' src='"+url+"' width='"+imageWidth+"' height='"+imageHeight+"' alt='"+caption+"'/></a>" + "<div id='POP_caption'>"+caption+"<div id='POP_secondLine'>" + imageCount + prev.html + next.html + "</div></div><div id='POP_closeWindow'><a href='#' id='POP_closeWindowButton' title='Close'><img id='close' src='plugins/content/bot_mb/images/close.png' /></a></div>";
			
			$("POP_closeWindowButton").onclick = POP_remove;
			
			function buildClickHandler(image) {
				return function() {
					$("POP_window").remove();
					new Element('div').setProperty('id', 'POP_window').injectInside(document.body);
					
					POP_show(image.caption, image.url, rel);
					return false;
				};
			}
			var goPrev = buildClickHandler(prev);
			var goNext = buildClickHandler(next);
			if ( $('POP_prev') ) {
				$("POP_prev").onclick = goPrev;
			}
			
			if ( $('POP_next') ) {		
				$("POP_next").onclick = goNext;
			}
			
			document.onkeydown = function(event) {
				var event = new Event(event);
				switch(event.code) {
				case 27:
					POP_remove();
					break;
				case 190:
					if( $('POP_next') ) {
						document.onkeydown = null;
						goNext();
					}
					break;
				case 188:
					if( $('POP_prev') ) {
						document.onkeydown = null;
						goPrev();
					}
					break;
				}
			}
			
			// TODO don't remove loader etc., just hide and show later
			$("POP_ImageOff").onclick = POP_remove;
			POP_position();
			POP_showWindow();
		}
		imgPreloader.src = url;
		
	} else { //code to show html pages
		
		var queryString = url.match(/\?(.+)/)[1];
		var params = POP_parseQuery( queryString );
		
		POP_WIDTH = (params['width']*1) + 30;
		POP_HEIGHT = (params['height']*1) + 40;

		var ajaxContentW = POP_WIDTH - 30,
			ajaxContentH = POP_HEIGHT - 45;
		
		if(url.indexOf('POP_iframe') != -1){				
			urlNoQuery = url.split('POP_');		
			$("POP_window").innerHTML += "<div id='POP_title'><div id='POP_ajaxWindowTitle'>"+caption+"</div><div id='POP_closeAjaxWindow'><a href='#' id='POP_closeWindowButton' title='Close'><img id='close' src='plugins/content/bot_mb/images/close.png' /></div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='POP_iframeContent' name='POP_iframeContent' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;' onload='POP_showWindow()'> </iframe>";
		} else {
			$("POP_window").innerHTML += "<div id='POP_title'><div id='POP_ajaxWindowTitle'>"+caption+"</div><div id='POP_closeAjaxWindow'><a href='#' id='POP_closeWindowButton'><img id='close' src='plugins/content/bot_mb/images/close.png' /></a></div></div><div id='POP_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>";
		}
				
		$("POP_closeWindowButton").onclick = POP_remove;
		
			if(url.indexOf('POP_inline') != -1){	
				$("POP_ajaxContent").innerHTML = ($(params['inlineId']).innerHTML);
				POP_position();
				POP_showWindow();
			}else if(url.indexOf('POP_iframe') != -1){
				POP_position();
				if(frames['POP_iframeContent'] == undefined){//be nice to safari
					$(document).keyup( function(e){ var key = e.keyCode; if(key == 27){POP_remove()} });
					POP_showWindow();
				}
			}else{
				var handlerFunc = function(){
					POP_position();
					POP_showWindow();
				};
				var myRequest = new Ajax(url, {method: 'get',update: $("POP_ajaxContent"),onComplete: handlerFunc}).request();
			}
	}

	window.onresize=function(){ POP_position(); POP_load_position(); POP_overlaySize();}  
	
	document.onkeyup = function(event){ 	
		var event = new Event(event);
		if(event.code == 27){ // close
			POP_remove();
		}	
	}
		
}

//helper functions below

function POP_showWindow(){
	//$("POP_load").remove();
	//$("POP_window").setStyles({display:"block",opacity:'0'});
	
	if (POP_doneOnce==0) {
		POP_doneOnce = 1;
		var myFX = new Fx.Style('POP_window', 'opacity',{duration: 250, transition: Fx.Transitions.sineInOut, onComplete:function(){if ($('POP_load')) { $('POP_load').remove();}} }).start(0,1);
	} else {
		$('POP_window').setStyle('opacity',1);
		if ($('POP_load')) { $('POP_load').remove();}
	}
}

function POP_remove() {
 	$("POP_overlay").onclick=null;
	document.onkeyup=null;
	document.onkeydown=null;
	
	if ($('POP_imageOff')) $("POP_imageOff").onclick=null;
	if ($('POP_closeWindowButton')) $("POP_closeWindowButton").onclick=null;
	if ( $('POP_prev') ) { $("POP_prev").onclick = null; }
	if ( $('POP_next') ) { $("POP_next").onclick = null; }

	new Fx.Style('POP_window', 'opacity',{duration: 250, transition: Fx.Transitions.sineInOut, onComplete:function(){$('POP_window').remove();} }).start(1,0);
	new Fx.Style('POP_overlay', 'opacity',{duration: 400, transition: Fx.Transitions.sineInOut, onComplete:function(){$('POP_overlay').remove();} }).start(0.6,0);

	window.onscroll=null;
	window.onresize=null;	
	
	$('POP_HideSelect').remove();
	POP_init();
	POP_doneOnce = 0;
	return false;
}

function POP_position() {
	
	if (window.opera){
	
	$("POP_window").setStyles({width: POP_WIDTH+'px', 
				 left: (window.getScrollLeft() + (window.getWidth() - POP_WIDTH)/2)+'px',
				 top: (window.getScrollTop() + (window.getHeight() - POP_HEIGHT)/11)+'px'});
				 //top: '170px'});
				 }else{
					$("POP_window").setStyles({width: POP_WIDTH+'px', 
				 left: (window.getScrollLeft() + (window.getWidth() - POP_WIDTH)/2)+'px',
				 top: (window.getScrollTop() + (window.getHeight() - POP_HEIGHT)/2)+'px'});
				 //top: '170px'});	 
					 
					 
				 }
}

function POP_positionEffect() {
	
	
	if (window.opera){
	
	new Fx.Styles('POP_window', {duration: 75, transition: Fx.Transitions.sineInOut}).start({
		'left':(window.getScrollLeft() + (window.getWidth() - POP_WIDTH)/2)+'px',
		//'top':(window.getScrollTop() + (window.getHeight() - POP_HEIGHT)/2)+'px'});
		'top':(window.getScrollTop() + (window.getHeight() - POP_HEIGHT)/11)+'px'});
}else{
	
	
	new Fx.Styles('POP_window', {duration: 75, transition: Fx.Transitions.sineInOut}).start({
		'left':(window.getScrollLeft() + (window.getWidth() - POP_WIDTH)/2)+'px',
		//'top':(window.getScrollTop() + (window.getHeight() - POP_HEIGHT)/2)+'px'});
		'top':(window.getScrollTop() + (window.getHeight() - POP_HEIGHT)/2)+'px'});
	
	
	
	
}
		
		
		
}

function POP_overlaySize(){
	// we have to set this to 0px before so we can reduce the size / width of the overflow onresize 
	$("POP_overlay").setStyles({"height": '0px', "width": '0px'});
	$("POP_HideSelect").setStyles({"height": '0px', "width": '0px'});
	$("POP_overlay").setStyles({"height": window.getScrollHeight()+'px', "width": window.getScrollWidth()+'px'});
	$("POP_HideSelect").setStyles({"height": window.getScrollHeight()+'px',"width": window.getScrollWidth()+'px'});
}

function POP_load_position() {
	if ($("POP_load")) { $("POP_load").setStyles({left: (window.getScrollLeft() + (window.getWidth() - 56)/2)+'px', top: (window.getScrollTop() + ((window.getHeight()-20)/2))+'px',display:"block"}); }
}

function POP_parseQuery ( query ) {
	// return empty object
	if( !query )
		return {};
	var params = {};
	
	// parse query
	var pairs = query.split(/[;&]/);
	for ( var i = 0; i < pairs.length; i++ ) {
		var pair = pairs[i].split('=');
		if ( !pair || pair.length != 2 )
			continue;
		// unescape both key and value, replace "+" with spaces in value
		params[unescape(pair[0])] = unescape(pair[1]).replace(/\+/g, ' ');
   }
   return params;

}
