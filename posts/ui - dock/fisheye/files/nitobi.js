/*
 * Nitobi Complete UI 1.0
 * Copyright(c) 2009, Nitobi
 * support@nitobi.com
 * 
 * http://www.nitobi.com/license
 */
if(typeof (nitobi)=="undefined"){
nitobi=function(){
};
}
if(false){
nitobi.lang=function(){
};
}
if(typeof (nitobi.lang)=="undefined"){
nitobi.lang={};
}
nitobi.lang.defineNs=function(_1){
var _2=_1.split(".");
var _3="";
var _4="";
for(var i=0;i<_2.length;i++){
_3+=_4+_2[i];
_4=".";
if(eval("typeof("+_3+")")=="undefined"){
eval(_3+"={}");
}
}
};
nitobi.lang.extend=function(_6,_7){
function inheritance(){
}
inheritance.prototype=_7.prototype;
_6.prototype=new inheritance();
_6.prototype.constructor=_6;
_6.baseConstructor=_7;
if(_7.base){
_7.prototype.base=_7.base;
}
_6.base=_7.prototype;
};
nitobi.lang.implement=function(_8,_9){
for(var _a in _9.prototype){
if(typeof (_8.prototype[_a])=="undefined"||_8.prototype[_a]==null){
_8.prototype[_a]=_9.prototype[_a];
}
}
};
nitobi.lang.setJsProps=function(p,_c){
for(var i=0;i<_c.length;i++){
var _e=_c[i];
p["set"+_e.n]=this.jSET;
p["get"+_e.n]=this.jGET;
p[_e.n]=_e.d;
}
};
nitobi.lang.setXmlProps=function(p,_10){
for(var i=0;i<_10.length;i++){
var _12=_10[i];
var s,g;
switch(_12.t){
case "i":
s=this.xSET;
g=this.xiGET;
break;
case "b":
s=this.xbSET;
g=this.xbGET;
break;
default:
s=this.xSET;
g=this.xGET;
}
p["set"+_12.n]=s;
p["get"+_12.n]=g;
p["sModel"]+=_12.n+"\""+_12.d+"\" ";
}
};
nitobi.lang.setEvents=function(p,_16){
for(var i=0;i<_16.length;i++){
var n=_16[i];
p["set"+n]=this.eSET;
p["get"+n]=this.eGET;
var nn=n.substring(0,n.length-5);
p["set"+nn]=this.eSET;
p["get"+nn]=this.eGET;
p["o"+n.substring(1)]=new nitobi.base.Event();
}
};
nitobi.lang.isDefined=function(a){
return (typeof (a)!="undefined");
};
nitobi.lang.getBool=function(a){
if(null==a){
return null;
}
if(typeof (a)=="boolean"){
return a;
}
return a.toLowerCase()=="true";
};
nitobi.lang.type={XMLNODE:0,HTMLNODE:1,ARRAY:2,XMLDOC:3};
nitobi.lang.typeOf=function(obj){
var t=typeof (obj);
if(t=="object"){
if(obj.blur&&obj.innerHTML){
return nitobi.lang.type.HTMLNODE;
}
if(obj.nodeName&&obj.nodeName.toLowerCase()==="#document"){
return nitobi.lang.type.XMLDOC;
}
if(obj.nodeName){
return nitobi.lang.type.XMLNODE;
}
if(obj instanceof Array){
return nitobi.lang.type.ARRAY;
}
}
return t;
};
nitobi.lang.toBool=function(_1e,_1f){
if(typeof (_1f)!="undefined"){
if((typeof (_1e)=="undefined")||(_1e=="")||(_1e==null)){
_1e=_1f;
}
}
_1e=_1e.toString()||"";
_1e=_1e.toUpperCase();
if((_1e=="Y")||(_1e=="1")||(_1e=="TRUE")){
return true;
}else{
return false;
}
};
nitobi.lang.boolToStr=function(_20){
if((typeof (_20)=="boolean"&&_20)||(typeof (_20)=="string"&&(_20.toLowerCase()=="true"||_20=="1"))){
return "1";
}else{
return "0";
}
return _20;
};
nitobi.lang.formatNumber=function(_21,_22,_23,_24){
var n=nitobi.form.numberXslProc;
n.addParameter("number",_21,"");
n.addParameter("mask",_22,"");
n.addParameter("group",_23,"");
n.addParameter("decimal",_24,"");
return nitobi.xml.transformToString(nitobi.xml.Empty,nitobi.form.numberXslProc);
};
nitobi.lang.close=function(_26,_27,_28){
if(null==_28){
return function(){
return _27.apply(_26,arguments);
};
}else{
return function(){
return _27.apply(_26,_28);
};
}
};
nitobi.lang.after=function(_29,_2a,_2b,_2c){
var _2d=_29[_2a];
var _2e=_2b[_2c];
if(_2c instanceof Function){
_2e=_2c;
}
_29[_2a]=function(){
_2d.apply(_29,arguments);
_2e.apply(_2b,arguments);
};
_29[_2a].orig=_2d;
};
nitobi.lang.before=function(_2f,_30,_31,_32){
var _33=_2f[_30];
var _34=function(){
};
if(_31!=null){
_34=_31[_32];
}
if(_32 instanceof Function){
_34=_32;
}
_2f[_30]=function(){
_34.apply(_31,arguments);
_33.apply(_2f,arguments);
};
_2f[_30].orig=_33;
};
nitobi.lang.forEach=function(arr,_36){
var len=arr.length;
for(var i=0;i<len;i++){
_36.call(this,arr[i],i);
}
_36=null;
};
nitobi.lang.throwError=function(_39,_3a){
var msg=_39;
if(_3a!=null){
msg+="\n - because "+nitobi.lang.getErrorDescription(_3a);
}
throw msg;
};
nitobi.lang.getErrorDescription=function(_3c){
var _3d=(typeof (_3c.description)=="undefined")?_3c:_3c.description;
return _3d;
};
nitobi.lang.newObject=function(_3e,_3f,_40){
var a=_3f;
if(null==_40){
_40=0;
}
var e="new "+_3e+"(";
var _43="";
for(var i=_40;i<a.length;i++){
e+=_43+"a["+i+"]";
_43=",";
}
e+=")";
return eval(e);
};
nitobi.lang.getLastFunctionArgs=function(_45,_46){
var a=new Array(_45.length-_46);
for(var i=_46;i<_45.length;i++){
a[i-_46]=_45[i];
}
return a;
};
nitobi.lang.getFirstHashKey=function(_49){
for(var x in _49){
return x;
}
};
nitobi.lang.getFirstFunction=function(obj){
for(var x in obj){
if(obj[x]!=null&&typeof (obj[x])=="function"&&typeof (obj[x].prototype)!="undefined"){
return {name:x,value:obj[x]};
}
}
return null;
};
nitobi.lang.copy=function(obj){
var _4e={};
for(var _4f in obj){
_4e[_4f]=obj[_4f];
}
return _4e;
};
nitobi.lang.dispose=function(_50,_51){
try{
if(_51!=null){
var _52=_51.length;
for(var i=0;i<_52;i++){
if(typeof (_51[i].dispose)=="function"){
_51[i].dispose();
}
if(typeof (_51[i])=="function"){
_51[i].call(_50);
}
_51[i]=null;
}
}
for(var _54 in _50){
if(_50[_54]!=null&&_50[_54].dispose instanceof Function){
_50[_54].dispose();
}
_50[_54]=null;
}
}
catch(e){
}
};
nitobi.lang.parseNumber=function(val){
var num=parseInt(val);
return (isNaN(num)?0:num);
};
nitobi.lang.numToAlpha=function(num){
if(typeof (nitobi.lang.numAlphaCache[num])==="string"){
return nitobi.lang.numAlphaCache[num];
}
var ck1=num%26;
var ck2=Math.floor(num/26);
var _5a=(ck2>0?String.fromCharCode(96+ck2):"")+String.fromCharCode(97+ck1);
nitobi.lang.alphaNumCache[_5a]=num;
nitobi.lang.numAlphaCache[num]=_5a;
return _5a;
};
nitobi.lang.alphaToNum=function(_5b){
if(typeof (nitobi.lang.alphaNumCache[_5b])==="number"){
return nitobi.lang.alphaNumCache[_5b];
}
var j=0;
var num=0;
for(var i=_5b.length-1;i>=0;i--){
num+=(_5b.charCodeAt(i)-96)*Math.pow(26,j++);
}
num=num-1;
nitobi.lang.alphaNumCache[_5b]=num;
nitobi.lang.numAlphaCache[num]=_5b;
return num;
};
nitobi.lang.alphaNumCache={};
nitobi.lang.numAlphaCache={};
nitobi.lang.toArray=function(obj,_60){
return Array.prototype.splice.call(obj,_60||0);
};
nitobi.lang.merge=function(_61,_62){
var r={};
for(var i=0;i<arguments.length;i++){
var a=arguments[i];
for(var x in arguments[i]){
r[x]=a[x];
}
}
return r;
};
nitobi.lang.xor=function(){
var b=false;
for(var j=0;j<arguments.length;j++){
if(arguments[j]&&!b){
b=true;
}else{
if(arguments[j]&&b){
return false;
}
}
}
return b;
};
nitobi.lang.zeros="00000000000000000000000000000000000000000000000000000000000000000000";
nitobi.lang.padZeros=function(num,_6a){
_6a=_6a||2;
num=num+"";
return nitobi.lang.zeros.substr(0,Math.max(_6a-num.length,0))+num;
};
nitobi.lang.noop=function(){
};
nitobi.lang.isStandards=function(){
var s=(document.compatMode=="CSS1Compat");
if(nitobi.browser.SAFARI||nitobi.browser.CHROME){
var _6c=document.createElement("div");
_6c.style.cssText="width:0px;width:1";
s=(parseInt(_6c.style.width)!=1);
}
return s;
};
nitobi.lang.defineNs("nitobi.lang");
nitobi.lang.Math=function(){
};
nitobi.lang.Math.sinTable=Array();
nitobi.lang.Math.cosTable=Array();
nitobi.lang.Math.rotateCoords=function(_6d,_6e,_6f){
var _70=_6f*0.01745329277777778;
if(nitobi.lang.Math.sinTable[_70]==null){
nitobi.lang.Math.sinTable[_70]=Math.sin(_70);
nitobi.lang.Math.cosTable[_70]=Math.cos(_70);
}
var cR=nitobi.lang.Math.cosTable[_70];
var sR=nitobi.lang.Math.sinTable[_70];
var x=_6d*cR-_6e*sR;
var y=_6e*cR+_6d*sR;
return {x:x,y:y};
};
nitobi.lang.Math.returnAngle=function(_75,_76,_77,_78){
return Math.atan2(_78-_76,_77-_75)/0.01745329277777778;
};
nitobi.lang.Math.returnDistance=function(x1,y1,x2,y2){
return Math.sqrt(((x2-x1)*(x2-x1))+((y2-y1)*(y2-y1)));
};
nitobi.lang.defineNs("nitobi");
nitobi.Object=function(){
this.disposal=new Array();
this.modelNodes={};
};
nitobi.Object.prototype.setValues=function(_7d){
for(var _7e in _7d){
if(this[_7e]!=null){
if(this[_7e].subscribe!=null){
}else{
this[_7e]=_7d[_7e];
}
}else{
if(this[_7e] instanceof Function){
this[_7e](_7d[_7e]);
}else{
if(this["set"+_7e] instanceof Function){
this["set"+_7e](_7d[_7e]);
}else{
this[_7e]=_7d[_7e];
}
}
}
}
};
nitobi.Object.prototype.xGET=function(){
var _7f=null,_80="@"+arguments[0],val="";
var _82=this.modelNodes[_80];
if(_82!=null){
_7f=_82;
}else{
_7f=this.modelNodes[_80]=this.modelNode.selectSingleNode(_80);
}
if(_7f!=null){
val=_7f.nodeValue;
}
return val;
};
nitobi.Object.prototype.xSET=function(){
var _83=null,_84="@"+arguments[0];
var _85=this.modelNodes[_84];
if(_85!=null){
_83=_85;
}else{
_83=this.modelNodes[_84]=this.modelNode.selectSingleNode(_84);
}
if(_83==null){
this.modelNode.setAttribute(arguments[0],"");
}
if(arguments[1][0]!=null&&_83!=null){
if(typeof (arguments[1][0])=="boolean"){
_83.nodeValue=nitobi.lang.boolToStr(arguments[1][0]);
}else{
_83.nodeValue=arguments[1][0];
}
}
};
nitobi.Object.prototype.eSET=function(_86,_87){
var _88=_87[0];
var _89=_88;
var _8a=_86.substr(2);
_8a=_8a.substr(0,_8a.length-5);
if(typeof (_88)=="string"){
_89=function(){
return nitobi.event.evaluate(_88,arguments[0]);
};
}
if(this[_86]!=null){
this.unsubscribe(_8a,this[_86]);
}
var _8b=this.subscribe(_8a,_89);
this.jSET(_86,[_8b]);
return _8b;
};
nitobi.Object.prototype.eGET=function(){
};
nitobi.Object.prototype.jSET=function(_8c,val){
this[_8c]=val[0];
};
nitobi.Object.prototype.jGET=function(_8e){
return this[_8e];
};
nitobi.Object.prototype.xsGET=nitobi.Object.prototype.xGET;
nitobi.Object.prototype.xsSET=nitobi.Object.prototype.xSET;
nitobi.Object.prototype.xbGET=function(){
return nitobi.lang.toBool(this.xGET.apply(this,arguments),false);
};
nitobi.Object.prototype.xiGET=function(){
return parseInt(this.xGET.apply(this,arguments));
};
nitobi.Object.prototype.xiSET=nitobi.Object.prototype.xSET;
nitobi.Object.prototype.xdGET=function(){
};
nitobi.Object.prototype.xnGET=function(){
return parseFloat(this.xGET.apply(this,arguments));
};
nitobi.Object.prototype.xbSET=function(){
this.xSET.call(this,arguments[0],[nitobi.lang.boolToStr(arguments[1][0])]);
};
nitobi.Object.prototype.fire=function(evt,_90){
return nitobi.event.notify(evt+this.uid,_90);
};
nitobi.Object.prototype.subscribe=function(evt,_92,_93){
if(this.subscribedEvents==null){
this.subscribedEvents={};
}
if(typeof (_93)=="undefined"){
_93=this;
}
var _94=nitobi.event.subscribe(evt+this.uid,nitobi.lang.close(_93,_92));
this.subscribedEvents[_94]=evt+this.uid;
return _94;
};
nitobi.Object.prototype.subscribeOnce=function(evt,_96,_97,_98){
var _99=this;
var _9a=function(){
_96.apply(_97||this,_98||arguments);
_99.unsubscribe(evt,_9b);
};
var _9b=this.subscribe(evt,_9a);
return _9b;
};
nitobi.Object.prototype.unsubscribe=function(evt,_9d){
return nitobi.event.unsubscribe(evt+this.uid,_9d);
};
nitobi.Object.prototype.dispose=function(){
if(this.disposing){
return;
}
this.disposing=true;
var _9e=this.disposal.length;
for(var i=0;i<_9e;i++){
if(disposal[i] instanceof Function){
disposal[i].call(context);
}
disposal[i]=null;
}
for(var _a0 in this){
if(this[_a0].dispose instanceof Function){
this[_a0].dispose.call(this[_a0]);
}
this[_a0]=null;
}
};
if(false){
nitobi.base=function(){
};
}
nitobi.lang.defineNs("nitobi.base");
nitobi.base.uid=1;
nitobi.base.getUid=function(){
return "ntb__"+(nitobi.base.uid++);
};
nitobi.lang.defineNs("nitobi.browser");
if(false){
nitobi.browser=function(){
};
}
nitobi.browser.UNKNOWN=true;
nitobi.browser.IE=false;
nitobi.browser.IE6=false;
nitobi.browser.IE7=false;
nitobi.browser.IE8=false;
nitobi.browser.MOZ=false;
nitobi.browser.FF3=false;
nitobi.browser.SAFARI=false;
nitobi.browser.OPERA=false;
nitobi.browser.AIR=false;
nitobi.browser.CHROME=false;
nitobi.browser.XHR_ENABLED;
nitobi.browser.detect=function(){
var _a1=[{string:navigator.vendor,subString:"Adobe",identity:"AIR"},{string:navigator.vendor,subString:"Google",identity:"Chrome"},{string:navigator.vendor,subString:"Apple",identity:"Safari"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"},{string:navigator.vendor,subString:"Camino",identity:"Camino"}];
var _a2="Unknown";
for(var i=0;i<_a1.length;i++){
var _a4=_a1[i].string;
var _a5=_a1[i].prop;
if(_a4){
if(_a4.indexOf(_a1[i].subString)!=-1){
_a2=_a1[i].identity;
break;
}
}else{
if(_a5){
_a2=_a1[i].identity;
break;
}
}
}
nitobi.browser.IE=(_a2=="Explorer");
nitobi.browser.IE6=(nitobi.browser.IE&&!window.XMLHttpRequest);
nitobi.browser.IE7=(nitobi.browser.IE&&window.XMLHttpRequest);
nitobi.browser.MOZ=(_a2=="Netscape"||_a2=="Firefox"||_a2=="Camino");
nitobi.browser.FF3=(_a2=="Firefox"&&parseInt(navigator.userAgent.substr(navigator.userAgent.indexOf("Firefox/")+8,3))==3);
nitobi.browser.SAFARI=(_a2=="Safari");
nitobi.browser.OPERA=(_a2=="Opera");
nitobi.browser.AIR=(_a2=="AIR");
nitobi.browser.CHROME=(_a2=="Chrome");
if(nitobi.browser.SAFARI){
nitobi.browser.OPERA=true;
}
if(nitobi.browser.AIR){
nitobi.browser.SAFARI=true;
}
nitobi.browser.XHR_ENABLED=nitobi.browser.OPERA||nitobi.browser.SAFARI||nitobi.browser.MOZ||nitobi.browser.IE||nitobi.browser.CHROME;
nitobi.browser.UNKNOWN=!(nitobi.browser.IE||nitobi.browser.MOZ||nitobi.browser.SAFARI||nitobi.browser.CHROME);
};
nitobi.browser.detect();
if(nitobi.browser.IE6){
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
}
nitobi.lang.defineNs("nitobi.browser");
nitobi.browser.Cookies=function(){
};
nitobi.lang.extend(nitobi.browser.Cookies,nitobi.Object);
nitobi.browser.Cookies.get=function(id){
var _a7,end;
if(document.cookie.length>0){
_a7=document.cookie.indexOf(id+"=");
if(_a7!=-1){
_a7+=id.length+1;
end=document.cookie.indexOf(";",_a7);
if(end==-1){
end=document.cookie.length;
}
return unescape(document.cookie.substring(_a7,end));
}
}
return null;
};
nitobi.browser.Cookies.set=function(id,_aa,_ab){
var _ac=new Date();
_ac.setTime(_ac.getTime()+(_ab*24*3600*1000));
document.cookie=id+"="+escape(_aa)+((_ab==null)?"":"; expires="+_ac.toGMTString());
};
nitobi.browser.Cookies.remove=function(id){
if(nitobi.browser.Cookies.get(id)){
document.cookie=id+"="+"; expires=Thu, 01-Jan-70 00:00:01 GMT";
}
};
nitobi.lang.defineNs("nitobi.browser");
nitobi.browser.History=function(){
this.lastPage="";
this.currentPage="";
this.onChange=new nitobi.base.Event();
this.iframeObject=nitobi.html.createElement("iframe",{"name":"ntb_history","id":"ntb_history"},{"display":"none"});
document.body.appendChild(nitobi.xml.importNode(document,this.iframeObject,true));
this.iframe=frames["ntb_history"];
this.monitor();
};
nitobi.browser.History.prototype.add=function(_ae){
this.lastPage=this.currentPage=_ae.substr(_ae.indexOf("#")+1);
this.iframe.location.href=_ae;
};
nitobi.browser.History.prototype.monitor=function(){
var _af=this.iframe.location.href.split("#");
this.currentPage=_af[1];
if(this.currentPage!=this.lastPage){
this.onChange.notify(_af[0].substring(_af[0].lastIndexOf("/")+1),this.currentPage);
this.lastPage=this.currentPage;
}
window.setTimeout(nitobi.lang.close(this,this.monitor),1500);
};
nitobi.lang.defineNs("nitobi.xml");
nitobi.xml=function(){
};
nitobi.xml.nsPrefix="ntb:";
nitobi.xml.nsDecl="xmlns:ntb=\"http://www.nitobi.com\"";
if(nitobi.browser.IE){
var inUse=false;
nitobi.xml.XslTemplate=new ActiveXObject("MSXML2.XSLTemplate.3.0");
}
if(typeof XMLSerializer!="undefined"&&typeof DOMParser!="undefined"){
nitobi.xml.Serializer=new XMLSerializer();
nitobi.xml.DOMParser=new DOMParser();
}
nitobi.xml.getChildNodes=function(_b0){
if(nitobi.browser.IE){
return _b0.childNodes;
}else{
return _b0.selectNodes("./*");
}
};
nitobi.xml.indexOfChildNode=function(_b1,_b2){
var _b3=nitobi.xml.getChildNodes(_b1);
for(var i=0;i<_b3.length;i++){
if(_b3[i]==_b2){
return i;
}
}
return -1;
};
nitobi.xml.createXmlDoc=function(xml){
if(xml!=null){
xml=xml.substring(xml.indexOf("<?xml"));
}
if(xml!=null&&xml.documentElement!=null){
return xml;
}
var doc=null;
if(nitobi.browser.IE){
doc=new ActiveXObject("Msxml2.DOMDocument.3.0");
doc.setProperty("SelectionNamespaces","xmlns:ntb='http://www.nitobi.com'");
}else{
if(document.implementation&&document.implementation.createDocument){
doc=document.implementation.createDocument("","",null);
}
}
if(xml!=null&&typeof xml=="string"){
doc=nitobi.xml.loadXml(doc,xml);
}
return doc;
};
nitobi.xml.loadXml=function(doc,xml,_b9){
doc.async=false;
if(nitobi.browser.IE){
doc.loadXML(xml);
}else{
var _ba=nitobi.xml.DOMParser.parseFromString((xml.xml!=null?xml.xml:xml),"text/xml");
if(_b9){
while(doc.hasChildNodes()){
doc.removeChild(doc.firstChild);
}
for(var i=0;i<_ba.childNodes.length;i++){
doc.appendChild(doc.importNode(_ba.childNodes[i],true));
}
}else{
doc=_ba;
}
_ba=null;
}
return doc;
};
nitobi.xml.hasParseError=function(_bc){
if(nitobi.browser.IE){
return (_bc.parseError!=0);
}else{
if(_bc==null||_bc.documentElement==null){
return true;
}
var _bd=_bc.documentElement;
if((_bd.tagName=="parserError")||(_bd.namespaceURI=="http://www.mozilla.org/newlayout/xml/parsererror.xml")){
return true;
}
return false;
}
};
nitobi.xml.getParseErrorReason=function(_be){
if(!nitobi.xml.hasParseError(_be)){
return "";
}
if(nitobi.browser.IE){
return (_be.parseError.reason);
}else{
return (new XMLSerializer().serializeToString(_be));
}
};
nitobi.xml.createXslDoc=function(xsl){
var doc=null;
if(nitobi.browser.IE){
doc=new ActiveXObject("MSXML2.FreeThreadedDOMDocument.3.0");
}else{
doc=nitobi.xml.createXmlDoc();
}
doc=nitobi.xml.loadXml(doc,xsl||"<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" xmlns:ntb=\"http://www.nitobi.com\" />");
return doc;
};
nitobi.xml.createXslProcessor=function(xsl){
var _c2=null;
var xt=null;
if(typeof (xsl)!="string"){
xsl=nitobi.xml.serialize(xsl);
}
if(nitobi.browser.IE){
_c2=new ActiveXObject("MSXML2.FreeThreadedDOMDocument.3.0");
xt=new ActiveXObject("MSXML2.XSLTemplate.3.0");
_c2.async=false;
_c2.loadXML(xsl);
xt.stylesheet=_c2;
return xt.createProcessor();
}else{
if(XSLTProcessor){
_c2=nitobi.xml.createXmlDoc(xsl);
xt=new XSLTProcessor();
xt.importStylesheet(_c2);
xt.stylesheet=_c2;
return xt;
}
}
};
nitobi.xml.parseHtml=function(_c4){
if(typeof (_c4)=="string"){
_c4=document.getElementById(_c4);
}
var _c5=nitobi.html.getOuterHtml(_c4);
var _c6="";
if(nitobi.browser.IE){
var _c7=new RegExp("(\\s+.[^=]*)='(.*?)'","g");
_c5=_c5.replace(_c7,function(m,_1,_2){
return _1+"=\""+_2.replace(/"/g,"&quot;")+"\"";
});
_c6=(_c5.substring(_c5.indexOf("/>")+2).replace(/(\s+.[^\=]*)\=\s*([^\"^\s^\>]+)/g,"$1=\"$2\" ")).replace(/\n/gi,"").replace(/(.*?:.*?\s)/i,"$1  ");
var _cb=new RegExp("=\"([^\"]*)(<)(.*?)\"","gi");
var _cc=new RegExp("=\"([^\"]*)(>)(.*?)\"","gi");
while(true){
_c6=_c6.replace(_cb,"=\"$1&lt;$3\" ");
_c6=_c6.replace(_cc,"=\"$1&gt;$3\" ");
var x=(_cb.test(_c6));
if(!_cb.test(_c6)){
break;
}
}
}else{
_c6=_c5;
_c6=_c6.replace(/\n/gi,"").replace(/\>\s*\</gi,"><").replace(/(.*?:.*?\s)/i,"$1  ");
_c6=_c6.replace(/\&/g,"&amp;");
_c6=_c6.replace(/\&amp;gt;/g,"&gt;").replace(/\&amp;lt;/g,"&lt;").replace(/\&amp;apos;/g,"&apos;").replace(/\&amp;quot;/g,"&quot;").replace(/\&amp;amp;/g,"&amp;").replace(/\&amp;eq;/g,"&eq;");
}
if(_c6.indexOf("xmlns:ntb=\"http://www.nitobi.com\"")<1){
_c6=_c6.replace(/\<(.*?)(\s|\>|\\)/,"<$1 xmlns:ntb=\"http://www.nitobi.com\"$2");
}
_c6=_c6.replace(/\&nbsp\;/gi," ");
return nitobi.xml.createXmlDoc(_c6);
};
nitobi.xml.transform=function(xml,xsl,_d0){
if(xsl.documentElement){
xsl=nitobi.xml.createXslProcessor(xsl);
}
if(nitobi.browser.IE){
xsl.input=xml;
xsl.transform();
return xsl.output;
}else{
if(XSLTProcessor){
var doc=xsl.transformToDocument(xml);
var _d2=doc.documentlement;
if(_d2&&_d2.nodeName.indexOf("ntb:")==0){
_d2.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:ntb","http://www.nitobi.com");
}
return doc;
}
}
};
nitobi.xml.transformToString=function(xml,xsl,_d5){
var _d6=nitobi.xml.transform(xml,xsl,"text");
if(nitobi.browser.MOZ){
if(_d5=="xml"){
_d6=nitobi.xml.Serializer.serializeToString(_d6);
}else{
if(_d6.documentElement.childNodes[0]==null){
nitobi.lang.throwError("The transformToString fn could not find any valid output");
}
if(_d6.documentElement.childNodes[0].data!=null){
_d6=_d6.documentElement.childNodes[0].data;
}else{
if(_d6.documentElement.childNodes[0].textContent!=null){
_d6=_d6.documentElement.childNodes[0].textContent;
}else{
nitobi.lang.throwError("The transformToString fn could not find any valid output");
}
}
}
}else{
if(nitobi.browser.SAFARI||nitobi.browser.CHROME){
if(_d5=="xml"){
_d6=nitobi.xml.Serializer.serializeToString(_d6);
}else{
var _d7=_d6.documentElement;
if(_d7.nodeName!="transformiix:result"){
_d7=_d7.getElementsByTagName("pre")[0];
}
try{
_d6=_d7.childNodes[0].data;
}
catch(e){
_d6=(_d7.data);
}
}
}
}
return _d6;
};
nitobi.xml.transformToXml=function(xml,xsl){
var _da=nitobi.xml.transform(xml,xsl,"xml");
if(typeof _da=="string"){
_da=nitobi.xml.createXmlDoc(_da);
}else{
if(_da.documentElement.nodeName=="transformiix:result"){
_da=nitobi.xml.createXmlDoc(_da.documentElement.firstChild.data);
}
}
return _da;
};
nitobi.xml.serialize=function(xml){
if(nitobi.browser.IE){
return xml.xml;
}else{
return (new XMLSerializer()).serializeToString(xml);
}
};
nitobi.xml.createXmlHttp=function(){
if(nitobi.browser.IE){
var _dc=null;
try{
_dc=new ActiveXObject("Msxml2.XMLHTTP");
}
catch(e){
try{
_dc=new ActiveXObject("Microsoft.XMLHTTP");
}
catch(ee){
}
}
return _dc;
}else{
return new XMLHttpRequest();
}
};
nitobi.xml.createElement=function(_dd,_de,ns){
ns=ns||"http://www.nitobi.com";
var _e0=null;
if(nitobi.browser.IE){
_e0=_dd.createNode(1,nitobi.xml.nsPrefix+_de,ns);
}else{
if(_dd.createElementNS){
_e0=_dd.createElementNS(ns,nitobi.xml.nsPrefix+_de);
}
}
return _e0;
};
function nitobiXmlDecodeXslt(xsl){
return xsl.replace(/x:c-/g,"xsl:choose").replace(/x\:wh\-/g,"xsl:when").replace(/x\:o\-/g,"xsl:otherwise").replace(/x\:n\-/g," name=\"").replace(/x\:s\-/g," select=\"").replace(/x\:va\-/g,"xsl:variable").replace(/x\:v\-/g,"xsl:value-of").replace(/x\:ct\-/g,"xsl:call-template").replace(/x\:w\-/g,"xsl:with-param").replace(/x\:p\-/g,"xsl:param").replace(/x\:t\-/g,"xsl:template").replace(/x\:at\-/g,"xsl:apply-templates").replace(/x\:a\-/g,"xsl:attribute");
}
if(!nitobi.browser.IE){
Document.prototype.loadXML=function(_e2){
changeReadyState(this,1);
var p=new DOMParser();
var d=p.parseFromString(_e2,"text/xml");
while(this.hasChildNodes()){
this.removeChild(this.lastChild);
}
for(var i=0;i<d.childNodes.length;i++){
this.appendChild(this.importNode(d.childNodes[i],true));
}
changeReadyState(this,4);
};
Document.prototype.__defineGetter__("xml",function(){
return (new XMLSerializer()).serializeToString(this);
});
Node.prototype.__defineGetter__("xml",function(){
return (new XMLSerializer()).serializeToString(this);
});
XPathResult.prototype.__defineGetter__("length",function(){
return this.snapshotLength;
});
if(XSLTProcessor){
XSLTProcessor.prototype.addParameter=function(_e6,_e7,_e8){
if(_e7==null){
this.removeParameter(_e8,_e6);
}else{
this.setParameter(_e8,_e6,_e7);
}
};
}
XMLDocument.prototype.selectNodes=function(_e9,_ea){
try{
if(this.nsResolver==null){
this.nsResolver=this.createNSResolver(this.documentElement);
}
var _eb=this.evaluate(_e9,(_ea?_ea:this),new MyNSResolver(),XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var _ec=new Array(_eb.snapshotLength);
_ec.expr=_e9;
var j=0;
for(i=0;i<_eb.snapshotLength;i++){
var _ee=_eb.snapshotItem(i);
if(_ee.nodeType!=3){
_ec[j++]=_ee;
}
}
return _ec;
}
catch(e){
}
};
Document.prototype.selectNodes=XMLDocument.prototype.selectNodes;
function MyNSResolver(){
}
MyNSResolver.prototype.lookupNamespaceURI=function(_ef){
switch(_ef){
case "xsl":
return "http://www.w3.org/1999/XSL/Transform";
break;
case "ntb":
return "http://www.nitobi.com";
break;
case "d":
return "http://exslt.org/dates-and-times";
break;
case "n":
return "http://www.nitobi.com/exslt/numbers";
break;
default:
return null;
break;
}
};
XMLDocument.prototype.selectSingleNode=function(_f0,_f1){
var _f2=_f0.match(/\[\d+\]/ig);
if(_f2!=null){
var x=_f2[_f2.length-1];
if(_f0.lastIndexOf(x)+x.length!=_f0.length){
_f0+="[1]";
}
}
var _f4=this.selectNodes(_f0,_f1||null);
return ((_f4!=null&&_f4.length>0)?_f4[0]:null);
};
Document.prototype.selectSingleNode=XMLDocument.prototype.selectSingleNode;
Element.prototype.selectNodes=function(_f5){
var doc=this.ownerDocument;
return doc.selectNodes(_f5,this);
};
Element.prototype.selectSingleNode=function(_f7){
var doc=this.ownerDocument;
return doc.selectSingleNode(_f7,this);
};
}
nitobi.xml.getLocalName=function(_f9){
var _fa=_f9.indexOf(":");
if(_fa==-1){
return _f9;
}else{
return _f9.substr(_fa+1);
}
};
nitobi.xml.importNode=function(doc,_fc,_fd){
if(_fd==null){
_fd=true;
}
return (doc.importNode?doc.importNode(_fc,_fd):_fc);
};
nitobi.xml.encode=function(str){
str+="";
str=str.replace(/&/g,"&amp;");
str=str.replace(/'/g,"&apos;");
str=str.replace(/\"/g,"&quot;");
str=str.replace(/</g,"&lt;");
str=str.replace(/>/g,"&gt;");
str=str.replace(/\n/g,"&#xa;");
return str;
};
nitobi.xml.constructValidXpathQuery=function(_ff,_100){
var _101=_ff.match(/(\"|\')/g);
if(_101!=null){
var _102="concat(";
var _103="";
var _104;
for(var i=0;i<_ff.length;i++){
if(_ff.substr(i,1)=="\""){
_104="&apos;";
}else{
_104="&quot;";
}
_102+=_103+_104+nitobi.xml.encode(_ff.substr(i,1))+_104;
_103=",";
}
_102+=_103+"&apos;&apos;";
_102+=")";
_ff=_102;
}else{
var quot=(_100?"'":"");
_ff=quot+nitobi.xml.encode(_ff)+quot;
}
return _ff;
};
nitobi.xml.removeChildren=function(_107){
while(_107.firstChild){
_107.removeChild(_107.firstChild);
}
};
nitobi.xml.Empty=nitobi.xml.createXmlDoc("<root></root>");
nitobi.lang.defineNs("nitobi.html");
nitobi.html.Url=function(){
};
nitobi.html.Url.setParameter=function(url,key,_10a){
var reg=new RegExp("(\\?|&)("+encodeURIComponent(key)+")=(.*?)(&|$)");
if(url.match(reg)){
return url.replace(reg,"$1$2="+encodeURIComponent(_10a)+"$4");
}
if(url.match(/\?/)){
url=url+"&";
}else{
url=url+"?";
}
return url+encodeURIComponent(key)+"="+encodeURIComponent(_10a);
};
nitobi.html.Url.removeParameter=function(url,key){
var reg=new RegExp("(\\?|&)("+encodeURIComponent(key)+")=(.*?)(&|$)");
return url.replace(reg,function(str,p1,p2,p3,p4,_114,s){
if(((p1)=="?")&&(p4!="&")){
return "";
}else{
return p1;
}
});
};
nitobi.html.Url.normalize=function(url,file){
if(file){
if(file.indexOf("http://")==0||file.indexOf("https://")==0||file.indexOf("/")==0){
return file;
}
}
var href=(url.match(/.*\//)||"")+"";
if(file){
return href+file;
}
return href;
};
nitobi.html.Url.randomize=function(url){
return nitobi.html.Url.setParameter(url,"ntb-random",(new Date).getTime());
};
nitobi.lang.defineNs("nitobi.base");
nitobi.base.Event=function(type){
this.type=type;
this.handlers={};
this.guid=0;
this.setEnabled(true);
};
nitobi.base.Event.prototype.subscribe=function(_11b,_11c,guid){
if(_11b==null){
return;
}
var func=_11b;
if(typeof (_11b)=="string"){
var s=_11b;
s=s.replace(/\#\&lt\;\#/g,"<").replace(/\#\&gt\;\#/g,">").replace(/\#\&amp;lt\;\#/g,"<").replace(/\#\&amp;gt\;\#/g,">").replace(/\/\*EQ\*\//g,"=").replace(/\#\Q\#/g,"\"").replace(/\#\&amp\;\#/g,"&");
s=s.replace(/eventArgs/g,"arguments[0]");
_11b=nitobi.lang.close(_11c,function(){
eval(s);
});
}
if(typeof _11c=="object"&&_11b instanceof Function){
func=nitobi.lang.close(_11c,_11b);
}
guid=guid||func.observer_guid||_11b.observer_guid||this.guid++;
func.observer_guid=guid;
_11b.observer_guid=guid;
this.handlers[guid]=func;
return guid;
};
nitobi.base.Event.prototype.subscribeOnce=function(_120,_121){
var guid=null;
var _123=this;
var _124=function(){
_120.apply(_121||null,arguments);
_123.unSubscribe(guid);
};
guid=this.subscribe(_124);
return guid;
};
nitobi.base.Event.prototype.unSubscribe=function(guid){
if(guid instanceof Function){
guid=guid.observer_guid;
}
this.handlers[guid]=null;
delete this.handlers[guid];
};
nitobi.base.Event.prototype.notify=function(_126){
if(this.enabled){
if(arguments.length==0){
arguments=new Array();
arguments[0]=new nitobi.base.EventArgs(null,this);
arguments[0].event=this;
arguments[0].source=null;
}else{
if(typeof (arguments[0].event)!="undefined"&&arguments[0].event==null){
arguments[0].event=this;
}
}
var fail=false;
for(var item in this.handlers){
var _129=this.handlers[item];
if(_129 instanceof Function){
var rv=(_129.apply(this,arguments)==false);
fail=fail||rv;
}
}
return !fail;
}
return true;
};
nitobi.base.Event.prototype.dispose=function(){
for(var _12b in this.handlers){
this.handlers[_12b]=null;
}
this.handlers={};
};
nitobi.base.Event.prototype.setEnabled=function(_12c){
this.enabled=_12c;
};
nitobi.base.Event.prototype.isEnabled=function(){
return this.enabled;
};
nitobi.lang.defineNs("nitobi.html");
nitobi.html.Css=function(){
};
nitobi.html.Css.onPrecached=new nitobi.base.Event();
nitobi.html.Css.swapClass=function(_12d,_12e,_12f){
if(_12d.className){
var reg=new RegExp("(\\s|^)"+_12e+"(\\s|$)");
_12d.className=_12d.className.replace(reg,"$1"+_12f+"$2");
}
};
nitobi.html.Css.replaceOrAppend=function(_131,_132,_133){
if(nitobi.html.Css.hasClass(_131,_132)){
nitobi.html.Css.swapClass(_131,_132,_133);
}else{
nitobi.html.Css.addClass(_131,_133);
}
};
nitobi.html.Css.hasClass=function(_134,_135){
if(!_135||_135===""){
return false;
}
return (new RegExp("(\\s|^)"+_135+"(\\s|$)")).test(_134.className);
};
nitobi.html.Css.addClass=function(_136,_137,_138){
if(_138==true||!nitobi.html.Css.hasClass(_136,_137)){
_136.className=_136.className?_136.className+" "+_137:_137;
}
};
nitobi.html.Css.removeClass=function(_139,_13a,_13b){
if(typeof _13a=="array"){
for(var i=0;i<_13a.length;i++){
this.removeClass(_139,_13a[i],_13b);
}
}
if(_13b==true||nitobi.html.Css.hasClass(_139,_13a)){
var reg=new RegExp("(\\s|^)"+_13a+"(\\s|$)");
_139.className=_139.className.replace(reg,"$2");
}
};
nitobi.html.Css.addRule=function(_13e,_13f,_140){
if(_13e.cssRules){
var _141=_13e.insertRule(_13f+"{"+(_140||"")+"}",_13e.cssRules.length);
return _13e.cssRules[_141];
}else{
_13e.addRule(_13f,_140||"nitobi:placeholder;");
return _13e.rules[_13e.rules.length-1];
}
};
nitobi.html.Css.getRules=function(_142){
var _143=null;
if(typeof (_142)=="number"){
_143=document.styleSheets[_142];
}else{
_143=_142;
}
if(_143==null){
return null;
}
try{
if(_143.cssRules){
return _143.cssRules;
}
if(_143.rules){
return _143.rules;
}
}
catch(e){
}
return null;
};
nitobi.html.Css.getStyleSheetsByName=function(_144){
var arr=new Array();
var ss=document.styleSheets;
var _147=new RegExp(_144.replace(".",".")+"($|\\?)");
for(var i=0;i<ss.length;i++){
arr=nitobi.html.Css._getStyleSheetsByName(_147,ss[i],arr);
}
return arr;
};
nitobi.html.Css._getStyleSheetsByName=function(_149,_14a,arr){
if(_149.test(_14a.href)){
arr=arr.concat([_14a]);
}
var _14c=nitobi.html.Css.getRules(_14a);
if(_14a.href!=""&&_14a.imports){
for(var i=0;i<_14a.imports.length;i++){
arr=nitobi.html.Css._getStyleSheetsByName(_149,_14a.imports[i],arr);
}
}else{
for(var i=0;i<_14c.length;i++){
var s=_14c[i].styleSheet;
if(s){
arr=nitobi.html.Css._getStyleSheetsByName(_149,s,arr);
}
}
}
return arr;
};
nitobi.html.Css.imageCache={};
nitobi.html.Css.imageCacheDidNotify=false;
nitobi.html.Css.trackPrecache=function(_14f){
nitobi.html.Css.precacheArray[_14f]=true;
var _150=false;
for(var i in nitobi.html.Css.precacheArray){
if(!nitobi.html.Css.precacheArray[i]){
_150=true;
}
}
if((!nitobi.html.Css.imageCacheDidNotify)&&(!_150)){
nitobi.html.Css.imageCacheDidNotify=true;
nitobi.html.Css.isPrecaching=false;
nitobi.html.Css.onPrecached.notify();
}
};
nitobi.html.Css.precacheArray={};
nitobi.html.Css.isPrecaching=false;
nitobi.html.Css.precacheImages=function(_152){
nitobi.html.Css.isPrecaching=true;
if(!_152){
var ss=document.styleSheets;
for(var i=0;i<ss.length;i++){
nitobi.html.Css.precacheImages(ss[i]);
}
return;
}
var _155=/.*?url\((.*?)\).*?/;
var _156=nitobi.html.Css.getRules(_152);
var url=nitobi.html.Css.getPath(_152);
for(var i=0;i<_156.length;i++){
var rule=_156[i];
if(rule.styleSheet){
nitobi.html.Css.precacheImages(rule.styleSheet);
}else{
var s=rule.style;
var _15a=s?s.backgroundImage:null;
if(_15a){
_15a=_15a.replace(_155,"$1");
_15a=nitobi.html.Url.normalize(url,_15a);
if(!nitobi.html.Css.imageCache[_15a]){
var _15b=new Image();
_15b.src=_15a;
nitobi.html.Css.precacheArray[_15a]=false;
var _15c=nitobi.lang.close({},nitobi.html.Css.trackPrecache,[_15a]);
_15b.onload=_15c;
_15b.onerror=_15c;
_15b.onabort=_15c;
nitobi.html.Css.imageCache[_15a]=_15b;
try{
if(_15b.width>0){
nitobi.html.Css.precacheArray[_15a]=true;
}
}
catch(e){
}
}
}
}
}
if(_152.href!=""&&_152.imports){
for(var i=0;i<_152.imports.length;i++){
nitobi.html.Css.precacheImages(_152.imports[i]);
}
}
};
nitobi.html.Css.getPath=function(_15d){
var href=_15d.href;
href=nitobi.html.Url.normalize(href);
if(_15d.parentStyleSheet&&href.indexOf("/")!=0&&href.indexOf("http://")!=0&&href.indexOf("https://")!=0){
href=nitobi.html.Css.getPath(_15d.parentStyleSheet)+href;
}
return href;
};
nitobi.html.Css.getSheetUrl=nitobi.html.Css.getPath;
nitobi.html.Css.findParentStylesheet=function(_15f){
var rule=nitobi.html.Css.getRule(_15f);
if(rule){
return rule.parentStyleSheet;
}
return null;
};
nitobi.html.Css.findInSheet=function(_161,_162,_163){
if(nitobi.browser.IE6&&typeof _163=="undefined"){
_163=0;
}else{
if(_163>4){
return null;
}
}
_163++;
var _164=nitobi.html.Css.getRules(_162);
for(var rule=0;rule<_164.length;rule++){
var _166=_164[rule];
var ss=_166.styleSheet;
var _168=_166.selectorText;
if(ss){
var _169=nitobi.html.Css.findInSheet(_161,ss,_163);
if(_169){
return _169;
}
}else{
if(_168!=null){
if(_168.toLowerCase()==_161||_168.toLowerCase().split(" ")[1]==_161){
if(nitobi.browser.IE){
_166={selectorText:_168,style:_166.style,readOnly:_166.readOnly,parentStyleSheet:_162};
}
return _166;
}
}
}
}
var _16a=_162.imports;
if(_162.href!=""&&_16a){
var _16b=_16a.length;
for(var i=0;i<_16b;i++){
var _169=nitobi.html.Css.findInSheet(_161,_16a[i],_163);
if(_169){
return _169;
}
}
}
return null;
};
nitobi.html.Css.getClass=function(_16d,_16e){
_16d=_16d.toLowerCase();
if(_16d.indexOf(".")!==0){
_16d="."+_16d;
}
if(_16e){
var rule=nitobi.html.Css.getRule(_16d);
if(rule!=null){
return rule.style;
}
}else{
if(nitobi.html.Css.classCache[_16d]==null){
var rule=nitobi.html.Css.getRule(_16d);
if(rule!=null){
nitobi.html.Css.classCache[_16d]=rule.style;
}else{
return null;
}
}
return nitobi.html.Css.classCache[_16d];
}
};
nitobi.html.Css.classCache={};
nitobi.html.Css.getStyleBySelector=function(_170){
var rule=nitobi.html.Css.getRule(_170);
if(rule!=null){
return rule.style;
}
return null;
};
nitobi.html.Css.getRule=function(_172){
_172=_172.toLowerCase();
if(_172.indexOf(".")!==0){
_172="."+_172;
}
var _173=document.styleSheets;
for(var ss=0;ss<_173.length;ss++){
try{
var _175=nitobi.html.Css.findInSheet(_172,_173[ss]);
if(_175){
return _175;
}
}
catch(err){
}
}
return null;
};
nitobi.html.Css.getClassStyle=function(_176,_177){
var _178=nitobi.html.Css.getClass(_176);
if(_178!=null){
return _178[_177];
}else{
return null;
}
};
nitobi.html.Css.setStyle=function(el,rule,_17b){
rule=rule.replace(/\-(\w)/g,function(_17c,p1){
return p1.toUpperCase();
});
el.style[rule]=_17b;
};
nitobi.html.Css.getStyle=function(oElm,_17f){
var _180="";
if(document.defaultView&&document.defaultView.getComputedStyle){
_17f=_17f.replace(/([A-Z])/g,function($1){
return "-"+$1.toLowerCase();
});
strStyle=document.defaultView.getComputedStyle(oElm,null);
_180=strStyle.getPropertyValue(_17f);
}else{
if(oElm.currentStyle){
_17f=_17f.replace(/\-(\w)/g,function(_182,p1){
return p1.toUpperCase();
});
_180=oElm.currentStyle[_17f];
}
}
return _180;
};
nitobi.html.Css.setOpacities=function(_184,_185){
if(_184.length){
for(var i=0;i<_184.length;i++){
nitobi.html.Css.setOpacity(_184[i],_185);
}
}else{
nitobi.html.Css.setOpacity(_184,_185);
}
};
nitobi.html.Css.setOpacity=function(_187,_188){
var s=_187.style;
if(_188>100){
_188=100;
}
if(_188<0){
_188=0;
}
if(s.filter!=null){
var _18a=s.filter.match(/alpha\(opacity=[\d\.]*?\)/ig);
if(_18a!=null&&_18a.length>0){
s.filter=s.filter.replace(/alpha\(opacity=[\d\.]*?\)/ig,"alpha(opacity="+_188+")");
}else{
s.filter+="alpha(opacity="+_188+")";
}
}else{
s.opacity=(_188/100);
}
};
nitobi.html.Css.getOpacity=function(_18b){
if(_18b==null){
nitobi.lang.throwError(nitobi.error.ArgExpected+" for nitobi.html.Css.getOpacity");
}
if(nitobi.browser.IE){
if(_18b.style.filter==""){
return 100;
}
var s=_18b.style.filter;
s.match(/opacity=([\d\.]*?)\)/ig);
if(RegExp.$1==""){
return 100;
}
return parseInt(RegExp.$1);
}else{
return Math.abs(_18b.style.opacity?_18b.style.opacity*100:100);
}
};
nitobi.html.Css.getCustomStyle=function(_18d,_18e){
if(nitobi.browser.IE){
return nitobi.html.getClassStyle(_18d,_18e);
}else{
var rule=nitobi.html.Css.getRule(_18d);
var re=new RegExp("(.*?)({)(.*?)(})","gi");
var _191=rule.cssText.match(re);
re=new RegExp("("+_18e+")(:)(.*?)(;)","gi");
_191=re.exec(RegExp.$3);
}
};
nitobi.html.Css.createStyleSheet=function(_192){
var ss;
if(nitobi.browser.IE){
ss=document.createStyleSheet();
}else{
ss=document.createElement("style");
ss.setAttribute("type","text/css");
document.body.appendChild(ss);
ss.appendChild(document.createTextNode(""));
}
if(_192!=null){
nitobi.html.Css.setStyleSheetValue(ss,_192);
}
return ss;
};
nitobi.html.Css.setStyleSheetValue=function(ss,_195){
if(nitobi.browser.IE){
ss.cssText=_195;
}else{
ss.replaceChild(document.createTextNode(_195),ss.firstChild);
}
return ss;
};
if(nitobi.browser.MOZ){
HTMLStyleElement.prototype.__defineSetter__("cssText",function(_196){
this.innerHTML=_196;
});
HTMLStyleElement.prototype.__defineGetter__("cssText",function(){
return this.innerHTML;
});
}
nitobi.lang.defineNs("nitobi.drawing");
if(false){
nitobi.drawing=function(){
};
}
nitobi.drawing.Point=function(x,y){
this.x=x;
this.y=y;
};
nitobi.drawing.Point.prototype.toString=function(){
return "("+this.x+","+this.y+")";
};
nitobi.drawing.rgb=function(r,g,b){
return "#"+((r*65536)+(g*256)+b).toString(16);
};
nitobi.drawing.align=function(_19c,_19d,_19e,oh,ow,oy,ox){
oh=oh||0;
ow=ow||0;
oy=oy||0;
ox=ox||0;
var a=_19e;
var td,sd,tt,tb,tl,tr,th,tw,st,sb,sl,sr,sh,sw;
if(_19d.getBoundingClientRect){
td=_19d.getBoundingClientRect();
sd=_19c.getBoundingClientRect();
tt=td.top;
tb=td.bottom;
tl=td.left;
tr=td.right;
th=Math.abs(tb-tt);
tw=Math.abs(tr-tl);
st=sd.top;
sb=sd.bottom;
sl=sd.left;
sr=sd.right;
sh=Math.abs(sb-st);
sw=Math.abs(sr-sl);
}else{
if(document.getBoxObjectFor){
td=document.getBoxObjectFor(_19d);
sd=document.getBoxObjectFor(_19c);
tt=td.y;
tl=td.x;
tw=td.width;
th=td.height;
st=sd.y;
sl=sd.x;
sw=sd.width;
sh=sd.height;
}else{
td=nitobi.html.getCoords(_19d);
sd=nitobi.html.getCoords(_19c);
tt=td.y;
tl=td.x;
tw=td.width;
th=td.height;
st=sd.y;
sl=sd.x;
sw=sd.width;
sh=sd.height;
}
}
var s=_19c.style;
if(a&268435456){
s.height=(th+oh)+"px";
}
if(a&16777216){
s.width=(tw+ow)+"px";
}
if(a&1048576){
s.top=(nitobi.html.getStyleTop(_19c)+tt-st+oy)+"px";
}
if(a&65536){
s.top=(nitobi.html.getStyleTop(_19c)+tt-st+th-sh+oy)+"px";
}
if(a&4096){
s.left=(nitobi.html.getStyleLeft(_19c)-sl+tl+ox)+"px";
}
if(a&256){
s.left=(nitobi.html.getStyleLeft(_19c)-sl+tl+tw-sw+ox)+"px";
}
if(a&16){
s.top=(nitobi.html.getStyleTop(_19c)+tt-st+oy+Math.floor((th-sh)/2))+"px";
}
if(a&1){
s.left=(nitobi.html.getStyleLeft(_19c)-sl+tl+ox+Math.floor((tw-sw)/2))+"px";
}
};
nitobi.drawing.align.SAMEHEIGHT=268435456;
nitobi.drawing.align.SAMEWIDTH=16777216;
nitobi.drawing.align.ALIGNTOP=1048576;
nitobi.drawing.align.ALIGNBOTTOM=65536;
nitobi.drawing.align.ALIGNLEFT=4096;
nitobi.drawing.align.ALIGNRIGHT=256;
nitobi.drawing.align.ALIGNMIDDLEVERT=16;
nitobi.drawing.align.ALIGNMIDDLEHORIZ=1;
nitobi.drawing.alignOuterBox=function(_1b3,_1b4,_1b5,oh,ow,oy,ox,show){
oh=oh||0;
ow=ow||0;
oy=oy||0;
ox=ox||0;
if(nitobi.browser.moz){
td=document.getBoxObjectFor(_1b4);
sd=document.getBoxObjectFor(_1b3);
var _1bb=parseInt(document.defaultView.getComputedStyle(_1b4,"").getPropertyValue("border-left-width"));
var _1bc=parseInt(document.defaultView.getComputedStyle(_1b4,"").getPropertyValue("border-top-width"));
var _1bd=parseInt(document.defaultView.getComputedStyle(_1b3,"").getPropertyValue("border-top-width"));
var _1be=parseInt(document.defaultView.getComputedStyle(_1b3,"").getPropertyValue("border-bottom-width"));
var _1bf=parseInt(document.defaultView.getComputedStyle(_1b3,"").getPropertyValue("border-left-width"));
var _1c0=parseInt(document.defaultView.getComputedStyle(_1b3,"").getPropertyValue("border-right-width"));
oy=oy+_1bd-_1bc;
ox=ox+_1bf-_1bb;
}
nitobi.drawing.align(_1b3,_1b4,_1b5,oh,ow,oy,ox,show);
};
nitobi.lang.defineNs("nitobi.html");
if(false){
nitobi.html=function(){
};
}
nitobi.html.createElement=function(_1c1,_1c2,_1c3){
var elem=document.createElement(_1c1);
for(var attr in _1c2){
if(attr.toLowerCase().substring(0,5)=="class"){
elem.className=_1c2[attr];
}else{
elem.setAttribute(attr,_1c2[attr]);
}
}
for(var _1c6 in _1c3){
elem.style[_1c6]=_1c3[_1c6];
}
return elem;
};
nitobi.html.createTable=function(_1c7,_1c8){
var _1c9=nitobi.html.createElement("table",_1c7,_1c8);
var _1ca=document.createElement("tbody");
var _1cb=document.createElement("tr");
var _1cc=document.createElement("td");
_1c9.appendChild(_1ca);
_1ca.appendChild(_1cb);
_1cb.appendChild(_1cc);
return _1c9;
};
nitobi.html.setBgImage=function(elem,src){
var s=nitobi.html.Css.getStyle(elem,"background-image");
if(s!=""&&nitobi.browser.IE){
s=s.replace(/(^url\(")(.*?)("\))/,"$2");
}
};
nitobi.html.fitWidth=function(_1d0,_1d1){
var w;
var C=nitobi.html.Css;
if(nitobi.browser.IE&&!nitobi.lang.isStandards()){
var _1d4=(parseInt(C.getStyle(_1d0,"width"))-parseInt(C.getStyle(_1d0,"paddingLeft"))-parseInt(C.getStyle(_1d0,"paddingRight"))-parseInt(C.getStyle(_1d0,"borderLeftWidth"))-parseInt(C.getStyle(_1d0,"borderRightWidth")));
if(_1d4<0){
_1d4=0;
}
w=_1d4+"px";
}else{
if(nitobi.lang.isStandards()){
if(nitobi.browser.IE){
var _1d4=(parseInt(_1d0.clientWidth))-(_1d1.offsetWidth-_1d1.clientWidth);
}else{
var _1d4=(parseInt(_1d0.style.width)-(_1d1.offsetWidth-parseInt(_1d0.style.width)));
}
if(_1d4<0){
_1d4=0;
}
w=_1d4+"px";
}else{
w=parseInt(_1d0.style.width)+"px";
}
}
_1d1.style.width=w;
};
nitobi.html.getDomNodeByPath=function(Node,Path){
if(nitobi.browser.IE){
}
var _1d7=Node;
var _1d8=Path.split("/");
var len=_1d8.length;
for(var i=0;i<len;i++){
if(_1d7.childNodes[Number(_1d8[i])]!=null){
_1d7=_1d7.childNodes[Number(_1d8[i])];
}else{
alert("Path expression failed."+Path);
}
var s="";
}
return _1d7;
};
nitobi.html.indexOfChildNode=function(_1dc,_1dd){
var _1de=_1dc.childNodes;
for(var i=0;i<_1de.length;i++){
if(_1de[i]==_1dd){
return i;
}
}
return -1;
};
nitobi.html.evalScriptBlocks=function(node){
for(var i=0;i<node.childNodes.length;i++){
var _1e2=node.childNodes[i];
if(_1e2.nodeName.toLowerCase()=="script"){
eval(_1e2.text);
}else{
nitobi.html.evalScriptBlocks(_1e2);
}
}
};
nitobi.html.position=function(node){
var pos=nitobi.html.getStyle($ntb(node),"position");
if(pos=="static"){
node.style.position="relative";
}
};
nitobi.html.setOpacity=function(_1e5,_1e6){
var _1e7=_1e5.style;
_1e7.opacity=(_1e6/100);
_1e7.MozOpacity=(_1e6/100);
_1e7.KhtmlOpacity=(_1e6/100);
_1e7.filter="alpha(opacity="+_1e6+")";
};
nitobi.html.highlight=function(o,x,end){
end=end||o.value.length;
if(o.createTextRange){
o.focus();
var r=o.createTextRange();
r.move("character",0-end);
r.move("character",x);
r.moveEnd("textedit",1);
r.select();
}else{
if(o.setSelectionRange){
o.focus();
o.setSelectionRange(x,end);
}
}
};
nitobi.html.setCursor=function(o,x){
if(o.createTextRange){
o.focus();
var r=o.createTextRange();
r.move("character",0-o.value.length);
r.move("character",x);
r.select();
}else{
if(o.setSelectionRange){
o.setSelectionRange(x,x);
}
}
};
nitobi.html.getCursor=function(o){
if(o.createTextRange){
o.focus();
var r=document.selection.createRange().duplicate();
r.moveEnd("textedit",1);
return o.value.length-r.text.length;
}else{
if(o.setSelectionRange){
return o.selectionStart;
}
}
return -1;
};
nitobi.html.encode=function(str){
str+="";
str=str.replace(/&/g,"&amp;");
str=str.replace(/\"/g,"&quot;");
str=str.replace(/'/g,"&apos;");
str=str.replace(/</g,"&lt;");
str=str.replace(/>/g,"&gt;");
str=str.replace(/\n/g,"<br>");
return str;
};
nitobi.html.getElement=function(_1f2){
if(typeof (_1f2)=="string"){
return document.getElementById(_1f2);
}
return _1f2;
};
if(typeof ($)=="undefined"){
$=nitobi.html.getElement;
}
if(typeof ($ntb)=="undefined"){
$ntb=nitobi.html.getElement;
}
if(typeof ($F)=="undefined"){
$F=function(id){
var _1f4=$ntb(id);
if(_1f4!=null){
return _1f4.value;
}
return "";
};
}
nitobi.html.getTagName=function(elem){
if(nitobi.browser.IE&&elem.scopeName!=""){
return (elem.scopeName+":"+elem.nodeName).toLowerCase();
}else{
return elem.nodeName.toLowerCase();
}
};
nitobi.html.getStyleTop=function(elem){
var top=elem.style.top;
if(top==""){
top=nitobi.html.Css.getStyle(elem,"top");
}
return nitobi.lang.parseNumber(top);
};
nitobi.html.getStyleLeft=function(elem){
var left=elem.style.left;
if(left==""){
left=nitobi.html.Css.getStyle(elem,"left");
}
return nitobi.lang.parseNumber(left);
};
nitobi.html.getHeight=function(elem){
return elem.offsetHeight;
};
nitobi.html.getWidth=function(elem){
return elem.offsetWidth;
};
if(nitobi.browser.IE||nitobi.browser.MOZ){
nitobi.html.getBox=function(elem){
var _1fd=nitobi.lang.parseNumber(nitobi.html.getStyle(document.body,"border-top-width"));
var _1fe=nitobi.lang.parseNumber(nitobi.html.getStyle(document.body,"border-left-width"));
var _1ff=nitobi.lang.parseNumber(document.body.scrollTop)-(_1fd==0?2:_1fd);
var _200=nitobi.lang.parseNumber(document.body.scrollLeft)-(_1fe==0?2:_1fe);
var rect=nitobi.html.getBoundingClientRect(elem);
return {top:rect.top+_1ff,left:rect.left+_200,bottom:rect.bottom,right:rect.right,height:rect.bottom-rect.top,width:rect.right-rect.left};
};
}else{
if(nitobi.browser.SAFARI||nitobi.browser.CHROME){
nitobi.html.getBox=function(elem){
var _203=nitobi.html.getCoords(elem);
return {top:_203.y,left:_203.x,bottom:_203.y+_203.height,right:_203.x+_203.width,height:_203.height,width:_203.width};
};
}
}
nitobi.html.getBox2=nitobi.html.getBox;
nitobi.html.getUniqueId=function(elem){
if(elem.uniqueID){
return elem.uniqueID;
}else{
var t=(new Date()).getTime();
elem.uniqueID=t;
return t;
}
};
nitobi.html.getChildNodeById=function(elem,_207,_208){
return nitobi.html.getChildNodeByAttribute(elem,"id",_207,_208);
};
nitobi.html.getChildNodeByAttribute=function(elem,_20a,_20b,_20c){
for(var i=0;i<elem.childNodes.length;i++){
if(elem.nodeType!=3&&Boolean(elem.childNodes[i].getAttribute)){
if(elem.childNodes[i].getAttribute(_20a)==_20b){
return elem.childNodes[i];
}
}
}
if(_20c){
for(var i=0;i<elem.childNodes.length;i++){
var _20e=nitobi.html.getChildNodeByAttribute(elem.childNodes[i],_20a,_20b,_20c);
if(_20e!=null){
return _20e;
}
}
}
return null;
};
nitobi.html.getParentNodeById=function(elem,_210){
return nitobi.html.getParentNodeByAtt(elem,"id",_210);
};
nitobi.html.getParentNodeByAtt=function(elem,att,_213){
while(elem.parentNode!=null){
if(elem.parentNode.getAttribute(att)==_213){
return elem.parentNode;
}
elem=elem.parentNode;
}
return null;
};
if(nitobi.browser.IE){
nitobi.html.getFirstChild=function(node){
return node.firstChild;
};
}else{
nitobi.html.getFirstChild=function(node){
var i=0;
while(i<node.childNodes.length&&node.childNodes[i].nodeType==3){
i++;
}
return node.childNodes[i];
};
}
nitobi.html.getScroll=function(){
var _217,_218=0;
if((nitobi.browser.OPERA==false)&&(document.documentElement.scrollTop>0)){
_217=document.documentElement.scrollTop;
_218=document.documentElement.scrollLeft;
}else{
_217=document.body.scrollTop;
_218=document.body.scrollLeft;
}
if(((_217==0)&&(document.documentElement.scrollTop>0))||((_218==0)&&(document.documentElement.scrollLeft>0))){
_217=document.documentElement.scrollTop;
_218=document.documentElement.scrollLeft;
}
return {"left":_218,"top":_217};
};
nitobi.html.getCoords=function(_219){
var ew,eh;
try{
var _21c=_219;
ew=_219.offsetWidth;
eh=_219.offsetHeight;
for(var lx=0,ly=0;_219!=null;lx+=_219.offsetLeft,ly+=_219.offsetTop,_219=_219.offsetParent){
}
for(;_21c!=document.body;lx-=_21c.scrollLeft,ly-=_21c.scrollTop,_21c=_21c.parentNode){
}
}
catch(e){
}
return {"x":lx,"y":ly,"height":eh,"width":ew};
};
nitobi.html.scrollBarWidth=0;
nitobi.html.getScrollBarWidth=function(_21f){
if(nitobi.html.scrollBarWidth){
return nitobi.html.scrollBarWidth;
}
try{
if(null==_21f){
var _220="ntb-scrollbar-width";
var d=document.getElementById(_220);
if(null==d){
d=nitobi.html.createElement("div",{"id":_220},{width:"100px",height:"100px",overflow:"auto",position:"absolute",top:"-200px",left:"-5000px"});
d.innerHTML="<div style='height:200px;'></div>";
document.body.appendChild(d);
}
_21f=d;
}
if(nitobi.browser.IE||nitobi.browser.MOZ){
nitobi.html.scrollBarWidth=Math.abs(_21f.offsetWidth-_21f.clientWidth-(_21f.clientLeft?_21f.clientLeft*2:0));
}else{
if(nitobi.browser.SAFARI||nitobi.browser.CHROME){
var b=nitobi.html.getBox(_21f);
nitobi.html.scrollBarWidth=Math.abs((b.width-_21f.clientWidth));
}
}
}
catch(err){
}
return nitobi.html.scrollBarWidth;
};
nitobi.html.align=nitobi.drawing.align;
nitobi.html.emptyElements={HR:true,BR:true,IMG:true,INPUT:true};
nitobi.html.specialElements={TEXTAREA:true};
nitobi.html.permHeight=0;
nitobi.html.permWidth=0;
nitobi.html.getBodyArea=function(){
var _223,_224,_225,_226;
var x,y;
var _229=false;
if(nitobi.lang.isStandards()){
_229=true;
}
var de=document.documentElement;
var db=document.body;
if(self.innerHeight){
x=self.innerWidth;
y=self.innerHeight;
}else{
if(de&&de.clientHeight){
x=de.clientWidth;
y=de.clientHeight;
}else{
if(db){
x=db.clientWidth;
y=db.clientHeight;
}
}
}
_225=x;
_226=y;
if(self.pageYOffset){
x=self.pageXOffset;
y=self.pageYOffset;
}else{
if(de&&de.scrollTop){
x=de.scrollLeft;
y=de.scrollTop;
}else{
if(db){
x=db.scrollLeft;
y=db.scrollTop;
}
}
}
_223=x;
_224=y;
var _22c=db.scrollHeight;
var _22d=db.offsetHeight;
if(_22c>_22d){
x=db.scrollWidth;
y=db.scrollHeight;
}else{
x=db.offsetWidth;
y=db.offsetHeight;
}
nitobi.html.permHeight=y;
nitobi.html.permWidth=x;
if(nitobi.html.permHeight<_226){
nitobi.html.permHeight=_226;
if(nitobi.browser.IE&&_229){
_225+=20;
}
}
if(_225<nitobi.html.permWidth){
_225=nitobi.html.permWidth;
}
if(nitobi.html.permHeight>_226){
_225+=20;
}
var _22e,_22f;
_22e=de.scrollHeight;
_22f=de.scrollWidth;
return {scrollWidth:_22f,scrollHeight:_22e,scrollLeft:_223,scrollTop:_224,clientWidth:_225,clientHeight:_226,bodyWidth:nitobi.html.permWidth,bodyHeight:nitobi.html.PermHeight};
};
nitobi.html.getOuterHtml=function(node){
if(nitobi.browser.IE){
return node.outerHTML;
}else{
var html="";
switch(node.nodeType){
case Node.ELEMENT_NODE:
html+="<";
html+=node.nodeName.toLowerCase();
if(!nitobi.html.specialElements[node.nodeName]){
for(var a=0;a<node.attributes.length;a++){
if(node.attributes[a].nodeName.toLowerCase()!="_moz-userdefined"){
html+=" "+node.attributes[a].nodeName.toLowerCase()+"=\""+node.attributes[a].nodeValue+"\"";
}
}
html+=">";
if(!nitobi.html.emptyElements[node.nodeName]){
html+=node.innerHTML;
html+="</"+node.nodeName.toLowerCase()+">";
}
}else{
switch(node.nodeName){
case "TEXTAREA":
for(var a=0;a<node.attributes.length;a++){
if(node.attributes[a].nodeName.toLowerCase()!="value"){
html+=" "+node.attributes[a].nodeName.toUpperCase()+"=\""+node.attributes[a].nodeValue+"\"";
}else{
var _233=node.attributes[a].nodeValue;
}
}
html+=">";
html+=_233;
html+="</"+node.nodeName+">";
break;
}
}
break;
case Node.TEXT_NODE:
html+=node.nodeValue;
break;
case Node.COMMENT_NODE:
html+="<!"+"--"+node.nodeValue+"--"+">";
break;
}
return html;
}
};
nitobi.html.insertAdjacentText=function(_234,pos,s){
if(nitobi.browser.IE){
return _234.insertAdjacentText(pos,s);
}
var node=document.createTextNode(s);
nitobi.html.insertAdjacentElement(_234,pos,node);
};
nitobi.html.insertAdjacentHTML=function(_238,_239,_23a,_23b){
if(nitobi.browser.IE){
return _238.insertAdjacentHTML(_239,_23a,_23b);
}
var df;
var r=_238.ownerDocument.createRange();
switch(String(_239).toLowerCase()){
case "beforebegin":
r.setStartBefore(_238);
df=r.createContextualFragment(_23a);
_238.parentNode.insertBefore(df,_238);
break;
case "afterbegin":
r.selectNodeContents(_238);
r.collapse(true);
df=r.createContextualFragment(_23a);
_238.insertBefore(df,_238.firstChild);
break;
case "beforeend":
if(_23b==true){
_238.innerHTML=_238.innerHTML+_23a;
}else{
r.selectNodeContents(_238);
r.collapse(false);
df=r.createContextualFragment(_23a);
_238.appendChild(df);
}
break;
case "afterend":
r.setStartAfter(_238);
df=r.createContextualFragment(_23a);
_238.parentNode.insertBefore(df,_238.nextSibling);
break;
}
};
nitobi.html.insertAdjacentElement=function(_23e,pos,node){
if(nitobi.browser.IE){
return _23e.insertAdjacentElement(pos,node);
}
switch(pos){
case "beforeBegin":
_23e.parentNode.insertBefore(node,_23e);
break;
case "afterBegin":
_23e.insertBefore(node,_23e.firstChild);
break;
case "beforeEnd":
_23e.appendChild(node);
break;
case "afterEnd":
if(_23e.nextSibling){
_23e.parentNode.insertBefore(node,_23e.nextSibling);
}else{
_23e.parentNode.appendChild(node);
}
break;
}
};
nitobi.html.getClientRects=function(node,_242,_243){
if(nitobi.browser.IE||nitobi.browser.MOZ){
return node.getClientRects();
}
_242=_242||0;
_243=_243||0;
var td;
if(nitobi.browser.SAFARI||nitobi.browser.CHROME){
td=nitobi.html.getCoords(node);
_242=0;
_243=0;
}
return new Array({top:(td.y-_242),left:(td.x-_243),bottom:(td.y+td.height-_242),right:(td.x+td.width-_243)});
};
nitobi.html.getBoundingClientRect=function(node,_246,_247){
if(nitobi.browser.IE||nitobi.browser.MOZ){
return node.getBoundingClientRect();
}
_246=_246||0;
_247=_247||0;
var td;
if(nitobi.browser.SAFARI||nitobi.browser.CHROME){
td=nitobi.html.getCoords(node);
_246=0;
_247=0;
}
var top=td.y-_246;
var left=td.x-_247;
return {top:top,left:left,bottom:(top+td.height),right:(left+td.width)};
};
nitobi.html.Event=function(){
this.srcElement=null;
this.fromElement=null;
this.toElement=null;
this.eventSrc=null;
};
nitobi.html.handlerId=0;
nitobi.html.elementId=0;
nitobi.html.elements=[];
nitobi.html.unload=[];
nitobi.html.unloadCalled=false;
nitobi.html.attachEvents=function(_24b,_24c,_24d){
var _24e=[];
for(var i=0;i<_24c.length;i++){
var e=_24c[i];
_24e.push(nitobi.html.attachEvent(_24b,e.type,e.handler,_24d,e.capture||false));
}
return _24e;
};
nitobi.html.attachEvent=function(_251,type,_253,_254,_255,_256){
if(type=="anyclick"){
if(nitobi.browser.IE){
nitobi.html.attachEvent(_251,"dblclick",_253,_254,_255,_256);
}
type="click";
}
if(!(_253 instanceof Function)){
nitobi.lang.throwError("Event handler needs to be a Function");
}
_251=$ntb(_251);
if(type.toLowerCase()=="unload"&&_256!=true){
var _257=_253;
if(_254!=null){
_257=function(){
_253.call(_254);
};
}
return this.addUnload(_257);
}
var _258=this.handlerId++;
var _259=this.elementId++;
if(typeof (_253.ebaguid)!="undefined"){
_258=_253.ebaguid;
}else{
_253.ebaguid=_258;
}
if(typeof (_251.ebaguid)=="undefined"){
_251.ebaguid=_259;
nitobi.html.elements[_259]=_251;
}
if(typeof (_251.eba_events)=="undefined"){
_251.eba_events={};
}
if(_251.eba_events[type]==null){
_251.eba_events[type]={};
if(_251.attachEvent){
_251["eba_event_"+type]=function(){
nitobi.html.notify.call(_251,window.event);
};
_251.attachEvent("on"+type,_251["eba_event_"+type]);
if(_255&&_251.setCapture!=null){
_251.setCapture(true);
}
}else{
if(_251.addEventListener){
_251["eba_event_"+type]=function(){
nitobi.html.notify.call(_251,arguments[0]);
};
_251.addEventListener(type,_251["eba_event_"+type],_255);
}
}
}
_251.eba_events[type][_258]={handler:_253,context:_254};
return _258;
};
nitobi.html.notify=function(e){
if(!nitobi.browser.IE){
e.srcElement=e.target;
e.fromElement=e.relatedTarget;
e.toElement=e.relatedTarget;
}
var _25b=this;
e.eventSrc=_25b;
nitobi.html.Event=e;
for(var _25c in _25b.eba_events[e.type]){
var _25d=_25b.eba_events[e.type][_25c];
if(typeof (_25d.context)=="object"){
_25d.handler.call(_25d.context,e,_25b);
}else{
_25d.handler.call(_25b,e,_25b);
}
}
};
nitobi.html.detachEvents=function(_25e,_25f){
for(var i=0;i<_25f.length;i++){
var e=_25f[i];
nitobi.html.detachEvent(_25e,e.type,e.handler);
}
};
nitobi.html.detachEvent=function(_262,type,_264){
_262=$ntb(_262);
var _265=_264;
if(_264 instanceof Function){
_265=_264.ebaguid;
}
if(type=="unload"){
this.unload.splice(ebaguid,1);
}
if(_262!=null&&_262.eba_events!=null&&_262.eba_events[type]!=null&&_262.eba_events[type][_265]!=null){
var _266=_262.eba_events[type];
_266[_265]=null;
delete _266[_265];
if(nitobi.collections.isHashEmpty(_266)){
this.m_detach(_262,type,_262["eba_event_"+type]);
_262["eba_event_"+type]=null;
_262.eba_events[type]=null;
_266=null;
if(_262.nodeType==1){
_262.removeAttribute("eba_event_"+type);
}
}
}
return true;
};
nitobi.html.m_detach=function(_267,type,_269){
if(_269!=null&&_269 instanceof Function){
if(_267.detachEvent){
_267.detachEvent("on"+type,_269);
}else{
if(_267.removeEventListener){
_267.removeEventListener(type,_269,false);
}
}
_267["on"+type]=null;
if(type=="unload"){
for(var i=0;i<this.unload.length;i++){
this.unload[i].call(this);
this.unload[i]=null;
}
}
}
};
nitobi.html.detachAllEvents=function(evt){
for(var i=0;i<nitobi.html.elements.length;i++){
if(typeof (nitobi.html.elements[i])!="undefined"){
for(var _26d in nitobi.html.elements[i].eba_events){
nitobi.html.m_detach(nitobi.html.elements[i],_26d,nitobi.html.elements[i]["eba_event_"+_26d]);
if(typeof (nitobi.html.elements[i])!="undefined"&&nitobi.html.elements[i].eba_events[_26d]!=null){
for(var _26e in nitobi.html.elements[i].eba_events[_26d]){
nitobi.html.elements[i].eba_events[_26d][_26e]=null;
}
}
nitobi.html.elements[i]["eba_event_"+_26d]=null;
}
}
}
nitobi.html.elements=null;
};
nitobi.html.addUnload=function(_26f){
this.unload.push(_26f);
return this.unload.length-1;
};
nitobi.html.cancelEvent=function(evt){
nitobi.html.stopPropagation(evt);
nitobi.html.preventDefault(evt);
};
nitobi.html.stopPropagation=function(evt){
if(evt==null){
return;
}
if(nitobi.browser.IE){
evt.cancelBubble=true;
}else{
evt.stopPropagation();
}
};
nitobi.html.preventDefault=function(evt,v){
if(evt==null){
return;
}
if(nitobi.browser.IE){
evt.returnValue=false;
}else{
evt.preventDefault();
}
if(v!=null){
e.keyCode=v;
}
};
nitobi.html.getEventCoords=function(evt){
var _275={"x":evt.clientX,"y":evt.clientY};
if(nitobi.browser.IE){
_275.x+=document.documentElement.scrollLeft+document.body.scrollLeft;
_275.y+=document.documentElement.scrollTop+document.body.scrollTop;
}else{
_275.x+=window.scrollX;
_275.y+=window.scrollY;
}
return _275;
};
nitobi.html.getEvent=function(_276){
if(nitobi.browser.IE){
return window.event;
}else{
_276.srcElement=_276.target;
_276.fromElement=_276.relatedTarget;
_276.toElement=_276.relatedTarget;
return _276;
}
};
nitobi.html.createEvent=function(_277,_278,_279,_27a){
if(nitobi.browser.IE){
_279.target.fireEvent("on"+_278);
}else{
var _27b=document.createEvent(_277);
_27b.initKeyEvent(_278,true,true,document.defaultView,_279.ctrlKey,_279.altKey,_279.shiftKey,_279.metaKey,_27a.keyCode,_27a.charCode);
_279.target.dispatchEvent(_27b);
}
};
nitobi.html.unloadEventId=nitobi.html.attachEvent(window,"unload",nitobi.html.detachAllEvents,nitobi.html,false,true);
nitobi.lang.defineNs("nitobi.event");
nitobi.event=function(){
};
nitobi.event.keys={};
nitobi.event.guid=0;
nitobi.event.subscribe=function(key,_27d){
ntbAssert(key.indexOf("undefined")==-1,"Something used nitobi.event with an invalid key. The key was "+key);
nitobi.event.publish(key);
var guid=this.guid++;
this.keys[key].add(_27d,guid);
return guid;
};
nitobi.event.unsubscribe=function(key,guid){
ntbAssert(key.indexOf("undefined")==-1,"Something used nitobi.event with an invalid key. The key was "+key);
if(this.keys[key]==null){
return true;
}
if(this.keys[key].remove(guid)){
this.keys[key]=null;
delete this.keys[key];
}
};
nitobi.event.evaluate=function(func,_282){
var _283=true;
if(typeof func=="string"){
func=func.replace(/eventArgs/gi,"arguments[1]");
var _284=eval(func);
_283=(typeof (_284)=="undefined"?true:_284);
}
return _283;
};
nitobi.event.publish=function(key){
ntbAssert(key.indexOf("undefined")==-1,"Something used nitobi.event with an invalid key. The key was "+key);
if(this.keys[key]==null){
this.keys[key]=new nitobi.event.Key();
}
};
nitobi.event.notify=function(key,_287){
ntbAssert(key.indexOf("undefined")==-1,"Something used nitobi.event with an invalid key. The key was "+key);
if(this.keys[key]!=null){
return this.keys[key].notify(_287);
}else{
return true;
}
};
nitobi.event.dispose=function(){
for(var key in this.keys){
if(typeof (this.keys[key])=="function"){
this.keys[key].dispose();
}
}
this.keys=null;
};
nitobi.event.Key=function(){
this.handlers={};
};
nitobi.event.Key.prototype.add=function(_289,guid){
ntbAssert(_289 instanceof Function,"EventKey.add requires a JavaScript function pointer as a parameter.","",EBA_THROW);
this.handlers[guid]=_289;
};
nitobi.event.Key.prototype.remove=function(guid){
this.handlers[guid]=null;
delete this.handlers[guid];
var i=true;
for(var item in this.handlers){
i=false;
break;
}
return i;
};
nitobi.event.Key.prototype.notify=function(_28e){
var fail=false;
for(var item in this.handlers){
var _291=this.handlers[item];
if(_291 instanceof Function){
var rv=(_291.apply(this,arguments)==false);
fail=fail||rv;
}else{
}
}
return !fail;
};
nitobi.event.Key.prototype.dispose=function(){
for(var _293 in this.handlers){
this.handlers[_293]=null;
}
};
nitobi.event.Args=function(src){
this.source=src;
};
nitobi.event.Args.prototype.callback=function(){
};
nitobi.html.cancelBubble=nitobi.html.cancelEvent;
nitobi.html.getCssRules=nitobi.html.Css.getRules;
nitobi.html.findParentStylesheet=nitobi.html.Css.findParentStylesheet;
nitobi.html.getClass=nitobi.html.Css.getClass;
nitobi.html.getStyle=nitobi.html.Css.getStyle;
nitobi.html.addClass=nitobi.html.Css.addClass;
nitobi.html.removeClass=nitobi.html.Css.removeClass;
nitobi.html.getClassStyle=nitobi.html.Css.getClassStyle;
nitobi.html.normalizeUrl=nitobi.html.Url.normalize;
nitobi.html.setUrlParameter=nitobi.html.Url.setParameter;
nitobi.lang.defineNs("nitobi.base.XmlNamespace");
nitobi.base.XmlNamespace.prefix="ntb";
nitobi.base.XmlNamespace.uri="http://www.nitobi.com";
nitobi.lang.defineNs("nitobi.collections");
if(false){
nitobi.collections=function(){
};
}
nitobi.collections.IEnumerable=function(){
this.list=new Array();
this.length=0;
};
nitobi.collections.IEnumerable.prototype.add=function(obj){
this.list[this.getLength()]=obj;
this.length++;
};
nitobi.collections.IEnumerable.prototype.insert=function(_296,obj){
this.list.splice(_296,0,obj);
this.length++;
};
nitobi.collections.IEnumerable.createNewArray=function(obj,_299){
var _29a;
_299=_299||0;
if(obj.count){
_29a=obj.count;
}
if(obj.length){
_29a=obj.length;
}
var x=new Array(_29a-_299);
for(var i=_299;i<_29a;i++){
x[i-_299]=obj[i];
}
return x;
};
nitobi.collections.IEnumerable.prototype.get=function(_29d){
if(_29d<0||_29d>=this.getLength()){
nitobi.lang.throwError(nitobi.error.OutOfBounds);
}
return this.list[_29d];
};
nitobi.collections.IEnumerable.prototype.set=function(_29e,_29f){
if(_29e<0||_29e>=this.getLength()){
nitobi.lang.throwError(nitobi.error.OutOfBounds);
}
this.list[_29e]=_29f;
};
nitobi.collections.IEnumerable.prototype.indexOf=function(obj){
for(var i=0;i<this.getLength();i++){
if(this.list[i]===obj){
return i;
}
}
return -1;
};
nitobi.collections.IEnumerable.prototype.remove=function(_2a2){
var i;
if(typeof (_2a2)!="number"){
i=this.indexOf(_2a2);
}else{
i=_2a2;
}
if(-1==i||i<0||i>=this.getLength()){
nitobi.lang.throwError(nitobi.error.OutOfBounds);
}
this.list[i]=null;
this.list.splice(i,1);
this.length--;
};
nitobi.collections.IEnumerable.prototype.getLength=function(){
return this.length;
};
nitobi.collections.IEnumerable.prototype.each=function(func){
var l=this.length;
var list=this.list;
for(var i=0;i<l;i++){
func(list[i]);
}
};
nitobi.lang.defineNs("nitobi.base");
nitobi.base.ISerializable=function(_2a8,id,xml,_2ab){
nitobi.Object.call(this);
if(typeof (this.ISerializableInitialized)=="undefined"){
this.ISerializableInitialized=true;
}else{
return;
}
this.xmlNode=null;
this.setXmlNode(_2a8);
if(_2a8!=null){
this.profile=nitobi.base.Registry.getInstance().getCompleteProfile({idField:null,tagName:_2a8.nodeName});
}else{
this.profile=nitobi.base.Registry.getInstance().getProfileByInstance(this);
}
this.onDeserialize=new nitobi.base.Event();
this.onSetParentObject=new nitobi.base.Event();
this.factory=nitobi.base.Factory.getInstance();
this.objectHash={};
this.onCreateObject=new nitobi.base.Event();
if(_2a8!=null){
this.deserializeFromXmlNode(this.getXmlNode());
}else{
if(this.factory!=null&&this.profile.tagName!=null){
this.createByProfile(this.profile,this.getXmlNode());
}else{
if(xml!=null&&_2a8!=null){
this.createByXml(xml);
}
}
}
this.disposal.push(this.xmlNode);
};
nitobi.lang.extend(nitobi.base.ISerializable,nitobi.Object);
nitobi.base.ISerializable.guidMap={};
nitobi.base.ISerializable.prototype.ISerializableImplemented=true;
nitobi.base.ISerializable.prototype.getProfile=function(){
return this.profile;
};
nitobi.base.ISerializable.prototype.createByProfile=function(_2ac,_2ad){
if(_2ad==null){
var xml="<"+_2ac.tagName+" xmlns:"+nitobi.base.XmlNamespace.prefix+"=\""+nitobi.base.XmlNamespace.uri+"\" />";
var _2af=nitobi.xml.createXmlDoc(xml);
this.setXmlNode(_2af.firstChild);
this.deserializeFromXmlNode(this.xmlNode);
}else{
this.deserializeFromXmlNode(_2ad);
this.setXmlNode(_2ad);
}
};
nitobi.base.ISerializable.prototype.createByXml=function(xml){
this.deserializeFromXml(xml);
};
nitobi.base.ISerializable.prototype.getParentObject=function(){
return this.parentObj;
};
nitobi.base.ISerializable.prototype.setParentObject=function(_2b1){
this.parentObj=_2b1;
this.onSetParentObject.notify();
};
nitobi.base.ISerializable.prototype.addChildObject=function(_2b2){
this.addToCache(_2b2);
_2b2.setParentObject(this);
var _2b3=_2b2.getXmlNode();
if(!this.areGuidsGenerated(_2b3)){
_2b3=this.generateGuids(_2b3);
_2b2.setXmlNode(_2b3);
}
_2b2.setXmlNode(this.xmlNode.appendChild(nitobi.xml.importNode(this.xmlNode.ownerDocument,_2b3,true)));
};
nitobi.base.ISerializable.prototype.insertBeforeChildObject=function(obj,_2b5){
_2b5=_2b5?_2b5.getXmlNode():null;
this.addToCache(obj);
obj.setParentObject(this);
var _2b6=obj.getXmlNode();
if(!this.areGuidsGenerated(_2b6)){
_2b6=this.generateGuids(_2b6);
obj.setXmlNode(_2b6);
}
_2b6=nitobi.xml.importNode(this.xmlNode.ownerDocument,_2b6,true);
this.xmlNode.insertBefore(_2b6,_2b5);
};
nitobi.base.ISerializable.prototype.createElement=function(name){
var _2b8;
if(this.xmlNode==null||this.xmlNode.ownerDocument==null){
_2b8=nitobi.xml.createXmlDoc();
}else{
_2b8=this.xmlNode.ownerDocument;
}
if(nitobi.browser.IE){
return _2b8.createNode(1,name,nitobi.base.XmlNamespace.uri);
}else{
if(_2b8.createElementNS){
return _2b8.createElementNS(nitobi.base.XmlNamespace.uri,name);
}else{
nitobi.lang.throwError("Unable to create a new xml node on this browser.");
}
}
};
nitobi.base.ISerializable.prototype.deleteChildObject=function(id){
this.removeFromCache(id);
var e=this.getElement(id);
if(e!=null){
e.parentNode.removeChild(e);
}
};
nitobi.base.ISerializable.prototype.addToCache=function(obj){
this.objectHash[obj.getId()]=obj;
};
nitobi.base.ISerializable.prototype.removeFromCache=function(id){
this.objectHash[id]=null;
};
nitobi.base.ISerializable.prototype.inCache=function(id){
return (this.objectHash[id]!=null);
};
nitobi.base.ISerializable.prototype.flushCache=function(){
this.objectHash={};
};
nitobi.base.ISerializable.prototype.areGuidsGenerated=function(_2be){
if(_2be==null||_2be.ownerDocument==null){
return false;
}
if(nitobi.browser.IE){
var node=_2be.ownerDocument.documentElement;
if(node==null){
return false;
}else{
var id=node.getAttribute("id");
if(id==null||id==""){
return false;
}else{
return (nitobi.base.ISerializable.guidMap[id]!=null);
}
}
}else{
return (_2be.ownerDocument.generatedGuids==true);
}
};
nitobi.base.ISerializable.prototype.setGuidsGenerated=function(_2c1,_2c2){
if(_2c1==null||_2c1.ownerDocument==null){
return;
}
if(nitobi.browser.IE){
var node=_2c1.ownerDocument.documentElement;
if(node!=null){
var id=node.getAttribute("id");
if(id!=null&&id!=""){
nitobi.base.ISerializable.guidMap[id]=true;
}
}
}else{
_2c1.ownerDocument.generatedGuids=true;
}
};
nitobi.base.ISerializable.prototype.generateGuids=function(_2c5){
nitobi.base.uniqueIdGeneratorProc.addParameter("guid",nitobi.component.getUniqueId(),"");
var doc=nitobi.xml.transformToXml(_2c5,nitobi.base.uniqueIdGeneratorProc);
this.saveDocument=doc;
this.setGuidsGenerated(doc.documentElement,true);
return doc.documentElement;
};
nitobi.base.ISerializable.prototype.deserializeFromXmlNode=function(_2c7){
if(!this.areGuidsGenerated(_2c7)){
_2c7=this.generateGuids(_2c7);
}
this.setXmlNode(_2c7);
this.flushCache();
if(this.profile==null){
this.profile=nitobi.base.Registry.getInstance().getCompleteProfile({idField:null,tagName:_2c7.nodeName});
}
this.onDeserialize.notify();
};
nitobi.base.ISerializable.prototype.deserializeFromXml=function(xml){
var doc=nitobi.xml.createXmlDoc(xml);
var node=this.generateGuids(doc.firstChild);
this.setXmlNode(node);
this.onDeserialize.notify();
};
nitobi.base.ISerializable.prototype.getChildObject=function(id){
var obj=null;
obj=this.objectHash[id];
if(obj==null){
var _2cd=this.getElement(id);
if(_2cd==null){
return null;
}else{
obj=this.factory.createByNode(_2cd);
this.onCreateObject.notify(obj);
this.addToCache(obj);
}
obj.setParentObject(this);
}
return obj;
};
nitobi.base.ISerializable.prototype.getChildObjectById=function(id){
return this.getChildObject(id);
};
nitobi.base.ISerializable.prototype.getElement=function(id){
try{
var node=this.xmlNode.selectSingleNode("*[@id='"+id+"']");
return node;
}
catch(err){
nitobi.lang.throwError(nitobi.error.Unexpected,err);
}
};
nitobi.base.ISerializable.prototype.getFactory=function(){
return this.factory;
};
nitobi.base.ISerializable.prototype.setFactory=function(_2d1){
this.factory=factory;
};
nitobi.base.ISerializable.prototype.getXmlNode=function(){
return this.xmlNode;
};
nitobi.base.ISerializable.prototype.setXmlNode=function(_2d2){
if(nitobi.lang.typeOf(_2d2)==nitobi.lang.type.XMLDOC&&_2d2!=null){
this.ownerDocument=_2d2;
_2d2=nitobi.html.getFirstChild(_2d2);
}else{
if(_2d2!=null){
this.ownerDocument=_2d2.ownerDocument;
}
}
if(_2d2!=null&&nitobi.browser.MOZ&&_2d2.ownerDocument==null){
nitobi.lang.throwError(nitobi.error.OrphanXmlNode+" ISerializable.setXmlNode");
}
this.xmlNode=_2d2;
};
nitobi.base.ISerializable.prototype.serializeToXml=function(){
return nitobi.xml.serialize(this.xmlNode);
};
nitobi.base.ISerializable.prototype.getAttribute=function(name,_2d4){
if(this[name]!=null){
return this[name];
}
var _2d5=this.xmlNode.getAttribute(name);
return _2d5===null?_2d4:_2d5;
};
nitobi.base.ISerializable.prototype.setAttribute=function(name,_2d7){
this[name]=_2d7;
this.xmlNode.setAttribute(name.toLowerCase(),_2d7!=null?_2d7.toString():"");
};
nitobi.base.ISerializable.prototype.setIntAttribute=function(name,_2d9){
var n=parseInt(_2d9);
if(_2d9!=null&&(typeof (n)!="number"||isNaN(n))){
nitobi.lang.throwError(name+" is not an integer and therefore cannot be set. It's value was "+_2d9);
}
this.setAttribute(name,_2d9);
};
nitobi.base.ISerializable.prototype.getIntAttribute=function(name,_2dc){
var x=this.getAttribute(name,_2dc);
if(x==null||x==""){
return 0;
}
var tx=parseInt(x);
if(isNaN(tx)){
nitobi.lang.throwError("ISerializable attempting to get "+name+" which was supposed to be an int but was actually NaN");
}
return tx;
};
nitobi.base.ISerializable.prototype.setBoolAttribute=function(name,_2e0){
_2e0=nitobi.lang.getBool(_2e0);
if(_2e0!=null&&typeof (_2e0)!="boolean"){
nitobi.lang.throwError(name+" is not an boolean and therefore cannot be set. It's value was "+_2e0);
}
this.setAttribute(name,(_2e0?"true":"false"));
};
nitobi.base.ISerializable.prototype.getBoolAttribute=function(name,_2e2){
var x=this.getAttribute(name,_2e2);
if(typeof (x)=="string"&&x==""){
return null;
}
var tx=nitobi.lang.getBool(x);
if(tx==null){
nitobi.lang.throwError("ISerializable attempting to get "+name+" which was supposed to be a bool but was actually "+x);
}
return tx;
};
nitobi.base.ISerializable.prototype.setDateAttribute=function(name,_2e6){
this.setAttribute(name,_2e6);
};
nitobi.base.ISerializable.prototype.getDateAttribute=function(name,_2e8){
if(this[name]){
return this[name];
}
var _2e9=this.getAttribute(name,_2e8);
return _2e9?new Date(_2e9):null;
};
nitobi.base.ISerializable.prototype.getId=function(){
return this.getAttribute("id");
};
nitobi.base.ISerializable.prototype.getChildObjectId=function(_2ea,_2eb){
var _2ec=(typeof (_2ea.className)=="string"?_2ea.tagName:_2ea.getXmlNode().nodeName);
var _2ed=_2ec;
if(_2eb){
_2ed+="[@instancename='"+_2eb+"']";
}
var node=this.getXmlNode().selectSingleNode(_2ed);
if(null==node){
return null;
}else{
return node.getAttribute("id");
}
};
nitobi.base.ISerializable.prototype.setObject=function(_2ef,_2f0){
if(_2ef.ISerializableImplemented!=true){
nitobi.lang.throwError(nitobi.error.ExpectedInterfaceNotFound+" ISerializable");
}
var id=this.getChildObjectId(_2ef,_2f0);
if(null!=id){
this.deleteChildObject(id);
}
if(_2f0){
_2ef.setAttribute("instancename",_2f0);
}
this.addChildObject(_2ef);
};
nitobi.base.ISerializable.prototype.getObject=function(_2f2,_2f3){
var id=this.getChildObjectId(_2f2,_2f3);
if(null==id){
return id;
}
return this.getChildObject(id);
};
nitobi.base.ISerializable.prototype.getObjectById=function(id){
return this.getChildObject(id);
};
nitobi.base.ISerializable.prototype.isDescendantExists=function(id){
var node=this.getXmlNode();
var _2f8=node.selectSingleNode("//*[@id='"+id+"']");
return (_2f8!=null);
};
nitobi.base.ISerializable.prototype.getPathToLeaf=function(id){
var node=this.getXmlNode();
var _2fb=node.selectSingleNode("//*[@id='"+id+"']");
if(nitobi.browser.IE){
_2fb.ownerDocument.setProperty("SelectionLanguage","XPath");
}
var _2fc=_2fb.selectNodes("./ancestor-or-self::*");
var _2fd=this.getId();
var _2fe=0;
for(var i=0;i<_2fc.length;i++){
if(_2fc[i].getAttribute("id")==_2fd){
_2fe=i+1;
break;
}
}
var arr=nitobi.collections.IEnumerable.createNewArray(_2fc,_2fe);
return arr.reverse();
};
nitobi.base.ISerializable.prototype.isDescendantInstantiated=function(id){
var node=this.getXmlNode();
var _303=node.selectSingleNode("//*[@id='"+id+"']");
if(nitobi.browser.IE){
_303.ownerDocument.setProperty("SelectionLanguage","XPath");
}
var _304=_303.selectNodes("ancestor::*");
var _305=false;
var obj=this;
for(var i=0;i<_304.length;i++){
if(_305){
var _308=_304[i].getAttribute("id");
instantiated=obj.inCache(_308);
if(!instantiated){
return false;
}
obj=this.getObjectById(_308);
}
if(_304[i].getAttribute("id")==this.getId()){
_305=true;
}
}
return obj.inCache(id);
};
nitobi.lang.defineNs("nitobi.base");
if(!nitobi.base.Registry){
nitobi.base.Registry=function(){
this.classMap={};
this.tagMap={};
};
if(!nitobi.base.Registry.instance){
nitobi.base.Registry.instance=null;
}
nitobi.base.Registry.getInstance=function(){
if(nitobi.base.Registry.instance==null){
nitobi.base.Registry.instance=new nitobi.base.Registry();
}
return nitobi.base.Registry.instance;
};
nitobi.base.Registry.prototype.getProfileByClass=function(_309){
return this.classMap[_309];
};
nitobi.base.Registry.prototype.getProfileByInstance=function(_30a){
var _30b=nitobi.lang.getFirstFunction(_30a);
var p=_30b.value.prototype;
var _30d=null;
var _30e=0;
for(var _30f in this.classMap){
var _310=this.classMap[_30f].classObject;
var _311=0;
while(_310&&_30a instanceof _310){
_310=_310.baseConstructor;
_311++;
}
if(_311>_30e){
_30e=_311;
_30d=_30f;
}
}
if(_30d){
return this.getProfileByClass(_30d);
}else{
return null;
}
};
nitobi.base.Registry.prototype.getProfileByTag=function(_312){
return this.tagMap[_312];
};
nitobi.base.Registry.prototype.getCompleteProfile=function(_313){
if(nitobi.lang.isDefined(_313.className)&&_313.className!=null){
return this.classMap[_313.className];
}
if(nitobi.lang.isDefined(_313.tagName)&&_313.tagName!=null){
return this.tagMap[_313.tagName];
}
nitobi.lang.throwError("A complete class profile could not be found. Insufficient information was provided.");
};
nitobi.base.Registry.prototype.register=function(_314){
if(!nitobi.lang.isDefined(_314.tagName)||null==_314.tagName){
nitobi.lang.throwError("Illegal to register a class without a tagName.");
}
if(!nitobi.lang.isDefined(_314.className)||null==_314.className){
nitobi.lang.throwError("Illegal to register a class without a className.");
}
this.tagMap[_314.tagName]=_314;
this.classMap[_314.className]=_314;
};
}
nitobi.lang.defineNs("nitobi.base");
nitobi.base.Factory=function(){
this.registry=nitobi.base.Registry.getInstance();
};
nitobi.lang.extend(nitobi.base.Factory,nitobi.Object);
nitobi.base.Factory.instance=null;
nitobi.base.Factory.prototype.createByClass=function(_315){
try{
return nitobi.lang.newObject(_315,arguments,1);
}
catch(err){
nitobi.lang.throwError("The Factory (createByClass) could not create the class "+_315+".",err);
}
};
nitobi.base.Factory.prototype.createByNode=function(_316){
try{
if(null==_316){
nitobi.lang.throwError(nitobi.error.ArgExpected);
}
if(nitobi.lang.typeOf(_316)==nitobi.lang.type.XMLDOC){
_316=nitobi.xml.getChildNodes(_316)[0];
}
var _317=this.registry.getProfileByTag(_316.nodeName).className;
var _318=_316.ownerDocument;
var _319=Array.prototype.slice.call(arguments,0);
var obj=nitobi.lang.newObject(_317,_319,0);
return obj;
}
catch(err){
nitobi.lang.throwError("The Factory (createByNode) could not create the class "+_317+".",err);
}
};
nitobi.base.Factory.prototype.createByProfile=function(_31b){
try{
return nitobi.lang.newObject(_31b.className,arguments,1);
}
catch(err){
nitobi.lang.throwError("The Factory (createByProfile) could not create the class "+_31b.className+".",err);
}
};
nitobi.base.Factory.prototype.createByTag=function(_31c){
var _31d=this.registry.getProfileByTag(_31c).className;
var _31e=Array.prototype.slice.call(arguments,0);
return nitobi.lang.newObject(_31d,_31e,1);
};
nitobi.base.Factory.getInstance=function(){
if(nitobi.base.Factory.instance==null){
nitobi.base.Factory.instance=new nitobi.base.Factory();
}
return nitobi.base.Factory.instance;
};
nitobi.lang.defineNs("nitobi.base");
nitobi.base.Profile=function(_31f,_320,_321,_322,_323){
this.className=_31f;
this.classObject=eval(_31f);
this.schema=_320;
this.singleton=_321;
this.tagName=_322;
this.idField=_323||"id";
};
nitobi.lang.defineNs("nitobi.base");
nitobi.base.Declaration=function(){
nitobi.base.Declaration.baseConstructor.call(this);
this.xmlDoc=null;
};
nitobi.lang.extend(nitobi.base.Declaration,nitobi.Object);
nitobi.base.Declaration.prototype.loadHtml=function(_324){
try{
_324=$ntb(_324);
this.xmlDoc=nitobi.xml.parseHtml(_324);
return this.xmlDoc;
}
catch(err){
nitobi.lang.throwError(nitobi.error.DeclarationParseError,err);
}
};
nitobi.base.Declaration.prototype.getXmlDoc=function(){
return this.xmlDoc;
};
nitobi.base.Declaration.prototype.serializeToXml=function(){
return nitobi.xml.serialize(this.xmlDoc);
};
nitobi.lang.defineNs("nitobi.base");
nitobi.base.DateMath={DAY:"d",WEEK:"w",MONTH:"m",YEAR:"y",ONE_DAY_MS:86400000};
nitobi.base.DateMath._add=function(date,unit,_327){
if(unit==this.DAY){
date.setDate(date.getDate()+_327);
}else{
if(unit==this.WEEK){
date.setDate(date.getDate()+7*_327);
}else{
if(unit==this.MONTH){
date.setMonth(date.getMonth()+_327);
}else{
if(unit==this.YEAR){
date.setFullYear(date.getFullYear()+_327);
}
}
}
}
return date;
};
nitobi.base.DateMath.add=function(date,unit,_32a){
return this._add(date,unit,_32a);
};
nitobi.base.DateMath.subtract=function(date,unit,_32d){
return this._add(date,unit,-1*_32d);
};
nitobi.base.DateMath.after=function(date,_32f){
return (date-_32f)>0;
};
nitobi.base.DateMath.between=function(date,_331,end){
return (date-_331)>=0&&(end-date)>=0;
};
nitobi.base.DateMath.before=function(date,_334){
return (date-_334)<0;
};
nitobi.base.DateMath.clone=function(date){
var n=new Date(date.toString());
return n;
};
nitobi.base.DateMath.isLeapYear=function(date){
var y=date.getFullYear();
var _1=String(y/4).indexOf(".")==-1;
var _2=String(y/100).indexOf(".")==-1;
var _3=String(y/400).indexOf(".")==-1;
return (_3)?true:(_1&&!_2)?true:false;
};
nitobi.base.DateMath.getMonthDays=function(date){
return [31,(this.isLeapYear(date))?29:28,31,30,31,30,31,31,30,31,30,31][date.getMonth()];
};
nitobi.base.DateMath.getMonthEnd=function(date){
return new Date(date.getFullYear(),date.getMonth(),this.getMonthDays(date));
};
nitobi.base.DateMath.getMonthStart=function(date){
return new Date(date.getFullYear(),date.getMonth(),1);
};
nitobi.base.DateMath.isToday=function(date){
var _340=this.resetTime(new Date());
var end=this.add(this.clone(_340),this.DAY,1);
return this.between(date,_340,end);
};
nitobi.base.DateMath.isSameDay=function(date,_343){
date=this.resetTime(this.clone(date));
_343=this.resetTime(this.clone(_343));
return date.valueOf()==_343.valueOf();
};
nitobi.base.DateMath.parse=function(str){
};
nitobi.base.DateMath.getWeekNumber=function(date){
var _346=this.getJanuary1st(date);
return Math.ceil(this.getNumberOfDays(_346,date)/7);
};
nitobi.base.DateMath.getNumberOfDays=function(_347,end){
var _349=this.resetTime(this.clone(end)).getTime()-this.resetTime(this.clone(_347)).getTime();
return Math.round(_349/this.ONE_DAY_MS)+1;
};
nitobi.base.DateMath.getJanuary1st=function(date){
return new Date(date.getFullYear(),0,1);
};
nitobi.base.DateMath.resetTime=function(date){
if(nitobi.base.DateMath.invalid(date)){
return date;
}
date.setHours(0);
date.setMinutes(0);
date.setSeconds(0);
date.setMilliseconds(0);
return date;
};
nitobi.base.DateMath.parseIso8601=function(date){
return new Date(date.replace(/^(....).(..).(..)(.*)$/,"$1/$2/$3$4"));
};
nitobi.base.DateMath.toIso8601=function(date){
if(nitobi.base.DateMath.invalid(date)){
return "";
}
var pz=nitobi.lang.padZeros;
return date.getFullYear()+"-"+pz(date.getMonth()+1)+"-"+pz(date.getDate())+" "+pz(date.getHours())+":"+pz(date.getMinutes())+":"+pz(date.getSeconds());
};
nitobi.base.DateMath.invalid=function(date){
return (!date)||(date.toString()=="Invalid Date");
};
nitobi.lang.defineNs("nitobi.base");
nitobi.base.EventArgs=function(_350,_351){
this.source=_350;
this.event=_351||nitobi.html.Event;
};
nitobi.base.EventArgs.prototype.getSource=function(){
return this.source;
};
nitobi.base.EventArgs.prototype.getEvent=function(){
return this.event;
};
nitobi.lang.defineNs("nitobi.collections");
nitobi.collections.IList=function(){
nitobi.base.ISerializable.call(this);
nitobi.collections.IEnumerable.call(this);
};
nitobi.lang.implement(nitobi.collections.IList,nitobi.base.ISerializable);
nitobi.lang.implement(nitobi.collections.IList,nitobi.collections.IEnumerable);
nitobi.collections.IList.prototype.IListImplemented=true;
nitobi.collections.IList.prototype.add=function(obj){
nitobi.collections.IEnumerable.prototype.add.call(this,obj);
if(obj.ISerializableImplemented==true&&obj.profile!=null){
this.addChildObject(obj);
}
};
nitobi.collections.IList.prototype.insert=function(_353,obj){
var _355=this.get(_353);
nitobi.collections.IEnumerable.prototype.insert.call(this,_353,obj);
if(obj.ISerializableImplemented==true&&obj.profile!=null){
this.insertBeforeChildObject(obj,_355);
}
};
nitobi.collections.IList.prototype.addToCache=function(obj,_357){
nitobi.base.ISerializable.prototype.addToCache.call(this,obj);
this.list[_357]=obj;
};
nitobi.collections.IList.prototype.removeFromCache=function(_358){
nitobi.base.ISerializable.prototype.removeFromCache.call(this,this.list[_358].getId());
};
nitobi.collections.IList.prototype.flushCache=function(){
nitobi.base.ISerializable.prototype.flushCache.call(this);
this.list=new Array();
};
nitobi.collections.IList.prototype.get=function(_359){
if(typeof (_359)=="object"){
return _359;
}
if(_359<0||_359>=this.getLength()){
nitobi.lang.throwError(nitobi.error.OutOfBounds);
}
var obj=null;
if(this.list[_359]!=null){
obj=this.list[_359];
}
if(obj==null){
var _35b=nitobi.xml.getChildNodes(this.xmlNode)[_359];
if(_35b==null){
return null;
}else{
obj=this.factory.createByNode(_35b);
this.onCreateObject.notify(obj);
nitobi.collections.IList.prototype.addToCache.call(this,obj,_359);
}
obj.setParentObject(this);
}
return obj;
};
nitobi.collections.IList.prototype.getById=function(id){
var node=this.xmlNode.selectSingleNode("*[@id='"+id+"']");
var _35e=nitobi.xml.indexOfChildNode(node.parentNode,node);
return this.get(_35e);
};
nitobi.collections.IList.prototype.set=function(_35f,_360){
if(_35f<0||_35f>=this.getLength()){
nitobi.lang.throwError(nitobi.error.OutOfBounds);
}
try{
if(_360.ISerializableImplemented==true){
var obj=this.get(_35f);
if(obj.getXmlNode()!=_360.getXmlNode()){
var _362=this.xmlNode.insertBefore(_360.getXmlNode(),obj.getXmlNode());
this.xmlNode.removeChild(obj.getXmlNode());
obj.setXmlNode(_362);
}
}
_360.setParentObject(this);
nitobi.collections.IList.prototype.addToCache.call(this,_360,_35f);
}
catch(err){
nitobi.lang.throwError(nitobi.error.Unexpected,err);
}
};
nitobi.collections.IList.prototype.remove=function(_363){
var i;
if(typeof (_363)!="number"){
i=this.indexOf(_363);
}else{
i=_363;
}
var obj=this.get(i);
nitobi.collections.IEnumerable.prototype.remove.call(this,_363);
this.xmlNode.removeChild(obj.getXmlNode());
};
nitobi.collections.IList.prototype.getLength=function(){
return nitobi.xml.getChildNodes(this.xmlNode).length;
};
nitobi.lang.defineNs("nitobi.collections");
nitobi.collections.List=function(_366){
nitobi.collections.List.baseConstructor.call(this);
nitobi.collections.IList.call(this);
};
nitobi.lang.extend(nitobi.collections.List,nitobi.Object);
nitobi.lang.implement(nitobi.collections.List,nitobi.collections.IList);
nitobi.base.Registry.getInstance().register(new nitobi.base.Profile("nitobi.collections.List",null,false,"ntb:list"));
nitobi.lang.defineNs("nitobi.collections");
nitobi.collections.isHashEmpty=function(hash){
var _368=true;
for(var item in hash){
if(hash[item]!=null&&hash[item]!=""){
_368=false;
break;
}
}
return _368;
};
nitobi.collections.hashLength=function(hash){
var _36b=0;
for(var item in hash){
_36b++;
}
return _36b;
};
nitobi.collections.serialize=function(hash){
var s="";
for(var item in hash){
var _370=hash[item];
var type=typeof (_370);
if(type=="string"||type=="number"){
s+="'"+item+"':'"+_370+"',";
}
}
s=s.substring(0,s.length-1);
return "{"+s+"}";
};
nitobi.lang.defineNs("nitobi.ui");
if(false){
nitobi.ui=function(){
};
}
nitobi.ui.setWaitScreen=function(_372){
if(_372){
var sc=nitobi.html.getBodyArea();
var me=nitobi.html.createElement("div",{"id":"NTB_waitDiv"},{"verticalAlign":"middle","color":"#000000","font":"12px Trebuchet MS, Georgia, Verdana","textAlign":"center","background":"#ffffff","border":"1px solid #000000","padding":"0px","position":"absolute","top":(sc.clientHeight/2)+sc.scrollTop-30+"px","left":(sc.clientWidth/2)+sc.scrollLeft-100+"px","width":"200px","height":"60px"});
me.innerHTML="<table height=60 width=200><tr><td valign=center height=60 align=center>Please wait..</td></tr></table>";
document.getElementsByTagName("body").item(0).appendChild(me);
}else{
var me=$ntb("NTB_waitDiv");
try{
document.getElementsByTagName("body").item(0).removeChild(me);
}
catch(e){
}
}
};
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.IStyleable=function(_375){
this.htmlNode=_375||null;
this.onBeforeSetStyle=new nitobi.base.Event();
this.onSetStyle=new nitobi.base.Event();
};
nitobi.ui.IStyleable.prototype.getHtmlNode=function(){
return this.htmlNode;
};
nitobi.ui.IStyleable.prototype.setHtmlNode=function(node){
this.htmlNode=node;
};
nitobi.ui.IStyleable.prototype.setStyle=function(name,_378){
if(this.onBeforeSetStyle.notify(new nitobi.ui.StyleEventArgs(this,this.onBeforeSetStyle,name,_378))&&this.getHtmlNode()!=null){
nitobi.html.Css.setStyle(this.getHtmlNode(),name,_378);
this.onSetStyle.notify(new nitobi.ui.StyleEventArgs(this,this.onSetStyle,name,_378));
}
};
nitobi.ui.IStyleable.prototype.getStyle=function(name){
return nitobi.html.Css.getStyle(this.getHtmlNode(),name);
};
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.StyleEventArgs=function(_37a,_37b,_37c,_37d){
nitobi.ui.ElementEventArgs.baseConstructor.apply(this,arguments);
this.property=_37c||null;
this.value=_37d||null;
};
nitobi.lang.extend(nitobi.ui.StyleEventArgs,nitobi.base.EventArgs);
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.IScrollable=function(_37e){
this.scrollableElement=_37e;
};
nitobi.ui.IScrollable.prototype.setScrollableElement=function(el){
this.scrollableElement=el;
};
nitobi.ui.IScrollable.prototype.getScrollableElement=function(){
return this.scrollableElement;
};
nitobi.ui.IScrollable.prototype.getScrollLeft=function(){
return this.scrollableElement.scrollLeft;
};
nitobi.ui.IScrollable.prototype.setScrollLeft=function(left){
this.scrollableElement.scrollLeft=left;
};
nitobi.ui.IScrollable.prototype.scrollLeft=function(_381){
_381=_381||25;
this.scrollableElement.scrollLeft-=_381;
};
nitobi.ui.IScrollable.prototype.scrollRight=function(_382){
_382=_382||25;
this.scrollableElement.scrollLeft+=_382;
};
nitobi.ui.IScrollable.prototype.isOverflowed=function(_383){
_383=_383||this.scrollableElement.childNodes[0];
return !(parseInt(nitobi.html.getBox(this.scrollableElement).width)>=parseInt(nitobi.html.getBox(_383).width));
};
nitobi.lang.defineNs("nitobi.ui");
if(false){
nitobi.ui=function(){
};
}
nitobi.ui.startDragOperation=function(_384,_385,_386,_387,_388,_389){
var ddo=new nitobi.ui.DragDrop(_384,_386,_387);
ddo.onDragStop.subscribe(_389,_388);
ddo.startDrag(_385);
};
nitobi.ui.DragDrop=function(_38b,_38c,_38d){
this.allowVertDrag=(_38c!=null?_38c:true);
this.allowHorizDrag=(_38d!=null?_38d:true);
if(nitobi.browser.IE){
this.surface=document.getElementById("ebadragdropsurface_");
if(this.surface==null){
this.surface=nitobi.html.createElement("div",{"id":"ebadragdropsurface_"},{"filter":"alpha(opacity=1)","backgroundColor":"white","position":"absolute","display":"none","top":"0px","left":"0px","width":"100px","height":"100px","zIndex":"899"});
document.body.appendChild(this.surface);
}
}
if(_38b.nodeType==3){
alert("Text node not supported. Use parent element");
}
this.element=_38b;
this.zIndex=this.element.style.zIndex;
this.element.style.zIndex=900;
this.onMouseMove=new nitobi.base.Event();
this.onDragStart=new nitobi.base.Event();
this.onDragStop=new nitobi.base.Event();
this.events=[{"type":"mouseup","handler":this.handleMouseUp,"capture":true},{"type":"mousemove","handler":this.handleMouseMove,"capture":true}];
};
nitobi.ui.DragDrop.prototype.startDrag=function(_38e){
this.elementOriginTop=parseInt(this.element.style.top,10);
this.elementOriginLeft=parseInt(this.element.style.left,10);
if(isNaN(this.elementOriginLeft)){
this.elementOriginLeft=0;
}
if(isNaN(this.elementOriginTop)){
this.elementOriginTop=0;
}
var _38f=nitobi.html.getEventCoords(_38e);
x=_38f.x;
y=_38f.y;
this.originX=x;
this.originY=y;
nitobi.html.attachEvents(document,this.events,this);
nitobi.html.cancelEvent(_38e);
this.onDragStart.notify();
};
nitobi.ui.DragDrop.prototype.handleMouseMove=function(_390){
var x,y;
var _393=nitobi.html.getEventCoords(_390);
x=_393.x;
y=_393.y;
if(nitobi.browser.IE){
this.surface.style.display="block";
if(document.compat=="CSS1Compat"){
var _394=nitobi.html.getBodyArea();
var _395=0;
if(document.compatMode=="CSS1Compat"){
_395=25;
}
this.surface.style.width=(_394.clientWidth-_395)+"px";
this.surface.style.height=(_394.clientHeight)+"px";
}else{
this.surface.style.width=document.body.clientWidth;
this.surface.style.height=document.body.clientHeight;
}
}
if(this.allowHorizDrag){
this.element.style.left=(this.elementOriginLeft+x-this.originX)+"px";
}
if(this.allowVertDrag){
this.element.style.top=(this.elementOriginTop+y-this.originY)+"px";
}
this.x=x;
this.y=y;
this.onMouseMove.notify(this);
nitobi.html.cancelEvent(_390);
};
nitobi.ui.DragDrop.prototype.handleMouseUp=function(_396){
this.onDragStop.notify({"event":_396,"x":this.x,"y":this.y});
nitobi.html.detachEvents(document,this.events);
if(nitobi.browser.IE){
this.surface.style.display="none";
}
this.element.style.zIndex=this.zIndex;
this.element.object=null;
this.element=null;
};
if(typeof (nitobi.ajax)=="undefined"){
nitobi.ajax=function(){
};
}
nitobi.ajax.createXmlHttp=function(){
if(nitobi.browser.IE){
var _397=null;
try{
_397=new ActiveXObject("Msxml2.XMLHTTP");
}
catch(e){
try{
_397=new ActiveXObject("Microsoft.XMLHTTP");
}
catch(ee){
}
}
return _397;
}else{
if(nitobi.browser.XHR_ENABLED){
return new XMLHttpRequest();
}
}
};
nitobi.lang.defineNs("nitobi.ajax");
nitobi.ajax.HttpRequest=function(){
this.handler="";
this.async=true;
this.responseType=null;
this.httpObj=nitobi.ajax.createXmlHttp();
this.onPostComplete=new nitobi.base.Event();
this.onGetComplete=new nitobi.base.Event();
this.onRequestComplete=new nitobi.base.Event();
this.onError=new nitobi.base.Event();
this.timeout=0;
this.timeoutId=null;
this.params=null;
this.data="";
this.completeCallback=null;
this.status="complete";
this.preventCache=true;
this.username="";
this.password="";
this.requestMethod="get";
this.requestHeaders={};
};
nitobi.lang.extend(nitobi.ajax.HttpRequest,nitobi.Object);
nitobi.ajax.HttpRequestPool_MAXCONNECTIONS=64;
nitobi.ajax.HttpRequest.prototype.handleResponse=function(){
var _398=null;
var _399=null;
if((this.httpObj.responseXML!=null&&this.httpObj.responseXML.documentElement!=null)&&this.responseType!="text"){
_398=this.httpObj.responseXML;
}else{
if(this.responseType=="xml"){
_398=nitobi.xml.createXmlDoc(this.httpObj.responseText);
}else{
_398=this.httpObj.responseText;
}
}
if(this.httpObj.status!=200){
this.onError.notify({"source":this,"status":this.httpObj.status,"message":"An error occured retrieving the data from the server. "+"Expected response type was '"+this.responseType+"'."});
}
return _398;
};
nitobi.ajax.HttpRequest.prototype.post=function(data,url){
this.data=data;
return this._send("POST",url,data,this.postComplete);
};
nitobi.ajax.HttpRequest.prototype.get=function(url){
return this._send("GET",url,null,this.getComplete);
};
nitobi.ajax.HttpRequest.prototype.postComplete=function(){
if(this.httpObj.readyState==4){
this.status="complete";
var _39d={"response":this.handleResponse(),"params":this.params};
this.responseXml=this.responseText=_39d.response;
this.onPostComplete.notify(_39d);
this.onRequestComplete.notify(_39d);
if(this.completeCallback){
this.completeCallback.call(this,_39d);
}
}
};
nitobi.ajax.HttpRequest.prototype.postXml=function(_39e){
this.setTimeout();
if(("undefined"==typeof (_39e.documentElement))||(null==_39e.documentElement)||("undefined"==typeof (_39e.documentElement.childNodes))||(1>_39e.documentElement.childNodes.length)){
ebaErrorReport("updategram is empty. No request sent. xmlData["+_39e+"]\nxmlData.xml["+_39e.xml+"]");
return;
}
if(null==_39e.xml){
var _39f=new XMLSerializer();
_39e.xml=_39f.serializeToString(_39e);
}
return this.post(_39e.xml);
};
nitobi.ajax.HttpRequest.prototype._send=function(_3a0,url,data,_3a3){
this.handler=url||this.handler;
this.setTimeout();
this.status="pending";
this.httpObj.open(_3a0,(this.preventCache?this.cacheBust(this.handler):this.handler),this.async,this.username,this.password);
if(this.async){
this.httpObj.onreadystatechange=nitobi.lang.close(this,_3a3);
}
for(var item in this.requestHeaders){
this.httpObj.setRequestHeader(item,this.requestHeaders[item]);
}
if(this.responseType=="xml"){
this.httpObj.setRequestHeader("Content-Type","text/xml");
}else{
if(_3a0.toLowerCase()=="post"){
this.httpObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
}
this.httpObj.send(data);
if(!this.async){
return this.handleResponse();
}
return this.httpObj;
};
nitobi.ajax.HttpRequest.prototype.open=function(_3a5,url,_3a7,_3a8,_3a9){
this.requestMethod=_3a5;
this.async=_3a7;
this.username=_3a8;
this.password=_3a9;
this.handler=url;
};
nitobi.ajax.HttpRequest.prototype.send=function(data){
var _3ab=null;
switch(this.requestMethod.toUpperCase()){
case "POST":
_3ab=this.post(data);
break;
default:
_3ab=this.get();
break;
}
this.responseXml=this.responseText=_3ab;
};
nitobi.ajax.HttpRequest.prototype.setTimeout=function(){
if(this.timeout>0){
this.timeoutId=window.setTimeout(nitobi.lang.close(this,this.abort),this.timeout);
}
};
nitobi.ajax.HttpRequest.prototype.getComplete=function(){
if(this.httpObj.readyState==4){
this.status="complete";
var _3ac={"response":this.handleResponse(),"params":this.params,"status":this.httpObj.status,"statusText":this.httpObj.statusText};
this.responseXml=this.responseText=_3ac.response;
this.onGetComplete.notify(_3ac);
this.onRequestComplete.notify(_3ac);
if(this.completeCallback){
this.completeCallback.call(this,_3ac);
}
}
};
nitobi.ajax.HttpRequest.prototype.setRequestHeader=function(_3ad,val){
this.requestHeaders[_3ad]=val;
};
nitobi.ajax.HttpRequest.prototype.isError=function(code){
return (code>=400&&code<600);
};
nitobi.ajax.HttpRequest.prototype.abort=function(){
this.httpObj.onreadystatechange=function(){
};
this.httpObj.abort();
};
nitobi.ajax.HttpRequest.prototype.clear=function(){
this.handler="";
this.async=true;
this.onPostComplete.dispose();
this.onGetComplete.dispose();
this.params=null;
};
nitobi.ajax.HttpRequest.prototype.cacheBust=function(url){
var _3b1=url.split("?");
var _3b2="nitobi_cachebust="+(new Date().getTime());
if(_3b1.length==1){
url+="?"+_3b2;
}else{
url+="&"+_3b2;
}
return url;
};
nitobi.ajax.HttpRequestPool=function(_3b3){
this.inUse=new Array();
this.free=new Array();
this.max=_3b3||nitobi.ajax.HttpRequestPool_MAXCONNECTIONS;
this.locked=false;
this.context=null;
};
nitobi.ajax.HttpRequestPool.prototype.reserve=function(){
this.locked=true;
var _3b4;
if(this.free.length){
_3b4=this.free.pop();
_3b4.clear();
this.inUse.push(_3b4);
}else{
if(this.inUse.length<this.max){
try{
_3b4=new nitobi.ajax.HttpRequest();
}
catch(e){
_3b4=null;
}
this.inUse.push(_3b4);
}else{
throw "No request objects available";
}
}
this.locked=false;
return _3b4;
};
nitobi.ajax.HttpRequestPool.prototype.release=function(_3b5){
var _3b6=false;
this.locked=true;
if(null!=_3b5){
for(var i=0;i<this.inUse.length;i++){
if(_3b5==this.inUse[i]){
this.free.push(this.inUse[i]);
this.inUse.splice(i,1);
_3b6=true;
break;
}
}
}
this.locked=false;
return null;
};
nitobi.ajax.HttpRequestPool.prototype.dispose=function(){
for(var i=0;i<this.inUse.length;i++){
this.inUse[i].dispose();
}
this.inUse=null;
for(var j=0;j<this.free.length;j++){
this.free[i].dispose();
}
this.free=null;
};
nitobi.ajax.HttpRequestPool.instance=null;
nitobi.ajax.HttpRequestPool.getInstance=function(){
if(nitobi.ajax.HttpRequestPool.instance==null){
nitobi.ajax.HttpRequestPool.instance=new nitobi.ajax.HttpRequestPool();
}
return nitobi.ajax.HttpRequestPool.instance;
};
nitobi.lang.defineNs("nitobi.data");
nitobi.data.UrlConnector=function(url,_3bb){
this.url=url||null;
this.transformer=_3bb||null;
this.async=true;
};
nitobi.data.UrlConnector.prototype.get=function(_3bc,_3bd){
this.request=nitobi.data.UrlConnector.requestPool.reserve();
var _3be=this.url;
for(var p in _3bc){
_3be=nitobi.html.Url.setParameter(_3be,p,_3bc[p]);
}
this.request.handler=_3be;
this.request.async=this.async;
this.request.responseType="xml";
this.request.params={dataReadyCallback:_3bd};
this.request.completeCallback=nitobi.lang.close(this,this.getComplete);
this.request.get();
};
nitobi.data.UrlConnector.prototype.getComplete=function(_3c0){
if(_3c0.params.dataReadyCallback){
var _3c1=_3c0.response;
var _3c2=_3c0.params.dataReadyCallback;
var _3c3=_3c1;
if(this.transformer){
if(typeof (this.transformer)==="function"){
_3c3=this.transformer.call(null,_3c1);
}else{
_3c3=nitobi.xml.transform(_3c1,this.transformer,"xml");
}
}
if(_3c2){
_3c2.call(null,{result:_3c3,response:_3c0.response});
}
}
nitobi.data.UrlConnector.requestPool.release(this.request);
};
nitobi.data.UrlConnector.requestPool=new nitobi.ajax.HttpRequestPool();
function ntbAssert(_3c4,_3c5,_3c6,_3c7){
}
nitobi.lang.defineNs("console");
nitobi.lang.defineNs("nitobi.debug");
if(typeof (console.log)=="undefined"){
console.log=function(s){
nitobi.debug.addDebugTools();
var t=$ntb("nitobi.log");
t.value=s+"\n"+t.value;
};
console.evalCode=function(){
var _3ca=(eval($ntb("nitobi.consoleEntry").value));
};
}
nitobi.debug.addDebugTools=function(){
var sId="nitobi_debug_panel";
var div=document.getElementById(sId);
var html="<table width=100%><tr><td width=50%><textarea style='width:100%' cols=125 rows=25 id='nitobi.log'></textarea></td><td width=50%><textarea style='width:100%' cols=125 rows=25 id='nitobi.consoleEntry'></textarea><br/><button onclick='console.evalCode()'>Eval</button></td></tr></table>";
if(div==null){
var div=document.createElement("div");
div.setAttribute("id",sId);
div.innerHTML=html;
document.body.appendChild(div);
}else{
if(div.innerHTML==""){
div.innerHTML=html;
}
}
};
nitobi.debug.assert=function(){
};
EBA_EM_ATTRIBUTE_ERROR=1;
EBA_XHR_RESPONSE_ERROR=2;
EBA_DEBUG="debug";
EBA_WARN="warn";
EBA_ERROR="error";
EBA_THROW="throw";
EBA_DEBUG_MODE=false;
EBA_ON_ERROR="";
EBA_LAST_ERROR="";
_ebaDebug=false;
NTB_EM_ATTRIBUTE_ERROR=1;
NTB_XHR_RESPONSE_ERROR=2;
NTB_DEBUG="debug";
NTB_WARN="warn";
NTB_ERROR="error";
NTB_THROW="throw";
NTB_DEBUG_MODE=false;
NTB_ON_ERROR="";
NTB_LAST_ERROR="";
_ebaDebug=false;
function _ntbAssert(_3ce,_3cf){
ntbAssert(_3ce,_3cf,"",DEBUG);
}
function ebaSetOnErrorEvent(_3d0){
nitobi.debug.setOnErrorEvent.apply(this,arguments);
}
nitobi.debug.setOnErrorEvent=function(_3d1){
NTB_ON_ERROR=_3d1;
};
function ebaReportError(_3d2,_3d3,_3d4){
nitobi.debug.errorReport("dude stop calling this method it is now called nitobi.debug.errorReport","");
nitobi.debug.errorReport(_3d2,_3d3,_3d4);
}
function ebaErrorReport(_3d5,_3d6,_3d7){
nitobi.debug.errorReport.apply(this,arguments);
}
nitobi.debug.errorReport=function(_3d8,_3d9,_3da){
_3da=(_3da)?_3da:NTB_DEBUG;
if(NTB_DEBUG==_3da&&!NTB_DEBUG_MODE){
return;
}
var _3db=_3d8+"\nerror code    ["+_3d9+"]\nerror Severity["+_3da+"]";
LastError=_3db;
if(eval(NTB_ON_ERROR||"true")){
switch(_3d9){
case NTB_EM_ATTRIBUTE_ERROR:
confirm(_3d8);
break;
case NTB_XHR_RESPONSE_ERROR:
confirm(_3d8);
break;
default:
window.status=_3d8;
break;
}
}
if(NTB_THROW==_3da){
throw (_3db);
}
};
if(false){
nitobi.error=function(){
};
}
nitobi.lang.defineNs("nitobi.error");
nitobi.error.onError=new nitobi.base.Event();
if(nitobi){
if(nitobi.testframework){
if(nitobi.testframework.initEventError){
nitobi.testframework.initEventError();
}
}
}
nitobi.error.ErrorEventArgs=function(_3dc,_3dd,type){
nitobi.error.ErrorEventArgs.baseConstructor.call(this,_3dc);
this.description=_3dd;
this.type=type;
};
nitobi.lang.extend(nitobi.error.ErrorEventArgs,nitobi.base.EventArgs);
nitobi.error.isError=function(err,_3e0){
return (err.indexOf(_3e0)>-1);
};
nitobi.error.OutOfBounds="Array index out of bounds.";
nitobi.error.Unexpected="An unexpected error occurred.";
nitobi.error.ArgExpected="The argument is null and not optional.";
nitobi.error.BadArgType="The argument is not of the correct type.";
nitobi.error.BadArg="The argument is not a valid value.";
nitobi.error.XmlParseError="The XML did not parse correctly.";
nitobi.error.DeclarationParseError="The HTML declaration could not be parsed.";
nitobi.error.ExpectedInterfaceNotFound="The object does not support the properties or methods of the expected interface. Its class must implement the required interface.";
nitobi.error.NoHtmlNode="No HTML node found with id.";
nitobi.error.OrphanXmlNode="The XML node has no owner document.";
nitobi.error.HttpRequestError="The HTML page could not be loaded.";
nitobi.lang.defineNs("nitobi.html");
nitobi.html.IRenderer=function(_3e1){
this.setTemplate(_3e1);
this.parameters={};
};
nitobi.html.IRenderer.prototype.renderAfter=function(_3e2,data){
_3e2=$ntb(_3e2);
var _3e4=_3e2.parentNode;
_3e2=_3e2.nextSibling;
return this._renderBefore(_3e4,_3e2,data);
};
nitobi.html.IRenderer.prototype.renderBefore=function(_3e5,data){
_3e5=$ntb(_3e5);
return this._renderBefore(_3e5.parentNode,_3e5,data);
};
nitobi.html.IRenderer.prototype._renderBefore=function(_3e7,_3e8,data){
var s=this.renderToString(data);
var _3eb=document.createElement("div");
_3eb.innerHTML=s;
var _3ec=new Array();
if(_3eb.childNodes){
var i=0;
while(_3eb.childNodes.length){
_3ec[i++]=_3eb.firstChild;
_3e7.insertBefore(_3eb.firstChild,_3e8);
}
}else{
}
return _3ec;
};
nitobi.html.IRenderer.prototype.renderIn=function(_3ee,data){
_3ee=$ntb(_3ee);
var s=this.renderToString(data);
_3ee.innerHTML=s;
return _3ee.childNodes;
};
nitobi.html.IRenderer.prototype.renderToString=function(data){
};
nitobi.html.IRenderer.prototype.setTemplate=function(_3f2){
this.template=_3f2;
};
nitobi.html.IRenderer.prototype.getTemplate=function(){
return this.template;
};
nitobi.html.IRenderer.prototype.setParameters=function(_3f3){
for(var p in _3f3){
this.parameters[p]=_3f3[p];
}
};
nitobi.html.IRenderer.prototype.getParameters=function(){
return this.parameters;
};
nitobi.lang.defineNs("nitobi.html");
nitobi.html.XslRenderer=function(_3f5){
nitobi.html.IRenderer.call(this,_3f5);
};
nitobi.lang.implement(nitobi.html.XslRenderer,nitobi.html.IRenderer);
nitobi.html.XslRenderer.prototype.setTemplate=function(_3f6){
if(typeof (_3f6)==="string"){
_3f6=nitobi.xml.createXslProcessor(_3f6);
}
this.template=_3f6;
};
nitobi.html.XslRenderer.prototype.renderToString=function(data){
if(typeof (data)==="string"){
data=nitobi.xml.createXmlDoc(data);
}
if(nitobi.lang.typeOf(data)===nitobi.lang.type.XMLNODE){
data=nitobi.xml.createXmlDoc(nitobi.xml.serialize(data));
}
var _3f8=this.getTemplate();
var _3f9=this.getParameters();
for(var p in _3f9){
_3f8.addParameter(p,_3f9[p],"");
}
var s=nitobi.xml.transformToString(data,_3f8,"xml");
for(var p in _3f9){
_3f8.addParameter(p,"","");
}
return s;
};
nitobi.lang.defineNs("nitobi.ui");
NTB_CSS_HIDE="nitobi-hide";
nitobi.ui.Element=function(id){
nitobi.ui.Element.baseConstructor.call(this);
nitobi.ui.IStyleable.call(this);
if(id!=null){
if(nitobi.lang.typeOf(id)==nitobi.lang.type.XMLNODE){
nitobi.base.ISerializable.call(this,id);
}else{
if($ntb(id)!=null){
var decl=new nitobi.base.Declaration();
var _3fe=decl.loadHtml($ntb(id));
var _3ff=$ntb(id);
var _400=_3ff.parentNode;
var _401=_400.ownerDocument.createElement("ntb:component");
_400.insertBefore(_401,_3ff);
_400.removeChild(_3ff);
this.setContainer(_401);
nitobi.base.ISerializable.call(this,_3fe);
}else{
nitobi.base.ISerializable.call(this);
this.setId(id);
}
}
}else{
nitobi.base.ISerializable.call(this);
}
this.eventMap={};
this.onCreated=new nitobi.base.Event("created");
this.eventMap["created"]=this.onCreated;
this.onBeforeRender=new nitobi.base.Event("beforerender");
this.eventMap["beforerender"]=this.onBeforeRender;
this.onRender=new nitobi.base.Event("render");
this.eventMap["render"]=this.onRender;
this.onBeforeSetVisible=new nitobi.base.Event("beforesetvisible");
this.eventMap["beforesetvisible"]=this.onBeforeSetVisible;
this.onSetVisible=new nitobi.base.Event("setvisible");
this.eventMap["setvisible"]=this.onSetVisible;
this.onBeforePropagate=new nitobi.base.Event("beforepropagate");
this.onEventNotify=new nitobi.base.Event("eventnotify");
this.onBeforeEventNotify=new nitobi.base.Event("beforeeventnotify");
this.onBeforePropagateToChild=new nitobi.base.Event("beforepropogatetochild");
this.subscribeDeclarationEvents();
this.setEnabled(true);
this.renderer=new nitobi.html.XslRenderer();
};
nitobi.lang.extend(nitobi.ui.Element,nitobi.Object);
nitobi.lang.implement(nitobi.ui.Element,nitobi.base.ISerializable);
nitobi.lang.implement(nitobi.ui.Element,nitobi.ui.IStyleable);
nitobi.ui.Element.htmlNodeCache={};
nitobi.ui.Element.prototype.setHtmlNode=function(_402){
var node=$ntb(_402);
this.htmlNode=node;
};
nitobi.ui.Element.prototype.getRootId=function(){
var _404=this.getParentObject();
if(_404==null){
return this.getId();
}else{
return _404.getRootId();
}
};
nitobi.ui.Element.prototype.getId=function(){
return this.getAttribute("id");
};
nitobi.ui.Element.parseId=function(id){
var ids=id.split(".");
if(ids.length<=2){
return {localName:ids[1],id:ids[0]};
}
return {localName:ids.pop(),id:ids.join(".")};
};
nitobi.ui.Element.prototype.setId=function(id){
this.setAttribute("id",id);
};
nitobi.ui.Element.prototype.notify=function(_408,id,_40a,_40b){
try{
_408=nitobi.html.getEvent(_408);
if(_40b!==false){
nitobi.html.cancelEvent(_408);
}
var _40c=nitobi.ui.Element.parseId(id).id;
if(!this.isDescendantExists(_40c)){
return false;
}
var _40d=!(_40c==this.getId());
var _40e=new nitobi.ui.ElementEventArgs(this,null,id);
var _40f=new nitobi.ui.EventNotificationEventArgs(this,null,id,_408);
_40d=_40d&&this.onBeforePropagate.notify(_40f);
var _410=true;
if(_40d){
if(_40a==null){
_40a=this.getPathToLeaf(_40c);
}
var _411=this.onBeforeEventNotify.notify(_40f);
var _412=(_411?this.onEventNotify.notify(_40f):true);
var _413=_40a.pop().getAttribute("id");
var _414=this.getObjectById(_413);
var _410=this.onBeforePropagateToChild.notify(_40f);
if(_414.notify&&_410&&_412){
_410=_414.notify(_408,id,_40a,_40b);
}
}else{
_410=this.onEventNotify.notify(_40f);
}
var _415=this.eventMap[_408.type];
if(_415!=null&&_410){
_415.notify(this.getEventArgs(_408,id));
}
return _410;
}
catch(err){
nitobi.lang.throwError(nitobi.error.Unexpected+" Element.notify encountered a problem.",err);
}
};
nitobi.ui.Element.prototype.getEventArgs=function(_416,_417){
var _418=new nitobi.ui.ElementEventArgs(this,null,_417);
return _418;
};
nitobi.ui.Element.prototype.subscribeDeclarationEvents=function(){
for(var name in this.eventMap){
var ev=this.getAttribute("on"+name);
if(ev!=null&&ev!=""){
this.eventMap[name].subscribe(ev,this,name);
}
}
};
nitobi.ui.Element.prototype.getHtmlNode=function(name){
var id=this.getId();
id=(name!=null?id+"."+name:id);
var node=nitobi.ui.Element.htmlNodeCache[name];
if(node==null){
node=$ntb(id);
nitobi.ui.Element.htmlNodeCache[id]=node;
}
return node;
};
nitobi.ui.Element.prototype.flushHtmlNodeCache=function(){
nitobi.ui.Element.htmlNodeCache={};
};
nitobi.ui.Element.prototype.hide=function(_41e,_41f,_420){
this.setVisible(false,_41e,_41f,_420);
};
nitobi.ui.Element.prototype.show=function(_421,_422,_423){
this.setVisible(true,_421,_422,_423);
};
nitobi.ui.Element.prototype.isVisible=function(){
var node=this.getHtmlNode();
return node&&!nitobi.html.Css.hasClass(node,NTB_CSS_HIDE);
};
nitobi.ui.Element.prototype.setVisible=function(_425,_426,_427,_428){
var _429=this.getHtmlNode();
if(_429&&this.isVisible()!=_425&&this.onBeforeSetVisible.notify({source:this,event:this.onBeforeSetVisible,args:arguments})!==false){
if(this.effect){
this.effect.end();
}
if(_425){
if(_426){
var _42a=new _426(_429,_428);
_42a.callback=nitobi.lang.close(this,this.handleSetVisible,[_427]);
this.effect=_42a;
_42a.onFinish.subscribeOnce(nitobi.lang.close(this,function(){
this.effect=null;
}));
_42a.start();
}else{
nitobi.html.Css.removeClass(_429,NTB_CSS_HIDE);
this.handleSetVisible(_427);
}
}else{
if(_426){
var _42a=new _426(_429,_428);
_42a.callback=nitobi.lang.close(this,this.handleSetVisible,[_427]);
this.effect=_42a;
_42a.onFinish.subscribeOnce(nitobi.lang.close(this,function(){
this.effect=null;
}));
_42a.start();
}else{
nitobi.html.Css.addClass(this.getHtmlNode(),NTB_CSS_HIDE);
this.handleSetVisible(_427);
}
}
}
};
nitobi.ui.Element.prototype.handleSetVisible=function(_42b){
if(_42b){
_42b();
}
this.onSetVisible.notify(new nitobi.ui.ElementEventArgs(this,this.onSetVisible));
};
nitobi.ui.Element.prototype.setEnabled=function(_42c){
this.enabled=_42c;
};
nitobi.ui.Element.prototype.isEnabled=function(){
return this.enabled;
};
nitobi.ui.Element.prototype.render=function(_42d,_42e){
this.flushHtmlNodeCache();
_42e=_42e||this.getState();
_42d=$ntb(_42d)||this.getContainer();
if(_42d==null){
var _42d=document.createElement("span");
document.body.appendChild(_42d);
this.setContainer(_42d);
}
this.htmlNode=this.renderer.renderIn(_42d,_42e)[0];
this.htmlNode.jsObject=this;
};
nitobi.ui.Element.prototype.getContainer=function(){
return this.container;
};
nitobi.ui.Element.prototype.setContainer=function(_42f){
this.container=$ntb(_42f);
};
nitobi.ui.Element.prototype.getState=function(){
return this.getXmlNode();
};
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.ElementEventArgs=function(_430,_431,_432){
nitobi.ui.ElementEventArgs.baseConstructor.apply(this,arguments);
this.targetId=_432||null;
};
nitobi.lang.extend(nitobi.ui.ElementEventArgs,nitobi.base.EventArgs);
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.EventNotificationEventArgs=function(_433,_434,_435,_436){
nitobi.ui.EventNotificationEventArgs.baseConstructor.apply(this,arguments);
this.htmlEvent=_436||null;
};
nitobi.lang.extend(nitobi.ui.EventNotificationEventArgs,nitobi.ui.ElementEventArgs);
nitobi.lang.defineNs("nitobi.ui");
nitobi.ui.Container=function(id){
nitobi.ui.Container.baseConstructor.call(this,id);
nitobi.collections.IList.call(this);
};
nitobi.lang.extend(nitobi.ui.Container,nitobi.ui.Element);
nitobi.lang.implement(nitobi.ui.Container,nitobi.collections.IList);
nitobi.base.Registry.getInstance().register(new nitobi.base.Profile("nitobi.ui.Container",null,false,"ntb:container"));
nitobi.lang.defineNs("nitobi.ui");
NTB_CSS_SMALL="ntb-effects-small";
NTB_CSS_HIDE="nitobi-hide";
if(false){
nitobi.ui.Effects=function(){
};
}
nitobi.ui.Effects={};
nitobi.ui.Effects.setVisible=function(_438,_439,_43a,_43b,_43c){
_43b=(_43c?nitobi.lang.close(_43c,_43b):_43b)||nitobi.lang.noop;
_438=$ntb(_438);
if(typeof _43a=="string"){
_43a=nitobi.effects.families[_43a];
}
if(!_43a){
_43a=nitobi.effects.families["none"];
}
if(_439){
var _43d=_43a.show;
}else{
var _43d=_43a.hide;
}
if(_43d){
var _43e=new _43d(_438);
_43e.callback=_43b;
_43e.start();
}else{
if(_439){
nitobi.html.Css.removeClass(_438,NTB_CSS_HIDE);
}else{
nitobi.html.Css.addClass(_438,NTB_CSS_HIDE);
}
_43b();
}
};
nitobi.ui.Effects.shrink=function(_43f,_440,_441,_442){
var rect=nitobi.html.getClientRects(_440)[0];
_43f.deltaHeight_Doctype=0-parseInt("0"+nitobi.html.getStyle(_440,"border-top-width"))-parseInt("0"+nitobi.html.getStyle(_440,"border-bottom-width"))-parseInt("0"+nitobi.html.getStyle(_440,"padding-top"))-parseInt("0"+nitobi.html.getStyle(_440,"padding-bottom"));
_43f.deltaWidth_Doctype=0-parseInt("0"+nitobi.html.getStyle(_440,"border-left-width"))-parseInt("0"+nitobi.html.getStyle(_440,"border-right-width"))-parseInt("0"+nitobi.html.getStyle(_440,"padding-left"))-parseInt("0"+nitobi.html.getStyle(_440,"padding-right"));
_43f.oldHeight=Math.abs(rect.top-rect.bottom)+_43f.deltaHeight_Doctype;
_43f.oldWidth=Math.abs(rect.right-rect.left)+_43f.deltaWidth_Doctype;
if(!(typeof (_43f.width)=="undefined")){
_43f.deltaWidth=Math.floor(Math.ceil(_43f.width-_43f.oldWidth)/(_441/nitobi.ui.Effects.ANIMATION_INTERVAL));
}else{
_43f.width=_43f.oldWidth;
_43f.deltaWidth=0;
}
if(!(typeof (_43f.height)=="undefined")){
_43f.deltaHeight=Math.floor(Math.ceil(_43f.height-_43f.oldHeight)/(_441/nitobi.ui.Effects.ANIMATION_INTERVAL));
}else{
_43f.height=_43f.oldHeight;
_43f.deltaHeight=0;
}
nitobi.ui.Effects.resize(_43f,_440,_441,_442);
};
nitobi.ui.Effects.resize=function(_444,_445,_446,_447){
var rect=nitobi.html.getClientRects(_445)[0];
var _449=Math.abs(rect.top-rect.bottom);
var _44a=Math.max(_449+_444.deltaHeight+_444.deltaHeight_Doctype,0);
if(Math.abs(_449-_444.height)<Math.abs(_444.deltaHeight)){
_44a=_444.height;
_444.deltaHeight=0;
}
var _44b=Math.abs(rect.right-rect.left);
var _44c=Math.max(_44b+_444.deltaWidth+_444.deltaWidth_Doctype,0);
_44c=(_44c>=0)?_44c:0;
if(Math.abs(_44b-_444.width)<Math.abs(_444.deltaWidth)){
_44c=_444.width;
_444.deltaWidth=0;
}
_446-=nitobi.ui.Effects.ANIMATION_INTERVAL;
if(_446>0){
window.setTimeout(nitobi.lang.closeLater(this,nitobi.ui.Effects.resize,[_444,_445,_446,_447]),nitobi.ui.Effects.ANIMATION_INTERVAL);
}
var _44d=function(){
_445.height=_44a+"px";
_445.style.height=_44a+"px";
_445.width=_44c+"px";
_445.style.width=_44c+"px";
if(_446<=0){
if(_447){
window.setTimeout(_447,0);
}
}
};
nitobi.ui.Effects.executeNextPulse.push(_44d);
};
nitobi.ui.Effects.executeNextPulse=new Array();
nitobi.ui.Effects.pulse=function(){
var p;
while(p=nitobi.ui.Effects.executeNextPulse.pop()){
p.call();
}
};
nitobi.ui.Effects.PULSE_INTERVAL=20;
nitobi.ui.Effects.ANIMATION_INTERVAL=40;
window.setInterval(nitobi.ui.Effects.pulse,nitobi.ui.Effects.PULSE_INTERVAL);
window.setTimeout(nitobi.ui.Effects.pulse,nitobi.ui.Effects.PULSE_INTERVAL);
nitobi.ui.Effects.fadeIntervalId={};
nitobi.ui.Effects.fadeIntervalTime=10;
nitobi.ui.Effects.cube=function(_44f){
return _44f*_44f*_44f;
};
nitobi.ui.Effects.cubeRoot=function(_450){
var T=0;
var N=parseFloat(_450);
if(N<0){
N=-N;
T=1;
}
var M=Math.sqrt(N);
var ctr=1;
while(ctr<101){
var M=M*N;
var M=Math.sqrt(Math.sqrt(M));
ctr++;
}
return M;
};
nitobi.ui.Effects.linear=function(_455){
return _455;
};
nitobi.ui.Effects.fade=function(_456,_457,time,_459,_45a){
_45a=_45a||nitobi.ui.Effects.linear;
var _45b=(new Date()).getTime()+time;
var id=nitobi.component.getUniqueId();
var _45d=(new Date()).getTime();
var el=_456;
if(_456.length){
el=_456[0];
}
var _45f=nitobi.html.Css.getOpacity(el);
var _460=(_457-_45f<0?-1:0);
nitobi.ui.Effects.fadeIntervalId[id]=window.setInterval(function(){
nitobi.ui.Effects.stepFade(_456,_457,_45d,_45b,id,_459,_45a,_460);
},nitobi.ui.Effects.fadeIntervalTime);
};
nitobi.ui.Effects.stepFade=function(_461,_462,_463,_464,id,_466,_467,_468){
var ct=(new Date()).getTime();
var _46a=_464-_463;
var nct=((ct-_463)/(_464-_463));
if(nct<=0||nct>=1){
nitobi.html.Css.setOpacities(_461,_462);
window.clearInterval(nitobi.ui.Effects.fadeIntervalId[id]);
_466();
return;
}else{
nct=Math.abs(nct+_468);
}
var no=_467(nct);
nitobi.html.Css.setOpacities(_461,no*100);
};
nitobi.lang.defineNs("nitobi.component");
if(false){
nitobi.component=function(){
};
}
nitobi.loadComponent=function(el){
var id=el;
el=$ntb(el);
if(el==null){
nitobi.lang.throwError("nitobi.loadComponent could not load the component because it could not be found on the page. The component may not have a declaration, node, or it may have a duplicated id. Id: "+id);
}
if(el.jsObject!=null){
return el.jsObject;
}
var _46f;
var _470=nitobi.html.getTagName(el);
if(_470=="ntb:grid"){
_46f=nitobi.initGrid(el.id);
}else{
if(_470==="ntb:combo"){
_46f=nitobi.initCombo(el.id);
}else{
if(_470=="ntb:treegrid"){
_46f=nitobi.initTreeGrid(el.id);
}else{
if(el.jsObject==null){
_46f=nitobi.base.Factory.getInstance().createByTag(_470,el.id,nitobi.component.renderComponent);
if(_46f.render&&!_46f.onLoadCallback){
_46f.render();
}
}else{
_46f=el.jsObject;
}
}
}
}
return _46f;
};
nitobi.component.renderComponent=function(_471){
_471.source.render();
};
nitobi.getComponent=function(id){
var el=$ntb(id);
if(el==null){
return null;
}
return el.jsObject;
};
nitobi.component.uniqueId=0;
nitobi.component.getUniqueId=function(){
return "ntbcmp_"+(nitobi.component.uniqueId++);
};
nitobi.getComponents=function(_474,_475){
if(_475==null){
_475=[];
}
if(nitobi.component.isNitobiElement(_474)){
_475.push(_474);
return;
}
var _476=_474.childNodes;
for(var i=0;i<_476.length;i++){
nitobi.getComponents(_476[i],_475);
}
return _475;
};
nitobi.component.isNitobiElement=function(_478){
var _479=nitobi.html.getTagName(_478);
if(_479.substr(0,3)=="ntb"){
return true;
}else{
return false;
}
};
nitobi.component.loadComponentsFromNode=function(_47a){
var _47b=new Array();
nitobi.getComponents(_47a,_47b);
for(var i=0;i<_47b.length;i++){
nitobi.loadComponent(_47b[i].getAttribute("id"));
}
};
nitobi.lang.defineNs("nitobi.effects");
if(false){
nitobi.effects=function(){
};
}
nitobi.effects.Effect=function(_47d,_47e){
this.element=$ntb(_47d);
this.transition=_47e.transition||nitobi.effects.Transition.sinoidal;
this.duration=_47e.duration||1;
this.fps=_47e.fps||50;
this.from=typeof (_47e.from)==="number"?_47e.from:0;
this.to=typeof (_47e.from)==="number"?_47e.to:1;
this.delay=_47e.delay||0;
this.callback=typeof (_47e.callback)==="function"?_47e.callback:nitobi.lang.noop;
this.queue=_47e.queue||nitobi.effects.EffectQueue.globalQueue;
this.onBeforeFinish=new nitobi.base.Event();
this.onFinish=new nitobi.base.Event();
this.onBeforeStart=new nitobi.base.Event();
};
nitobi.effects.Effect.prototype.start=function(){
var now=new Date().getTime();
this.startOn=now+this.delay*1000;
this.finishOn=this.startOn+this.duration*1000;
this.deltaTime=this.duration*1000;
this.totalFrames=this.duration*this.fps;
this.frame=0;
this.delta=this.from-this.to;
this.queue.add(this);
};
nitobi.effects.Effect.prototype.render=function(pos){
if(!this.running){
this.onBeforeStart.notify(new nitobi.base.EventArgs(this,this.onBeforeStart));
this.setup();
this.running=true;
}
this.update(this.transition(pos*this.delta+this.from));
};
nitobi.effects.Effect.prototype.step=function(now){
if(this.startOn<=now){
if(now>=this.finishOn){
this.end();
return;
}
var pos=(now-this.startOn)/(this.deltaTime);
var _483=Math.floor(pos*this.totalFrames);
if(this.frame<_483){
this.render(pos);
this.frame=_483;
}
}
};
nitobi.effects.Effect.prototype.setup=function(){
};
nitobi.effects.Effect.prototype.update=function(pos){
};
nitobi.effects.Effect.prototype.finish=function(){
};
nitobi.effects.Effect.prototype.end=function(){
this.onBeforeFinish.notify(new nitobi.base.EventArgs(this,this.onBeforeFinish));
this.cancel();
this.render(1);
this.running=false;
this.finish();
this.callback();
this.onFinish.notify(new nitobi.base.EventArgs(this,this.onAfterFinish));
};
nitobi.effects.Effect.prototype.cancel=function(){
this.queue.remove(this);
};
nitobi.effects.factory=function(_485,_486,etc){
var args=nitobi.lang.toArray(arguments,2);
return function(_489){
var f=function(){
_485.apply(this,[_489,_486].concat(args));
};
nitobi.lang.extend(f,_485);
return new f();
};
};
nitobi.effects.families={none:{show:null,hide:null}};
nitobi.lang.defineNs("nitobi.effects");
if(false){
nitobi.effects.Transition=function(){
};
}
nitobi.effects.Transition={};
nitobi.effects.Transition.sinoidal=function(x){
return (-Math.cos(x*Math.PI)/2)+0.5;
};
nitobi.effects.Transition.linear=function(x){
return x;
};
nitobi.effects.Transition.reverse=function(x){
return 1-x;
};
nitobi.lang.defineNs("nitobi.effects");
nitobi.effects.Scale=function(_48e,_48f,_490){
nitobi.effects.Scale.baseConstructor.call(this,_48e,_48f);
this.scaleX=typeof (_48f.scaleX)=="boolean"?_48f.scaleX:true;
this.scaleY=typeof (_48f.scaleY)=="boolean"?_48f.scaleY:true;
this.scaleFrom=typeof (_48f.scaleFrom)=="number"?_48f.scaleFrom:100;
this.scaleTo=_490;
};
nitobi.lang.extend(nitobi.effects.Scale,nitobi.effects.Effect);
nitobi.effects.Scale.prototype.setup=function(){
var _491=this.element.style;
var Css=nitobi.html.Css;
this.originalStyle={"top":_491.top,"left":_491.left,"width":_491.width,"height":_491.height,"overflow":Css.getStyle(this.element,"overflow")};
this.factor=(this.scaleTo-this.scaleFrom)/100;
this.dims=[this.element.scrollWidth,this.element.scrollHeight];
_491.width=this.dims[0]+"px";
_491.height=this.dims[1]+"px";
Css.setStyle(this.element,"overflow","hidden");
};
nitobi.effects.Scale.prototype.finish=function(){
for(var s in this.originalStyle){
this.element.style[s]=this.originalStyle[s];
}
};
nitobi.effects.Scale.prototype.update=function(pos){
var _495=(this.scaleFrom/100)+(this.factor*pos);
this.setDimensions(Math.floor(_495*this.dims[0])||1,Math.floor(_495*this.dims[1])||1);
};
nitobi.effects.Scale.prototype.setDimensions=function(x,y){
if(this.scaleX){
this.element.style.width=x+"px";
}
if(this.scaleY){
this.element.style.height=y+"px";
}
};
nitobi.lang.defineNs("nitobi.effects");
nitobi.effects.EffectQueue=function(){
nitobi.effects.EffectQueue.baseConstructor.call(this);
nitobi.collections.IEnumerable.call(this);
this.intervalId=0;
};
nitobi.lang.extend(nitobi.effects.EffectQueue,nitobi.Object);
nitobi.lang.implement(nitobi.effects.EffectQueue,nitobi.collections.IEnumerable);
nitobi.effects.EffectQueue.prototype.add=function(_498){
nitobi.collections.IEnumerable.prototype.add.call(this,_498);
if(!this.intervalId){
this.intervalId=window.setInterval(nitobi.lang.close(this,this.step),15);
}
};
nitobi.effects.EffectQueue.prototype.step=function(){
var now=new Date().getTime();
this.each(function(e){
e.step(now);
});
};
nitobi.effects.EffectQueue.globalQueue=new nitobi.effects.EffectQueue();
nitobi.lang.defineNs("nitobi.effects");
nitobi.effects.BlindUp=function(_49b,_49c){
_49c=nitobi.lang.merge({scaleX:false,duration:Math.min(0.2*(_49b.scrollHeight/100),0.5)},_49c||{});
nitobi.effects.BlindUp.baseConstructor.call(this,_49b,_49c,0);
};
nitobi.lang.extend(nitobi.effects.BlindUp,nitobi.effects.Scale);
nitobi.effects.BlindUp.prototype.setup=function(){
nitobi.effects.BlindUp.base.setup.call(this);
};
nitobi.effects.BlindUp.prototype.finish=function(){
nitobi.html.Css.addClass(this.element,NTB_CSS_HIDE);
nitobi.effects.BlindUp.base.finish.call(this);
this.element.style.height="";
};
nitobi.effects.BlindDown=function(_49d,_49e){
nitobi.html.Css.swapClass(_49d,NTB_CSS_HIDE,NTB_CSS_SMALL);
_49e=nitobi.lang.merge({scaleX:false,scaleFrom:0,duration:Math.min(0.2*(_49d.scrollHeight/100),0.5)},_49e||{});
nitobi.effects.BlindDown.baseConstructor.call(this,_49d,_49e,100);
};
nitobi.lang.extend(nitobi.effects.BlindDown,nitobi.effects.Scale);
nitobi.effects.BlindDown.prototype.setup=function(){
nitobi.effects.BlindDown.base.setup.call(this);
this.element.style.height="1px";
nitobi.html.Css.removeClass(this.element,NTB_CSS_SMALL);
};
nitobi.effects.BlindDown.prototype.finish=function(){
nitobi.effects.BlindDown.base.finish.call(this);
this.element.style.height="";
};
nitobi.effects.families.blind={show:nitobi.effects.BlindDown,hide:nitobi.effects.BlindUp};
nitobi.lang.defineNs("nitobi.effects");
nitobi.effects.ShadeUp=function(_49f,_4a0){
_4a0=nitobi.lang.merge({scaleX:false,duration:Math.min(0.2*(_49f.scrollHeight/100),0.3)},_4a0||{});
nitobi.effects.ShadeUp.baseConstructor.call(this,_49f,_4a0,0);
};
nitobi.lang.extend(nitobi.effects.ShadeUp,nitobi.effects.Scale);
nitobi.effects.ShadeUp.prototype.setup=function(){
nitobi.effects.ShadeUp.base.setup.call(this);
var _4a1=nitobi.html.getFirstChild(this.element);
this.originalStyle.position=this.element.style.position;
nitobi.html.position(this.element);
if(_4a1){
var _4a2=_4a1.style;
this.fnodeStyle={position:_4a2.position,bottom:_4a2.bottom,left:_4a2.left};
this.fnode=_4a1;
_4a2.position="absolute";
_4a2.bottom="0px";
_4a2.left="0px";
_4a2.top="";
}
};
nitobi.effects.ShadeUp.prototype.finish=function(){
nitobi.effects.ShadeUp.base.finish.call(this);
nitobi.html.Css.addClass(this.element,NTB_CSS_HIDE);
this.element.style.height="";
this.element.style.position=this.originalStyle.position;
this.element.style.overflow=this.originalStyle.overflow;
for(var x in this.fnodeStyle){
this.fnode.style[x]=this.fnodeStyle[x];
}
};
nitobi.effects.ShadeDown=function(_4a4,_4a5){
nitobi.html.Css.swapClass(_4a4,NTB_CSS_HIDE,NTB_CSS_SMALL);
_4a5=nitobi.lang.merge({scaleX:false,scaleFrom:0,duration:Math.min(0.2*(_4a4.scrollHeight/100),0.3)},_4a5||{});
nitobi.effects.ShadeDown.baseConstructor.call(this,_4a4,_4a5,100);
};
nitobi.lang.extend(nitobi.effects.ShadeDown,nitobi.effects.Scale);
nitobi.effects.ShadeDown.prototype.setup=function(){
nitobi.effects.ShadeDown.base.setup.call(this);
this.element.style.height="1px";
nitobi.html.Css.removeClass(this.element,NTB_CSS_SMALL);
var _4a6=nitobi.html.getFirstChild(this.element);
this.originalStyle.position=this.element.style.position;
nitobi.html.position(this.element);
if(_4a6){
var _4a7=_4a6.style;
this.fnodeStyle={position:_4a7.position,bottom:_4a7.bottom,left:_4a7.left,right:_4a7.right,top:_4a7.top};
this.fnode=_4a6;
_4a7.position="absolute";
_4a7.top="";
_4a7.right="";
_4a7.bottom="0px";
_4a7.left="0px";
}
};
nitobi.effects.ShadeDown.prototype.finish=function(){
nitobi.effects.ShadeDown.base.finish.call(this);
this.element.style.height="";
this.element.style.position=this.originalStyle.position;
this.element.style.overflow=this.originalStyle.overflow;
for(var x in this.fnodeStyle){
this.fnode.style[x]=this.fnodeStyle[x];
}
this.fnode.style.top="0px";
this.fnode.style.left="0px";
this.fnode.style.bottom="";
this.fnode.style.right="";
return;
this.fnode.style["position"]="";
};
nitobi.effects.families.shade={show:nitobi.effects.ShadeDown,hide:nitobi.effects.ShadeUp};
nitobi.lang.defineNs("nitobi.lang");
nitobi.lang.StringBuilder=function(_4a9){
if(_4a9){
if(typeof (_4a9)==="string"){
this.strings=[_4a9];
}else{
this.strings=_4a9;
}
}else{
this.strings=new Array();
}
};
nitobi.lang.StringBuilder.prototype.append=function(_4aa){
if(_4aa){
this.strings.push(_4aa);
}
return this;
};
nitobi.lang.StringBuilder.prototype.clear=function(){
this.strings.length=0;
};
nitobi.lang.StringBuilder.prototype.toString=function(){
return this.strings.join("");
};


var temp_ntb_uniqueIdGeneratorProc='<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ntb="http://www.nitobi.com"> <xsl:output method="xml" /> <x:p-x:n-guid"x:s-0"/><x:t- match="/"> <x:at-/></x:t-><x:t- match="node()|@*"> <xsl:copy> <xsl:if test="not(@id)"> <x:a-x:n-id" ><x:v-x:s-generate-id(.)"/><x:v-x:s-position()"/><x:v-x:s-$guid"/></x:a-> </xsl:if> <x:at-x:s-./* | text() | @*"> </x:at-> </xsl:copy></x:t-> <x:t- match="text()"> <x:v-x:s-."/></x:t-></xsl:stylesheet>';
nitobi.lang.defineNs("nitobi.base");
nitobi.base.uniqueIdGeneratorProc = nitobi.xml.createXslProcessor(nitobiXmlDecodeXslt(temp_ntb_uniqueIdGeneratorProc));


