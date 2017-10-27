;(function(root, customSelect) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register fadePager as an anonymous module
        define(customSelect);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = customSelect();
    } else {
        // Browser globals. Register component on window
        root.CustomSelect = customSelect();
    }
})(this, function() {
  'use strict';

  var CustomSelect = function($elem, options) {
    var $content = $elem.find('.custom-select__content');
    var $inner = $elem.find('.custom-select__inner');
    var $label = $elem.find('.custom-select__label');
    var $currentSelection = $label.find('.current-selection');
    var isOpen = false;
    var self = this;

    this.open = function () {
      $elem.addClass('custom-select--open');
      $content.outerHeight($inner.outerHeight());
      $content.css('bottom', -1 * $inner.outerHeight());
      $currentSelection.css('visibility', 'hidden');
      isOpen = true;

      if (options && options.onOpen) {
        options.onOpen();
      }
    };

    this.close = function () {
      $elem.removeClass('custom-select--open');
      $content.outerHeight(0);
      $content.css('bottom', 0);
      isOpen = false;

      setTimeout(function () {
        $currentSelection.css('visibility', 'visible');
      }, 100);
    };

    var toggle = function () {
      isOpen ? self.close() : self.open();
    };

    var selectOption = function (e) {
      var $option = $(e.target);
      $currentSelection.find('.label').text($option.text());
      self.close();

      if (options && options.onSelect) {
        options.onSelect($option.attr('value'));
      }
    };

    $label.click(toggle);
    $inner.find('li').click(selectOption);
  };

  return CustomSelect;
});
