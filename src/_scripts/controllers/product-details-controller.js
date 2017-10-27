;(function(root, productDetailsController) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register component as an anonymous module
        define(productDetailsController);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = productDetailsController();
    } else {
        // Browser globals. Register component on window
        root.ProductDetailsController = productDetailsController();
    }
})(this, function() {
  'use strict';

  var ScrollSticker = require('../components/scroll-sticker.js');
  var ShiftSlider = require('../components/shift-slider.js');
  var CustomSelect = require('../components/custom-select.js');
  var StateService = require('../services/state.js');

  var ProductDetailsController = function($elem) {
    var stateService = new StateService();
    var state = stateService.getState();

    // The sticky element will scroll down with the screen
    // untill it aligns with the top of the stickerTarget.
    var $stickerTarget = $elem.find('.product-details__description');
    var $scrollStickerElem = $elem.find('[data-js="product-details-sticker"]');
    var scrollSticker = new ScrollSticker($scrollStickerElem, {
      target: $stickerTarget
    });

    var customSelects = [];

    var onSelect = function (val) {
      /*
        Thomas do stuff based on the value
      */
      console.log('custom select option selected', val);
    };

    $elem.find('.custom-select').each(function (j) {
      customSelects.push(new CustomSelect($(this), {
        onSelect: onSelect,
        onOpen: function () {
          // Close all other selects.

          for (var i = 0; i < customSelects.length; i++) {
            if (i !== j) {
              customSelects[i].close();
            }
          }
        }
      }))
    });

    $elem.find('.add-to-brochure').click(function (e) {
      e.preventDefault();
      // TODO: Thomas, add the product to brochure
      state.catalogue = state.catalogue || [];
      state.catalogue.push({}); // Push some identifier about what product has been added.
      window.PubSub.publish('brochure:do-update');
    })
  };

  return ProductDetailsController;
});
