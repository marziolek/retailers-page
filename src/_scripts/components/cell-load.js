;(function(root, cellLoad) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register fadePager as an anonymous module
        define(cellLoad);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = cellLoad();
    } else {
        // Browser globals. Register component on window
        root.CellLoad = cellLoad();
    }
})(this, function() {
  'use strict';

  var CellLoad = function($elem) {
    var $cellLoadOverlay = $elem.find('.cell-load__overlay');

    this.loadIn = function (onAnimationComplete) {
      //window.Tween.fromTo($cellLoadOverlay, 0.3, {xPercent: '0%'}, {xPercent: '-=100%', onComplete:onAnimationComplete});
      $cellLoadOverlay.css('right', 0);
      $cellLoadOverlay.css('left', 'auto');
      window.Tween.fromTo($cellLoadOverlay, 0.3, {width: '0%'}, {width: '100%', onComplete:onAnimationComplete});
    };

    this.loadOut = function () {
      //window.Tween.to($cellLoadOverlay, 0.3, {xPercent: '-=100%', clearProps:"xPercent"});
      $cellLoadOverlay.css('left', 0);
      $cellLoadOverlay.css('right', 'auto');
      window.Tween.to($cellLoadOverlay, 0.3, {width: '0%', clearProps:"width"});
    };
  };

  return CellLoad;
});
