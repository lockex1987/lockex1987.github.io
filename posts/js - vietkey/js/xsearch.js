var agt=navigator.userAgent.toLowerCase();

    var is_major = parseInt(navigator.appVersion);
    var is_minor = parseFloat(navigator.appVersion);


    var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
                && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
                && (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1));
    var is_nav2 = (is_nav && (is_major == 2));
    var is_nav3 = (is_nav && (is_major == 3));
    var is_nav4 = (is_nav && (is_major == 4));
    var is_nav4up = (is_nav && (is_major >= 4));
    var is_navonly      = (is_nav && ((agt.indexOf(";nav") != -1) ||
                          (agt.indexOf("; nav") != -1)) );
    var is_nav6 = (is_nav && (is_major == 5));
    var is_nav6up = (is_nav && (is_major >= 5));
    var is_gecko = (agt.indexOf('gecko') != -1);


    var is_ie     = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
    var is_ie3    = (is_ie && (is_major < 4));
    var is_ie4    = (is_ie && (is_major == 4) && (agt.indexOf("msie 4")!=-1) );
    var is_ie4up  = (is_ie && (is_major >= 4));
    var is_ie5    = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")!=-1) );
    var is_ie5_5  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.5") !=-1));
    var is_ie5up  = (is_ie && !is_ie3 && !is_ie4);
    var is_ie5_5up =(is_ie && !is_ie3 && !is_ie4 && !is_ie5);
    var is_ie6    = (is_ie && (is_major == 4) && (agt.indexOf("msie 6.")!=-1) );
    var is_ie6up  = (is_ie && !is_ie3 && !is_ie4 && !is_ie5 && !is_ie5_5);

if(is_ie6up||is_nav){
function trecords(){
	this.index=(trecords.count++)
	this.link=''
	this.keywords=''
	this.description=''
	return this
}
trecords.prototype.set=function(link,keywords,description) {
	this.link=link
	this.keywords=keywords
	this.description=description
}
trecords.prototype.searchstring=function() { return this.link+' '+this.keywords+' '+this.description }
trecords.prototype.count=0

function add(link,keywords,description) {
	al=records.length
	records[al]=new trecords()
	records[al].set(link,keywords,description)
}

records = new Array()
finds=0
sites=0
version="v5.2"
andresult=false
SortResults=true
display_start=0
displast=10
function qsort(f, l){  
// Qsort function by NgocKhoi.tk
	var a=f
	var b=l
	var s
	var m = results[(a+b)>>1].val
   	while (a<=b) {
		while (results[a].val>m) {a++}
		while (m>results[b].val) {b--}

		if (a<=b) {
            		s=results[a]
			results[a]=results[b]
			results[b]=s
            	a++
            	b--
        	}
	} 
	if (f<b) this.qsort(f, b)
	if (a<l) this.qsort(a, l)
}
function bsort() {
	for (var i=results.length-1; i>=0; i--) {
		for (var j=i; j>=0; j--) {
			if (results[i].val>results[j].val) {
				s=results[i]
				results[i]=results[j]
				results[j]=s
			}
		}	
	}
}

function searchAll(keyword){
	var timeA=new Date()
	var nw=0
	finds=0
	sites=0

	var x = parseIt(keyword)
	if(x == -1) return
	total_keywords=x

	document.open()
	document.clear()
	document.write('<link rel="stylesheet" href="style.css">')//Duong dan den file trang tri
	AddBody()

	if (keyword.length>50) keyword=keyword.substring(0,60)+"..."

	results=new Array()
	for (q=0; q<records.length; q++) {
		results[q]=new Array()
		results[q].rec=q
		results[q].val=0
	}

	for (nw=0; nw<keywords.length; nw+=1) search(keywords[nw])
	if (andresult) {
		for (a=0; a<results.length; a+=1) {
			if (results[a].val>0) {
				if (results[a].val<=(total_keywords-1)<<1) {
					results[a].val=0
					sites-=1
				}
			}
		}
	}
	if (SortResults && keywords!='[all]') bsort()
	displast=display_start
	displast+=10
	if (displast>sites) displast=sites

	var timeB=new Date()

	if (finds==0) { display_start=-1; displast=0 }
	document.write("<center><h3>Th&#7913; t&#7921; t&#7915; <b>"+(display_start+1)+"-"+(displast)+"</b> trong t&#7893;ng s&#7889; <b>"+sites+"</b> trang có t&#7915; khoá là <b>''"+keyword+"''</b>.Th&#7901;i gian tìm ki&#7871;m là <b>"+((timeB-timeA)/1000)+"</b> giây.</h3></center>")

	if (displast>sites && finds!=0) displast=sites+1


	if (finds==0) {
		document.write("<h3><font color=green>Không tìm th&#7845;y trang nào có t&#7915; khoá là <b>''"+keyword+"''</b></font></h3>"+
						"<p>T&#7915; khoá <b>"+keyword+"</b> không tìm th&#7845;y trong c&#417; s&#7903; d&#7919; li&#7879;u.</p>"+
						"<LI>D&#7919; li&#7879;u có th&#7875; ch&#432;a &#273;&#432;&#7907;c c&#7853;p nh&#7853;t &#273;&#7847;y &#273;&#7911;.</li>"+
						"<LI>B&#7841;n hãy th&#7917; tìm l&#7841;i t&#7915; g&#7847;n ngh&#297;a h&#417;n.</li>"+
						"<LI>B&#7841;n xem l&#7841;i t&#7915; khoá b&#7841;n c&#7847;n tìm &#273;ã &#273;úng ch&#432;a.</li>"+
						"<LI>B&#7841;n hãy th&#7917; l&#7841;i vài l&#7847;n n&#7919;a xem.</li></span>"+
						"</p>")
		DisplayXSearch()
		document.close()
		return
	}

	q2=display_start
	q3=displast
	for (q=display_start; q<q3; q+=1) {
		if (results[q].val>0) {
			rc=results[q].rec
			document.write("<span class='xtitle'>"+records[rc].link+"</span><br>")
			x1=records[rc].link.indexOf('http://')
			if (x1==-1) x1=records[rc].link.indexOf('href=')+5
			else x1+=7
			x2=records[rc].link.indexOf('>')-1
			if (x1>0 && x2>0) {
				tmp=records[rc].link.substring(x1,x2)
				x2=tmp.indexOf(' ')
				if (x2>0) tmp=tmp.substring(0,x2)
				if (tmp.substring(0,1)=="'") tmp=tmp.substring(1,tmp.length-2)
				if (tmp.substring(0,1)=='"') tmp=tmp.substring(1,tmp.length-1)
				document.write("<table border=0 width=500><tr><td><span class='xresult'>"+records[rc].description+"</span></td></tr></table><span class='xlocation'>"+tmp+"</span><br><br>")
			}
			q2++
   		}
	}

	if (finds>10) {
		document.write("<BR>")
		pages=Math.round(finds/10)
		if (finds%10<6)	pages++

		// Create the parameter string
		paramstring=searchname+"?keywords="+keyword+"&and="+andresult+"&sort="+SortResults

		document.write("<center><span class='xsmall'>")
		if (display_start>0) document.write("<a href='"+paramstring+"&disp="+(display_start-10)+"'>Trang tr&#432;&#7899;c</a>")
		document.write("&nbsp;&nbsp;&nbsp;")

		for (i=1; i<=pages; i+=1){
			if ((((i-1)*10)+1)<=sites) document.write("<a href='"+paramstring+"&disp="+(((i-1)*10))+"'>"+i+"</a>&nbsp&nbsp ")
		}
		document.write("&nbsp;&nbsp;&nbsp;")
		if (displast<=sites) document.write("<a href='"+paramstring+"&disp="+(displast)+"'>Trang ti&#7871;p theo</a>")
		document.write("</span></center>")
	}
	DisplayXSearch()
	document.close()
}

function Cat() {
	document.open()
	document.clear()
	document.write('<link rel="stylesheet" href="style.css">')//Duong dan den file trang tri
	AddBody()
	DisplayXSearch()
	document.close()
}

function stripInput(key) {
	while(key.substring(0,1) == ","  || key.substring(0,1) == " " ) key = key.substring(1,key.length)
	while(key.substring(key.length-1,key.length) == "," || key.substring(key.length-1,key.length) == " ") key = key.substring(0,key.length-1)
	return key
}

function parseIt(key) {
	key=stripInput(key)+" "
	var y=0

	while(key.indexOf(" ") > 0) {
		if (key.substring(0,1)=='"') {
			var pos=key.indexOf('"',2)
			keywords[y]=key.substring(1,pos)
			keywords[y]=stripInput(keywords[y])
			y++
			key=key.substring(pos+1,key.length)
		} else {
			var pos=key.indexOf(' AND ')
			if ((pos>0) && (key.indexOf(' ')>=pos)) {
				pos=key.indexOf(' ',pos+5)
				keywords[y]=key.substring(0,pos)
				keywords[y]=stripInput(keywords[y])
				y++
				key=key.substring(pos+1,key.length)
				if (key.substring(0,4)=='AND ') {
					pos=keywords[y-1].indexOf(' ')+5
					key=keywords[y-1].substring(pos,keywords[y-1].length)+' '+key
				}
			} else {
		  		var pos=key.indexOf(' OR ')
		  		if ((pos>0) && (key.indexOf(' ')>=pos))	{
					pos=key.indexOf(' ')
					keywords[y]=key.substring(0,pos)
					keywords[y]=stripInput(keywords[y])
					if (keywords[y]!=keywords[y-1])	y++
					key=key.substring(pos+1,key.length)
					pos=key.indexOf('OR ')
					key=key.substring(pos+3,key.length)
					pos=key.indexOf(' ')
					keywords[y]=key.substring(0,pos)
					keywords[y]=stripInput(keywords[y])
					y++
					key=key.substring(pos+1,key.length)
					if (key.substring(0,3)=='OR ') key=keywords[y-1]+' '+key
				} else {
					var pos = key.indexOf(" ")
					keywords[y]=key.substring(0,pos)
					keywords[y] = stripInput(keywords[y])
					y++
					if(y > 50) return -1
					key=key.substring(pos+1,key.length)
				}
			}
		}
	}
	return y-1
}

var keywords = new Array()
var results

function AddBody() {
	var keytext='"'+searchname+'?keywords="+'
	var andtext='"&and="+'

	document.write('<script>function doSearch(){'+
						'searchwords=document.searchform.searchwords.value; '+
						'while (searchwords.indexOf(" ")>-1){ pos=searchwords.indexOf(" ");'+
						'searchwords=searchwords.substring(0,pos)+"+"+searchwords.substring(pos+1); }'+
						'document.location='+keytext+' searchwords+'+andtext+'"0"}'+
						'<'+'/'+'script>'
						)

	templateBody()
	document.write("<center><form name='searchform' method='get' action='javascript:doSearch()'><input type=hidden name=oe value='UTF-8'><input type=hidden name=ie value='UTF-8'><p><input type=hidden name=hl value='vi'><input name='searchwords' type='text' size='20' maxlength='255' onkeyup='initTyper(this);'style='font-family: Verdana; font-size: 10pt; border: 2px solid #000000; background-color:#FFFFFF'>&nbsp;<a href='javascript:doSearch()'><INPUT type='submit' name='sa' VALUE='Tìm ki&#7871;m' style='font-family: verdana; font-size: 10pt; border: 1px solid #000000; background-color:#FFFFFF'></a><span class='gensmall'></p><font size='2'><b>B&#7897; gõ ti&#7871;ng Vi&#7879;t</b></font><br><input type=radio name='switcher' accesskey='t' value='OFF' checked onfocus='setTypingMode(0);'><font color='#0000FF' size='2'><b>T&#7855;t</b></font><font size='2'> (Alt+T)</font><input type=radio name='switcher' accesskey='m' value='ON' onfocus='setTypingMode(4);'><font color='#0000FF' size='2'><b>M&#7903;</b></font><font size='2'> (Alt+M)</font></span></form></center>")
	if (usebannercode) bannerCode()
}

function DisplayXSearch() {
	templateEnd()
}

function search(keyword) {
	var hit=0
	var addcomplete=0

	for (q=0; q<records.length; q++) {
		addcomplete=0
		search_parm=" "+records[q].searchstring()+" "
		search_parm=search_parm.toLowerCase()

		if (keyword.indexOf(' AND ')>0) {
			firstword=keyword.substring(0,keyword.indexOf(' ')).toLowerCase()
			lastword=keyword.substring(keyword.indexOf(' AND ')+5,keyword.length).toLowerCase()
			if ((search_parm.indexOf(" "+firstword+" ") != -1) && (search_parm.indexOf(" "+lastword+" ")!= -1 )) {
				hit++
				finds++
				if(hit<2) { 
					if (results[q].val==0) sites++
					results[q].val +=2
				} 
			}
		} else {
			keyword=keyword.toLowerCase()
			if ((search_parm.indexOf(" "+keyword+" ") != -1) ||(keyword=="[all]")) {
				hit++
				finds++
				if(hit<2) { 
					if (results[q].val==0) sites++
					results[q].val+=2
				} 
			} else {
				// check for a half hit (ie. search:share find:SHAREware)
				if (search_parm.indexOf(keyword) != -1)	{
					hit++
					finds++
					if(hit < 2) {
						if (results[q].val==0) sites++
						results[q].val+=1
						x=search_parm.indexOf(keyword)+keyword.length
						pos=search_parm.substring(1,x-keyword.length)
						while (pos.indexOf(" ")!=-1) {
							y=pos.indexOf(" ")
							pos=pos.substring(y+1,pos.length)
						}
						if (pos.length<=2) addcomplete++
	
						pos=search_parm.substring(x,search_parm.length)
						fullresult=search_parm.substring(x,x+pos.indexOf(" "))
						
						if (fullresult.length<=2) addcomplete++
						if (addcomplete>1) results[q].val+=1
					}
				}
			}
		}
		hit=0
	} 
}                                       

var searchwords = ''
var newload = true

function initXsearch() {
	if (searchwords!='') searchAll(searchwords)
	else if (newload) Cat()
}

function tparams(){
	parameters=document.location.search
	parameters=unescape(parameters.substring(1,parameters.length)+'&')

	this.params=new Array()
	i=0
	while (parameters.indexOf('&',0)!=-1) {
		al=this.params.length
		this.params[al]=new Array()
	
		tmp=parameters.substring(0,parameters.indexOf('&',0))
		parameters=parameters.substring(parameters.indexOf('&',0)+1)

		if (tmp.indexOf('=')!=-1) {
			this.params[al].command=tmp.substring(0,tmp.indexOf('='))
			this.params[al].value=tmp.substring(tmp.indexOf('=')+1)
		} else {
			this.params[al].command=tmp
			this.params[al].value=''
		}
	}

	return this
}
tparams.prototype.getValue=function(param){
	value=''
	param=param.toLowerCase()
	al=this.params.length
	for (var i=0; i<al; i+=1) if (this.params[i].command==param) value=this.params[i].value
	return value
}

params=new tparams()
if (params.getValue('keywords')!=''){
	searchwords=params.getValue('keywords')
	origsearchwords=searchwords
	while (searchwords.indexOf('+')>-1) {
		pos=searchwords.indexOf('+')
		searchwords=searchwords.substring(0,pos)+' '+searchwords.substring(pos+1)
	}
}
if (params.getValue('sort')!='')
	if (params.getValue('sort')=='0' || params.getValue('sort')=='false') SortResults=false
	else SortResults=true
if (params.getValue('and')!='')
	if (params.getValue('and')=='0' || params.getValue('and')=='false') andresult=false
	else andresult=true
if (params.getValue('disp')!='') display_start=parseInt(params.getValue('disp'))	
} else{
document.write("&nbsp;");
}