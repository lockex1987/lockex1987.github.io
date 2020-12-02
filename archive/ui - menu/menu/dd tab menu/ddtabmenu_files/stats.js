/*
BuySellAds.com Tracking Code
*/
var bsa = {
	
	init:function(){
		var zclass = 'adblock';
		bsa.impression(zclass);
		var zoneClass = bsa.getElementsByClass(document,zclass,'div');
		for(var j=0;j<zoneClass.length;j++){
			var zone = zoneClass[j];
			var links = zone.getElementsByTagName('a');
			var externalRex = /^http[s]*:\/\/+/;
			var banners = new Array();
			for(var i=0;i<links.length;i++){
				var link = links[i];
				if(externalRex.exec(link.href)){
					banners[i] = bsa.trim(links[i].id,'b');
					eval( 
					"var fn = function(){"
					+ "bsa.track(this,zone);"
					+ "return false;"
					+ "}" 
					);
					bsa.add_event(link,"click",fn);
				}
			}
			bsa.adverts(banners);
		}
	},

	add_event:function(obj,type,fn){
		if(obj.attachEvent){
			obj['e'+type+fn] = fn;
			obj[type+fn] = function(){
				obj['e'+type+fn](window.event);
			}
			obj.attachEvent('on'+type,obj[type+fn]);
		}else{
			obj.addEventListener(type,fn,false);
		}
	},

	track:function(link,zone){
		var url = link.href;
		var b = bsa.trim(link.getAttribute("id"),'b');
		var z = bsa.trim(zone.getAttribute("id"),'z');
		var trimg = new Image();
		trimg.src = "http://stats.buysellads.com/click.gif?b="+b+"&z="+z;
		bsa.pause();
		//trimg.onload = function(){ 
		//	document.location.href=url; 
		//};
	},

	getElementsByClass:function(node,searchClass,tag){
		var classElements = new Array();
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		//var pattern = new RegExp(searchClass);
		var pattern = new RegExp("\\b"+searchClass+"\\b");
		for(i=0,j=0;i<elsLen;i++){
			if(pattern.test(els[i].className)){
				classElements[j] = els[i];
				j++;
			}
		}
		return classElements;
	},
	
	pause:function(){
		var t=500;
		var now=new Date();
		var stop=now.getTime()+t;
		while(now.getTime()<stop)
		var now=new Date();
	},
	
	trim:function(e,type){
		if(e){
			if(type=='b'){
				str='bsa_';
			}else if(type=='z'){
				str='bsaz_';
			}
			return e.replace(str,'');
		}else{
			return;
		}
	},

	impression:function(e){
		var zc = bsa.getElementsByClass(document,e,'div');
		for(var j=0;j<zc.length;j++){
			var z = bsa.trim(zc[j].getAttribute("id"),'z');
			var trImg = new Image();
			trImg.src = "http://stats.buysellads.com/imp.gif?z="+z;
			trImg.onload = function(){};
		}
	},
	
	adverts:function(bnrs){
		var b = bnrs.join(';');
		var banTrImg = new Image();
		banTrImg.src = "http://stats.buysellads.com/imp.gif?b="+b;
		banTrImg.onload = function(){};
	}

};
bsa.init();