;(function(root, searchService) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register component as an anonymous module
        define(searchService);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = searchService();
    } else {
        // Browser globals. Register component on window
        root.SearchService = searchService();
    }
})(this, function() {
  'use strict';

  /*
    This is a mock products service to simulate loading a list of products from the backend.
  */
  var SearchService = function() {

    var mockData = {
      count: 8,
      result: [
        '<div class="search__result gl-top gl-top--pull-left gl-bot gl-bot--pull-left"><div class="l-row"><div class="l-col l-col-pad"><div class="text result-count">2 results</div></div><div class="l-col-3 gl-left"><div><a href="/" class="result-item header-small">holscher</a><a href="/" class="result-item header-small">knud</a></div></div></div></div>',
        '<div class="search__result gl-top gl-top--pull-left gl-bot gl-bot--pull-left"><div class="l-row"><div class="l-col l-col-pad"><div class="text result-count">2 results</div></div><div class="l-col-3 gl-left"><div><a href="/" class="result-item header-small">holscher</a><a href="/" class="result-item header-small">knud</a></div></div></div></div>',
        '<div class="search__result gl-top gl-top--pull-left gl-bot gl-bot--pull-left"><div class="l-row"><div class="l-col l-col-pad"><div class="text result-count">2 results</div></div><div class="l-col-3 gl-left"><div><a href="/" class="result-item header-small">holscher</a><a href="/" class="result-item header-small">knud</a></div></div></div></div>',
        '<div class="search__result gl-top gl-top--pull-left gl-bot gl-bot--pull-left"><div class="l-row"><div class="l-col l-col-pad"><div class="text result-count">2 results</div></div><div class="l-col-3 gl-left"><div><a href="/" class="result-item header-small">holscher</a><a href="/" class="result-item header-small">knud</a></div></div></div></div>',
      ]
    };

    /*
      Passes back a list of HTML elements to inject into the pagination list.
      The HTML elements returned in the list here will each be wrappen in a
      li by the pagination component.
    */
    this.search = function(query, onResponse) {
      //console.log('mock search', query);

      setTimeout(function () {
        if (onResponse) {
          onResponse(mockData);
        }
      }, 400);
    };
  };

  return SearchService;
});
