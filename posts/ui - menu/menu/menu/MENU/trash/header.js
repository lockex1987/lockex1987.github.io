<!-- XU LY NGAY THANG -->
<!-- *************************************************************************************************************************************** -->
<!-- *************************************************************************************************************************************** -->
<!-- *************************************************************************************************************************************** -->
<!-- *************************************************************************************************************************************** -->

<!--DATEPICKER ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
$(function() {
	$("#datepicker").datepicker({changeMonth: true, changeYear: true, showOn: 'button', buttonImage: '../images/calendar.gif', buttonImageOnly: true});
});
			
<!--DATEPICKER1 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
$(function() {
	$("#datepicker1").datepicker({changeMonth: true, changeYear: true, showOn: 'button', buttonImage: '../images/calendar.gif', buttonImageOnly: true});
});
			
<!--DATEPICKER2 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
$(function() {
	$("#datepicker2").datepicker({changeMonth: true, changeYear: true, showOn: 'button', buttonImage: '../images/calendar.gif', buttonImageOnly: true});
});

<!--DATEPICKER3 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
$(function() {
	$("#datepicker3").datepicker({changeMonth: true, changeYear: true, showOn: 'button', buttonImage: '../images/calendar.gif', buttonImageOnly: true});
});
			
<!--DATEPICKER4 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
$(function() {
	$("#datepicker4").datepicker({changeMonth: true, changeYear: true, showOn: 'button', buttonImage: '../images/calendar.gif', buttonImageOnly: true});
});

<!--DATEPICKER5 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
$(function() {
	$("#datepicker5").datepicker({changeMonth: true, changeYear: true, showOn: 'button', buttonImage: '../images/calendar.gif', buttonImageOnly: true});
});
			
<!--DATEPICKER6 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
$(function() {
	$("#datepicker6").datepicker({changeMonth: true, changeYear: true, showOn: 'button', buttonImage: '../images/calendar.gif', buttonImageOnly: true});
});

<!--DATEPICKER7 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
$(function() {
	$("#datepicker7").datepicker({changeMonth: true, changeYear: true, showOn: 'button', buttonImage: '../images/calendar.gif', buttonImageOnly: true});
});
			
<!--DATEPICKER8 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
$(function() {
	$("#datepicker8").datepicker({changeMonth: true, changeYear: true, showOn: 'button', buttonImage: '../images/calendar.gif', buttonImageOnly: true});
});

<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
$(function() {
	$("#datepicker9").datepicker({changeMonth: true, changeYear: true, showOn: 'button', buttonImage: '../images/calendar.gif', buttonImageOnly: true});
});
			
<!-- Null = Date -->
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function refreshDate(id){
	var textE=document.getElementById(id);
	textE.value = '';        
};

<!-- Ngay chon san = Date -->
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function createDate(id, text){
	var textE=document.getElementById(id);
	textE.value = text;
};

<!-- Ngay hien tai = Date -->
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function currentDate(id){	
	var now = new Date();
	var month = now.getMonth() + 1;
	if(month < 10){month = "0" + month;}
	var day = now.getDate();
	if(day < 10){day = "0" + day;}
	var year = now.getFullYear();	
	
	var currentDate = document.getElementById('id');
	currentDate.value = day+"/"+month+"/"+year;
	//alert(currentDate.value);	
};

<!-- Ngay nay nam ngoai = Date -->
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function lastYearDate(id){	
	var now = new Date();
	var month = now.getMonth() + 1;
	if(month < 10){month = "0" + month;}
	var day = now.getDate();
	if(day < 10){day = "0" + day;}
	var year = now.getFullYear() - 1;
	
	var currentDate = document.getElementById('id');
	currentDate.value = day+"/"+month+"/"+year;
	//alert(currentDate.value);	
};

<!-- Ngay nay nam sau = Date -->
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function nextYearDate(id){	
	var now = new Date();
	var month = now.getMonth() + 1;
	if(month < 10){month = "0" + month;}
	var day = now.getDate();
	if(day < 10){day = "0" + day;}
	var year = now.getFullYear() + 1;
	
	var currentDate = document.getElementById('id');
	currentDate.value = day+"/"+month+"/"+year;
	//alert(currentDate.value);	
};

<!-- Ngay nay thang truoc = Date -->
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function lastMonthDate(id){	
	var now = new Date();
	var month = now.getMonth();
	if(month < 1) month = 12;
	if(month < 10){month = "0" + month;}	
	var day = now.getDate();
	if(day < 10){day = "0" + day;}
	var year = now.getFullYear();	
	
	var currentDate = document.getElementById('id');
	currentDate.value = day+"/"+month+"/"+year;
	//alert(currentDate.value);	
};

<!-- Ngay nay thang sau = Date -->
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function nextMonthDate(id){	
	var now = new Date();
	var month = now.getMonth() + 2;
	if(month > 12) month = 1;
	if(month < 10){month = "0" + month;}
	var day = now.getDate();
	if(day < 10){day = "0" + day;}
	var year = now.getFullYear();	
	
	var currentDate = document.getElementById('id');
	currentDate.value = day+"/"+month+"/"+year;
	//alert(currentDate.value);	
};

<!-- Chua duoc!!! Ngay nay tuan truoc = Date -->
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function lastWeekDate(id){	
	var now = new Date();
	var month = now.getMonth() + 1;
	if(month < 10){month = "0" + month;}
	var day = now.getDate();
	if(day < 10){day = "0" + day;}
	var year = now.getFullYear();	
	
	var currentDate = document.getElementById('id');
	currentDate.value = day+"/"+month+"/"+year;
	//alert(currentDate.value);	
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

<!-- XU LY DU LIEU -->
<!-- *************************************************************************************************************************************** -->
<!-- *************************************************************************************************************************************** -->
<!-- *************************************************************************************************************************************** -->
<!-- *************************************************************************************************************************************** -->

<!-- Null = Text Field -->
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function refreshData(id){
	var textE=document.getElementById(id);
	textE.value = '';        
};

<!-- Text = Text Field -->
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function setData(id, text){
	var textE=document.getElementById(id);
	textE.value = text;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

<!-- XU LY DANH SACH -->
<!-- *************************************************************************************************************************************** -->
<!-- *************************************************************************************************************************************** -->
<!-- *************************************************************************************************************************************** -->
<!-- *************************************************************************************************************************************** -->

<!-- Hien thi danh sach co max row va co id trong khoang 0 den (max - 1) -->
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function showList(max,id)
{
	for(i = 0; i < max; i++){
		document.getElementById(id + i).style.display = '';
	}
	document.getElementById(id).value = max;
};

<!-- An danh sach co max row va co id trong khoang 0 den (max - 1) -->
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function hideList(max,id)
{
	for(i = 0; i < max; i++){
		document.getElementById(id + i).style.display = 'none';
	}
	document.getElementById(id).value = 0;
};

<!-- Hien thi element co row lon nhat trong danh sach -->
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function showElement(max, id)
{
	var count = document.getElementById(id).value;
				
	if (count < max)
	{
		document.getElementById(id + "0").style.display = '';
		document.getElementById(id + count).style.display = '';
		document.getElementById(id).value = parseInt(document.getElementById(id).value) + 1;
	}
};

<!-- Hien thi element bat ky trong danh sach -->
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function showElement(max, id, i)
{
	var count = document.getElementById(id).value;
				
	if (count < max)
	{
		document.getElementById(id + "0").style.display = '';
		document.getElementById(id + i).style.display = '';
		document.getElementById(id).value = parseInt(document.getElementById(id).value) + 1;
	}
};

<!-- An element co row lon nhat trong danh sach -->
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function hideElement(min, id)
{
	if(parseInt(document.getElementById(id).value) > min){
		document.getElementById(id).value = parseInt(document.getElementById(id).value) - 1;
	}
	var count = document.getElementById(id).value;		
				
	if (parseInt(count) > min)
	{            
		document.getElementById(id + count).style.display = 'none';            
	}
	if (parseInt(count) <= min)
	{
		document.getElementById(id + "0").style.display = 'none';
		document.getElementById(id + "1").style.display = 'none';
	}
};

<!-- An element bat ky trong danh sach -->
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function hideElement(min, id, i)
{
	if(parseInt(document.getElementById(id).value) > min){
		document.getElementById(id).value = parseInt(document.getElementById(id).value) - 1;
	}
	var count = document.getElementById(id).value;		
				
	if (parseInt(count) > min)
	{            
		document.getElementById(id + i).style.display = 'none';            
	}
	if (parseInt(count) <= min)
	{
		document.getElementById(id + "0").style.display = 'none';
		document.getElementById(id + i).style.display = 'none';
	}
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

<!-- XU LY CHECK BOX LIST -->
<!-- *************************************************************************************************************************************** -->
<!-- *************************************************************************************************************************************** -->
<!-- *************************************************************************************************************************************** -->
<!-- *************************************************************************************************************************************** -->

<!-- Check tat ca check box -->
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function checkAll(obj, frm, checkName){
	var state = obj.checked;
	var merTable = document.getElementById(frm); // frm = 'frm' hoac 'frm0' hoac 'frm1'
	var inputs = merTable.getElementsByTagName('input');
	var i = 0;

	for(i = 0; i < inputs.length; i++){
		if(inputs[i].name.indexOf(checkName) > -1 ) //checkName = 'arrId'
		{
			//chuyen trang thai checkbox
			inputs[i].checked = state;
		}
	}
};





			



<!--SCRIPT XÓA FILE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function removeAttachmentItem(id)
{
	Element.remove("invisible" + id);
	return false;
};

<!--SCRIPT THÊM FILE+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function add(max)
{
	var curCount = document.getElementById("attachment_index").value;
	if (curCount < max)
	{
		document.getElementById("invisible" + curCount).style.display = '';
		document.getElementById("attachment_index").value = parseInt(document.getElementById("attachment_index").value) + 1;
	}
};

<!--SCRIPT DOWNLOAD FILE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function startDownload()  
{  
	var url='../../download/template.xls';
	//var url='../../download/template.doc';
	window.open(url,'Download');  
}
////setTimeout("startDownload()",5000); //starts download after 5 seconds

<!--SCRIPT LOẠI KHỎI DANH SÁCH+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
function removeEntity(min)
{
	if(parseInt(document.getElementById("entity_index").value) > min){
		document.getElementById("entity_index").value = parseInt(document.getElementById("entity_index").value) - 1;
	}
	var count = document.getElementById("entity_index").value;
	//alert(count);
				
	if (parseInt(count) == 4)
	{            
		document.getElementById("entity4").style.display = 'none';
		document.getElementById("entity5").style.display = 'none';
		document.getElementById("entity6").style.display = 'none';
	}
	if (parseInt(count) == 3)
	{
		document.getElementById("entity3").style.display = 'none';
	}
	if (parseInt(count) == 2)
	{
		document.getElementById("entity1").style.display = 'none';
		//document.getElementById("entity7").style.display = 'none';
	}		
	if (parseInt(count) < 1)
	{
		document.getElementById("entity1").style.display = '';
		document.getElementById("entity3").style.display = '';
		document.getElementById("entity4").style.display = '';
		document.getElementById("entity5").style.display = '';
		document.getElementById("entity6").style.display = '';
		//document.getElementById("entity7").style.display = '';
		document.getElementById("entity_index").value = 5;
	}
};			

function refreshBody(id){
	var refreshValue = document.getElementById(id);
	refreshValue.value = '5';        
	
	var now = new Date();
	var month = now.getMonth() + 1;
	if(month < 10){month = "0" + month;}
	var day = now.getDate();
	if(day < 10){day = "0" + day;}
	var year = now.getFullYear();
	//alert(day+"/"+month+"/"+year);	
	var currentDate = document.getElementById('datepicker');
	currentDate.value = day+"/"+month+"/"+year;
	
	var currentDate1 = document.getElementById('datepicker1');
	currentDate1.value = day+"/"+month+"/"+year;
};

function changListMerAre()
{
	var value = document.getElementById('select').value;
	if(value == 1)
	{
		document.getElementById('detail').style.display='';
		document.getElementById('total').style.display='none';
		document.getElementById('station1').style.display='';
	}
	 else if(value == 2) 
	{document.getElementById('detail').style.display='none';
	document.getElementById('total').style.display='';
	document.getElementById('station1').style.display='none';
	}
	else
	{
		document.getElementById('detail').style.display='none';
	document.getElementById('total').style.display='';
	document.getElementById('station1').style.display='none';sss
	}	
}


function ConfirmSeparate(){
	if(confirm("Bạn có chắc chắn muốn tạo yêu cầu điều chuyển này?")){
		window.location = "../01.yeucaudc/02.dsycdc.html";	
	}else{
	
	}
};