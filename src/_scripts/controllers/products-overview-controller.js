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

  var Pagination = require('../components/pagination.js');
  var Filter = require('../components/filter.js');
  var ProductsService = require('../services/products-service.js');
  var throttle = require('../vendor/lodash/function/throttle.js');
  var globalVariables = require('../components/global-variables.js');

  var ProductOverviewController = function($elem) {
    var productsService = new ProductsService();
    var globalVars = globalVariables();

    // Initialize pagination
    var $paginationElem = $elem.find('.pagination');
    var pagination = new Pagination($paginationElem, {
      load: productsService.load,
      getTotalCount: productsService.getTotalCount,
      pageSize: 24,
      onLoad: function (loadedItems) {
        // if the list is empty, hide the pagination--small
        if (!loadedItems || loadedItems.length === 0) {
          $paginationElem.css('display', 'none');
        } else {
          $paginationElem.css('display', 'flex');
        }
      }
    });

    // Initialize filter
    var $filter = $elem.find('.filter');
    var filter = new Filter($filter, {
      onChange: function (filterSelection) {
        console.log('filter state has been set to', filterSelection);
        productsService.setFilter(filterSelection);
        pagination.reload();
      }
    });

    $elem.find('.products-overview__grid-toggle').on('click', '[grid]', function () {

      $(this).siblings().removeClass('selected');
      $(this).addClass('selected');

      if ($(this).attr("grid") === 'small') {
        pagination.small();
      } else {
        pagination.large();
      }
    });

    var onResize = function () {
      if ($(window).outerWidth() >= globalVars.breakPoints.xlarge) {
        $elem.find('.products-overview__grid-toggle').find('[grid="small"]').addClass('selected').siblings().removeClass('selected');
        pagination.small();
      } else {
        $elem.find('.products-overview__grid-toggle').find('[grid="large"]').addClass('selected').siblings().removeClass('selected');
        pagination.large();
      }
    };
    onResize();
    var throttledOnResize = throttle(onResize, 50, { leading: false });
    $(window).on('resize', throttledOnResize);
  };

  return ProductOverviewController;
});
