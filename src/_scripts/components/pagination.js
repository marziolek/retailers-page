;(function(root, pagination) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register fadePager as an anonymous module
        define(pagination);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = pagination();
    } else {
        // Browser globals. Register component on window
        root.Pagination = pagination();
    }
})(this, function() {
  'use strict';

  var throttle = require('../vendor/lodash/function/throttle.js');
  var globalVariables = require('./global-variables.js');

  var Pagination = function($elem, options) {
    var index = 0;
    var pageSize = options.pageSize;
    var $next = $elem.find('.pagination__next');
    var $nextContent = $elem.find('.pagination__next-content');
    var $prev = $elem.find('.pagination__prev');
    var $items = $elem.find('.pagination__item');
    var totalCount = 0;
    var globalVars = globalVariables();


    var updateGridLines = function () {
      var hideLength = 2;

      if (($(window).outerWidth() >= globalVars.breakPoints.xlarge) && $elem.hasClass('pagination--small')) {
        // if desktop with small grid hide the grid lines of the first 6 items
        hideLength = 6;
      } else if ($(window).outerWidth() >= globalVars.breakPoints.large) {
        // if tablet/desktop hide the grid lines of the first 4 items
        hideLength = 4;
      }

      $elem.find('> *').removeClass('no-top-border');
      var $visibleItems = $elem.find('> *').not('.hidden');
      $visibleItems.slice(0,hideLength).addClass('no-top-border');

      if ($next.outerWidth() === $nextContent.outerWidth()) {
        $next.addClass('no-left-border');
      } else {
        $next.removeClass('no-left-border');
      }
    };

    var onResize = function () {
      // Set the height of the Next box to the same as the previous item

      $nextContent.outerHeight('auto');
      $nextContent.outerWidth($items.last().width());
      setTimeout (function () {
        $nextContent.outerHeight($items.last().height());
        updateGridLines();
      }, 1);
    };
    var throttledOnResize = throttle(onResize, 50, { leading: false });

    /*
    Updates the display of the currently visible range
    */
    var updateRangeIndicators = function (length) {
      var text = (index + 1) + '-' + (index + length);
      $prev.find('.pagination__paging-current').text(text);
      $next.find('.pagination__paging-current').text(text);

      // Determien if Prev and next are shown
      //index > 0 ? $prev.removeClass('hidden') : $prev.addClass('hidden');
      index + pageSize > totalCount ? $next.addClass('hidden') : $next.removeClass('hidden');
      updateGridLines();
    };

    var renderPrevBtn = function () {
      return $('<li class="pagination__prev"><span pagination-prev="pagination-prev" class="header-small"><strong>prev</strong></span><span class="pagination__paging text"><span class="pagination__paging-current">1-11</span><span class="pagination__paging-count">( ' + totalCount + ' )</span></span></li>');
    }

    var onPageLoad = function (data) {
      // Render items
      var items = [];
      for (var i = 0; i < data.length; i++) {
        var itemWrapper = $('<li class="pagination__item"></li>')
        itemWrapper.append(data[i]);
        items.push(itemWrapper);
      }

      //console.log(items);

      $items.remove();
      $elem.find('.pagination__prev').remove()
      $elem.prepend(items);
      if (index > 0) {
        $elem.prepend(renderPrevBtn());
        $prev = $elem.find('.pagination__prev');
      }
      $items = $elem.find('.pagination__item');

      updateRangeIndicators(data.length);

      if (options.onLoad) {
        options.onLoad(items);
      }
    };

    this.reload = function () {
      // Get the total pagination count
      options.getTotalCount(function (total) {
        totalCount = total;
        $prev.find('.pagination__paging-count').text('( ' + total + ' )');
        $next.find('.pagination__paging-count').text('( ' + total + ' )');
        var firstRange = totalCount > pageSize ? pageSize - 1 : pageSize;
        updateRangeIndicators(firstRange);
      });

      index = 0;

      var nextPageSize = pageSize;
      if (pageSize < totalCount) {
        nextPageSize = nextPageSize - 1;
      }

      options.load(index,nextPageSize,onPageLoad);
    };

    this.small = function () {
      $elem.addClass('pagination--small');
      onResize();
    };

    this.large = function () {
      $elem.removeClass('pagination--small');
      onResize();
    };

    var initialize = function () {
      $(window).on('resize', throttledOnResize);
      onResize();

      // Get the total pagination count
      options.getTotalCount(function (total) {
        totalCount = total;
        $prev.find('.pagination__paging-count').text('( ' + total + ' )');
        $next.find('.pagination__paging-count').text('( ' + total + ' )');
        var firstRange = totalCount > pageSize ? pageSize - 1 : pageSize;
        updateRangeIndicators(firstRange);
      });

      // Hook up prev and next buttons
      $next.find('[pagination-next]').click(function () {
        var nextPageSize = pageSize;
        nextPageSize = nextPageSize - 1; // To compensate for the prev button
        if (index + nextPageSize < totalCount) {
          nextPageSize = nextPageSize - 1; // To compensate for the next button
        }
        index = index + $items.length;
        options.load(index, nextPageSize, onPageLoad);
      });

      $elem.on('click', '[pagination-prev]', function () {
        var nextPageSize = pageSize;
        nextPageSize = nextPageSize - 1; // To compensate for the next button
        if (index - nextPageSize > 0) {
          nextPageSize = nextPageSize - 1; // To compensate for the next button
        }
        index = index - nextPageSize;
        options.load(index, nextPageSize, onPageLoad);
      });
    };
    initialize();
  };

  return Pagination;
});
