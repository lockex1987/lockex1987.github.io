var resultHTML = "", currentSelector = "", w3Sels = [];
w3Sels.push(".intro");
w3Sels.push("#Lastname");
w3Sels.push(".intro, #Lastname");
w3Sels.push("h1");
w3Sels.push("h1, p");
w3Sels.push("div p");
w3Sels.push("div > p");
w3Sels.push("ul + p");
w3Sels.push("ul ~ table");
w3Sels.push("*");
w3Sels.push("[id]");
w3Sels.push("[id=my-Address]");
w3Sels.push("[id$=ess]");
w3Sels.push("[id|=my]");
w3Sels.push("[id^=L]");
w3Sels.push("[title~=beautiful]");
w3Sels.push("[id*=s]");
w3Sels.push(":checked");
w3Sels.push(":disabled");
w3Sels.push(":enabled");
w3Sels.push(":empty");
w3Sels.push(":focus");
w3Sels.push("p:first-child");
w3Sels.push("p::first-letter");
w3Sels.push("p::first-line");
w3Sels.push("p:first-of-type");
w3Sels.push("h1:hover");
w3Sels.push("input:in-range");
w3Sels.push("input:out-of-range");
w3Sels.push("input:invalid");
w3Sels.push("input:valid");
w3Sels.push("p:lang(it)");
w3Sels.push("p:last-child");
w3Sels.push("p:last-of-type");
w3Sels.push("tr:nth-child(even)");
w3Sels.push("tr:nth-child(odd)");
w3Sels.push("li:nth-child(1)");
w3Sels.push("li:nth-last-child(1)");
w3Sels.push("li:nth-of-type(2)");
w3Sels.push("li:nth-last-of-type(2)");
w3Sels.push("b:only-child");
w3Sels.push("h3:only-of-type");
w3Sels.push(":root");

var w3SelDescriptions = [];
w3SelDescriptions.push('All elements with class="intro"');
w3SelDescriptions.push('The element with id="Lastname"');
w3SelDescriptions.push('All elements with class="intro", and the element with id="Lastname"');
w3SelDescriptions.push('All &lt;h1&gt; elements.');
w3SelDescriptions.push('All &lt;h1&gt; elements and all &lt;p&gt; elements.');
w3SelDescriptions.push('All &lt;p&gt; elements that are inside a &lt;div&gt; element.');
w3SelDescriptions.push('All &lt;p&gt; elements where the parent is a &lt;div&gt; element.');
w3SelDescriptions.push('The &lt;p&gt; element that are next to each &lt;ul&gt; elements.');
w3SelDescriptions.push('All &lt;table&gt; elements that are siblings of a &lt;ul&gt; element.');
w3SelDescriptions.push("All elements.");
w3SelDescriptions.push('All elements with an id attribute.');
w3SelDescriptions.push('All elements with an id attribute value equal to "my-Address"');
w3SelDescriptions.push('All elements with an id attribute value ending with "ess"');
w3SelDescriptions.push('All elements with an id attribute value equal to "my" or starting with "my" followed by a hyphen (-)');
w3SelDescriptions.push('All elements with an id attribute value starting with the letter "L"');
w3SelDescriptions.push('All elements with a title attribute value containing the word "beautiful"');
w3SelDescriptions.push('All elements with an id attribute value containing the string "s"');
w3SelDescriptions.push("All checked form elements.");
w3SelDescriptions.push("All disabled form elements.");
w3SelDescriptions.push("All enabled form elements.");
w3SelDescriptions.push('All empty elements<br>(like &lt;input /&gt;)');
w3SelDescriptions.push('The element that currently has focus.');
w3SelDescriptions.push('All &lt;p&gt; elements that are the first child of their parent.');
w3SelDescriptions.push('The first letter of all &lt;p&gt; elements.');
w3SelDescriptions.push('The first line of all &lt;p&gt; elements.');
w3SelDescriptions.push('All &lt;p&gt; elements that are the first &lt;p&gt; element of their parent.');
w3SelDescriptions.push('All &lt;h1&gt; elements, but only when you hover them.<br><br>Try hover (mouse over) the H1 element in the result.');
w3SelDescriptions.push('All &lt;input&gt; elements with a max and/or min value, where the value is within the specific range.<br><br>Try typing a number higher than 10, and you will see the styling disappear. <p><b>Note:</b> This selector does not work in IE 9 and earlier.</p>');
w3SelDescriptions.push('All &lt;input&gt; elements with a max and/or min value, where the value is outside the specific range.<br><br>Try typing in the "Your lucky number" field, and if you are out of range, the styling will appear. <p><b>Note:</b> This selector does not work in IE 9 and earlier.</p>');
w3SelDescriptions.push('All &lt;input&gt; elements where the value is invalid according to their limitations.<br><br>Try typing in the input fields, and if your input is invalid, the styling will appear. <p><b>Note:</b> This selector does not work in IE 9 and earlier.</p>');
w3SelDescriptions.push('All &lt;input&gt; elements where the value is valid according to their limitations.<br><br>Try typing in the input fields, and if your input is invalid, the styling will disappear. <p><b>Note:</b> This selector does not work in IE 9 and earlier.</p>');
w3SelDescriptions.push('All &lt;p&gt; elements with a lang attribute value starting with "it"');
w3SelDescriptions.push('All &lt;p&gt; elements that are the last child of their parent.');
w3SelDescriptions.push('All &lt;p&gt; elements that are the last &lt;p&gt; element of their parent.');
w3SelDescriptions.push('All even &lt;tr&gt; elements.');
w3SelDescriptions.push('All odd &lt;tr&gt; elements.');
w3SelDescriptions.push('All &lt;li&gt; elements that are the first child of their parent.');
w3SelDescriptions.push('All &lt;li&gt; elements that are the first child of their parent, counting from the &lt;li&gt; element.');
w3SelDescriptions.push('All &lt;li&gt; elements that are the second &lt;li&gt; element of their parent.');
w3SelDescriptions.push('All &lt;li&gt; elements that are the second &lt;li&gt; element of their parent, counting from the &lt;li&gt; element.');
w3SelDescriptions.push('All &lt;b&gt; elements that are the only child of their parent.');
w3SelDescriptions.push('All &lt;h3&gt; elements that are the only child of its type, of their parent.');
w3SelDescriptions.push('The document’s root element.');

function w3jQuerySelectorLoad() {
  var l = w3Sels.length, x = "";
  for (i = 0; i < l; i++) {
    x = x + "<div id='seldiv_" + w3Sels[i] + "' onclick='clickSelOpt(\"" + w3Sels[i] + "\",this);'>" + w3Sels[i] + "</div>";
  }
  document.getElementById("selectorOptions").innerHTML = x;
}

function clickSelOpt(sel) {
  var l = w3Sels.length, ll, x, y, z, patt, arrPos, i, cc, dd;
  currentSelector = sel;
  if (resultHTML !== "") {
    document.getElementById("iframeResult").innerHTML = resultHTML;
    resultHTML = "";
  }
  z = document.getElementById("selectorOptions").getElementsByTagName("DIV");
  for (i = 0; i < z.length; i++) {
    z[i].style.fontWeight = "normal";
  }
  $("#iframeResult p").css("background-color","");
  $("#iframeResult p").css("borderColor","");
  for (i = 0; i < l; i++) {
    if (w3Sels[i] !== "p::first-letter" && w3Sels[i] !== "p::first-line" && w3Sels[i] !== "input:in-range" && w3Sels[i] !== "input:out-of-range" && w3Sels[i] !== "input:invalid" && w3Sels[i] !== "input:valid") {
      $("#iframeResult " + w3Sels[i] + " :not(.noSel)").css("background-color","");
      $("#iframeResult " + w3Sels[i] + " :not(.noSel)").css("borderColor","");
    }
    if (w3Sels[i] === sel) {arrPos=i; }
  }
 $("option").css("color","black"); 
 $("#iframeResult .newsletter").css("border-color","#0099FF");    
 $("#iframeResult .newsletter").css("background-color","#99D6FF");  
 document.getElementById("selectorDescription").style.display="block";
 document.getElementById("selectorDescription").innerHTML = "<p style='line-height:20px;'><b>Selector:</b><br>" + w3Sels[arrPos] + "</p><p>" + w3SelDescriptions[arrPos] + "</p>";
 $("#iframeResult :radio").css("outlineColor","transparent");  
 $("#iframeResult :checkbox").css("outlineColor","transparent");  
    $("select").css("color","#000000");
    paintElements(sel,1);
 if (sel === ":focus") {
  document.getElementsByTagName("INPUT")[0].focus();
 }
 if (sel === ":root") {
  markSelector("#iframeResult");
 } else {
  document.getElementById("iframeResult").style.backgroundColor="";
  document.getElementById("iframeResult").style.borderColor="";  
 }
 patt = /,/g;
 x = "#iframeResult " + sel;
 if (sel === "*") {
  x = "#helpIntro,#iframeResult p,#Lastname,#iframeResult .helpUl,#iframeResult li,#iframeResult .helpTable,#iframeResult tr,#iframeResult td,#iframeResult th,#iframeResult .helpHref,#iframeResult .newsletter,#iframeResult input,#iframeResult"
  if (sel === "*") {x=x+",#iframeResult :text"; }
  markSelector(x,sel);
  if (sel === "*") {  
   x = "#iframeResult :radio,#iframeResult :checkbox";
   markRadioSelector(x);
  }
  return;
 } 
 if (sel === ":empty") {
//  x = "#iframeResult :text";
  x = "#iframeResult input";
  markSelector(x,sel);
  x = "#iframeResult :radio,#iframeResult :checkbox";
  markRadioSelector(x);
  return;
 } 
 if (sel === "[id]") {
  x = "#Lastname, #my-Address, .helpUl";
  markSelector(x,sel);
  return;
 } 

 if (sel === "p::first-letter") {
  resultHTML = document.getElementById("iframeResult").innerHTML;
  x = document.getElementsByTagName("p");
  ll = x.length;
  for (i = 0; i < ll; i++) {
   cc = x[i].innerHTML;
   if (cc.indexOf('<span class="markup">&lt;p&gt;</span><span><b><span class="markup">&lt;b&gt;</span>') >- 1) {
    x[i].innerHTML = "<span class='markup'>&lt;p&gt;</span><span><b><span class='markup'>&lt;b&gt;</span><span style='background-color:#FFFF99;border-color:#FF6666;'>" + cc.substr(83,1) + "</span>" + cc.substr(84);
   } else if (cc.indexOf('<span class="markup">&lt;p&gt;</span>') >- 1) {
    x[i].innerHTML = "<span class='markup'>&lt;p&gt;</span><span style='background-color:#FFFF99;border-color:#FF6666;'>" + cc.substr(37,1) + "</span>" + cc.substr(38);
   } else if (cc.indexOf('<span class="markup">&lt;p id="my-Address"&gt;</span>') >- 1) {
    x[i].innerHTML = '<span class="markup">&lt;p id="my-Address"&gt;</span><span style="background-color:#FFFF99;border-color:#FF6666;">' + cc.substr(53,1) + "</span>" + cc.substr(54);
   } else if (cc.indexOf('<span class="markup">&lt;p lang="it" title="Hello beautiful"&gt;</span>') >- 1) {
    x[i].innerHTML = '<span class="markup">&lt;p lang="it" title="Hello beautiful"&gt;</span><span style="background-color:#FFFF99;border-color:#FF6666;">' + cc.substr(71,1) + "</span>" + cc.substr(72);
   }
  }
  paintElements(sel,2);
  return;
 }
 if (sel === "p::first-line") {
  resultHTML = document.getElementById("iframeResult").innerHTML;
  x = document.getElementsByTagName("p");
  ll = x.length;
  for (i = 0; i < ll; i++) {
   cc = x[i].innerHTML;
   if (cc.indexOf('All my friends are great!') >- 1) {
    x[i].innerHTML = '<span class="markup">&lt;p&gt;</span><span style="background-color:#FFFF99;border-color:#FF6666;">All my friends are great!</span><span class="markup">&lt;br&gt;</span><br>But I really like Daisy!!<span class="markup">&lt;/p&gt;</span>';
   } else if (cc.indexOf('Ciao bella') >- 1) {
    x[i].innerHTML = cc.replace("Ciao bella",'<span style="background-color:#FFFF99;border-color:#FF6666;">Ciao bella</span>');
   } else if (cc.indexOf('My latest disco') >- 1) {
    x[i].innerHTML = cc.replace("My latest discoveries has led me to believe that we are all animals:",'<span style="background-color:#FFFF99;border-color:#FF6666;">My latest discoveries has led me to believe that we are all animals:</span>');
   } else if (cc.indexOf('I have many friends') >- 1) {
    x[i].innerHTML = cc.replace("I have many friends:",'<span style="background-color:#FFFF99;border-color:#FF6666;">I have many friends:</span>');
   } else if (cc.indexOf('I live in Duckburg') >- 1) {
    x[i].innerHTML = cc.replace("I live in Duckburg",'<span style="background-color:#FFFF99;border-color:#FF6666;">I live in Duckburg</span>');
   } else if (cc.indexOf('My name is Donald') >- 1) {
    x[i].innerHTML = '<span class="markup">&lt;p&gt;</span><span style="background-color:#FFFF99;border-color:#FF6666;">My name is Donald <span id="Lastname" style=""><span class="markup">&lt;span id="Lastname"&gt;</span>Duck.</span><span class="markup">&lt;/span&gt;</span></span><span class="markup">&lt;/p&gt;</span>'
   }
  }
  paintElements(sel,2);
  return;
 }
 if (sel === "h1:hover") {
  $("h1").hover(function(){
   $("h1").css("background-color","#FFFF99");
   $("h1").css("border-color","#FF6666");
  },function(){
   $("h1").css("background-color","");
   $("h1").css("border-color","");
  });
 } else {
  $("h1").hover(function(){
   $("h1").css("background-color","");
   $("h1").css("border-color","");
  },function(){
   $("h1").css("background-color","");
   $("h1").css("border-color","");
  });
 }
 if (sel === ".intro") {x = "#iframeResult #helpIntro"; }
 if (sel === ".intro, #Lastname") {x = "#iframeResult #helpIntro, #Lastname"; } 
 if (sel === "div > p") {x = "#iframeResult div.intro > p"; }
 if (sel === "div p") {x = "#iframeResult div.intro p"; } 
 if (sel === "[id^=L]") {x = "#iframeResult #Lastname, .helpUl"; }
 x = x.replace(patt,",#iframeResult ");
    if (sel === ":radio" || sel === ":checkbox" || sel === ":checked") {
  markRadioSelector(x);
 } else {
  y=x + ":not(.noSel)";
  markSelector(y,sel);
  if (sel === ":input" || sel === ":enabled" || sel === ":disabled" || sel === "*") { markRadioSelector(x); }
 }
}

function paintElements(sel,n) {
 if (n === 2 && sel !== "tr:nth-child(even)" && sel !== "tr:nth-child(odd)") {
  $("#iframeResult tr").css("background-color","#f1f1f1");  
 }
}

function markSelector(x,sel) {
    $(x).animate({borderColor:"#FF6666"},10);     
    $(x).animate({backgroundColor:"#FFFF99"},100,function () { paintElements(sel,2); });         
}

function markRadioSelector(x) {
    $(x).animate({outlineColor:"#FF0000"},100);             
}

function changeLuckyNumber(obj) {
 if (currentSelector === "input:in-range" || currentSelector === "input:valid") {
  var x = obj.value;
  if (isNaN(x) === true || Number(x)<1 || Number(x)>10) {
   obj.style.backgroundColor = "";
   obj.style.borderColor = "";
  } else {
   obj.style.backgroundColor = "#FFFF99";
   obj.style.borderColor = "#FF6666";
  }
 } else if (currentSelector === "input:out-of-range" || currentSelector === "input:invalid") {
  var x = obj.value;
  if (isNaN(x) === true || Number(x)<1 || Number(x)>10) {
   obj.style.backgroundColor = "#FFFF99";
   obj.style.borderColor = "#FF6666";
  } else {
   obj.style.backgroundColor = "";
   obj.style.borderColor = "";
  }
 }
}

function changeEmail(obj) {
 if (currentSelector === "input:invalid") {
  if (obj.checkValidity() === false) {
   obj.style.backgroundColor = "#FFFF99";
   obj.style.borderColor = "#FF6666";
  } else {
   obj.style.backgroundColor = "";
   obj.style.borderColor = "";
  }
 } else if (currentSelector === "input:valid") {
  if (obj.checkValidity() === true) {
   obj.style.backgroundColor = "#FFFF99";
   obj.style.borderColor = "#FF6666";
  } else {
   obj.style.backgroundColor = "";
   obj.style.borderColor = "";
  }
 }
}