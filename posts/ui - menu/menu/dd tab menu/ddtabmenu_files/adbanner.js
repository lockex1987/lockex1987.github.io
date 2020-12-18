var ddcurpageurl=window.location.toString() //current page url
var ddscripttitle=document.title.replace(/^D.+[-:]\s+/,"")
ddscripttitle=ddscripttitle.replace(/[<>]/g, "")


/////Buy Sell Ads frontpage banner spot
Vertical1234884 = false;
ShowAdHereBanner1234884 = false;
RepeatAll1234884 = false;
NoFollowAll1234884 = false;
BannerStyles1234884 = new Array(
	"a{display:block; float:left; margin-right:10px; font-size:11px;color:#888;font-family:verdana,sans-serif;text-align:center;text-decoration:none; overflow:hidden;}",
	"img{border:0;display:block;}",
	"a.adhere{color:#666;font-weight:bold;font-size:12px;border:1px solid #ccc;background:#e7e7e7;text-align:center;}",
	"a.adhere:hover{border:1px solid #999;background:#ddd;color:#333;}"
);

var showincontentheader=0

var randban=new Array()
randban[0]='<scr'+'ipt language=javascript src="http://a.tribalfusion.com/j.ad?site=DynamicDrive&adSpace=ros&size=468x60&type=horiz&noAd=1&pop=0&requestID='+((new Date()).getTime() % 2147483648) + Math.random()+'"></scr'+'ipt>'
randban[1]=''
randban[2]=''

var bweight=new Array()

bweight[0]=2
bweight[1]=7 
bweight[2]=1 


var banner_num=0
var stepbystep=totalweight=bweight[0]

for (ct=1;ct<bweight.length;ct++)
totalweight+=bweight[ct]

var revised_ranban=new Array()
var ran_num=Math.floor(Math.random()*totalweight)

while (banner_num<randban.length){
for (ct=0;ct<bweight[banner_num];ct++)
revised_ranban[revised_ranban.length]=randban[banner_num]
banner_num++
}

document.write('<style type="text/css">\ndiv#bsaz_1234884{display: inline !important; width: auto !important; float: left; margin-left: 10px;}\n.maincontainer, #pathlinks{clear:left;padding-top:5px;}\n</style>')

if (typeof isfrontpage !="undefined" && typeof dd_disablead=="undefined" || /dynamicindex\d+(\/|\/index.html)$/i.test(ddcurpageurl)){ //if frontpage or category page
document.write('<div style="margin-left:'+(typeof isfrontpage!="undefined"? '0':'160px')+'">'+unescape("%3Cscript src='"+document.location.protocol+"//s3.buysellads.com/1234884/1234884.js?v="+Date.parse(new Date())+"' type='text/javascript'%3E%3C/script%3E")+'</div>')
}
else if (typeof dd_disablead=="undefined" && (revised_ranban[ran_num].indexOf("tribal")!=-1 || ddcurpageurl.indexOf("dynamicindex")==-1)) //if TF or non script page
	document.write('<div id="topbanner" align="center">'+revised_ranban[ran_num]+'</div>')
else if (typeof dd_disablead=="undefined")
	showincontentheader=1

/////Highlight Current Category/////

var testre=/dynamicindex(\d+)/i
//#D7FBBC
if (ddcurpageurl.match && ddcurpageurl.match(testre)!=null){
var catid="#c"+ddcurpageurl.match(testre)[1]
document.write('<style type="text/css">')
document.write(catid+" a{ color: black; background: #F0F0F0}")
document.write('<\/style>')
}

/////Style Supplimentary pages differently/////

if (ddcurpageurl.indexOf("suppliment")!=-1){
document.write('<style type="text/css">')
document.write("#leftbar .headers{background:#5D5D5D}")
document.write('<\/style>')
}

////////////Tally stuff/////////////////////

var tally_alreadyclicked=0
var tally_rootdomain="http://"+window.location.hostname
var tally_url=window.location.href.toLowerCase().split("dynamicdrive.com/")
tally_url=(tally_url.length)==2? tally_url[1] : "invalid"
if (tally_url.charAt(tally_url.length-1)=="/")
tally_url+="index.htm"
if (tally_url.indexOf("#")!=-1)
tally_url=tally_url.substring(0, tally_url.indexOf("#"))

function tally_calculate(){
if (tally_alreadyclicked==1)
return
var tally_page_request = false
if (window.XMLHttpRequest) // if Mozilla, Safari etc
tally_page_request = new XMLHttpRequest()
else if (window.ActiveXObject){ // if IE
try {
tally_page_request = new ActiveXObject("Msxml2.XMLHTTP")
} 
catch (e){
try{
tally_page_request = new ActiveXObject("Microsoft.XMLHTTP")
}
catch (e){}
}
}
else
return false
tally_alreadyclicked=1
tally_page_request.onreadystatechange=function(){
//tally_response(tally_page_request)
}
tally_page_request.open("GET", tally_rootdomain+"/php/tally.php?ms=" + new Date().getTime() + "&url="+escape(tally_url), true)
tally_page_request.send(null)
}

function jsenabledmark(id){
if (ddcurpageurl.indexOf("dynamicdrive.")!=-1){
if (id=="deli")
window.location='http://del.icio.us/post?&url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent("Dynamic Drive JavaScripts- "+ddscripttitle)
else if (id=="furl")
window.location='http://www.furl.net/storeIt.jsp?u='+encodeURIComponent(location.href)+'&t='+encodeURIComponent("Dynamic Drive JavaScripts- "+ddscripttitle)
}
return false
}


/////Highlight textarea stuff/////

function highlight(x){
var x=x+1
document.forms[x].elements[0].select()
//if (document.getElementById && tally_url!="invalid")
//tally_calculate()
}


/////Page Nav Select Menu function/////

function pagenavselect_dd(selectobj){
location=selectobj.options[selectobj.selectedIndex].value
}

/////Top Search form stuff/////


var dd_zoomform=document.getElementById("topform")
if (dd_zoomform){ //if search form defined
	dd_zoomform.onsubmit=function(){
		if (this.zoom_query.value==""){
			alert("Please enter a search term first")
			this.zoom_query.focus()
			return false
		}
	}
}
