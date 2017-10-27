;(function(root, globalVariables) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register fadePager as an anonymous module
        define(globalVariables);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = globalVariables();
    } else {
        // Browser globals. Register component on window
        root.GlobalVariables = globalVariables();
    }
})(this, function() {
  'use strict';

  var GlobalVariables = function () {
    return {
      breakPoints: {
        medium: 768,
        large: 1024,
        xlarge: 1300,
      }
    };
  }

  return GlobalVariables;
});
