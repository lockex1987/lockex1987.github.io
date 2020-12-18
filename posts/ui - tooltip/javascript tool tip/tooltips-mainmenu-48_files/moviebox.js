/* dm_moviebox.js v1.13

	a mootools based lightbox-type script for movie links
	and youtube content
	part of the (dm_) dutchmoney script library
	more information/downloads available at: http://lib.dutchmoney.com
	
	inspired by slimbox versions by christophe beyls (http://www.digitalia.be)
	and aaron newton (http://clientside.cnet.com/)
	
	revisions:
	
	1.10: fixed PC firefox closing bugs
	      added options for link colors
	      added support for mp4/youtube/wmv/partial asf
	      a few minor efficiency enhancements
	      added title support
	      added plugin detects/treat links normally if missing
	      renamed "dm_moviebox" from "dm_qtbox"
	      
	1.11: fixed error with IE image links
	
	1.12: added error handling to activeX checks
	      improved WMP detection on PC
	      IE6 scroll/positioning fixes
	      disabled quicktime cache (better performance with multiple links)
	      
	1.13: fixes to IE object destruction (audio kept playing)
	
	distributed under the MIT license, terms:
	copyright (c) 2007 dutchmoney llc
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

*/
var dm_moviebox = new Class({
	options: {
		fadelevel: 0.60,
		overlaycolor: '#000000',
		moviespcbg: '#000000',
		movieborder:'#1a1a1a',
		linkcolor: '#EFEFEF',
		linkovercolor: '#ffffff',
		textcolor: '#EFEFEF',
		showcontrols: 'false',
		title: '',
		// default to ntsc aspect ratio:
		boxwidth: 450,
		boxheight: 300,
		zindex: 1234
	},

	initialize: function(options){
		// set global state of moviebox (0 = uninitiated, 1 = hidden, 11 = visible)
		this.state = 0;
		this.plugins = 0;
		this.setOptions(options);
		this.showtitle = this.options.title;
		if (navigator.plugins && navigator.plugins.length) this.plugins = 1;
		// plugin/axo detection
		this.flashDetected = 0;
		this.qtDetected = 0;
		this.wmpDetected = 0;
		this.f4mDetected = 0;
		// flash detect
		if (this.plugins) {
			this.flashDetected = this.detectPluginOrAxo('Shockwave Flash');
		} else {
			this.flashDetected = this.detectPluginOrAxo('ShockwaveFlash.ShockwaveFlash');
		}
		// quicktime detect
		if (this.plugins) {
			this.qtDetected = this.detectPluginOrAxo('QuickTime');
		} else {
			this.qtDetected = this.detectPluginOrAxo('QuickTimeCheckObject.QuickTimeCheck');
		}
		// windows media player detect
		if (window.ie6 || window.ie7) {
			this.wmpDetected = 1;
		} else if (navigator.mimeTypes && navigator.mimeTypes.length) {
			if ( navigator.mimeTypes['video/x-ms-wmv'] && ( obj = navigator.mimeTypes['video/x-ms-wmv'].enabledPlugin )) {
				this.wmpDetected = 1;
			}
		}
		// flip4mac detect
		if (this.plugins) {
			this.f4mDetected = this.detectPluginOrAxo('Flip4Mac');
		}
		// add anchor listener event
		$$('a').addEvent('click', function(e){
			e = new Event(e);
			var thelink = $(e.target);
			// find the actual anchor that fired the event
			while (thelink.getTag() != 'a') {
				thelink = thelink.getParent();
			}
			if (thelink.getProperty('title')) {
				this.showtitle = thelink.getProperty('title');
			}
			thelink = thelink.href;
			if (thelink.toLowerCase().contains('.mov') || thelink.toLowerCase().contains('.mp4')) {
				if (!this.qtDetected) {
					return true;
				} else {
					this.movieType = 'qt';
					if (this.options.showcontrols == 'true') {
						this.renderboxheight = this.options.boxheight+16;
					} else {
						this.renderboxheight = this.options.boxheight;
					}
				}
			} else if (thelink.toLowerCase().contains('youtube.com/watch?v=')) {
				if (!this.flashDetected) {
					return true;
				} else {
					this.movieType = 'yt';
					this.renderboxheight = (this.options.boxwidth*0.75).round()+17;
				}
			} else if (thelink.toLowerCase().contains('video.google.com/videoplay?docid=')) {
				if (!this.flashDetected) {
					return true;
				} else {
					this.movieType = 'gv';
					this.renderboxheight = (this.options.boxwidth*0.75).round()+26;
				}
			} else if (thelink.toLowerCase().contains('.wmv') || thelink.toLowerCase().contains('.asf')) {
				if (!this.f4mDetected && !this.wmpDetected) {
					return true;
				} else {
					if (this.f4mDetected) {
						this.movieType = 'qt';
						if (this.options.showcontrols == 'true') {
							this.renderboxheight = this.options.boxheight+16;
						} else {
							this.renderboxheight = this.options.boxheight;
						}
					} else {
						if (thelink.toLowerCase().contains('.asf')) {
							if (navigator.plugins && navigator.plugins.length) {
								this.movieType = 'wmp';
								this.renderboxheight = this.options.boxheight+40;
							} else {
								return true;
							}
						} else {
							this.movieType = 'wmp';
							if (this.options.showcontrols == 'true' || (navigator.plugins && navigator.plugins.length)) {
								this.renderboxheight = this.options.boxheight+40;
							} else {
								this.renderboxheight = this.options.boxheight;
							}
						}
					}
				}
			}
			if (this.movieType) {
				this.movieurl = thelink;
				if (this.state == 0) {
					this.createDomElements();
					this.addEffects();
					this.addEvents();
					this.state = 1;
					this.showmoviebox();
				} else {
					this.showmoviebox();
					this.movieboxmoviespc.setStyle('margin-top','-'+(this.renderboxheight/2)+'px');
					this.movieboxcaptionspc.setStyle('margin-top',((this.renderboxheight/2)+13)+'px');
				}
				e.stop();
			}
		}.bind(this));
	},
	
	detectPluginOrAxo: function(searchNameStr) {
		var detected = false;
		if (navigator.plugins && navigator.plugins.length) {
			for (var i=0; i < navigator.plugins.length; i++ ) {
			 var currentPlugin = navigator.plugins[i];
			 if (currentPlugin.name.indexOf(searchNameStr) > -1) {
				detected = true;
				break;
			 }
		  }
		} else {
			try {
				axo = new ActiveXObject(searchNameStr);
			} catch(e) {
				axo = false;
			}
			if (axo) {
				if (searchNameStr.indexOf('QuickTime') > -1) {
					if (axo.IsQuickTimeAvailable(0)) {
						detected = 1;
					}
				} else {
					detected = 1;
				}
				axo = null;
			} 
		}
		return detected;
	},
	
	createDomElements: function() {
		this.movieboxspc = new Element('div', {
			'styles': {	
				'position': window.ie6 ? 'absolute' : 'fixed',
				'top': '0px',
				'left': '0px',
				'width': '100%',
				'height': '100%',
				'background': 'transparent',
				'z-index': this.options.zindex,
				'display': 'none'
			}
		}).injectInside(document.body);
		this.movieboxoverlay = new Element('div', {
			'styles': {	
				'position': 'absolute',
				'top': '0px',
				'left': '0px',
				'width': '100%',
				'height': '100%',
				'visibility': 'hidden',
				'background': this.options.overlaycolor,
				'z-index': '1'
			}
		}).injectInside(this.movieboxspc);
		this.movieboxmoviespc = new Element('div', {
			'styles': {
				'position': 'absolute',
				'top': '50%',
				'left': '50%',
				'margin-top': '-'+(this.renderboxheight/2)+'px',
				'margin-left': '-'+(this.options.boxwidth/2)+'px',
				'width': this.options.boxwidth+'px',
				'height': '1px',
				'background-color': this.options.moviespcbg,
				'border': '5px solid '+this.options.movieborder,
				'overflow': 'hidden',
				'visibility': 'hidden',
				'z-index': '10'
			}
		}).injectInside(this.movieboxspc);
		this.movieboxcaptionspc = new Element('div', {
			'styles': {
				'position': 'absolute',
				'top': '50%',
				'right': '50%',
				'margin-top': ((this.renderboxheight/2)+13)+'px',
				'margin-right': '-'+((this.options.boxwidth/2)+5)+'px',
				'background-color': 'transparent',
				'width': this.options.boxwidth,
				'height' : '12px',
				'text-align': 'right',
				'visibility': 'hidden',
				'z-index': '20'
			}
		}).injectInside(this.movieboxspc);
		this.movieboxtitle = new Element('p', {
			'styles': {
				'color': this.options.textcolor,
				'margin': '0 0 7px 0',
				'font-weight': 'bold',
				'display': 'none',
				'padding': '0',
				'z-index': '10'
			}
			
		}).injectInside(this.movieboxcaptionspc);
		this.movieboxcloselink = new Element('a', {
			'styles': {
				'color': this.options.linkcolor,
				'z-index': '15'
			},
			'events': {
				'mouseover': function(e){
					this.movieboxcloselink.setStyle('color',this.options.linkovercolor);
				}.bind(this),
				'mouseout': function(e){
					this.movieboxcloselink.setStyle('color',this.options.linkcolor);
				}.bind(this),
				'click': function(e){
					this.hidemoviebox();
					new Event(e).stop();
				}.bind(this)
			},
			'id':'closeb',
			'href': '#'
			
		}).setText('').injectInside(this.movieboxcaptionspc);
	},
	
	addEvents: function() {
		if (window.ie6) window.addEvent('scroll', this.fixIe6Fixed.bind(this));
		this.movieboxoverlay.addEvent('click', this.hidemoviebox.bind(this));
	},
	
	addEffects: function() {
		this.fxOverlay = new Fx.Style(this.movieboxoverlay, 'opacity', {duration: 250});
		this.fxOpenMovieSpc = new Fx.Style(this.movieboxmoviespc, 'height', {duration: 300});
	},
	
	showmoviebox: function() {
		// make sure moviebox is currently hidden
		if (this.state == 1) {
			this.movieboxspc.setStyle('display', 'block');
			if (window.ie6) this.fixIe6Fixed();
			this.fxOverlay.start(0,this.options.fadelevel).chain(function(){
				this.movieboxmoviespc.setStyle('visibility', 'visible');
				this.fxOpenMovieSpc.start(1,this.renderboxheight).chain(function(){
					if (this.showtitle != '') {
						this.movieboxtitle.setText(this.showtitle);
						this.movieboxtitle.setStyle('display', 'block');
					}
					this.movieboxcaptionspc.setStyle('margin-top', ((this.renderboxheight/2)+13)+'px');
					this.movieboxcaptionspc.setStyle('visibility', 'visible');
					this.addMovie();
				}.bind(this));
			}.bind(this));
			this.state = 11;
		}
	},
	
	addMovie: function() {
		if (this.movieType == 'qt') {
			// setHTML/innerHTML was used instead of a proper Element().injectInside() structure 
			// because of garbage-collection errors in firefox, and qt plugin incompatibility errors in ie6/7  
			if (navigator.plugins && navigator.plugins.length) {
				// getElementById is used instead of $() due to a garbage-collection issue with firefox
				this.movieboxmoviespc.innerHTML = '<object id="movieboxMovie" standby="loading quicktime..." type="video/quicktime" codebase="http://www.apple.com/qtactivex/qtplugin.cab" data="'+this.movieurl+'" width="'+this.options.boxwidth+'" height="'+this.renderboxheight+'"><param name="src" value="'+this.movieurl+'" /><param name="scale" value="aspect" /><param name="controller" value="'+this.options.showcontrols+'" /><param name="cache" value="false" /><param name="autoplay" value="true" /><param name="bgcolor" value="'+this.options.moviespcbg+'" /><param name="enablejavascript" value="true" /></object>';
				this.currentMovie = document.getElementById('movieboxMovie');
			} else {
				// use innerHTML for IE to skip the 'click to activate' before movie plays
				// getElementById is used instead of $() due to a plugin-related script error in ie
				this.movieboxmoviespc.innerHTML = '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" standby="loading quicktime..." codebase="http://www.apple.com/qtactivex/qtplugin.cab" width="'+this.options.boxwidth+'" height="'+this.renderboxheight+'" id="movieboxMovie"><param name="src" value="'+this.movieurl+'" /><param name="scale" value="aspect" /><param name="controller" value="'+this.options.showcontrols+'" /><param name="cache" value="false" /><param name="autoplay" value="true" /><param name="bgcolor" value="'+this.options.moviespcbg+'" /><param name="enablejavascript" value="true" /></object>';
				this.currentMovie = document.getElementById('movieboxMovie');
			}
		} else if (this.movieType == 'yt') {
			var ytObjStr = this.movieurl.replace(/watch\?v\=/i,'v/');
			if (ytObjStr.indexOf('&') > -1) {
				ytObjStr = ytObjStr.substr(0,ytObjStr.indexOf('&'));
			}
			ytObjStr = ytObjStr+'&amp;autoplay=1';
			this.movieboxmoviespc.innerHTML = '<object id="movieboxMovie" standby="loading youtube video..." type="application/x-shockwave-flash" width="'+this.options.boxwidth+'" height="'+this.renderboxheight+'" data="'+ytObjStr+'"><param name="movie" value="'+ytObjStr+'" /><param name="bgcolor" value="'+this.options.moviespcbg+'" /></object>';
			this.currentMovie = document.getElementById('movieboxMovie');
		} else if (this.movieType == 'gv') {
			var gvObjStr = this.movieurl.replace(/videoplay/i,'googleplayer.swf');
			if (gvObjStr.indexOf('&') > -1) {
				gvObjStr = gvObjStr.substr(0,gvObjStr.indexOf('&'));
			}
			this.movieboxmoviespc.innerHTML = '<object id="movieboxMovie" standby="loading google video..." type="application/x-shockwave-flash" width="'+this.options.boxwidth+'" height="'+this.renderboxheight+'" data="'+gvObjStr+'"><param name="movie" value="'+gvObjStr+'" /><param name="bgcolor" value="'+this.options.moviespcbg+'" /><param name="FlashVars" value="playerMode=embedded&autoplay=true&loop=false" /></object>';
			this.currentMovie = document.getElementById('movieboxMovie');
		} else if (this.movieType == 'wmp') {
			if (navigator.plugins && navigator.plugins.length) {
				this.movieboxmoviespc.innerHTML ='<object id="movieboxMovie" standby="loading windows media..." type="video/x-ms-wmv" data="'+this.movieurl+'" width="'+this.options.boxwidth+'" height="'+this.renderboxheight+'" /><param name="src" value="'+this.movieurl+'" /><param name="autoStart" value="true" /></object>';
				this.currentMovie = document.getElementById('movieboxMovie');
			} else {
				this.movieboxmoviespc.innerHTML = '<object id="movieboxMovie" standby="loading windows media..." classid="CLSID:22D6f312-B0F6-11D0-94AB-0080C74C7E95" type="video/x-ms-wmv" data="'+this.movieurl+'" width="'+this.options.boxwidth+'" height="'+this.renderboxheight+'" /><param name="filename" value="'+this.movieurl+'" /><param name="showcontrols" value="'+this.options.showcontrols+'"><param name="autoStart" value="true" /><param name="stretchToFit" value="true" /></object>';
				this.currentMovie = document.getElementById('movieboxMovie');
			}
		}
	},
	
	hidemoviebox: function() {
		// make sure moviebox is currently visible
		if (this.state == 11) {
			if (this.movieType == 'qt' && window.webkit) {
				// safari needs to call Stop() to remove the object's audio stream...
				this.currentMovie.Stop();	
			}
			// start cleanup
			//this.currentMovie.style.display = 'none';
			this.currentMovie.parentNode.removeChild(this.currentMovie);
			//this.movieboxmoviespc.empty();
			this.currentMovie = Class.empty;
			this.movieType = false;
			if (this.showtitle != '') {
				this.showtitle = '';
				this.movieboxtitle.setText('');
				this.movieboxtitle.setStyle('display', 'none');
			}
			this.fxOverlay.start(this.options.fadelevel,0).chain(function(){
				this.movieboxspc.setStyle('display', 'none');
				this.movieboxcloselink.setStyle('color',this.options.linkcolor);
				this.movieboxcaptionspc.setStyle('visibility', 'hidden');
				this.movieboxoverlay.setStyle('visibility', 'hidden');
				this.movieboxmoviespc.setStyle('visibility', 'hidden');
				this.movieboxmoviespc.setStyle('height', '1px');
			}.bind(this));
			this.state = 1;
		}
	},
	
	fixIe6Fixed: function() {
		// keeps the overlay in place on ie6, simulating proper position:fixed behaviour (well as close as possible...)
		if (this.state > 0) {
			this.movieboxspc.setStyles({
				'top': window.getScrollTop()+'px',
				'left': window.getScrollLeft()+'px',
				'height': window.getHeight()+'px'
			});
		}
	}
});
dm_moviebox.implement(new Options, new Events);
window.addEvent('domready', function(){
	new dm_moviebox();
});