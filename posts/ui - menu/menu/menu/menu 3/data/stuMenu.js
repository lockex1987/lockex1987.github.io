/* ================================================================ 
This copyright notice must be untouched at all times.

The original version of this scriptt and the associated (x)html
is available at http://www.stunicholls.com/menu/pro_dropline_6.html
Copyright (c) 2005-2008 Stu Nicholls. All rights reserved.
This script and the associated (x)html may be modified in any 
way to fit your requirements.
=================================================================== */

var getCurrent = document.getElementById('menu').getElementsByTagName("LI");
for (var i=0; i<getCurrent.length; i++) {
	if (getCurrent[i].className == "clicked") {
		ulId = getCurrent[i].id.replace("li", "ul");
		document.getElementById(ulId).style.top = 30 + "px";
	}
}

var getEls = document.getElementById('menu').getElementsByTagName("LI");
var getListElts = document.getElementById('submenus').getElementsByTagName("UL");
var getAgn = getEls;

for (var i=0; i<getEls.length; i++) {
	getEls[i].onmouseover=function() {
		this.className = 'clicked';
		
		for (var z=0; z<getAgn.length; z++) {
			if (this.id != getAgn[z].id){
				getAgn[z].className = '';
			}
		}
		ulId = this.id.replace("li", "ul");
		if (document.getElementById(ulId).style.top < 30 + "px") {
			moveIt(0, 31, ulId);
		}
		
		for (var i=0; i<getListElts.length; i++) {
			if (ulId != getListElts[i].id && getListElts[i].style.top > 0 + "px"){
				thisSub = getListElts[i].id;
				moveIt(29, -1, thisSub);
			}
		}
	}
}

function moveIt (cY, fY, sub) {
	if (cY > fY) {
		cY--;
	} else {
		cY++;
	}
	if (cY != fY) {
		document.getElementById(sub).style.top = cY + "px";
		setTimeout ("moveIt("+cY+","+fY+",'"+sub+"')", 10);
	}
}