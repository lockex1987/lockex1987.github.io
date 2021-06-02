/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2009, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
if(typeof (nitobi)=="undefined"||typeof (nitobi.lang)=="undefined"){
alert("The Nitobi framework source could not be found. Is it included before any other Nitobi components?");
}
nitobi.lang.defineNs("nitobi.fisheye");
if(false){
nitobi.fisheye=function(){
};
}
nitobi.fisheye.FishEye=function(id){
nitobi.fisheye.FishEye.baseConstructor.call(this,id);
this.renderer.setTemplate(nitobi.fisheye.renderer);
this.yBoundary=this.getIntAttribute("yboundary");
this.iconWidth=this.getIntAttribute("iconwidth");
this.growPercent=this.getIntAttribute("growpercent")/100;
this.openDirection=this.getAttribute("opendirection").toUpperCase();
this.expandDirection=this.getAttribute("expanddirection").toUpperCase();
this.theme=this.getAttribute("theme");
if((this.theme==null)||(this.theme=="")){
this.theme="nitobi";
}
if(this.yBoundary==0){
this.yBoundary=this.iconWidth;
}
this.eD=null;
if(this.expandDirection=="RIGHT"){
this.eD=0;
}
if(this.expandDirection=="LEFT"){
this.eD=1;
}
if(this.expandDirection=="CENTER"){
this.eD=2;
}
this.minWidth=0;
this.iconArea=this.iconWidth;
this.containerPadding=this.iconArea*0.06;
this.rangeSensitivity=2.2;
this.highindex=0;
this.mouseX=0;
this.mouseY=0;
this.labeltext="";
this.lastBounce=0;
this.iteratetimer=null;
this.restartIterator=null;
this.timerObj=null;
this.disableIterator=null;
this.useIterator=true;
this.startedIKillTimer=false;
this.bounceOnClick=true;
this.renderTimes=0;
fisheyeList.push(this);
};
nitobi.lang.extend(nitobi.fisheye.FishEye,nitobi.ui.Container);
nitobi.fisheye.FishEye.profile=new nitobi.base.Profile("nitobi.fisheye.FishEye",null,false,"ntb:fisheye");
nitobi.base.Registry.getInstance().register(nitobi.fisheye.FishEye.profile);
var fisheyeList=new Array();
nitobi.fisheye.FishEye.isMouseAttached=false;
nitobi.fisheye.FishEye.prototype.render=function(){
if(this.renderTimes==0){
nitobi.fisheye.FishEye.base.render.call(this);
this.renderContainers();
this.renderItems();
this.updateMenuPosition();
this.reDrawItems();
if(nitobi.fisheye.FishEye.isMouseAttached==false){
nitobi.html.attachEvent(document.body,"mousemove",handleMouse);
nitobi.html.attachEvent(window,"resize",nitobi.fisheye.FishEye.handleResize);
nitobi.fisheye.FishEye.isMouseAttached=true;
nitobi.fisheye.FishEye.continuousPositionCheck();
}
this.renderTimes++;
}else{
while(this.MasterContainer.hasChildNodes()){
var _2=this.MasterContainer;
_2.removeChild(_2.childNodes[0]);
}
this.minWidth=0;
this.renderItems();
this.updateMenuPosition();
this.reDrawItems();
this.renderTimes++;
}
this.labelObj.style.width="50px";
};
nitobi.fisheye.FishEye.performContinuousPositionCheck=200;
nitobi.fisheye.FishEye.continuousPositionCheck=function(){
if(nitobi.fisheye.FishEye.performContinuousPositionCheck>0){
window.setTimeout("nitobi.fisheye.FishEye.handleResize();nitobi.fisheye.FishEye.continuousPositionCheck();",nitobi.fisheye.FishEye.performContinuousPositionCheck);
}
};
nitobi.fisheye.FishEye.prototype.renderContainers=function(){
var _3=$ntb(this.getId());
this.labelObj=nitobi.fisheye.FishEye.createLabel();
this.labelObj.setAttribute("id",this.getId()+".label");
_3.appendChild(this.labelObj);
this.MasterContainer=nitobi.fisheye.FishEye.createContainer();
this.MasterContainer.setAttribute("id",this.getId()+".master");
_3.appendChild(this.MasterContainer);
this.BGContainer=nitobi.fisheye.FishEye.createBackground(this.theme);
this.BGContainer.setAttribute("id",this.getId()+".background");
_3.appendChild(this.BGContainer);
};
nitobi.fisheye.FishEye.prototype.updateMenuPosition=function(){
var _4=nitobi.html.getCoords(this.getHtmlNode());
this.MasterContainer.style.top=(_4.y+this.containerPadding)+"px";
this.MasterContainer.style.left=(_4.x+this.containerPadding)+"px";
this.x=(_4.x+this.containerPadding);
this.y=(_4.y+this.containerPadding);
};
nitobi.fisheye.FishEye.prototype.positionLabel=function(_5,x,y){
if(_5!=null){
if(this.labeltext!=_5){
this.labelObj.style.width="";
this.labelObj.innerHTML=_5;
this.labeltext=_5;
if(nitobi.browser.OPERA){
this.labelObj.style.width="75px";
}else{
this.labelObj.style.width=this.labelObj.offsetWidth+"px";
}
}
this.labelObj.style.visibility="visible";
this.labelObj.style.left=(x-this.labelObj.offsetWidth/2)+"px";
this.labelObj.style.top=y+"px";
}else{
this.labelObj.style.visibility="hidden";
}
};
nitobi.fisheye.FishEye.prototype.handleBounce=function(_8){
var _9=this.get(_8);
var _a=this;
_9.bounceIt+=0.045;
if(_9.bounceIt>1){
_9.bounceIt-=1;
}
_9.yoffset=Math.sin(_9.bounceIt*3.1415926)*(this.growPercent*this.iconWidth*0.13);
this.iteratetimer=setTimeout(function(){
_a.reDrawItems();
},30);
_9.bounceTimer=setTimeout(function(){
_a.handleBounce(_8);
},30);
};
nitobi.fisheye.FishEye.prototype.bounceItem=function(_b,_c){
var _d=this;
var _e=this.get(this.lastBounce);
var _f=this.get(_b);
_e.bounceIt=0;
_e.yoffset=0;
clearTimeout(_e.bounceTimer);
_f.bounceIt=0;
this.lastBounce=_b;
clearTimeout(_f.bounceTimer);
clearTimeout(this.bounceKiller);
clearTimeout(this.iteratetimer);
this.bounceKiller=setTimeout(function(){
clearTimeout(_f.bounceTimer);
_d.get(_b).yoffset=0;
},_c);
this.handleBounce(_b);
};
nitobi.fisheye.FishEye.prototype.renderItems=function(){
var _10=true;
var obj=this;
var t;
this.loaded=true;
for(t=0;t<this.getLength();t++){
var _13=this.get(t);
var _14=this.iconWidth;
var _15=this.iconWidth;
var mo;
if(nitobi.browser.IE6){
mo=document.createElement("div");
mo.style.height=_15;
mo.style.width=_14;
mo.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this.get(t).src+"', sizingMethod='scale'); ";
}else{
mo=document.createElement("img");
mo.src=this.get(t).src;
mo.style.height=_15+"px";
mo.style.width=_14+"px";
}
mo.style.position="absolute";
mo.style.cursor="pointer";
mo.style.visibility="visible";
mo.style.top="0px";
mo.style.left=this.minWidth+"px";
_13.img=mo;
_13.myx=this.minWidth;
_13.startWidth=_14;
_13.startHeight=_15;
_13.currentWidth=_14;
_13.currentHeight=_15;
_13.img.onclick=function(){
if(obj.bounceOnClick){
obj.bounceItem(obj.highindex,5000);
}
obj.get(obj.highindex).onClick.notify();
};
this.minWidth+=this.iconArea;
this.iconHeight=_15;
this.MasterContainer.style.width=this.minWidth+"px";
this.MasterContainer.appendChild(mo);
}
this.setStyle("width",this.minWidth+this.containerPadding*2+"px");
this.setStyle("height",_15+this.containerPadding*2+"px");
this.MasterContainer.style.visibility="visible";
this.MasterContainer.style.height=this.iconWidth+"px";
this.BGContainer.style.visibility="visible";
obj.labelObj.style.display="none";
setTimeout(function(){
obj.labelObj.style.visibility="hidden";
obj.labelObj.style.display="block";
},700);
};
nitobi.fisheye.FishEye.prototype.reDrawItems=function(){
var f;
var ol=this.getLength();
var w,h;
var ms,rs,nw,nh,cx,cy,mo;
var _22=false;
var fds=this;
var _24,_25,_26;
clearTimeout(this.iteratetimer);
var _27=0;
var lof=0;
if((this.useIterator)&&(!this.startedIKillTimer)&&(this.foundActive)){
this.startedIKillTimer=true;
clearTimeout(this.disableIterator);
this.disableIterator=setTimeout(function(){
fds.useIterator=false;
},400);
}
clearTimeout(this.restartIterator);
_24=0;
_26=0;
for(f=0;f<ol;f++){
mo=this.get(f);
ms=mo.mysize;
if(ms>0.01){
if((ms>mo.lastsize)&&(this.useIterator)){
rs=mo.lastsize+((ms-mo.lastsize)/4.5);
mo.lastsize=rs;
}else{
mo.lastsize=ms;
rs=ms;
}
_27=rs/ms;
}else{
ms=0;
if(this.useIterator){
rs=mo.lastsize+((ms-mo.lastsize)/4.5);
}else{
rs=ms;
}
mo.lastsize=rs;
}
w=mo.startWidth;
h=mo.startHeight;
nw=w*(((this.growPercent-1)*rs)+1);
nh=h*(((this.growPercent-1)*rs)+1);
mo.currentWidth=nw;
mo.currentHeight=nh;
mo.xoffset=(nw-w);
_26+=(nw-w);
if(rs>0.01){
_22=true;
}
}
if(this.highindex==-1){
this.labelObj.style.visibility="hidden";
}
if((this.eD==2)||(this.eD==0)){
lof=(this.iconWidth/2);
}else{
lof=0-(this.iconWidth/2);
}
if((this.eD==2)&&(this.highindex>-1)){
for(f=0;f<ol;f++){
mo=this.get(f);
ms=mo.mysize;
nw=mo.currentWidth;
nh=mo.currentHeight;
mo.img.style.width=nw+"px";
mo.img.style.height=nh+"px";
_24=(1-mo.mysize)*(_26/2)*(1+(this.growPercent/11));
if((this.mouseX-this.x)>=(mo.myx+(mo.startWidth/2))){
cx=(mo.startWidth)+(mo.myx-((nw)/2)-_24);
mo.img.style.left=cx+"px";
}
if((this.mouseX-this.x)<(mo.myx+(mo.startWidth/2))){
cx=_24+(mo.startWidth)+(mo.myx-((nw)/2));
mo.img.style.left=cx+"px";
}
if(this.openDirection=="UP"){
cy=-(mo.currentHeight-mo.startHeight+mo.yoffset);
cy-=ms*(this.iconArea/3);
mo.img.style.top=cy+"px";
if(f==this.highindex){
this.positionLabel(mo.imgLabel,this.x+cx+(nw/2)-lof,this.y+cy-23);
}
}else{
cy=mo.yoffset;
cy+=ms*(this.iconArea/3);
mo.img.style.top=cy+"px";
if(f==this.highindex){
this.positionLabel(mo.imgLabel,this.x+cx+(nw/2)-lof,this.y+nh+cy);
}
}
}
}
if((this.eD==0)||((this.eD==2)&&(this.highindex==-1))){
for(f=0;f<ol;f++){
mo=this.get(f);
ms=mo.mysize;
nw=mo.currentWidth;
nh=mo.currentHeight;
mo.img.style.width=nw+"px";
mo.img.style.height=nh+"px";
if(f>0){
_24+=(this.get(f-1).xoffset/2)*(1+(this.growPercent/2.5));
}
cx=_24+(mo.startWidth/2)+(mo.myx-((nw)/2))+(nw/2);
mo.img.style.left=cx+"px";
if(this.openDirection=="UP"){
cy=-(mo.currentHeight-mo.startHeight+mo.yoffset);
cy-=ms*(this.iconArea/3);
mo.img.style.top=cy+"px";
if(f==this.highindex){
this.positionLabel(mo.imgLabel,this.x+cx+(nw/2)-lof,this.y+cy-23);
}
}else{
cy=mo.yoffset;
cy+=ms*(this.iconArea/3);
mo.img.style.top=cy+"px";
if(f==this.highindex){
this.positionLabel(mo.imgLabel,this.x+cx+(nw/2)-lof,this.y+nh+cy);
}
}
}
}
if(this.eD==1){
for(f=ol-1;f>=0;f--){
mo=this.get(f);
ms=mo.mysize;
nw=mo.currentWidth;
nh=mo.currentHeight;
mo.img.style.width=nw+"px";
mo.img.style.height=nh+"px";
if(f<(ol-1)){
_24+=(this.get(f+1).xoffset/2)*(1+(this.growPercent/2.5));
}
cx=(mo.startWidth/2)+(mo.myx-((nw)/2)-_24)-nw/2;
mo.img.style.left=cx+"px";
if(this.openDirection=="UP"){
cy=-(mo.currentHeight-mo.startHeight+mo.yoffset);
cy-=ms*(this.iconArea/3);
mo.img.style.top=cy+"px";
if(f==this.highindex){
this.positionLabel(mo.imgLabel,this.x+cx+(nw/2),this.y+cy-23);
}
}else{
cy=mo.yoffset;
cy+=ms*(this.iconArea/3);
mo.img.style.top=cy+"px";
if(f==this.highindex){
this.positionLabel(mo.imgLabel,this.x+cx+(nw/2)-lof,this.y+nh+cy);
}
}
}
}
var mox=0;
for(f=0;f<ol;f++){
mo=this.get(f);
mox=mo.img.style.left.replace("px","");
mo.img.style.left=(parseFloat(mox)-lof)+"px";
}
this.currentxoffset=_24;
var ls=parseInt(this.MasterContainer.style.left.replace("px",""))+parseInt(this.get(0).img.style.left.replace("px",""));
this.BGContainer.style.left=(ls-this.containerPadding)+"px";
this.BGContainer.style.top=(parseInt(this.MasterContainer.style.top.replace("px",""))-this.containerPadding)+"px";
this.BGContainer.style.height=(parseInt(this.MasterContainer.offsetHeight)+this.containerPadding+this.containerPadding)+"px";
this.BGContainer.style.width=(parseInt(this.get(this.getLength()-1).img.style.left.replace("px",""))+(parseInt(this.get(this.getLength()-1).img.style.width.replace("px","")))-parseInt(this.get(0).img.style.left.replace("px",""))+this.containerPadding+this.containerPadding)+"px";
if((_22)&&((this.useIterator)||(!this.foundActive))){
this.iteratetimer=setTimeout(function(){
fds.reDrawItems();
},40);
}else{
this.startedIKillTimer=false;
clearTimeout(this.disableIterator);
this.restartIterator=setTimeout(function(){
clearTimeout(fds.disableIterator);
fds.startedIKillTimer=false;
fds.useIterator=true;
},420);
}
};
nitobi.fisheye.FishEye.createContainer=function(){
var _2b=document.createElement("div");
_2b.style.position="absolute";
_2b.style.visibility="hidden";
_2b.style.zIndex="999990";
return _2b;
};
nitobi.fisheye.FishEye.createBackground=function(){
var _2c=document.createElement("div");
_2c.className="ntb-fisheye-menubackground";
_2c.style.zIndex="99999";
_2c.style.filter="alpha(opacity="+(0.65*100)+")";
_2c.style.position="absolute";
_2c.style.visibility="hidden";
_2c.style.width="100px";
_2c.style.height="100px";
_2c.style.top="100px";
_2c.style.top="100px";
return _2c;
};
nitobi.fisheye.FishEye.createLabel=function(_2d){
var _2e=document.createElement("div");
_2e.className="ntb-fisheye-label";
_2e.style.position="absolute";
_2e.style.visibility="visible";
_2e.style.height="1px";
_2e.style.top="1px";
_2e.style.left="1px";
_2e.innerHTML="blank";
_2e.style.whiteSpace="nowrap";
_2e.style.visibility="hidden";
_2e.style.width="50px";
_2e.style.height="15px";
_2e.style.filter="alpha(opacity="+(0.85*100)+")";
return _2e;
};
nitobi.fisheye.FishEye.handleResize=function(){
for(t=0;t<fisheyeList.length;t++){
var f=fisheyeList[t];
var _30=nitobi.html.getCoords(f.getHtmlNode());
if(f.lastCoords==null||f.lastCoords.x!=_30.x||f.lastCoords.y!=_30.y){
f.lastCoords=_30;
f.updateMenuPosition();
f.reDrawItems();
}
}
};
function handleMouse(_31){
var sP=nitobi.html.getScroll();
var _33=false;
var _34,_35;
var _36=false;
var _37=0;
_34=_31.clientX+sP.left;
_35=_31.clientY+sP.top;
var t,f,w,h,x,y,o,ol,p,q,_42,_43;
var _44=fisheyeList.length;
for(t=0;t<_44;t++){
o=fisheyeList[t];
if(o.loaded){
w=o.iconWidth;
h=o.iconHeight;
ol=o.getLength();
o.highval=0;
o.highindex=-1;
o.foundActive=false;
_36=false;
_37=0;
for(f=0;f<ol;f++){
var _45=o.get(f);
if(_45.mysize>0.01){
_33=true;
}
x=o.x+_45.myx+(w/2);
y=o.y+_45.myy+(h/2);
if(o.eD==2){
p=Math.abs(x-_34);
}
if(o.eD==0){
p=Math.abs(x-_34+o.iconWidth/2+(o.currentxoffset*(f/ol)));
}
if(o.eD==1){
p=Math.abs(x-_34-(o.iconWidth/2)-(o.currentxoffset*((ol-f)/ol)));
}
q=Math.abs(y-_35);
_42=p;
if(q>o.yBoundary){
q=1000;
}
if((p<(w*o.rangeSensitivity))&&(q<(h*1.5))){
_33=true;
o.mouseX=_34;
o.mouseY=_35;
o.foundActive=true;
_43=1-(_42/(w*o.rangeSensitivity));
_45.mysize=_43;
if(o.highval<_43){
o.highval=_43;
o.highindex=f;
_37=q;
}
}else{
_45.mysize=0;
}
}
if(_37>(o.iconWidth*0.8)){
o.foundActive=false;
_33=false;
_36=true;
for(f=0;f<ol;f++){
o.foundActive=false;
_33=true;
o.highval=0;
}
}
if(!o.foundActive){
o.useIterator=true;
}
if((_33)||(o.highindex>-1)){
o.reDrawItems();
}
}
}
}
nitobi.lang.defineNs("nitobi.fisheye");
nitobi.fisheye.MenuItem=function(_46){
nitobi.fisheye.MenuItem.baseConstructor.call(this,_46);
this.src=this.getAttribute("imagesrc");
this.imgLabel=this.getAttribute("label");
this.onClick=new nitobi.base.Event();
this.eventMap["click"]=this.onClick;
this.subscribeDeclarationEvents();
this.setAttribute("id",this.getId());
this.bounceIt=0;
this.mysize=0;
this.lastsize=0;
this.xoffset=0;
this.yoffset=0;
this.distance=0;
this.myy=0;
this.bounceTimer=null;
};
nitobi.lang.extend(nitobi.fisheye.MenuItem,nitobi.ui.Element);
nitobi.fisheye.MenuItem.profile=new nitobi.base.Profile("nitobi.fisheye.MenuItem",null,false,"ntb:menuitem");
nitobi.base.Registry.getInstance().register(nitobi.fisheye.MenuItem.profile);
nitobi.fisheye.MenuItem.prototype.setImageSource=function(_47){
this.setAttribute("imagesrc",_47);
this.src=_47;
};
nitobi.fisheye.MenuItem.prototype.setLabel=function(_48){
this.setAttribute("label",_48);
this.imgLabel=_48;
};


var temp_ntb_renderer='<?xml version=\'1.0\'?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" /> <x:t- match="//ntb:fisheye"> <div> <x:a-x:n-id"> <x:v-x:s-@id" /> </x:a-> <x:a-x:n-class"> ntb-fisheye-reset <x:c-> <x:wh- test="./@theme"> <x:v-x:s-./@theme"/> </x:wh-> <x:o-> nitobi </x:o-> </x:c-> </x:a-> &#160; </div></x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.fisheye");
nitobi.fisheye.renderer = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_renderer));


