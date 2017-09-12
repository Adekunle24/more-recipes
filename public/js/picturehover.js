/**
 * Created by lenovo on 2016/5/13.
 */

(function ($, window, document) {
  const defaults = {
    target: 'img',
    caption: 'title',
    duration: 'fast',
    fontColor: '#fff',
    textAlign: 'center',
    verticalMiddle: true,
    backgroundColor: 'rgba(0,0,0,.7)',
    height: '100%'
  };

  function Picturehover(ele, options) {
    this.element = ele;
    this.settings = $.extend({}, defaults, options);
    this.init();
  }

  Picturehover.prototype = {

    init() {
      let that = this,
        target = this.settings.target;

      $(this.element).off('mouseenter.hover', target).on('mouseenter.hover', target, function () {
        let $ele = $(this),
          $container = that.createContainer($ele);
        $container.on('mouseenter.hover mouseleave.hover', function (event) {
          if (event.type === 'mouseenter') {
            let $over = $container.find('.hover-over');
            if (!$over.length) {
              $over = that.createOver(that, $ele);

              $(this).html($over);
            }
            that.slideIn(that, $over, $ele);
          } else {
            that.removeOver(that, $(this), $ele);
          }
        });
      });
    },
    createContainer($ele) {
      let top = $ele.offset().top,
        left = $ele.offset().left,
        width = $ele.outerWidth(),
        height = $ele.outerHeight();

      const Container = $('<div>', {
        class: 'hover-container'
      }).css({
        width,
        height,
        position: 'absolute',
        top,
        left,
        borderRadius: $ele.css('border-radius'),
        zIndex: 999,
        overflow: 'hidden'
      });

      $('body').append(Container);

      return Container;
    },
    createOver(instance, $ele) {
      let content;

      let left = 0,
        bottom = '-100%';

      if (instance.settings.verticalMiddle) {
        content = $('<div>').css({
          display: 'table-cell',
          verticalAlign: 'middle'
        }).html($ele.attr(instance.settings.caption));
      } else {
        content = $ele.attr(instance.settings.caption);
      }
      $over = $('<div>', {
        class: 'hover-over'
      }).css({
        width: '100%',
        height: instance.settings.height,
        position: 'absolute',
        left,
        bottom,
        display: instance.settings.verticalMiddle ? 'table' : 'inline',
        textAlign: instance.settings.textAlign,
        color: instance.settings.fontColor,
        background: instance.settings.backgroundColor
      }).html(content);

      return $over;
    },
    slideIn(instance, $over, $ele) {
      $over.stop().animate({
        left: 0,
        bottom: 0
      }, instance.settings.duration, () => {
        $(instance.element).trigger('slideInEnd', $ele.index());
      });
    },
    removeOver(instance, $container, $ele) {
      const $over = $container.find('.hover-over');
      const dest = {
        left: 0,
        bottom: '-100%'
      };
      $over.stop().animate(dest, instance.settings.duration, () => {
        $container.remove();
        $(instance.element).trigger('slideOutEnd', $ele.index());
      });
    }

  };


  $.fn.picturehover = function (options) {
    this.each(function () {
      if (!$.data(this, 'picturehover')) {
        $.data(this, 'picturehover', new Picturehover(this, options));
      }
    });
    return this;
  };

  $(() => {
    $('[data-picturehover]').picturehover();
  });
}(jQuery, window, document));
