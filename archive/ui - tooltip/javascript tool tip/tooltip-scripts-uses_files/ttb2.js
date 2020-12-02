//****** Advanced DHTML Popup Pro Version 2.500.0137.210 Build: 172 ******

// Copyright (c) Digital Flow Software 2005-2009
// The present javascript code is property of Digital Flow Software.
// This code can only be used inside Internet/Intranet web sites located on *web servers*, as the outcome of a licensed Advanced DHTML Popup application only. 
// This code *cannot* be used inside distributable implementations (such as demos, applications or CD-based webs), unless this implementation is licensed with an "Advanced DHTML Popup License for Distributed Applications". 
// Any unauthorized use, reverse-engineering, alteration, transmission, transformation, facsimile, or copying of any means (electronic or not) is strictly prohibited and will be prosecuted.
// ***Removal of the present copyright notice is strictly prohibited***

var df,rf=false,na=navigator.userAgent,dt=document,op=(na.indexOf('Opera')!=-1),dm=(dt.getElementById)?true:false,ie5x=(dt.all&&dm),mci=(na.indexOf('Mac')!=-1);df=((ie5x||op)&&mci);decide();function decide(){if(df){return;}else{rf=true;}}
if(rf){
function initADP(){bdf=0;
// *** Begin advanced user scripting area ***
   htmlstring="<div align=\"center\">   <center>   <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"848\" style=\"background-image: url('http://www.tamingthebeast.net/images/ttb-pop.gif'); background-repeat: no-repeat; background-color: #000000; background-position: 0% 50%\" height=\"90\">     <tr>       <td valign=\"middle\" align=\"center\">           <form style=\"margin-bottom:0px;\" method=\"post\" action=\"http://www.ttbconnect.com/form.php?form=1\" id=\"frmSS1\" onsubmit=\"return checkform1(this);\">            <font face=\"Arial\" style = \"font-size: 14px; color: #ffffff;\">            <b>           Don't miss a thing on Taming The Beast - FREE newsletter!</b></font> <br />                     <input type=\"hidden\" name=\"format\" value=\"h\" /><font face=\"arial\" size=\"2\" /><input style = \"font-size: 11px; color: #000000; background-color: #A4C4E0; border: 1px solid; border-color: #4378AC #4378AC #4378AC #4378AC;\" name=\"CustomFields[1]\" value=\"first name\" onfocus=\"this.value='';\" id=\"CustomFields_1_1\" type=\"text\" size=\"20\" maxlength=\"20\" />         <input style = \"font-size: 11px; color: #000000; background-color: #A4C4E0; border: 1px solid; border-color: #4378AC #4378AC #4378AC #4378AC;\" type=\"text\" name=\"email\" value=\"email\" onfocus=\"this.value='';\" size=\"20\" />         <input style = \"font-size: 12px; color: #000000; background-color: #A4C4E0; border: 1px solid; border-color: #4378AC #4378AC #4378AC #4378AC;\" type=\"submit\" value=\"&nbsp; subscribe &nbsp;\" /><br />            </font><font />         <font face=\"Arial\" style = \"font-size: 12px; color: #ffffff;\">         When you subscribe, you also get TTB's triple script pack free!<br>  Easy to use scripts to help boost your web site traffic and sales! <br>         </font><font face=\"Arial\" style = \"font-size: 10px; color: #ffffff;\">         We hate spam and will never&nbsp;  sell, rent or share your email address.</font>					 					          					         </font> 					          					 					</form> 					          					                                     </td>    </tr>   </table>   </center> </div>   ";
   new adp("ttbpop",htmlstring,"");
   if(isc)return;
   adpTimer('ttbpop','adpSlideup','adpShow','','',2,'');
// *** End advanced user scripting area ***
}
if(window.attachEvent){window.attachEvent('onload', initADP);}else{if(typeof window.onload == 'function'){var preADP = window.onload;window.onload = function(){preADP();initADP();}}else{window.onload = initADP;}}
}
