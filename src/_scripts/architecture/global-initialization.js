;(function(root, globalInitialization) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register fadePager as an anonymous module
        define(globalInitialization);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = globalInitialization();
    } else {
        // Browser globals. Register component on window
        root.GlobalInitialization = globalInitialization();
    }
})(this, function() {
  'use strict';

  // ComponentRepository is a registry of all components for this project
  var ComponentRepository = require('./component-repository.js');
  var LazyImage = require('../components/lazy-image.js');
  var FullHeight = require('../components/full-height.js');

  var GlobalInitialization = function() {

      // Load all components automatically by looking up 'data-component' attributes in the DOM,
      // and finding the corresponding component in the ComponentRepository.
      var loadedComponents = [];
      $('[data-component]').each(function () {
        var $componentElem = $(this);
        var componentKey = $componentElem.data('component');
        var Component = ComponentRepository.load(componentKey);
        if (Component) {
          loadedComponents.push(new Component($componentElem));
        } else {
          console.error('Component "' + componentKey + '" is not defined in the Component Repository.')
        }
      });

      // initialize all LazyImages at the same time for performance.
      var $lazyImages = $('.lazy-image');
      var lazyImages = new LazyImage($lazyImages);


      // Initialize all full height elements that should be validated by JS
      var $fullHeight = $('.full-height');
      var fullHeight = new FullHeight($fullHeight);

      window.PubSub.subscribe('global:revalidate-images', function () {
        lazyImages.revalidate();
      })

      // My custom jquery
      $('.article-overview__title').click(function() {
        window.location.href='http://thomasbech.dk/dline/news/';
    });

      $( ".footer-menu li" ).addClass( "link" );
      $( ".news-box p" ).addClass( "text" );

      $( ".post-type-archive-cases div.cases" ).addClass( "current-page" );
      $( ".single-cases div.cases" ).addClass( "current-page" );
      $( ".post-type-archive-product a.products" ).addClass( "current-page" );
      $( ".single-product a.products" ).addClass( "current-page" );
      $( ".page-template-page-collections div.collections" ).addClass( "current-page" );
      $( ".page-commitment div.commitment" ).addClass( "current-page" );
      $( ".parent-pageid-9102 div.commitment" ).addClass( "current-page" );

      $(".global-menu__bar.l-row").click(function(){
        $(".header-xlarge.item-no").addClass("hide");
        $(".global-menu__page-shadow").click(function(){
          $(".header-xlarge.item-no").removeClass("hide");
        });
      });

      $( ".post-type-archive-cases .l-fancy-grid__item:nth-child(4n-7)" ).addClass( "l-fancy-grid__item--featured");
      $( ".post-type-archive-cases .l-fancy-grid__item:nth-child(4n-7) .title-box" ).addClass( "title-box--featured");

      $( ".post-type-archive-cases .l-fancy-grid__item:nth-child(4n+2) .l-fancy-grid__content" ).addClass( "l-fancy-grid__content--pull-right");
      $( ".post-type-archive-cases .l-fancy-grid__item:nth-child(7n) .l-fancy-grid__content" ).addClass( "l-fancy-grid__content--pull-right");

      $( ".page-template-page-allcollections .l-fancy-grid__item:nth-child(1)" ).addClass( "l-fancy-grid__item--featured");
      $( ".page-template-page-allcollections .l-fancy-grid__item:nth-child(2)" ).addClass( "l-fancy-grid__item--featured");
      $( ".page-template-page-allcollections .l-fancy-grid__item:nth-child(2)" ).addClass( "l-fancy-grid__content--pull-right");
      $( ".page-template-page-allcollections .l-fancy-grid__item:nth-child(3)" ).addClass( "l-fancy-grid__item--featured");
      $( ".page-template-page-allcollections .l-fancy-grid__item:nth-child(1) .title-box" ).addClass( "title-box--featured");
      $( ".page-template-page-allcollections .l-fancy-grid__item:nth-child(2) .title-box" ).addClass( "title-box--featured");
      $( ".page-template-page-allcollections .l-fancy-grid__item:nth-child(3) .title-box" ).addClass( "title-box--featured");

      $( ".page-template-page-allcollections .l-fancy-grid__item:nth-child(5) .l-fancy-grid__content" ).addClass( "l-fancy-grid__content--pull-right");
      $( ".page-template-page-allcollections .l-fancy-grid__item:nth-child(7) .l-fancy-grid__content" ).addClass( "l-fancy-grid__content--pull-right");
      $( ".page-template-page-allcollections .l-fancy-grid__item:nth-child(8) .l-fancy-grid__content" ).addClass( "l-fancy-grid__content--pull-right");
      $( ".page-template-page-allcollections .l-fancy-grid__item:nth-child(11) .l-fancy-grid__content" ).addClass( "l-fancy-grid__content--pull-right");
      $( ".page-template-page-allcollections .l-fancy-grid__item:nth-child(12) .l-fancy-grid__content" ).addClass( "l-fancy-grid__content--pull-right");

      $( ".et_pb_image img" ).addClass( "greyscale-image greyscale-image--fade-in" );
      $( ".variations select" ).addClass( "minimal" );

      $(".first-collection").click(function(){
          $(".category-sub-filter.filters").hide();
          $(".second-filter li.filters").hide();
          $(".second-filter li.collection-filter").fadeIn(500);
      });
      $(".first-material").click(function(){
          $(".category-sub-filter.filters").hide();
          $(".second-filter li.filters").hide();
          $(".second-filter li.material-filter").fadeIn(500);
      });
      $(".first-category").click(function(){
          $(".second-filter li.filters").hide();
          $(".second-filter li.category-filter").fadeIn(500);
      });
      $('.category-filter .berocket_term_parent_hardware:nth-child(2)').click(function() {
        $(".category-sub-filter.sanitary.filters").hide();
        $(".category-sub-filter.hardware.filters").fadeIn(500);
      });
      $('.berocket_term_parent_hardware:nth-child(3)').click(function() {
        $(".category-sub-filter.hardware.filters").hide();
        $(".category-sub-filter.sanitary.filters").fadeIn(500);
      });

      // Show filter before they are clicked
      if ( $(".collection-filter .berocket_label_widgets").hasClass( "berocket_checked" ) ) {
          var n = $( ".collection-filter .berocket_checked" ).length;
          $( ".first-collection .label.link" ).append( " <span class='filter__subcount'>( " + n + " )</span>" );
          $( ".first-collection .label.link" ).css("color","#fc0f42");
          $( ".filter-clear" ).show();
      }

      if ( $(".material-filter .berocket_label_widgets").hasClass( "berocket_checked" ) ) {
          var n = $( ".material-filter .berocket_checked" ).length;
          $( ".first-material .label.link" ).append( " <span class='filter__subcount'>( " + n + " )</span>" );
          $( ".first-material .label.link" ).css("color","#fc0f42");
          $( ".filter-clear" ).show();
      }

      if ( $(".category-filter .berocket_label_widgets").hasClass( "berocket_checked" ) ) {
          var n = $( ".category-filter .berocket_checked" ).length;
          $( ".first-category .label.link" ).append( " <span class='filter__subcount'>( " + n + " )</span>" );
          $( ".first-category .label.link" ).css("color","#fc0f42");
          $( ".filter-clear" ).show();
      }



      $('.collection-filter ul.berocket_aapf_widget li').click(function() {
          var duration = 100;
          setTimeout(function() {
              if ( $(".collection-filter .berocket_label_widgets").hasClass( "berocket_checked" ) ) {
                  var n = $( ".collection-filter .berocket_checked" ).length;
                  $( ".first-collection .label.link" ).append( " <span class='filter__subcount'>( " + n + " )</span>" );
                  $( ".first-collection .label.link" ).css("color","#fc0f42");
                  $( ".filter-clear" ).show();
              }
              if($('.collection-filter .berocket_checked').length === 0){
                $(".first-collection .filter__subcount").hide();
                $(".first-collection .label.link").css("color","inherit");
              }
          }, duration);

          someAsynchronousFunction();
      });

      $('.material-filter ul.berocket_aapf_widget li').click(function() {
          var duration = 100;
          setTimeout(function() {
              if ( $(".material-filter .berocket_label_widgets").hasClass( "berocket_checked" ) ) {
                  var n = $( ".material-filter .berocket_checked" ).length;
                  $( ".first-material .label.link" ).append( " <span class='filter__subcount'>( " + n + " )</span>" );
                  $( ".first-material .label.link" ).css("color","#fc0f42");
                  $( ".filter-clear" ).show();
              }
              if($('.material-filter .berocket_checked').length === 0){
                $(".first-material .filter__subcount").hide();
                $(".first-material .label.link").css("color","inherit");
              }
          }, duration);

          someAsynchronousFunction();
      });

      $('.category-filter ul.berocket_aapf_widget li').click(function() {
          var duration = 100;
          setTimeout(function() {
              if ( $(".category-filter .berocket_label_widgets").hasClass( "berocket_checked" ) ) {
                  var n = $( ".category-filter .berocket_checked" ).length;
                  $( ".first-category .label.link" ).append( " <span class='filter__subcount'>( " + n + " )</span>" );
                  $( ".first-category .label.link" ).css("color","#fc0f42");
                  $( ".filter-clear" ).show();
              }
              if($('.category-filter .berocket_checked').length === 0){
                $(".first-category .filter__subcount").hide();
                $(".first-category .label.link").css("color","inherit");
              }
          }, duration);

          someAsynchronousFunction();
      });

      $('.hardware.filters ul.berocket_aapf_widget li').click(function() {
          var duration = 100;
          setTimeout(function() {
              if ( $("#hardware .berocket_label_widgets").hasClass( "berocket_checked" ) ) {
                  var nHardware = $( "#hardware .berocket_term_parent_3861 .berocket_checked" ).length;
                  $( ".berocket_term_parent_hardware:nth-child(2) label" ).append( " <span class='filter__hardware_subcount'>( " + nHardware + " )</span>" );
                  $( ".berocket_term_parent_hardware:nth-child(2) label" ).css("color","#fc0f42");
                  $( ".filter-clear" ).show();
              }
              if($('#hardware .berocket_term_parent_3861 .berocket_checked').length === 0){
                $(".berocket_term_parent_hardware:nth-child(2) .filter__hardware_subcount").hide();
                $(".berocket_term_parent_hardware:nth-child(2) label").css("color","inherit");
              }
          }, duration);

      });

      $('.sanitary.filters ul.berocket_aapf_widget li').click(function() {
          var duration = 100;
          setTimeout(function() {
              if ( $("#sanitary .berocket_label_widgets").hasClass( "berocket_checked" ) ) {
                  var nSanitary = $( "#sanitary .berocket_term_parent_4374 .berocket_checked" ).length;
                  $( ".berocket_term_parent_hardware:nth-child(3) label" ).append( " <span class='filter__sanitary_subcount'>( " + nSanitary + " )</span>" );
                  $( ".berocket_term_parent_hardware:nth-child(3) label" ).css("color","#fc0f42");
                  $( ".filter-clear" ).show();
              }
              if($('#sanitary .berocket_term_parent_4374 .berocket_checked').length === 0){
                $(".berocket_term_parent_hardware:nth-child(3) .filter__sanitary_subcount").hide();
                $(".berocket_term_parent_hardware:nth-child(3) label").css("color","inherit");
              }
          }, duration);

      });
      if ( $("#wrapper").hasClass( "single-product" ) ) {
          if (window.location.href.indexOf('reload')==-1) {
      window.location.replace(window.location.href+'#');
       }
      }
      if ( $("#wrapper").hasClass( "shop-page" ) ) {
          if (window.location.href.indexOf('reload')==-1) {
      window.location.replace(window.location.href+'#');
       }
      }


      function detectIE() {
        var ua = window.navigator.userAgent;

        // Test values; Uncomment to check result …

        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

        // Edge 12 (Spartan)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

        // Edge 13
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
          // IE 10 or older => return version number
          return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
          // IE 11 => return version number
          var rv = ua.indexOf('rv:');
          return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
          // Edge (IE 12+) => return version number
          return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
      }

      if (detectIE()) {
        $('body').addClass('is-ie');
      }
    };


    return GlobalInitialization;

});
