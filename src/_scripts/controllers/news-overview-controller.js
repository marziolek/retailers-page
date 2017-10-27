;(function(root, newsOverviewController) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register component as an anonymous module
        define(newsOverviewController);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = newsOverviewController();
    } else {
        // Browser globals. Register component on window
        root.NewsOverviewController = newsOverviewController();
    }
})(this, function() {
  'use strict';

  var Pagination = require('../components/pagination.js');
  var NewsService = require('../services/news-service.js');

  var NewsOverviewController = function($elem) {
    var newsService = new NewsService();

    // Initialize pagination
    var $paginationElem = $elem.find('.pagination');
    var pagination = new Pagination($paginationElem, {
      load: newsService.load,
      getTotalCount: newsService.getTotalCount,
      pageSize: 12
    });
  };

  return NewsOverviewController;
});
