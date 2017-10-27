;(function(root, fullHeight) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register an anonymous module
        define(fullHeight);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = fullHeight();
    } else {
        // Browser globals. Register component on window
        root.FullHeight = fullHeight();
    }
})(this, function() {
  'use strict';

  var throttle = require('../vendor/lodash/function/throttle.js');

  /*
    Setting an element height to 100vh does not work in mobile and tablet
    browsers where the toolbar disappears when you scroll.
    Therefore this JS component to fix that.
  */
  var FullHeight = function($elem) {
    var $window = $(window);

    var measure = function () {
      var screenHeight = $window.height();

      $elem.each(function () {
        $(this).outerHeight(screenHeight);
        //$('.page-intro__layout').outerHeight($(window).height());
      });
    };
    var throttledMeasure = throttle(measure, 50, { leading: false });
    measure();

    $window.on('resize', throttledMeasure);
  };

  return FullHeight;
});
