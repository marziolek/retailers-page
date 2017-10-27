;(function(root, catalogueController) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register component as an anonymous module
        define(catalogueController);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = catalogueController();
    } else {
        // Browser globals. Register component on window
        root.CatalogueController = catalogueController();
    }
})(this, function() {
  'use strict';

  var StateService = require('../services/state.js');

  var CatalogueController = function($elem) {
    var stateService = new StateService();
    var state = stateService.getState();

    var $noProducts = $elem.find('.catalogue-page__no-products');
    var $products = $elem.find('.catalogue-page__products');
    var $request = $elem.find('.catalogue-page__request');

    // If there are products in the catalogue, hide the "no products" content or vice versa.
    if (state.catalogue && state.catalogue.length) {
      $products.show();
      $request.show();
    } else {
      $noProducts.show();
    }

    // When clicking delete on a product, remove it from the page DOM and from the state
    $products.find('.product').each(function () {
      var $this = $(this);
      $this.on('click', '.delete', function () {
        // TODO: Thomas needs to remove the product from the state.
        $this.remove();
      });
    })
  };

  return CatalogueController;
});
