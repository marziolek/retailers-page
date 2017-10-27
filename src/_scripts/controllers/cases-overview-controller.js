;(function(root, productOverviewController) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register component as an anonymous module
        define(productOverviewController);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = productOverviewController();
    } else {
        // Browser globals. Register component on window
        root.ProductOverviewController = productOverviewController();
    }
})(this, function() {
  'use strict';

  var Filter = require('../components/filter.js');
  var CasesService = require('../services/cases-service.js');

  var ProductOverviewController = function($elem) {
    var casesService = new CasesService();

    var $fancyGrid = $elem.find('.l-fancy-grid');

    // Initialize filter
    var $filter = $elem.find('.filter');
    var filter = new Filter($filter, {
      onChange: function (filterSelection) {

        if (Object.keys(filterSelection).length === 0) {
          return;
        }

        casesService.load(filterSelection, function (data) {
          console.log('loaded cases data', data);
          $fancyGrid.children().remove();
          $fancyGrid.append(data);
        });
      }
    });
  };

  return ProductOverviewController;
});
