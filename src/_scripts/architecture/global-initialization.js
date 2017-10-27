;(function(root, globalInitialization) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register fadePager as an anonymous module
        define(globalInitialization);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = globalInitialization();
    } else {
        // Browser globals. Register component on window
        root.GlobalInitialization = globalInitialization();
    }
})(this, function() {
  'use strict';

  // ComponentRepository is a registry of all components for this project
  var ComponentRepository = require('./component-repository.js');
  var LazyImage = require('../components/lazy-image.js');
  var FullHeight = require('../components/full-height.js');

  var GlobalInitialization = function() {
    // Load all components automatically by looking up 'data-component' attributes in the DOM,
    // and finding the corresponding component in the ComponentRepository.
    var loadedComponents = [];
    $('[data-component]').each(function () {
      var $componentElem = $(this);
      var componentKey = $componentElem.data('component');
      var Component = ComponentRepository.load(componentKey);
      if (Component) {
        loadedComponents.push(new Component($componentElem));
      } else {
        console.error('Component "' + componentKey + '" is not defined in the Component Repository.')
      }
    });

    // initialize all LazyImages at the same time for performance.
    var $lazyImages = $('.lazy-image');
    var lazyImages = new LazyImage($lazyImages);


    // Initialize all full height elements that should be validated by JS
    var $fullHeight = $('.full-height');
    var fullHeight = new FullHeight($fullHeight);

    window.PubSub.subscribe('global:revalidate-images', function () {
      lazyImages.revalidate();
    })

    function detectIE() {
      var ua = window.navigator.userAgent;

      // Test values; Uncomment to check result …

      // IE 10
      // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

      // IE 11
      // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

      // Edge 12 (Spartan)
      // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

      // Edge 13
      // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

      var msie = ua.indexOf('MSIE ');
      if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      }

      var trident = ua.indexOf('Trident/');
      if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      }

      var edge = ua.indexOf('Edge/');
      if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      }

      // other browser
      return false;
    }

    if (detectIE()) {
      $('body').addClass('is-ie');
    }
  };

  return GlobalInitialization;
});
