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
    var _ = require('lodash');
    var retailersEuropeLocations = require('../../_data/retailers-locations/locations.json');
    // var retailersEuropeLocations = require('../../_data/retailers-locations/new.json');
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
          var filteredLocations = filterRetailerLocations(query),
            markup = [''];

          markup = prepareMarkup(filteredLocations);

          onResponse({
            locations: filteredLocations,
            markup: markup
          });
          // onResponse(mockData.search);
        }
      });
    };

    this.getRetailerLocations = function(onResponse) {
      setTimeout(function () {
        if (onResponse) {
          onResponse(retailersEuropeLocations);
        }
      });
    }

    var filteredRegions = [],
      filteredCountries = [],
      filteredSpecific = [];
    var filterRetailerLocations = function(region) {
      filteredRegions = [];
      filteredCountries = [];
      filteredSpecific = [];
      for (var i in region) {
        if (!$.isEmptyObject(region[i])) {
          for (var j in region[i]) {
            if (!$.isEmptyObject(region[i][j])) {
              filteredSpecific = Object.keys(region[i][j])
            } else {
              filteredCountries.push(j)
            }
          }
        } else {
          filteredRegions.push(i)
        }
      }
      console.log(filteredRegions, filteredCountries, filteredSpecific)
      var locations = [];
      retailersEuropeLocations.forEach( function(retailer) {
        if (filteredSpecific.length) {
          if (
            retailer
            && retailer.properties
            && filteredSpecific.indexOf(retailer.properties.city) > -1
          ) {
            locations.push(retailer)
          }
        } else if (filteredCountries.length) {
          if (
            retailer
            && retailer.properties
            && filteredCountries.indexOf(retailer.properties.country) > -1
          ) {
            locations.push(retailer)
          }
        } else if (filteredRegions.length) {
          if (
            retailer
            && retailer.properties
            && retailer.properties.region === filteredRegions[0]
          ) {
            locations.push(retailer)
          }
        }
      });
      return locations;
    }

    var prepareMarkup = function(locations) {
      var title = ''
      if (filteredSpecific.length) {
        title = filteredSpecific.join(', ').replace('-', ' ')
      } else if (filteredCountries.length) {
        title = filteredCountries.join(', ').replace('-', ' ')
      } else if (filteredRegions.length) {
        title = filteredRegions[0];
        if (title === 'nordic-east-eu') {
          title = 'nordic &amp; east europe'
        } else if (title === 'asia-pacific') {
          title = 'asia &amp; pacific'
        }
      }
      var markup = '<div class="retailers-page__result"><h4 class="header-small l-col-pad"><strong>' + title + '</strong></h4><div class="retailers">';
      locations.forEach( function(location) {
        markup += '<div class="retailer l-col-pad text"><strong>' + location.properties.name + '</strong>';
        markup += '<div class="address"><p>' + location.properties.address + '</p>';
        if (location.properties.address2) {
          markup += '<p>' + location.properties.address2 + '</p>'
        }
        markup += '<p>' + location.properties.postal + ' ' + location.properties.city + '</p>';
        markup += '<p>' + location.properties.country + '</p></div>';
        if (location.properties.phone) {
          markup += '<div class="contact"><p>Phone</p><p>' + location.properties.phone + '</p></div>'
        }
        if (location.properties.fax) {
          markup += '<div class="contact"><p>Fax</p><p>' + location.properties.fax + '</p></div>'
        }
        if (location.properties.email) {
          markup += '<a href="mailto:' + location.properties.email + '" class="email link link--underline">' + location.properties.email + '</a>';
        }
        markup += '</div>';
      });
      markup += '</div></div>';
      return [markup]
    }

    this.prepareFilters = function() {
      var regions = _.groupBy(retailersEuropeLocations, function(region) { return region.properties.region });
      var regionsKeys = Object.keys(regions);
      regionsKeys = regionsKeys.sort();
      var filterSection = $('#filter__section');
      var regionsTemplate = '';
      regionsKeys.forEach( function(region) {
        regionsTemplate += '<li filter-key="' + region + '" class="filter__option filter__top-category"><div class="label link">' + formatRegion(region) + '</div>';
        if (regions[region].length) {
          var countries;
          countries = _.groupBy(regions[region], function(retailer) { return retailer.properties.country });
          var countriesKeys = Object.keys(countries);
          countriesKeys = countriesKeys.sort();

          regionsTemplate += '<div class="filter__subsection"><div class="filter__info"><h4 class="header-small filter__close"><strong>back</strong></h4><div class="filter__clear link">clear selection</div></div>';
          regionsTemplate += '<ul class="filter__section">';
          regionsTemplate += '<li class="filter__option filter__all filter__option--selected"><div class="label link">all</div></li>';
          countriesKeys.forEach( function(country) {
            regionsTemplate += '<li filter-key="' + country + '" class="filter__option"><div class="label link">' + country + '</div>';
              regionsTemplate += '<div class="filter__subsection">';
              regionsTemplate += '<div class="filter__info"><h4 class="header-small filter__close"><strong>back</strong></h4><div class="filter__clear link">clear selection</div></div>';
              regionsTemplate += '<ul class="filter__section">';
                countries[country].forEach( function(item) {
                  regionsTemplate += '<li filter-key="' + item.properties.city + '" class="filter__option"><div class="label link">' + item.properties.city + '</div></li>';
                })
              regionsTemplate += '</ul></div></li>';
            regionsTemplate += '</li>';
          })
          regionsTemplate += '</ul>';
          regionsTemplate += '</div>';
        }
        regionsTemplate += '</li>';
      })
      // filterSection.append(regionsTemplate)
      filterSection.html(regionsTemplate)
    }

    var formatRegion = function(region) {
      switch(region) {
        case 'nordic-east-eu':
          return 'nordic &amp; east europe';
          break;
        case 'uk-eire':
          return 'uk &amp; eire';
          break;
        case 'middle-east-africa':
          return 'middle east &amp; africa';
          break;
        case 'asia-pacific':
          return 'asia &amp; pacific';
          break;
        default:
          return region;
          break;
      }
    }
  };

  return RetailersService;
});
