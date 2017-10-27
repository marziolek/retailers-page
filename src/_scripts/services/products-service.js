;(function(root, productsService) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register component as an anonymous module
        define(productsService);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = productsService();
    } else {
        // Browser globals. Register component on window
        root.ProductsService = productsService();
    }
})(this, function() {
  'use strict';

  /*
    This is a mock products service to simulate loading a list of products from the backend.
  */
  var ProductsService = function() {

    var mockData = [
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 1</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 2</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 3</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 4</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 5</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 6</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 7</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 8</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 9</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 10</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 11</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 12</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 13</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 14</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 15</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 16</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 17</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 18</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 19</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 20</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 21</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 22</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 23</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 24</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 25</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 26</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 27</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 28</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 29</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 30</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 31</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 32</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 33</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 34</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 35</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 36</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 37</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 38</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 39</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 40</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 41</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 42</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 43</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 44</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 45</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 46</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 47</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 48</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 49</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 50</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 51</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 52</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 53</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 54</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 55</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 56</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 57</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 58</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
      '<a href="productdetails.html" class="title-box title-box--grey"><img src="images/testmedia/products/product01.jpg" class="title-box__image greyscale-image "><div class="title-box__link text"><strong>thumb down - 59</strong><br><strong>AJ</strong><br><span>solid, cc 30mm</span></div></a>',
    ]

    var mockFilteredContent = null; // This holds a random subset of the mock data. Changes everytime the filter is set.
    var _filter = null;

    /*
      Sets a filter value that should be passed to all backend calls
      when fetching data.
    */
    this.setFilter = function (filter) {
      _filter = filter;

      if (Object.keys(_filter).length === 0) {
        _filter = null;
        mockFilteredContent = null;
      }

      if (_filter) {
        // Create a random subset of items
        var filterCount = Math.floor(Math.random() * (mockData.length / 1.5));
        var startIndex = Math.floor(Math.random() * (mockData.length - filterCount));
        mockFilteredContent = mockData.slice(startIndex, filterCount);
      }
    };

    /*
      Passes back a list of HTML elements to inject into the pagination list.
      The HTML elements returned in the list here will each be wrappen in a
      li by the pagination component.
    */
    this.load = function(index, range, onLoad) {
      var dataSource = mockFilteredContent ? mockFilteredContent : mockData;
      var data = dataSource.slice(index, index + range);

      setTimeout(function () {
        if (onLoad) {
          // If a filter has been set, use the filtered mock data. Else the full mock data.
          onLoad(data);
        }
      }, 200);
    };


    /*
      Gets the total amount of items in the pagination list.
    */
    this.getTotalCount = function (onLoad) {
      if (onLoad) {

        // If a filter has been set, use the filtered mock data. Else the full mock data.
        var length = mockFilteredContent ? mockFilteredContent.length : mockData.length;
        onLoad(length);
      }
    };
  };

  return ProductsService;
});
