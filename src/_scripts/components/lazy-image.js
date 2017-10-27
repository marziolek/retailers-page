;(function(root, lazyImage) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register fadePager as an anonymous module
        define(cellLoad);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = lazyImage();
    } else {
        // Browser globals. Register component on window
        root.LazyImage = lazyImage();
    }
})(this, function() {
  'use strict';

  var CellLoad = require('./cell-load.js');
  var throttle = require('../vendor/lodash/function/throttle.js');

  /*
    <!-- The (data-threshold-offset=300) is the modify how far from the screen bottom the image has to be before loading. -->
    <div class="lazy-image cell-load" data-threshold-offset="300">
      <img src="" data-src="imagepath.jpg"/>
      <div class="cell-load__overlay"></div>
    </div>
  */
  var LazyImage = function($elems) {
    var thresholdOffset = 0;
    var imageList = [];

    /*
      Loads the image and triggers cell load animation
    */
    var loadImage = function (imageObject) {
      //console.log('load image');
      imageObject.isLoaded = true;

      var imageUrl = imageObject.image.data('src');
      var image = new Image();
      var animationDone = false;
      var imageLoaded = false;

      // Load the image
      image.onload = function() {
        imageLoaded = true;

        // if both the image is loaded and the loadIn animation is done,
        // run the loadOut animation.
        if (animationDone && imageLoaded) {
          imageObject.image.attr('src', imageUrl);
          imageObject.cellLoad.loadOut();
          imageObject.elem.addClass('lazy-image--loaded');
        }
      };
      image.src = imageUrl;

      // Start the animation
      imageObject.cellLoad.loadIn(function () {
        animationDone = true;
        // if both the image is loaded and the loadIn animation is done,
        // run the loadOut animation.
        if (animationDone && imageLoaded) {
          imageObject.image.attr('src', imageUrl);
          imageObject.cellLoad.loadOut();
          imageObject.elem.addClass('lazy-image--loaded');
        }
      });
    };

    /*
      On scroll, check each image if it is scroll to a
      position where it should start loading.
    */
    var onScroll = function () {
      for (var i = 0; i < imageList.length; i++) {
        if (!imageList[i].isLoaded) {
          if ((imageList[i].image[0].getBoundingClientRect().top + imageList[i].thresholdOffset || thresholdOffset) < window.innerHeight) {
            loadImage(imageList[i]);
          }
        }

      }
    };

    var initializeImageList = function () {
      $elems.each(function () {
        var $lazyImageElem = $(this);
        imageList.push({
          cellLoad: new CellLoad($lazyImageElem),
          elem: $lazyImageElem,
          image: $lazyImageElem.find('.lazy-image__image'),
          thresholdOffset: $lazyImageElem.data('threshold-offset') || null,
          isLoaded: false
        });
      });
    };

    var initialize = function () {
      var throttledOnScroll = throttle(onScroll, 50, {leading: false});
      $(window).on('scroll', throttledOnScroll);

      initializeImageList();
      onScroll();
    };
    initialize();

    /*
      revalidate the position of all items and determine if they should be loaded.
    */
    this.revalidate = function () {
      onScroll();
    };

  };

  return LazyImage;
});
