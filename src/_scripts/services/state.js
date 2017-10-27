;(function(root, stateService) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register component as an anonymous module
        define(stateService);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = stateService();
    } else {
        // Browser globals. Register component on window
        root.StateService = stateService();
    }
})(this, function() {
  'use strict';

  /*
    This is a mock state service to simulate state that is saved across pages.
    This is not necessarily how it should be handled in the actual implementation,
    but is just to make frontend deliverable make sense.
  */
  var StateService = function($elem) {
    window.mockState = window.mockState || {};

    this.getState = function () {
      return window.mockState;
    };
  };

  return StateService;
});
