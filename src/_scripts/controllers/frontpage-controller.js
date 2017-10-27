;(function(root, frontpageController) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register component as an anonymous module
        define(frontpageController);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = frontpageController();
    } else {
        // Browser globals. Register component on window
        root.FrontpageController = frontpageController();
    }
})(this, function() {
  'use strict';

  var StateService = require('../services/state.js');

  var FrontpageController = function($elem) {
    var $pageLoadSplash = $('.page-load-splash');
    var $barbaWrapper = $('#barba-wrapper');
    var stateService = new StateService();
    var state = stateService.getState();

    var onAnimationInComplete = function () {
      $pageLoadSplash.removeClass('page-load-splash--logo-bot');
    };

    var onAnimationOutComplete = function () {
      animateIn();
    };

    var animateIn = function () {
      $barbaWrapper.css('position', 'relative');
      window.Tween.to($pageLoadSplash, 0.6, {width: '0%', onComplete:onAnimationInComplete});
    };

    var animateOut = function () {
      $barbaWrapper.css('position', 'fixed');
      $pageLoadSplash.css('z-index', '2');
      Tween.to($elem, 1, {width: '0%', onComplete:onAnimationOutComplete});
    };

    // If the frontpage is the first page to be visited, display the frontpage load animation
    if (state.firstPageLoad) {
      $pageLoadSplash.addClass('page-load-splash--logo-bot');
      animateOut();
    } else {
      // Else hide the frontpage splash
      $elem.hide();
    }
  };

  return FrontpageController;
});
