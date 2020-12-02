/**
 * ToolTips - show tooltips on hover
 * @version		1.0.0
 * @MooTools version 1.1
 * @author		Constantin Boiangiu <info [at] constantinb.com>
 *For Youjoomla.com
 */

var ToolTip = new Class({
	initialize: function(options) {
		this.options = Object.extend({
			tipper: null,		// element displaying the tooltip
			message:null,		// some predefined message
			ajax:null,			// show message from ajax / if message is not null, this will override it
			ToolTipClass:'ToolTips',	// tooltip display class
			followMouse:false,	// follow mouse on move
			sticky:false,		// remove tooltip if closed
			fromTop: 15,		// distance from mouse or object
			fromLeft: 15,
			duration: 300,		// fade effect transition duration
			fadeDistance: 20    // the distance the tooltip sarts fading in/out
		}, options || {});
		if(!$(this.options.tipper)) return;		
		this.el = $(this.options.tipper);
		this.start();
		this.visible = 0;
	},
	
	start: function(){
		this.createContainer();
		
		this.header.setHTML(this.el.title);
		this.el.set({'title':''});
		
		if(!this.options.ajax){
			this.message.setHTML(this.options.message);
		}else{
			this.message.removeClass('message');
			this.message.addClass('message_loading');
			new Ajax(this.options.ajax, {
				method: 'get',
				onComplete: function() {
					this.message.removeClass('message_loading');
					this.message.addClass('message');
				}.bind(this),
				update: this.message
			}).request();
		}
		
		this.fx = new Fx.Styles(this.container, {duration:this.options.duration, wait:false, transition:Fx.Transitions.Sine.easeOut});
		
		this.el.addEvent( this.options.followMouse ? 'mousemove' : 'mouseenter', this.showToolTip.bind(this) );
		if(!this.options.sticky)
			this.el.addEvent('mouseleave', this.hideToolTip.bind(this));	
		else{
			this.closeTip = new Element('a').set({'class':'sticky_close','href':'#'}).setStyles({'position':'absolute','top':3,'right':3});
			this.closeTip.injectInside(this.header);	
			this.closeTip.addEvent('click', this.hideToolTip.bind(this));				
		}		
	},
	
	showToolTip: function(event){
		var event = new Event(event);
		
		this.elemHeight = this.options.followMouse ? 0 : this.el.getCoordinates().height;		
		this.top = this.options.followMouse ? event.client.y : this.el.getPosition().y;
		var left = this.options.followMouse ? event.client.x : this.el.getPosition().x;
		
		var top_dist = this.visible == 1 ? 
					   this.top + this.options.fromTop + this.elemHeight : 
					   this.top + this.options.fromTop + this.elemHeight + this.options.fadeDistance;
		
		this.container.setStyles({'top': top_dist,'left':left+this.options.fromLeft,'display':'block', 'z-index':'110000'});		
		this.fx.start({'opacity':1, 'top':this.top + this.options.fromTop + this.elemHeight});	
		this.visible = 1;
	},
	
	hideToolTip: function(event){		
		new Event(event).stop();
		this.container.setStyles({'z-index':'100000'});
		this.fx.start({'opacity':0,'top': this.top + this.options.fromTop + this.elemHeight + this.options.fadeDistance});
		this.visible = 0;
	},
	
	createContainer: function(){
		this.container = new Element('div').set({'class':this.options.ToolTipClass}).setStyles({'position':'absolute','opacity':0,'display':'none','z-index':'100000'}).injectInside(document.body);
		this.header = new Element('div').set({'class':'top'});
		this.message = new Element('div').set({'class':'message'});
		this.footer = new Element('div').set({'class':'footer'});
		this.container.adopt(this.header, this.message, this.footer);		
	},
	
	/*debug function - sterge dupa terminare*/
	alert: function(message){
		$('debug').innerHTML += '<br>'+message;
	}
});