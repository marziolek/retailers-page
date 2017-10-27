;(function(root, pageIntro) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register fadePager as an anonymous module
        define(pageIntro);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
    	// like Node.
        module.exports = pageIntro();
    } else {
        // Browser globals. Register component on window
        root.PageIntro = pageIntro();
    }
})(this, function() {
  'use strict';

  var throttle = require('../vendor/lodash/function/throttle.js');
  var globalVariables = require('./global-variables.js');
  var StateService = require('../services/state.js');

  var PageIntro = function ($elem) {
    var $globalMenu = $('.global-menu');
    var $globalMenuBar = $globalMenu.find('.global-menu__bar');
    var $inner = $elem.find('.page-intro__inner');
    var globalVars = globalVariables();
    var isDisplayed = true;
    var lockEvents = false;
    var scrollToTopTimestamp = null;
    var scrollToTopDirection = null;

    var stateService = new StateService();
    var state = stateService.getState();

    /*
      When resizing the browser reset the global menu translation.
      If size is less that large breakpoint, remove the page-intro.
    */
    var onResize = function () {
      if ($(window).outerWidth() >= globalVars.breakPoints.large) {
        if (isDisplayed) {
          $elem.find('.page-intro__layout').outerHeight($(window).height());
          $globalMenu.css('transform', 'translateY(' + Math.round($inner.outerHeight()) + 'px)');
          $globalMenuBar.css('transform', 'translateY(-100%)');
        }

        console.log('attach scroll event');
        $(window).on('DOMMouseScroll mousewheel', throttledOnScroll);
        $(document).on('keydown', onKeynav);
        //$(document).on('touchmove', onTouchMove); // prevent iOS device scroll
      } else {
        $globalMenu.css('transform', 'translateY(0)');
        $inner.css('transform', 'translateY(-100%)');
        isDisplayed = false;

        $(window).off('DOMMouseScroll mousewheel', throttledOnScroll);
        $(document).off('keydown', onKeynav);
        $(document).off('touchmove', onTouchMove);
      }
    };
    var throttledOnResize = throttle(onResize, 50, { leading: false });


    var preventScroll = function (e) {
      e.preventDefault();
      return false;
    };

    /*
      If the screen is at the top but the user keeps scrolling up display the page intro.
      If the page intro is displayed and the user scrolls down, dismiss it.
      OBS: this method is not throttled. Because then the scroll event would pass through.
    */
    var onScroll = function (e) {
      console.log('page-intro on scroll');
      if (lockEvents) {
        console.log('scroll move - CANCELLED');
        e.preventDefault();
        return false;
      }
      // Only trigger when the window is at the top
      if ($(window).scrollTop() <= 0) {
        var direction =  e.originalEvent.wheelDelta < 0;

        var buryCurrentScrollEvent = direction && isDisplayed;

        // If scroll direction has changed, reset the timer
        if (direction !== scrollToTopDirection) {
          scrollToTopTimestamp = e.originalEvent.timeStamp;
        }
        scrollToTopDirection = direction;

        // If the user has consistently scrolled the same direction for more than 150 ms, toggle the page intro
        /*if (!direction && (e.originalEvent.timeStamp - scrollToTopTimestamp) > 150 && !isDisplayed) {
          display();
        } else if (direction && isDisplayed) {
          dismiss();

          // For the next 1.5 seconds, prevent all scrolling.
          // This is done to prevent the momentum on touch pads from keep scrolling the page.
          $(document).on('DOMMouseScroll mousewheel', preventScroll);
          setTimeout(function () {
            $(document).off('DOMMouseScroll mousewheel', preventScroll);
          }, 1500);
        }*/

        if (direction && isDisplayed) {
          dismiss();

          // For the next 1.5 seconds, prevent all scrolling.
          // This is done to prevent the momentum on touch pads from keep scrolling the page.
          $(document).on('DOMMouseScroll mousewheel', preventScroll);
          setTimeout(function () {
            $(document).off('DOMMouseScroll mousewheel', preventScroll);
          }, 1200);
        }

        if (buryCurrentScrollEvent) {
          return false;
        }
      } else {
        scrollToTopTimestamp = null;
        scrollToTopDirection = null;
      }

      if (isDisplayed) {
        return false;
      }
    };
    var throttledOnScroll = onScroll;

    /*
      Handles when the user uses arrow keys to scroll
    */
    var onKeynav = function (e) {
      if (lockEvents) {
        return false;
      }
      if (e.keyCode === 40) {
        if (isDisplayed) {
          // The dismiss function has to be called in a timeout, else the event unbinding
          // in the dismiss function will make the current event bubble up as a scroll event.
          dismiss();
          return false;
        }
      } else if (e.keyCode === 38) {
        if ($(window).scrollTop() === 0 && !isDisplayed) {
          display();
          return false;
        }
      }
    };


    var ts;
    var onTouchStart = function (e) {
      ts = e.originalEvent.touches[0].clientY;
    };

    var onTouchMove = function (e) {
      console.log('touch move');
      if (lockEvents) {
        return false;
      }

      var te = e.originalEvent.changedTouches[0].clientY;
      if (ts > te + 20){
        if (isDisplayed) {
          dismiss();
        }
      } else if(ts < te - 20){
         if ($(window).scrollTop() === 0 && !isDisplayed) {
           display();
         }
      }

      if (isDisplayed) {
        return false;
      }
    };

    /*
      Animate the page intro out
    */
    var dismiss = function (hardDismiss) {
      if (!isDisplayed) {
        return;
      }

      lockEvents = true; // This will disable arrow keys or scroll events till the animation is done.
      isDisplayed = false;

      $elem.addClass('page-intro--dismissed'); // This class is not used for any styling. It is used by the global menu to detect wether the page intro is visible or not.
      $globalMenu.removeClass('global-menu--intro');
      window.Tween.to($globalMenuBar, hardDismiss ? 0 : 0.5, {yPercent: '100%'});
      window.Tween.to($inner, hardDismiss ? 0 : 0.5, {yPercent: '-100%', clearProps:"yPercent"});
      window.Tween.to($globalMenu, hardDismiss ? 0 : 0.5, {y: '0px', clearProps:"y", onComplete:function () {
        $('body').css('overflow', 'auto');
        lockEvents = false;

        window.PubSub.publish('global:revalidate-images');
      }});

      $(window).off('DOMMouseScroll mousewheel', throttledOnScroll);
      $(document).off('touchmove', onTouchMove);
    };

    /*
      Animate the page intro in
    */
    var display = function () {
      if (isDisplayed || $globalMenu.hasClass('global-menu--open')) {
        return;
      }

      $elem.removeClass('page-intro--dismissed');
      $globalMenu.addClass('global-menu--intro');
      $(window).scrollTop(0);
      lockEvents = true; // This will disable arrow keys or scroll events till the animation is done.
      isDisplayed = true;
      $('body').css('overflow', 'hidden');
      window.Tween.to($globalMenuBar, 0.5, {yPercent: '0%'});
      window.Tween.fromTo($inner, 0.5, {yPercent: '-100%'}, {yPercent: '0%'});
      window.Tween.to($globalMenu, 0.5, {y: Math.round($inner.outerHeight()) + 'px', onComplete:function () {
        lockEvents = false;
      }});

      $(window).on('DOMMouseScroll mousewheel', throttledOnScroll);
      $(document).on('touchmove', onTouchMove);
    };

    var initialize = function () {

      if ($(window).outerWidth() >= globalVars.breakPoints.large) {
        // Force the screen to the top
        $(window).scrollTop(0);
        $('body').css('overflow', 'hidden');

        $(window).on('DOMMouseScroll mousewheel', throttledOnScroll);
        $(document).on('keydown', onKeynav);
        $(document).bind('touchstart', onTouchStart);
        $(document).on('touchmove', onTouchMove); // prevent iOS device scroll
      }

      onResize();

      // Setup on resize event handler
      $(window).on('resize', throttledOnResize);

      if (!state.firstPageLoad) {
        dismiss(true);
      } else {
        $globalMenu.addClass('global-menu--intro');
      }

      window.PubSub.subscribe('page-intro:do-close', function () {
        dismiss();
      });

      window.PubSub.subscribe('page-intro:do-toggle', function () {
        isDisplayed ? dismiss() : display();
      });
    };
    initialize();
  };

  return PageIntro;
});
