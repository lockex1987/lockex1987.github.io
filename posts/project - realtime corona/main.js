function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}
  throw new Error("Could not create HTTP request object.");
}
var request = makeHttpObject();
request.open("GET", "https://en.wikipedia.org/api/rest_v1/page/html/2019%E2%80%9320_Wuhan_coronavirus_outbreak_by_country_and_territory?stash=true*", true);
request.send(null);
request.onreadystatechange = function() {
if (request.readyState == 4)
         var data = request.responseText;
         var begin = data.indexOf('<th align="right">');
         var end = data.indexOf('<th></th></tr>');
         var solieu = data.slice(begin,end);
         var solieu = solieu.replace(/[^a-zA-Z0-9 ]/g, "");
         var solieu = solieu.replace(/t|h|a|l|i|g|r|n/g, "");
         var solieu = solieu.split(" ");
         var comfirmed = solieu.slice(1,2);
         var die = solieu.slice(2,3);
         var recoveries= solieu.slice(3,4);
		 document.getElementById("show").innerHTML = "Confirmed cases: "+comfirmed+"<br><br>Deaths: "+die+"<br><br>Recovered: "+recoveries;
};

