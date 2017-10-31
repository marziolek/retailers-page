;(function(root, retailersController) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register component as an anonymous module
        define(retailersController);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = retailersController();
    } else {
        // Browser globals. Register component on window
        root.RetailersController = retailersController();
    }
})(this, function() {
  'use strict';

  var Filter = require('../components/filter.js');
  var GoogleMaps = require('../components/google-maps.js');
  var RetailersService = require('../services/retailers-service.js');

  var RetailersController = function($elem) {
    var retailersService = new RetailersService();
    var googleMaps;
    var $search = $elem.find('.retailers-page__search');
    var $results = $elem.find('.retailers-page__results');

    // Initialize filters list
    retailersService.prepareFilters();

    // Initialize filter
    var $filter = $elem.find('.filter');
    var filter = new Filter($filter, {
      onChange: function (filterSelection) {
        // When the filter changes, fetch matching retailers from the backend.
        retailersService.search(filterSelection, function (data) {
          // add loaded items to DOM
          $results.children().remove();
          $results.append(data.markup);

          data.markup.length > 0 ? $search.css('display', 'block') : $search.hide();

          // add loaded locations to the map
          console.log(googleMaps)
          googleMaps.setLocations(data.locations);
        });
      }
    });


    // When the Google Map has been initialized fetch all retailer locations and add them to the map
    var onGoogleMapsInit = function () {
      retailersService.getRetailerLocations(function (locations) {
        googleMaps.setLocations(locations);
      });
    };

    // Not sure where the start location is, but I have set Copenhagen for now.
    var copenhagen = { lat: 55.676098, lng: 12.568337 };
    googleMaps = new GoogleMaps($elem.find('.retailers-page__gmaps'), $elem.find('#google-maps-api'), {
      center: copenhagen,
      onInit: onGoogleMapsInit
    });
  };

  return RetailersController;
});
