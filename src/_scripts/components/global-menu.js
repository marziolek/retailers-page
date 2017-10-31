;(function(root, globalMenu) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register fadePager as an anonymous module
        define(globalHeader);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = globalMenu();
    } else {
        // Browser globals. Register component on window
        root.GlobalMenu = globalMenu();
    }
})(this, function() {
  'use strict';

  var throttle = require('../vendor/lodash/function/throttle.js');
  var ShiftSlider = require('./shift-slider.js');
  var globalVariables = require('./global-variables.js');
  var Search = require('./search.js');
  var SearchService = require('../services/search-service.js');

  var GlobalMenu = function($elem) {
    var isOpen = false;
    var isSearchOpen = false;
    var selectedKey = null;
    var globalVars = globalVariables();
    var shiftSlider;
    var $burgerLine = $elem.find('.burger-line');
    var $page = $elem.find('.global-menu__page');
    var $curtain = $elem.find('.global-menu__curtain');
    var $nav = $elem.find('.global-menu__nav');
    var $search = $elem.find('.global-menu__search');
    var $backdropSpacer = $elem.find('.global-menu__backdrop-spacer');
    var search;

    var measure = function () {
      var pageTranslation = 0;

      // Desktop menu
      if ($(window).outerWidth() >= globalVars.breakPoints.large) {
        pageTranslation = $backdropSpacer.outerHeight();
        //$('body').css('overflow', 'unset');

        // If the search is opening animate the menu to full screen
        if (isSearchOpen) {
          pageTranslation = $(window).height() - pageTranslation;
          $search.height(pageTranslation);
          var searchPageTranslation = $(window).height() - $backdropSpacer.outerWidth();
          $page.css('transform', 'translateY(' + searchPageTranslation + 'px)');
        } else {
            $page.css('transform', 'translateY(' + pageTranslation + 'px)');
        }
        $elem.css('padding-bottom', pageTranslation + 'px');

      } else { // Mobile menu
        pageTranslation = $(window).height() - $curtain.outerHeight() + 60; // the 60 is to compensate for the navbar on mobile devices
        $nav.height(pageTranslation);
        $elem.height(pageTranslation);
        $page.css('transform', 'translateY(' + pageTranslation + 'px)');
      }

      if (isSearchOpen) {
        setTimeout(search.measure, 1);
      }
    };

    var openSearch = function () {
      isSearchOpen = true;
      selectedKey = null;
      $search.css('opacity', '1');
      $elem.addClass('global-menu--search-open');
      $elem.find('.global-menu__key').removeClass('global-menu__key--selected');
      shiftSlider.clearData();
      $search.find('.search__input').focus();
      open();
      // If menu is not open, open it first
      if (!isOpen) {
        // Display the search content
        //open();
      } else {
        // animate navigation away and display search
      }
    };

    var closeSearch = function (keepMenuOpen) {
      isSearchOpen = false;
      $elem.removeClass('global-menu--search-open');
      //$('body').css('overflow', 'auto');

      if (!keepMenuOpen) {
        close();
      } else {
        measure();
      }
    };

    var toggleSearch = function () {
      isSearchOpen ? closeSearch() : openSearch();
    };

    var removeScrollBlock = function () {
      $('html, body').css('overflow', 'auto');
      $('html, body').css('height', 'auto');
      console.log('REMOVE body overflow hidden');
    };

    var open = function () {
      measure();
      $elem.addClass('global-menu--open');
      $('html, body').css('overflow', 'hidden');
      $('html, body').css('height', '100vh');
      console.log('SET body overflow hidden');
      isOpen = true;
      $burgerLine.addClass('burger__line__closed');

      setTimeout(function () {
        $elem.addClass('global-menu--short-delay');
      }, 500);

      $elem.on('click', 'a', removeScrollBlock);
    };

    var close = function () {
      $elem.removeClass('global-menu--open');
      $elem.css('padding-bottom', 0);
      $page.css('transform', 'translateY(0)');
      $nav.height('auto');
      $elem.height('auto');
      removeScrollBlock();
      $('html, body').css('position', 'static');
      $burgerLine.removeClass('burger__line__closed');
      $elem.find('.global-menu__key').removeClass('global-menu__key--selected');
      isOpen = false;

      setTimeout(function () {
        $elem.removeClass('global-menu--short-delay');
        $search.css('opacity', '0');
      }, 500);

      $elem.off('click', 'a', removeScrollBlock);
    };

    var toggle = function () {
      isOpen ? close() : open();
    };

    var navKeyClick = function (event) {
      event.preventDefault();
      var $navKey = $(event.target);
      var key = $navKey.data('nav-item-key');

      var handleClick = function () {
        if (selectedKey !== key) {
          selectedKey = key;
          $search.css('opacity', 0);
          $elem.find('.global-menu__key').removeClass('global-menu__key--selected');

          $navKey.addClass('global-menu__key--selected');
          // Get sub navs
          var subNavData = $nav.find('[data-nav-item-key="' + key + '"] .global-menu__sub-nav-item');
          shiftSlider.setData(subNavData, isSearchOpen ? false : isOpen);

          if (!isOpen) {
            open();
          }

          closeSearch(true);
        } else {
          $elem.find('.global-menu__key').removeClass('global-menu__key--selected');
          selectedKey = null;
          close();
        }
      };

      // If the clicked nav contains sub nav open/close it and wait for page intro coordination.
      // Else just navigate.
      if (key) {
        // If the page intro is open, close it before opening the global menu
        var pageIntro = $('.page-intro');
        if(pageIntro.length > 0 && !pageIntro.hasClass('page-intro--dismissed') && $(window).outerWidth() >= globalVars.breakPoints.large) {
          // If the page intro is open, close it before opening the global menu
          window.PubSub.publish('page-intro:do-close');
          setTimeout(handleClick, 600);
        } else {
          handleClick();
        }
      }
    };

    var onResize = function () {
      if (isOpen) {
        measure();
      }
    }

    var initialize = function () {
      var throttledOnResize = throttle(onResize, 50, {leading: false});
      $(window).on('resize', throttledOnResize);

      // Initialize the search component
      var searchService = new SearchService();
      search = new Search($elem.find('.search'), {
        search: searchService.search
      });

      // Initialize ShiftSlider
      shiftSlider = new ShiftSlider($elem.find('.shift-slider'));
      $elem.find('.global-menu__shift-prev').click(shiftSlider.shiftLeft);
      $elem.find('.global-menu__shift-next').click(shiftSlider.shiftRight);

      $elem.find('.global-menu__key').click(navKeyClick);
      $elem.find('.global-menu__mobile-toggle').click(toggle);

      // In mobile menu expand sub navs when nav items are clicked
      $elem.find('.global-menu__nav-item').each(function () {
        var $thisNavItem = $(this);
        var isSubNavExpanded = false;
        var $subNav = $thisNavItem.find('.global-menu__sub-nav');
        var $subNavInner = $thisNavItem.find('.global-menu__sub-nav-inner');

        $thisNavItem.find('[data-sub-nav-toggle]').click(function () {
          if (isSubNavExpanded) {
            $subNav.height(0);
            isSubNavExpanded = false;
            $thisNavItem.removeClass('open');

            setTimeout(function () {
              $thisNavItem.removeClass('border');
            }, 550);
          } else {
            $subNav.height($subNavInner.height());
            isSubNavExpanded = true;
            $thisNavItem.addClass('open');
            $thisNavItem.addClass('border');
          }
        });

      });

      $elem.find('[data-search-close]').click(function () {
        //$elem.find('.global-menu__key').first().click();
        closeSearch(false);
      });

      var pageIntro = $('.page-intro');
      // Add search toggle handler
      $elem.find('[data-search-toggle]').click(function () {
        // If the page intro is open, close it before opening the global menu
        if(pageIntro.length > 0 && !pageIntro.hasClass('page-intro--dismissed') && $(window).outerWidth() >= globalVars.breakPoints.large) {
          // If the page intro is open, close it before opening the global menu
          window.PubSub.publish('page-intro:do-close');
          setTimeout(toggleSearch, 600);
        } else {
          toggleSearch();
        }
      });

      // If there is a page intro on the current page, add the toggle arrow to the menu
      if (pageIntro.length > 0) {
        $elem.addClass('global-menu--has-page-intro');

        $elem.find('.page-intro-toggle').click(function () {
          window.PubSub.publish('page-intro:do-toggle');
        });
      }

      $elem.find('.global-menu__page-shadow').click(close);
    };
    initialize();
  };

  return GlobalMenu;
});
