;(function(root, scrollSticker) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register fadePager as an anonymous module
        define(scrollSticker);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = scrollSticker();
    } else {
        // Browser globals. Register component on window
        root.ScrollSticker = scrollSticker();
    }
})(this, function() {
  'use strict';

  var throttle = require('../vendor/lodash/function/throttle.js');
  var globalVariables = require('./global-variables.js');

  var ScrollSticker = function($elem, options) {
    var initialPosition = 0;
    var targetTop = 0;
    var maxTranslation = 0;
    var $window = $(window);
    var globalVars = globalVariables();
    var isSticking = false;
    var width = 0;
    var right = 0;

    /*var onScroll = function () {
      var translation = 0;
      // Determine if the top of the window has scroll passed initialPosition of the $elem
      if ($window.scrollTop() > initialPosition && $(window).outerWidth() >= globalVars.breakPoints.large) {
        // If so move the $elem to align with the top of the window
        // the $elem can be moved at a maximum to the top of the target.
        translation = Math.min($window.scrollTop() - initialPosition, maxTranslation);
      } else {
        translation = 0;
      }

      $elem.css('transform', 'translateY(' + translation + 'px)');
    };*/

    var removeSticky = function () {
      $elem.css('transform', 'none');
      $elem.css('position', 'relative');
      $elem.css('width', 'auto');
      $elem.css('right', 0);
      $elem.css('top', 0);
      $elem.removeClass('sticky');
    };

    var onScroll = function () {
      if ($(window).outerWidth() < globalVars.breakPoints.large) {
        removeSticky();
        return;
      }

      if ($window.scrollTop() > targetTop ) {
        removeSticky();
        $elem.css('transform', 'translateY(' + maxTranslation + 'px)');
      } else if ($window.scrollTop() > initialPosition ) {
        $elem.css('transform', 'none');
        $elem.css('position', 'fixed');
        $elem.css('width', width);
        $elem.css('right', right);
        $elem.css('top', 0);
        $elem.addClass('sticky');
      } else {
        removeSticky();
      }
    }
    //var throttledOnScroll = throttle(onScroll, 10, { leading: false });

    var onResize = function () {
      // recalculate the initialPosition and targetTop.
      // This is done in the resize event handler to
      // have as little computation as possible in the on scroll handler.
      targetTop = options.target[0].getBoundingClientRect().top;
      initialPosition = $elem[0].getBoundingClientRect().top;
      maxTranslation = targetTop - initialPosition;
      width = $elem.parent().width() - 1;
      right = $(window).width() - $elem[0].getBoundingClientRect().right + 1;
    };
    var throttledOnResize = throttle(onResize, 100, { leading: false });

    var initialize = function () {
      $(window).on('scroll', onScroll);
      $(window).on('resize', throttledOnResize);
      onResize();
      onScroll();
    };
    initialize();
  };

  return ScrollSticker;
});
