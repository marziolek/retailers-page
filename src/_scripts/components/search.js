;(function(root, search) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register fadePager as an anonymous module
        define(search);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = search();
    } else {
        // Browser globals. Register component on window
        root.Search = search();
    }
})(this, function() {
  'use strict';

  var debounce = require('../vendor/lodash/function/debounce.js');
  var throttle = require('../vendor/lodash/function/throttle.js');

  var Search = function($elem, options) {
    var $input = $elem.find('.search__input');
    var $top = $elem.find('.search__top');
    var $resultsContainer = $elem.find('.search__results-container .l-page-container');
    var $resultsContainerInner = $elem.find('.search__results-container-inner');
    var $searchStatus = $top.find('.search__status');
    var self = this;
    var minHeight = 0;

    var search = function (query) {
      if (options.search) {
        options.search(query, function (data) {

		var data = {
        'action': 'dl_search',
        'search_query': query
		 };

		$.post(admin_url,data,function(result){
			var response = result;
			$resultsContainerInner.html(response.result);
			$searchStatus.removeClass('searching');
			$searchStatus.find('.results-count').text(response.total + ' results found');
			window.Tween.fromTo($resultsContainerInner, 0.3, {y: minHeight + 'px'}, {y: '0px'});
		});

        });
      }
    };
    var debouncedSearch = debounce(search, 400);

    var onInputChange = function () {
      $searchStatus.addClass('searching');
      debouncedSearch($input.val());
    };

    this.measure = function () {
      minHeight = $(window).height() - $elem[0].getBoundingClientRect().top - $top.outerHeight();
      minHeight = Math.floor(minHeight) - 4;
      $resultsContainer.css('min-height', minHeight + 'px');
    };

    var onResize = function () {
      self.measure();
    };
    var throttledOnResize = throttle(onResize, 50, { leading: false });

    var initialize = function () {
      $input.on('input', onInputChange);

      $(window).on('resize', throttledOnResize);

      self.measure();
    };
    initialize();
  };

  return Search;
});
