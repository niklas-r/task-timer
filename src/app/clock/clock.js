(function (angular) {
  'use strict';
  var app;

  app = angular.module('taskTimer.clock', []);
  /**
   * The Clock class
   * @typedef {object} Clock
   * @property {string} label          A descriptive label
   * @property {boolean} countUp       Indicates wether the clock counts up or
   *                                   down
   * @property {number} time           Tracked time
   * @property {string} state          State of the Clock
   */

  /**
   * A clock factory from which new clocks can be instantiated
   * @param {angular.$rootScope} $rootScope
   * @ngInject
   * @return {Clock} clock class
   */
  function clockFactory ($rootScope) {
    return function clockConstructor(settings) {
      var _intervalDelay,
        _startTimestamp,
        _intervalId,
        _settings,
        clock;

      // Private
      _settings = angular.copy(settings);
      _startTimestamp = null;
      _intervalId = null;
      _intervalDelay = 200;

      // Public object
      clock = {};

      // Public properties
      clock.label = settings.label;
      clock.countUp = settings.countUp;
      clock.time = 0;
      clock.state = 'stopped';

      /** Start ticking time */
      clock.start = function() {
        var _callTick;

        // Update state
        clock.state = 'ticking';

        // Get time at interval start. This will be used when pausing the timer.
        _startTimestamp = new Date().getTime();

        _callTick = function () {

          // Get new time on each tick
          _startTimestamp = new Date().getTime();

          // Tick clock
          clock.tick(200);
        };

        _intervalId = setInterval(
          _callTick,
          _intervalDelay
        );
      };

      /**
       * Tick time
       * @param  {number} milliseconds Amount of time in milliseconds to be added
       *                               to clock.time.
       */
      clock.tick = function (milliseconds) {

        if ( clock.countUp ) {
          clock.time += milliseconds;
        } else {
          clock.time -= milliseconds;
        }

        if ( !$rootScope.$$phase ) {
          $rootScope.$apply();
        }
      };

      /**
       * Pauses a ticking clock
       */
      clock.pause = function() {
        var timeAtPause,
            timeSinceLastTick;

        // Cancel current interval
        clearInterval(_intervalId);

        // Update state
        clock.state = 'paused';

        // Get current time
        timeAtPause = new Date().getTime();

        timeSinceLastTick = timeAtPause - _startTimestamp;

        clock.tick(timeSinceLastTick);
      };

      /**
       * Unpauses a paused clock
       */
      clock.unpause = function() {
        clock.start();
      };

      return clock;
    };
  }

  app.factory('clock', clockFactory);

}(angular));