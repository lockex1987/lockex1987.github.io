const MINI_PREVIEW_PREFIX = 'mini-preview';

/**
 * Khai báo thế này để nếu bị ghi đè thì báo lỗi luôn.
 */
const MiniPreview = function ($el, options) {
  this.$el = $el;
  this.options = $.extend({}, this.defaultOptions, options);
  this.counter = MiniPreview.prototype.sharedCounter++;
};

MiniPreview.prototype = {
  sharedCounter: 0,

  defaultOptions: {
    width: 256,
    height: 144,
    scale: .25,
    prefetch: 'pageload'
  },

  generate: function () {
    this.createElements();
    this.setPrefetch();
  },

  createElements: function () {
    let $wrapper = $('<div>', { class: MINI_PREVIEW_PREFIX + '-wrapper' });
    let $loading = $('<div>', { class: MINI_PREVIEW_PREFIX + '-loading' });
    let $frame = $('<iframe>', { class: MINI_PREVIEW_PREFIX + '-frame' });
    
    $wrapper.appendTo(this.$el).append($loading, $frame);

    // Sizing
    $wrapper.css({
      width: this.options.width + 'px',
      height: this.options.height + 'px'
    });

    // Scaling
    let inversePercent = 100 / this.options.scale;
    $frame.css({
      width: inversePercent + '%',
      height: inversePercent + '%',
      transform: 'scale(' + this.options.scale + ')'
    });

    // Positioning
    let fontSize = parseInt(this.$el.css('font-size').replace('px', ''), 10)
    let top = (this.$el.height() + fontSize) / 2;
    let left = (this.$el.width() - $wrapper.outerWidth()) / 2;
    $wrapper.css({
      top: top + 'px',
      left: left + 'px'
    });
  },

  setPrefetch: function () {
    switch (this.options.prefetch) {
      case 'pageload':
        this.loadPreview();
        break;
      case 'parenthover':
        this.$el.parent().one(
          this.getNamespacedEvent('mouseenter'),
          this.loadPreview.bind(this)
        );
        break;
      case 'none':
        this.$el.one(
          this.getNamespacedEvent('mouseenter'),
          this.loadPreview.bind(this)
        );
        break;
      default:
        throw 'Prefetch setting not recognized: ' + this.options.prefetch;
        break;
    }
  },

  loadPreview: function () {
    this.$el.find('.' + MINI_PREVIEW_PREFIX + '-frame')
      .attr('src', this.$el.attr('href'))
      .on('load', function () {
        // Some sites don't set their background color
        $(this).css('background-color', '#fff');
      });
  },

  getNamespacedEvent: function (event) {
    return event + '.' + MINI_PREVIEW_PREFIX + '_' + this.counter;
  },

  destroy: function () {
    this.$el.parent().off(this.getNamespacedEvent('mouseenter'));
    this.$el.off(this.getNamespacedEvent('mouseenter'));
    this.$el.find('.' + MINI_PREVIEW_PREFIX + '-wrapper').remove();
  }
};

(function ($) {
  // Implemented as a jQuery plugin
  $.fn.miniPreview = function (options) {
    return this.each(function () {
      let $this = $(this);

      // Xóa nếu đã có
      let miniPreview = $this.data(MINI_PREVIEW_PREFIX);
      if (miniPreview) {
        miniPreview.destroy();
      }

      // Khởi tạo
      miniPreview = new MiniPreview($this, options);
      miniPreview.generate();
      $this.data(MINI_PREVIEW_PREFIX, miniPreview);
    });
  };  
})(jQuery);


$(function () {
  // Attach mini-previews
  $('.mini-preview-pageload').miniPreview({ prefetch: 'pageload' });
  $('.mini-preview-parenthover').miniPreview({ prefetch: 'parenthover' });
  $('.mini-preview-none').miniPreview({ prefetch: 'none' });
});
