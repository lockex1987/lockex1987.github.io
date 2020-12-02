var LEIHAUOLI = LEIHAUOLI || {};


LEIHAUOLI.SWIPE_CAROUSEL = function ($base) {
	this.$base = $base;
	this.init();
}

LEIHAUOLI.SWIPE_CAROUSEL.prototype = {
	INDICATOR_CURRENT_CLASS : 'current',
	MOVE_TIME : 300,
	AUTO_MOVE_INTERVAL : 5000,
	THRESHOLD : 75,
	init : function(){
		this.setParameters();
		this.createIndicators();
		this.prepareToExecuteCarousel();
		this.bindEvent();
	},
	setParameters : function(){
		this.$window = $(window);
		this.$wrapper = this.$base.find('.jsc-carousel-container-wrapper');
		this.$container = this.$wrapper.find('.jsc-carousel-container');
		this.contentCount = this.$container.children().length;
		this.currentIndex = 1;
		this.$previous = this.$base.find('.jsc-previous-trigger');
		this.$next = this.$base.find('.jsc-next-trigger');
		this.$indicatorContainers = this.$base.find('.jsc-indicator-container');
		this.indicatorContainer = [];

		this.swipeOptions = {
			triggerOnTouchEnd : true,
			swipeStatus : $.proxy(this.swipeStatus, this),
			allowPageScroll : 'vertical',
			threshold : this.THRESHOLD
		};
	},
	createIndicators : function(){
		if(!this.$indicatorContainers.length){
			return;
		}

		var self = this;
		this.$indicatorContainers.each(function () {
			var $indicators = $(this).find('a');
			$indicators.eq(0).addClass(self.INDICATOR_CURRENT_CLASS);
			self.indicatorContainer.push($indicators);
		});
	},
	prepareToExecuteCarousel : function(){
		this.contentWidth = this.$wrapper.width();
		this.contentHeight = this.$container.height();
		var $lis = this.$container.children();
		$lis.width(this.contentWidth);
		$lis.height(this.contentHeight);
		this.$wrapper.height(this.contentHeight);
		this.$container.width(this.contentWidth * (this.contentCount + 2));
		this.$container.prepend($lis.eq(this.contentCount - 1).clone());
		this.$container.append($lis.eq(0).clone());
		this.scrollcontents(this.contentWidth, 0);
	},
	resetCarousel: function () {
		this.contentWidth = this.$wrapper.width();
		this.contentHeight = this.$container.height();
		var $lis = this.$container.children();
		$lis.width(this.contentWidth);
		$lis.height(this.contentHeight);
		this.$container.width(this.contentWidth * (this.contentCount + 2));
		this.finishToMove();
	},
	bindEvent : function(){
		var self = this;
		this.$window.on('resize', $.proxy(this.resetCarousel, this));
		this.$container.swipe(this.swipeOptions);
		this.$container.on('transitionend webkitTransitionEnd', $.proxy(this.finishToMove, this));

		if(this.$previous.length){
			this.$previous.on('click', $.proxy(this.moveToPrevious, this));
		}

		if(this.$next.length){
			this.$next.on('click', $.proxy(this.moveToNext, this));
		}

		for(var i = 0, len = this.indicatorContainer.length; i < len; i++){
			this.bindMoveByIndicator(this.indicatorContainer[i]);
		}

		// 自動でカルーセル動かす
		// this.setAutoMove();
	},
	bindMoveByIndicator: function ($bindTarget) {
		var self = this;
		$bindTarget.each(function(index){
			$(this).on('click', function(event){
				self.moveByIndicator(event, index + 1);
			});
		});
	},
	setAutoMove: function () {
		var self = this;
		setInterval(function () {
			self.moveToNext();
		},this.AUTO_MOVE_INTERVAL);
	},
	swipeStatus : function(event, phase, direction, distance){
		if(phase == 'move'){
			if(direction == 'left'){
				this.scrollcontents(this.contentWidth * this.currentIndex + distance, 0);
			}else if (direction == 'right'){
				this.scrollcontents(this.contentWidth * this.currentIndex - distance, 0);
			}
		}else if(phase == 'cancel'){
			this.scrollcontents(this.contentWidth * this.currentIndex, this.MOVE_TIME);
		}else if(phase == 'end'){
			if(direction == 'right'){
				this.moveToPrevious();
			}else if(direction == 'left'){
				this.moveToNext();
			}
		}
	},
	moveToPrevious : function(event){
		if(event){
			event.preventDefault();
		}
		this.currentIndex = Math.max(this.currentIndex - 1, 0);
		this.scrollcontents(this.contentWidth * this.currentIndex, this.MOVE_TIME);
	},
	moveToNext : function(event){
		if(event){
			event.preventDefault();
		}
		this.currentIndex = Math.min(this.currentIndex + 1, this.contentCount + 1);
		this.scrollcontents(this.contentWidth * this.currentIndex, this.MOVE_TIME);
	},
	moveByIndicator : function(event, index){
		event.preventDefault();
		
		this.currentIndex = index;
		this.scrollcontents(this.contentWidth * this.currentIndex, this.MOVE_TIME);
	},
	scrollcontents : function(distance, duration){
		this.$container.css('transition-duration', duration / 1000 + 's');
		this.$container.css('transform', 'translate3d(' + -distance + 'px, 0px, 0px)');
	},
	finishToMove : function(){
		if(this.currentIndex == 0){
			this.currentIndex = this.contentCount;
		}else if(this.currentIndex == this.contentCount + 1){
			this.currentIndex = 1;
		}
		this.scrollcontents(this.contentWidth * this.currentIndex, 0);

		for(var i = 0, len = this.indicatorContainer.length; i < len; i++){
			this.indicatorContainer[i].removeClass(this.INDICATOR_CURRENT_CLASS);
			this.indicatorContainer[i].eq(this.currentIndex - 1).addClass(this.INDICATOR_CURRENT_CLASS);
		}
	}
};

$(function(){
	$('.jsc-carousel-wrapper').each(function () {
		new LEIHAUOLI.SWIPE_CAROUSEL($(this));
	})
});