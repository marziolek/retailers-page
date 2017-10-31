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

  var SearchService = function() {

      var mockData = {};

    /*
    var data = {
          'action': 'dl_search',
          'search_query': 'test'
        };

    $.post(admin_url,data,function(result){
      var response = result;
      mockData['count'] = response.total;
      mockData['result'] =  response.result;
    });

    */


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
