
window.addEvent('domready', function(){
// Villa Demare intro image tooltip									 
new ToolTip({tipper:'delmare',ToolTipClass:'YJrl',fromTop:-250,fromLeft:200, message:'<img src="images/stories/g1.jpg" align="left" alt="" style="margin: 5px 5px 5px 0px;" width="80" height="60" />Contact us at +1555-655-3576 for more info or private tour.'});


// Holiday Isles Estate intro image tooltip									 
new ToolTip({tipper:'isles',ToolTipClass:'YJrl',fromTop:-250,fromLeft:18, message:'<img src="images/stories/h1.jpg" align="left" alt="" style="margin: 5px 5px 5px 0px;" width="80" height="60" />Contact us at +1555-655-3576 for more info or private tour.'});

//  18728 Stars Avenue  intro image tooltip									 
new ToolTip({tipper:'starsave',ToolTipClass:'YJrl',fromTop:-250,fromLeft:18, message:'<img src="images/stories/s1.jpg" align="left" alt="" style="margin: 5px 5px 5px 0px;" width="80" height="60" />Contact us at +1555-655-3576 for more info or private tour.'});

//  La Casa Soprana  intro image tooltip									 
new ToolTip({tipper:'soprana',ToolTipClass:'YJrl',fromTop:-250,fromLeft:18, message:'<img src="images/stories/c1.jpg" align="left" alt="" style="margin: 5px 5px 5px 0px;" width="80" height="60" />Contact us at +1555-655-3576 for more info or private tour.'});

//  8458 Hollywood Drive  intro image tooltip									 
new ToolTip({tipper:'hdrive',ToolTipClass:'YJrl',fromTop:-250,fromLeft:18, message:'<img src="images/stories/d7.jpg" align="left" alt="" style="margin: 5px 5px 5px 0px;" width="80" height="60" />Contact us at +1555-655-3576 for more info or private tour.'});








			/* tooltip demo*/
			new ToolTip({tipper:'sticky', sticky:true,message:'<h3>Mouse Lemur</h3><div style="text-align:justify; margin:0px; padding:0px; display:table; position:relative;"><img src="images/stories/test_image.jpg" align="left" hspace="5" width="113" height="150">The Golden-brown Mouse Lemur (<em>Microcebus ravelobensis</em>), also known as the Golden Mouse-lemur or the Ravelobe Mouse Lemur, is a small, recently discovered primate, and like all lemurs and mouse lemurs can only be found on the island of Madagascar. Its dorsal side is golden-brown, and yellowish-white ventrally. It has a white stripe running from the lower forehead to the muzzle.</div>'});	
			/*regular tooltip*/
			new ToolTip({tipper:'regular', message:'This one is a regular tooltip. Mouse out and Poof! it\'s gone. Magic stuff (eat your heart out David Blaine).<br>Like the example above, it supports images and HTML.'});
			/*AJAX tooltip*/
			new ToolTip({tipper:'ajax', ajax:'tooltipdemo.php'});
			/*Sticky AJAX tootip*/	
			new ToolTip({tipper:'sticky_ajax', ajax:'tooltipdemo.php?t=sticky', sticky:true});
			/*Follow mouse*/
			new ToolTip({tipper:'mouse_move', ToolTipClass:'ToolTips2', followMouse:true, message:'Leave my mouse alone you little prick! I\'m calling ma! I am! MAAAAAAA! '});	
			/*Regular text*/
			new ToolTip({tipper:'regular_text', ToolTipClass:'ToolTips', message:'I told you it works. Now you belive me?'});
			new ToolTip({tipper:'simple', ToolTipClass:'ToolTips', message:'This was easy.Dont you think so?'});
			new ToolTip({tipper:'sexy', ToolTipClass:'ToolTips',fromTop:-60,fromLeft:200, message:'O yes! I can be anywhere I like and you cant do anything about it!'});
			/*ToolTip on block elements*/
			new ToolTip({tipper:'tooltip_div', ToolTipClass:'ToolTips', followMouse:true, message:'<h3>Mouse Lemur</h3><div style="text-align:justify; margin:0px; padding:0px; display:table; position:relative;"><img src="images/stories/test_image.jpg" align="left" hspace="5" width="113" height="150">The Golden-brown Mouse Lemur (<em>Microcebus ravelobensis</em>), also known as the Golden Mouse-lemur or the Ravelobe Mouse Lemur, is a small, recently discovered primate, and like all lemurs and mouse lemurs can only be found on the island of Madagascar. Its dorsal side is golden-brown, and yellowish-white ventrally. It has a white stripe running from the lower forehead to the muzzle.</div>'});	






});










