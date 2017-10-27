;(function(root, shiftSlider) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register fadePager as an anonymous module
        define(shiftSlider);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = shiftSlider();
    } else {
        // Browser globals. Register component on window
        root.ShiftSlider = shiftSlider();
    }
})(this, function() {
  'use strict';

  var CellLoad = require('./cell-load.js');

  /*
    The Shift slider will look
  */
  var ShiftSlider = function($elem) {
    //console.log('shift slider');
    var $cells = $elem.find('.shift-slider__cell');
    var visibleIndex = 0;
    var data = [];
    var self = this;
    var stickCount = 1; // this will make the first item in the data stick so it does not move when you shift cells.
    var visibleRange = $cells.length - stickCount;
    var cellLoad = new CellLoad($cells);
    var cellLoadNonSticky = new CellLoad($cells.slice(stickCount));

    /*
      Redraws the content of each cell
    */
    var redrawCells = function (skipSticky) {
      if (data === null) {
        $cells.each(function () {
          $(this).find('.shift-slider__cell-content').children().remove();
        });
        return;
      }
      $cells.each(function (i) {
        if (i < stickCount && skipSticky) {
          return;
        }
        var $content = $(data[visibleIndex + i])
        $(this).find('.shift-slider__cell-content').html($content.clone());
      });

      visibleIndex === 0 ? $elem.find('.shift-slider__prev').addClass('inactive') : $elem.find('.shift-slider__prev').removeClass('inactive');
      visibleIndex >= (data.length - visibleRange - stickCount) ? $elem.find('.shift-slider__next').addClass('inactive') : $elem.find('.shift-slider__next').removeClass('inactive');
    };

    /*
      Waits with redrawing the cells untill an overlay has been animation in
    */
    var animatedRedraw = function (skipSticky) {
      var $cellsLoad = $cells.find('.shift-slider__cell-load');

      var completeHandler = function () {
        redrawCells(skipSticky);
        //cellLoad.loadOut();
        skipSticky ? cellLoadNonSticky.loadOut() : cellLoad.loadOut();
      };
      skipSticky ? cellLoadNonSticky.loadIn(completeHandler) : cellLoad.loadIn(completeHandler);
    };

    /*
      Changes the content of the shift slider
      _data: is a list of DOM elements that will be copied into the cells
    */
    this.setData = function(_data, animate) {
      //console.log('shift slider setData', _data);
      data = _data;
      visibleIndex = 0;
      if (animate) {
        animatedRedraw(false);
      } else {
        redrawCells();
      }
    };

    this.clearData = function () {
      data = null;
      redrawCells();
    };

    /*
      Changes visible content 1 higher in the array
    */
    this.shiftRight = function () {
      //console.log('shiftRight');
      var newVisibleIndex = Math.min(data.length - visibleRange - stickCount, visibleIndex + 1);

      if (newVisibleIndex !== visibleIndex) {
        visibleIndex = newVisibleIndex;
        animatedRedraw(true);
      }
    };

    /*
      Changes visible content 1 lower in the array
    */
    this.shiftLeft = function () {
      //console.log('shiftLeft');
      var newVisibleIndex = Math.max(0, visibleIndex - 1);

      if (newVisibleIndex !== visibleIndex) {
        visibleIndex = newVisibleIndex;
        animatedRedraw(true);
      }
    };

    var initialize = function () {
      // Load data
      self.setData($elem.find('.shift-slider__slides > *'));
    };
    initialize();
  };

  return ShiftSlider;
});
