;(function(root, filter) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register fadePager as an anonymous module
        define(filter);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = filter();
    } else {
        // Browser globals. Register component on window
        root.Filter = filter();
    }
})(this, function() {
  'use strict';

  var globalVariables = require('./global-variables.js');

  var Filter = function($elem, settings) {
    var selection = {};
    var globalVars = globalVariables();
    var animationSpeed = 250;

    var toggleFilterValue = function ($option, filterState, selected) {
      var parentState;
      // If it has a parent, create the parents state first
      if ($option.parents('[filter-key]').length > 0) {
        parentState = toggleFilterValue($option.parents('[filter-key]').first(), filterState, true);
      }

      // Either add or remove the key to the selection object.
      var key = $option.attr('filter-key');

      var state = parentState || filterState;
      // If the key is to be set an already exists, return it so its state wont be overwritten
      if (selected && state[key]) {
        return state[key];
      }
      selected ? state[key] = {} : delete state[key];

      return state[key];
    };

    /*
      For all subnavs, sets the amount of selected sub options
    */
    var setIndicators = function () {
      $elem.find('.filter__subcount').remove();
      $elem.find('.filter__subsection').each(function () {
        var count = $(this).find('> .filter__section > .filter__option--selected').not('.filter__all').length;

        if (count > 0) {
          console.log('has selected sub options', count);
          $(this).siblings('.label').append('<span class="filter__subcount"> ( ' + count + ' )</span>')
        }
      });
    };

    var setFilterHeight = function () {
      // Set the height of the filter based on the tallest open subsection
      var prevHeight = $elem.height();
      $elem.height('auto');
      var $measuredSections = $elem.find('.filter__base > .filter__section, .filter__option--open > .filter__subsection');
      var height = 0;
      $measuredSections.each(function () {
        height = Math.max(height, $(this).outerHeight());
      });
      window.Tween.fromTo($elem, 0.3, {height: prevHeight + 'px'}, {height: height + 'px'});
    }

    var setSubOptions = function ($option) {
      // Close all siblings
      $option.siblings().removeClass('filter__option--open');

      if ($option.find('.filter__subsection').length > 0) {
        // Animate out all options from current layer
        var $parentLayer = $option.parents('.filter__base, .filter__subsection').first();
        $parentLayer.addClass('filter--fade-out');

        setTimeout(function () {
          $option.toggleClass('filter__option--open');
          $option.find('.filter__option--open').removeClass('filter__option--open');
          setFilterHeight();
        }, $(window).outerWidth() >= globalVars.breakPoints.large ? 0 : animationSpeed);
      }
    };

    var selectOption = function (e) {
      e.preventDefault();
      var $option = $(e.target).parent('.filter__option');

      // If the option is selected and has suboptions,
      // it can only be toggled off when it is open.
      // the top level categories are NOT selectable
      if ($option.find('.filter__subsection').length > 0 && !$option.hasClass('filter__option--open') && !$option.hasClass('filter__top-category')) {
        $option.addClass('filter__option--selected');
      } else if (!$option.hasClass('filter__top-category')) {
        $option.toggleClass('filter__option--selected');
      }
      var isSelected = $option.hasClass('filter__option--selected');

      // toggle option in selection object, to save the state of the filter
      toggleFilterValue($option, selection, isSelected);

      // If option has sub-options, open sub subsection
      setSubOptions($option);

      if ($elem.find('.filter__option--selected').not('.filter__all').length > 0) {
        $elem.addClass('filter--filter-set');
      } else {
        $elem.removeClass('filter--filter-set');
      }

      // Toggle the selection of the "all" option on the current level
      if ($option.parent().find('> .filter__option--selected').not('.filter__all').length > 0) {
        $option.siblings('.filter__all').removeClass('filter__option--selected');
      } else {
        $option.siblings('.filter__all').addClass('filter__option--selected');
      }

      setIndicators();

      // Invoke callback
      if (settings && settings.onChange) {
        settings.onChange(selection);
      }

      return false;
    };


    var closeSubsection = function (e) {
      $(e.target).parents('.filter__option').first().removeClass('filter__option--open');

      setTimeout(function () {
        setFilterHeight();
        var $parentLayer = $(e.target).parents('.filter__option').parents('.filter__base, .filter__subsection').first();
        $parentLayer.removeClass('filter--fade-out');
      }, $(window).outerWidth() >= globalVars.breakPoints.large ? 0 : animationSpeed);
    };

    var clearSelection = function () {
      $elem.find('.filter__option--open, .filter__option--selected')
      .removeClass('filter__option--open')
      .removeClass('filter__option--selected');

      $elem.find('.filter--fade-out').removeClass('filter--fade-out');

      setFilterHeight();

      selection = {};

      $elem.removeClass('filter--filter-set');
      $elem.find('.filter__all').addClass('filter__option--selected');
      setIndicators();

      // Invoke callback
      if (settings && settings.onChange) {
        settings.onChange(selection);
      }
    };

    var clearSubsection = function (e) {
      e.preventDefault();
      var $all = $(e.target).parent('.filter__option');

      $all.addClass('filter__option--selected');
      $all.siblings('.filter__option--selected').each(function () {
        $(this).removeClass('filter__option--selected filter__option--open');
        toggleFilterValue($(this), selection, false);
        console.log('selection reset', selection);
      });
      setFilterHeight();

      if ($elem.find('.filter__option--selected').not('.filter__all').length > 0) {
        $elem.addClass('filter--filter-set');
      } else {
        $elem.removeClass('filter--filter-set');
      }
      setIndicators();

      // Invoke callback
      if (settings && settings.onChange && $('.retailers-page').length) {
        settings.onChange(selection);
      }
      return false;
    };

    var initialize = function () {
      $elem.find('.filter__section').on('click', '.filter__option', selectOption);

      $elem.find('.filter__section').on('click', '.filter__close', closeSubsection);

      $elem.find('.filter__clear').on('click', clearSelection);

      $elem.find('.filter__all').on('click', clearSubsection);
    };
    initialize();
  };

  return Filter;
});
