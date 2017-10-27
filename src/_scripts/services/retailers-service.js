;(function(root, retailersService) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register component as an anonymous module
        define(retailersService);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = retailersService();
    } else {
        // Browser globals. Register component on window
        root.RetailersService = retailersService();
    }
})(this, function() {
  'use strict';

  /*
    This is a mock products service to simulate loading a list of products from the backend.
  */
  var RetailersService = function() {

    var retailersEuropeLocations = require('../../_data/retailers-locations/europe.json');
    var mockData = {
      getRetailerLocations: [
        { lat: -25.363, lng: 131.044 },
        { lat: 55.676098, lng: 12.568337 },
        { lat: 48.864716, lng: 2.349014 }
      ],
      search: {
        locations: [
          { lat: 55.676098, lng: 12.568337 },
          { lat: 48.864716, lng: 2.349014 }
        ],
        markup: [
          '<div class="retailers-page__result"><h4 class="header-small l-col-pad"><strong>funen</strong></h4><div class="retailers"><div class="retailer l-col-pad text"><strong>Jens Schultz A/S</strong><div class="address"><p>Odensevej 116</p><p>5700</p><p>Denmark</p></div><div class="contact"><p>Phone</p><p>( +45 ) 72 17 01 38</p></div><div class="contact"><p>Fax</p><p>( +45 ) 72 17 01 39</p></div></div><div class="retailer l-col-pad text"><strong>Bygma Odense Vest</strong><div class="address"><p>Rughøjvej 11</p><p>5250 Odensen SV</p><p>Denmark</p></div><div class="contact"><p>Phone</p><p>( +45 ) 72 17 01 38</p></div><a href="mailto:odensenvest@bygma.com" class="email link link--underline">odensenvest@bygma.com</a></div><div class="retailer l-col-pad text"><strong>Jens Schultz A/S</strong><div class="address"><p>Odensevej 116</p><p>5700</p><p>Denmark</p></div><div class="contact"><p>Phone</p><p>( +45 ) 72 17 01 38</p></div><div class="contact"><p>Fax</p><p>( +45 ) 72 17 01 39</p></div></div><div class="retailer l-col-pad text"><strong>Jens Schultz A/S</strong><div class="address"><p>Odensevej 116</p><p>5700</p><p>Denmark</p></div><div class="contact"><p>Phone</p><p>( +45 ) 72 17 01 38</p></div><div class="contact"><p>Fax</p><p>( +45 ) 72 17 01 39</p></div></div><div class="retailer l-col-pad text"><strong>Jens Schultz A/S</strong><div class="address"><p>Odensevej 116</p><p>5700</p><p>Denmark</p></div><div class="contact"><p>Phone</p><p>( +45 ) 72 17 01 38</p></div><div class="contact"><p>Fax</p><p>( +45 ) 72 17 01 39</p></div></div></div></div>'
        ]
      }
    };

    /*
      Passes back a list of HTML elements to inject into the pagination list.
      The HTML elements returned in the list here will each be wrappen in a
      li by the pagination component.
    */
    this.search = function(query, onResponse) {
      if (Object.keys(query).length === 0) {
        return;
      }

      setTimeout(function () {
        if (onResponse) {
          var filteredLocations = filterRetailerLocations(query);

          onResponse({
            locations: filteredLocations,
            markup: [
              '<div class="retailers-page__result"><h4 class="header-small l-col-pad"><strong>funenasd</strong></h4><div class="retailers"><div class="retailer l-col-pad text"><strong>Jens Schultz A/S</strong><div class="address"><p>Odensevej 116</p><p>5700</p><p>Denmark</p></div><div class="contact"><p>Phone</p><p>( +45 ) 72 17 01 38</p></div><div class="contact"><p>Fax</p><p>( +45 ) 72 17 01 39</p></div></div><div class="retailer l-col-pad text"><strong>Bygma Odense Vest</strong><div class="address"><p>Rughøjvej 11</p><p>5250 Odensen SV</p><p>Denmark</p></div><div class="contact"><p>Phone</p><p>( +45 ) 72 17 01 38</p></div><a href="mailto:odensenvest@bygma.com" class="email link link--underline">odensenvest@bygma.com</a></div><div class="retailer l-col-pad text"><strong>Jens Schultz A/S</strong><div class="address"><p>Odensevej 116</p><p>5700</p><p>Denmark</p></div><div class="contact"><p>Phone</p><p>( +45 ) 72 17 01 38</p></div><div class="contact"><p>Fax</p><p>( +45 ) 72 17 01 39</p></div></div><div class="retailer l-col-pad text"><strong>Jens Schultz A/S</strong><div class="address"><p>Odensevej 116</p><p>5700</p><p>Denmark</p></div><div class="contact"><p>Phone</p><p>( +45 ) 72 17 01 38</p></div><div class="contact"><p>Fax</p><p>( +45 ) 72 17 01 39</p></div></div><div class="retailer l-col-pad text"><strong>Jens Schultz A/S</strong><div class="address"><p>Odensevej 116</p><p>5700</p><p>Denmark</p></div><div class="contact"><p>Phone</p><p>( +45 ) 72 17 01 38</p></div><div class="contact"><p>Fax</p><p>( +45 ) 72 17 01 39</p></div></div></div></div>'
            ]
          });
          // onResponse(mockData.search);
        }
      }, 400);
    };

    this.getRetailerLocations = function(onResponse) {
      setTimeout(function () {
        if (onResponse) {
          // onResponse(mockData.getRetailerLocations);
          onResponse(retailersEuropeLocations);
        }
      }, 3000);
    }

    var filterRetailerLocations = function(region) {
      var regions = [],
        countries = [],
        specific = [];
      for (var i in region) {
        if (!$.isEmptyObject(region[i])) {
          for (var j in region[i]) {
            if (!$.isEmptyObject(region[i][j])) {
              specific.push(region[i][j])
            } else {
              countries.push(j)
            }
          }
        } else {
          regions.push(i)
        }
      }
      console.log(regions, countries, specific)
      var locations = [];
      retailersEuropeLocations.forEach( function(retailer) {
        if (specific.length) {

        } else if (countries.length) {
          if (
            retailer
            && retailer.properties
            && countries.indexOf(retailer.properties.country.replace(/\s+/g, '-').toLowerCase()) > -1
          ) {
            locations.push(retailer)
          }
        } else if (regions.length) {
          if (
            retailer
            && retailer.properties
            && retailer.properties.region === regions[0]
          ) {
            locations.push(retailer)
          }
        }
      });
      return locations;
    }
  };

  return RetailersService;
});
