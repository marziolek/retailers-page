;(function(root, newsDetailsController) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register component as an anonymous module
        define(newsDetailsController);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = newsDetailsController();
    } else {
        // Browser globals. Register component on window
        root.NewsDetailsController = newsDetailsController();
    }
})(this, function() {
  'use strict';

  var NewsService = require('../services/news-service.js');
  var throttle = require('../vendor/lodash/function/throttle.js');

  var NewsDetailsController = function($elem) {
    var index = 1; // index starts at 1 because the page should be loaded with the first news article already in the DOM.
    var newsService = new NewsService();
    var loadInProgress = false;

    var onScroll = function () {
      if (loadInProgress) {
        console.log('load in progress');
        return;
      }
      // if the window is scrolled to 400px from the bottom of the screen, load the next article
      if ($(window).scrollTop() >= $(window).height() - 400) {
        loadInProgress = true;
        console.log('news detail on scroll', index);

        newsService.loadArticle(index, function (data) {
          if (data) {
            $elem.append(data);
            index = index + 1;

            setTimeout(function () {
              loadInProgress = false;
            }, 500);
          }
        });
      }
    };
    var throttledOnScroll = throttle(onScroll, 100, { leading: false});

    $(window).on('scroll', throttledOnScroll);
  };

  return NewsDetailsController;
});
