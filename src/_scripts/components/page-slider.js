;(function(root, pageSlider) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register fadePager as an anonymous module
        define(pageSlider);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = pageSlider();
    } else {
        // Browser globals. Register component on window
        root.PageSlider = pageSlider();
    }
})(this, function() {
  'use strict';

  var CellLoad = require('./cell-load.js');

  /*
    The Shift slider will look
  */
  var PageSlider = function($elem) {
    //console.log('shift slider');
    var $slides = $elem.find('.page-slider__slide');
    var $indicators = $elem.find('.page-slider__indicators > *');
    var $captions = $elem.find('.page-slider__captions li');
    var index = 0;
    var cellLoad = new CellLoad($elem);
    var self = this;

    var changeSlide = function (to) {
      if (to === index) {
        return;
      }

      var completeHandler = function () {
        $slides.removeClass('active');
        $($slides[to]).addClass('active');
        index = to;
        cellLoad.loadOut();

        $indicators.removeClass('active');
        $($indicators[index]).addClass('active');
        $captions.removeClass('active');
        $($captions[index]).addClass('active');
      };
      cellLoad.loadIn(completeHandler);
    };

    this.next = function () {
      changeSlide(Math.min(index + 1, $slides.length));
    };

    this.prev = function () {
      changeSlide(Math.max(index - 1, $slides.length));
    };

    this.goToIndex = function (i) {
      changeSlide(i);
    };

    var initialize = function () {
      $slides.first().addClass('active');
      $indicators.first().addClass('active');
      $captions.first().addClass('active');

      $indicators.each(function (i) {
        $(this).click(function () {
          self.goToIndex(i);
        });
      })
    };
    initialize();
  };

  return PageSlider;
});
