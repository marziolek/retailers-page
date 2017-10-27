// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

require('./vendor/modernizr.min.js');
var $ = require('./vendor/jquery-3.2.1.min.js');
window.jQuery = window.$ = $;

//require('./vendor/jquery.gray.js');
require('./vendor/pubsub.js');
var Barba = require('./vendor/barba.min.js');
window.Tween = require('./vendor/TweenMax.min.js');
var svg4Everybody = require('./vendor/SVG4Everybody.min.js');
var StateService = require('./services/state.js');

var globalInit = require('./architecture/global-initialization.js');


$(function() {
  svg4Everybody();
  var stateService = new StateService();
  var state = stateService.getState();
  state.firstPageLoad = true;
  globalInit();

  var $pageLoadSplash = $('.page-load-splash');
  var $barbaWrapper = $('#barba-wrapper');

  /*
    Define the load animation for Barba to animate page transitions
  */
  var HideShowTransition = Barba.BaseTransition.extend({
    start: function() {
      console.log('barba page animation');
      var self = this;
      var newPageLoaded = false;
      var animateOutDone = false;

      var onAnimationInComplete = function () {

      };

      var animateIn = function () {
        document.body.scrollTop = 0;
        $(window).scrollTop(0);
        self.done();
        globalInit();
        $barbaWrapper.css('width', '100%');
        $barbaWrapper.css('position', 'relative');
        $pageLoadSplash.css('z-index', '10');
        Tween.to($pageLoadSplash, 0.6, {width: '0%', onComplete:onAnimationInComplete});
      }

      var onAnimationOutComplete = function () {
        animateOutDone = true;

        if (animateOutDone && newPageLoaded) {
          animateIn();
        }
      };

      // Animate overlay on top of the page
      $pageLoadSplash.css('z-index', '-1');
      $pageLoadSplash.css('width', '100%');
      //$barbaWrapper.css('position', 'fixed');
      Tween.to($barbaWrapper, 1, {width: '0%', onComplete:onAnimationOutComplete});

      this.newContainerLoading.then(function () {
        newPageLoaded = true;

        if (animateOutDone && newPageLoaded) {
          animateIn();
        }
      });
    }
  });

  var showRandomSplashBreaker = function () {
    // Determine random page load splash icon
    var $icons = $pageLoadSplash.find('.page-load-splash__breakers .breaker');
    $icons.hide();
    var breakerIndex = Math.floor(Math.random() * $icons.length);
    console.log('show breaker', breakerIndex);
    $($icons[breakerIndex]).show();
  };
  showRandomSplashBreaker();

  Barba.Pjax.getTransition = function() {
    showRandomSplashBreaker();
    state.firstPageLoad = false;
    return HideShowTransition;
  };

  Barba.Pjax.start();
});
