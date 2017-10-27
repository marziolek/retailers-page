;(function(root, googleMap) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register fadePager as an anonymous module
        define(googleMap);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = googleMap();
    } else {
        // Browser globals. Register component on window
        root.GoogleMap = googleMap();
    }
})(this, function() {
  'use strict';

  var GoogleMap = function($elem, $googleMapsApi, options) {
    var map;
    var markerImage;
    var self = this;
    var locations = [];

    var setMap = function (center) {
      var mapDiv = $elem;

      map = new google.maps.Map(mapDiv[0], {
        center: center,
        mapTypeControl: false,
        zoom: 3,
        styles: [{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#ff0000"},{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#b20a2f"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#fc0f42"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#b20a2f"}]},{"featureType":"poi","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"color":"#b20a2f"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#b20a2f"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#d99999"}]},{"featureType":"transit","elementType":"geometry.fill","stylers":[{"color":"#950f2d"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#b20a2f"},{"visibility":"on"}]}]
      });
    };

    var fitBounds = function () {
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0; i < locations.length; i++) {
       bounds.extend(locations[i].getPosition());
      }

      map.fitBounds(bounds);
    }

    this.setCenter = function (center) {
      console.log('map', map);
      map.setCenter(new google.maps.LatLng(center.lat, center.lng));
    };


    this.setLocations = function (_locations) {
      // clear all markers
      for (var i = 0; i < locations.length; i++) {
        locations[i].setMap(null);
      }

      locations = [];

      // Add new markers
      var goodJson = [];
      for (var i = 0; i < _locations.length; i++) {
        var pos = _locations[i];
        if (pos.properties) {
          pos = {
            lat: _locations[i].properties.lat,
            lng: _locations[i].properties.lng
          }

          // if (pos.lat && pos.lng) {
          //   var latStr = parseInt(_locations[i].properties.lat).toString().substring(0,8),
          //     lngStr = parseInt(_locations[i].properties.lng).toString().substring(0,8);

          //   var newLat = parseFloat(latStr.substr(0, latStr.length - 6) + '.' + latStr.slice(-6)),
          //     newLng = parseFloat(lngStr.substr(0, lngStr.length - 6) + '.' + lngStr.slice(-6));

          //   _locations[i].properties.lat = newLat;
          //   _locations[i].properties.lng = newLng;
          // }
          // console.log(newLat, newLng, _locations[i].properties.name)
          // goodJson.push(_locations[i])
        }
        if (pos.lat && pos.lng && _locations[i].properties) {
          var marker = new google.maps.Marker({
            position: pos,
            map: map,
            icon: markerImage,
            // label: _locations[i].properties.country
          });
          locations.push(marker);
        }
      }
      // console.log(goodJson)
      fitBounds();
    };

    function initMap() {
      setMap(options.center);
      markerImage = new google.maps.MarkerImage('/images/assets/map-marker.png', null, null, null, new google.maps.Size(16,16));
      self.setLocations([options.center]);

      if (options.onInit) {
        options.onInit();
      }
    }

    var initialize = function () {
        window.initMap = initMap;

        //load the Google Maps Api
        var apiScript = $googleMapsApi;
        var url = apiScript.data('src');
        $googleMapsApi.attr('src', url);
      };
      initialize();
  };

  return GoogleMap;
});
