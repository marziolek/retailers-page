;(function(root, brochure) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register fadePager as an anonymous module
        define(brochure);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = brochure();
    } else {
        // Browser globals. Register component on window
        root.Brochure = brochure();
    }
})(this, function() {
  'use strict';

  var StateService = require('../services/state.js');

  var Brochure = function($elem) {
    var stateService = new StateService();
    //var $brochure = $elem.find('.brochure');
    var $count = $elem.find('.brochure__count');

    var updateCount = function () {
      var state = stateService.getState();
      if (!state.catalogue || state.catalogue.length === 0) {
        $count.hide();
      } else {
        $count.text('( ' + state.catalogue.length + ' )');
        $count.css('display', 'inline-block');
        setTimeout(function () {
          $elem.addClass('blink');
        }, 1);
        setTimeout(function () {
          $elem.removeClass('blink');
        }, 600);
      }
    };

    window.PubSub.subscribe('brochure:do-update', updateCount);
    //updateCount();
  };

  return Brochure;
});
