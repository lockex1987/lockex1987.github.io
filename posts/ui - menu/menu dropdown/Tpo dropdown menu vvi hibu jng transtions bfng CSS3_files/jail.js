(function(a,c){var b=c(jQuery),d=typeof define==="function"&&define.amd;if(d){define(a,["jquery"],b)}else{(this.jQuery||this.$||this)[a]=b}}("jail",function(f){var b=f(window),d={id:"jail",timeout:1,effect:false,speed:400,triggerElement:null,offset:0,event:"load",callback:null,callbackAfterEachImage:null,placeholder:false,loadHiddenImages:false},k=[],g=false;f.jail=function(n,p){var q=n||{},o=f.extend({},d,p);f.jail.prototype.init(q,o);if(/^(load|scroll)/.test(o.event)){f.jail.prototype.later.call(q,o)}else{f.jail.prototype.onEvent.call(q,o)}};f.jail.prototype.init=function(o,n){o.data("triggerElem",(n.triggerElement)?f(n.triggerElement):b);if(!!n.placeholder){o.each(function(){f(this).attr("src",n.placeholder)})}};f.jail.prototype.onEvent=function(o){var n=this;if(!!o.triggerElement){i(o,n)}else{n.on(o.event+"."+o.id,{options:o,images:n},function(s){var r=f(this),q=s.data.options,p=s.data.images;k=f.extend({},p);a(q,r);f(s.currentTarget).unbind(s.type+"."+q.id)})}};f.jail.prototype.later=function(o){var n=this;setTimeout(function(){k=f.extend({},n);n.each(function(){c(o,this,n)});o.event="scroll";i(o,n)},o.timeout)};function i(o,n){var p=false;if(!!n){p=n.data("triggerElem")}if(!!p&&typeof p.on==="function"){p.on(o.event+"."+o.id,{options:o,images:n},m);b.on("resize."+o.id,{options:o,images:n},m)}}function j(n){var o=0;if(n.length===0){return}while(true){if(o===n.length){break}else{if(f(n[o]).attr("data-src")){o++}else{n.splice(o,1)}}}}function m(p){var n=p.data.images,o=p.data.options;n.data("poller",setTimeout(function(){k=f.extend({},n);j(k);f(k).each(function(){if(this===window){return}c(o,this,k)});if(l(k)){f(p.currentTarget).unbind(p.type+"."+o.id);return}else{if(o.event!=="scroll"){var q=(/scroll/i.test(o.event))?n.data("triggerElem"):b;o.event="scroll";n.data("triggerElem",q);i(o,f(k))}}},o.timeout))}function l(n){var o=true;f(n).each(function(){if(!!f(this).attr("data-src")){o=false}});return o}function c(q,s,o){var r=f(s),p=(/scroll/i.test(q.event))?o.data("triggerElem"):b,n=true;if(!q.loadHiddenImages){n=h(r,p,q)&&r.is(":visible")}if(n&&e(p,r,q.offset)){a(q,r)}}function e(u,n,s){var q=u[0]===window,y=(q?{top:0,left:0}:u.offset()),r=y.top+(q?u.scrollTop():0),t=y.left+(q?u.scrollLeft():0),p=t+u.width(),v=r+u.height(),x=n.offset(),w=n.width(),o=n.height();return(r-s)<=(x.top+o)&&(v+s)>=x.top&&(t-s)<=(x.left+w)&&(p+s)>=x.left}function a(o,p){var n=new Image();n.onload=function(){p.hide().attr("src",n.src);p.removeAttr("data-src");if(o.effect){if(o.speed){p[o.effect](o.speed)}else{p[o.effect]()}p.css("opacity",1);p.show()}else{p.show()}j(k);if(!!o.callbackAfterEachImage){o.callbackAfterEachImage.call(this,p,o)}if(l(k)&&!!o.callback&&!g){o.callback.call(f.jail,o);g=true}};n.onerror=function(){if(!("error" in o)){return}var q=Array.prototype.slice.call(arguments,0);q=[p,o].concat(q);o.error.apply(f.jail,q)};n.src=p.attr("data-src")}function h(q,o,p){var r=q.parent(),n=true;while(r.length&&r.get(0).nodeName.toUpperCase()!=="BODY"){if(r.css("overflow")==="hidden"){if(!e(r,q,p.offset)){n=false;break}}else{if(r.css("overflow")==="scroll"){if(!e(r,q,p.offset)){n=false;f(k).data("triggerElem",r);p.event="scroll";i(p,f(k));break}}}if(r.css("visibility")==="hidden"||q.css("visibility")==="hidden"){n=false;break}if(o!==b&&r===o){break}r=r.parent()}return n}f.fn.jail=function(n){new f.jail(this,n);k=[];return this};return f.jail}));