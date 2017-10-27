;(function(root, casesService) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register component as an anonymous module
        define(casesService);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = casesService();
    } else {
        // Browser globals. Register component on window
        root.CasesService = casesService();
    }
})(this, function() {
  'use strict';

  /*
    This is a mock products service to simulate loading a list of products from the backend.
  */
  var CasesService = function() {

    var mockFilteredContent = [
      '<div class="l-fancy-grid__row"><div class="l-fancy-grid__item l-fancy-grid__item--featured"><div class="l-fancy-grid__content"><a href="#" class="title-box lazy-image cell-load dark-img lazy-image--loaded"><div class="title-box__info-header"><strong>Yoshio Taniguchi USA</strong><span>Denmark</span></div><div class="title-box__title header-small"><strong>SAS Hotel</strong>Copenhagen<br>Denmark</div><img data-src="images/testmedia/cases/SAS-Hotel-Copenhagen-Denmark-color.jpg"class="lazy-image__image title-box__image greyscale-image greyscale-image--fade-in" src="images/testmedia/cases/SAS-Hotel-Copenhagen-Denmark-color.jpg"><div class="cell-load__overlay" style=""></div></a></div></div><div class="l-fancy-grid__item"><div class="l-fancy-grid__content l-fancy-grid__content--pull-right l-fancy-grid__content--pull-down"><a href="#" class="title-box lazy-image cell-load dark-img lazy-image--loaded"><div class="title-box__info-header"><strong>Lundgaard &amp; Tranberg Denmark</strong><span>Denmark</span></div><div class="title-box__title header-small"><strong>Grace Farms</strong>Connecticut,<br>USA</div><img data-src="images/testmedia/cases/Grace-Farms-Connecticut-USA-color.jpg" class="lazy-image__image title-box__image greyscale-image greyscale-image--fade-in" src="images/testmedia/cases/Grace-Farms-Connecticut-USA-color.jpg"><div class="cell-load__overlay" style=""></div></a></div></div></div>'
    ];

    /*
      Sets a filter value that should be passed to all backend calls
      when fetching data.
    */
    this.load = function (filter, onLoad) {

      setTimeout(function () {
        if (onLoad) {
          // If a filter has been set, use the filtered mock data. Else the full mock data.
          onLoad(mockFilteredContent);
        }
      }, 200);
    };

    /*
      Passes back a list of HTML elements to inject into the pagination list.
      The HTML elements returned in the list here will each be wrappen in a
      li by the pagination component.
    */
    /*this.load = function(index, range, onLoad) {
      var dataSource = mockFilteredContent ? mockFilteredContent : mockData;
      var data = dataSource.slice(index, index + range);

      setTimeout(function () {
        if (onLoad) {
          // If a filter has been set, use the filtered mock data. Else the full mock data.
          onLoad(data);
        }
      }, 200);
    };*/


    /*
      Gets the total amount of items in the pagination list.
    */
    /*this.getTotalCount = function (onLoad) {
      if (onLoad) {

        // If a filter has been set, use the filtered mock data. Else the full mock data.
        var length = mockFilteredContent ? mockFilteredContent.length : mockData.length;
        onLoad(length);
      }
    };*/
  };

  return CasesService;
});
