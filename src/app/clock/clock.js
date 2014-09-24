(function (angular) {
  'use strict';
  var app;

  app = angular.module('taskTimer.clock', []);
  /**
   * A clock factory from which new clocks can be instantiated
   * @param {angular.$rootScope} $rootScope
   * @ngInject
   * @return {clock}
   */
  function clockFactory ($rootScope) {
    /**
     * The clock settings object
     * @typedef {object} clockSettings
     * @property {string} label          A descriptive label
     * @property {boolean} countUp       Indicates wether the clock counts up or
     *                                   down
     */

    /**
     * clock constructor
     * @param  {clockSettings} clock settings object
     */
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

      /**
       * Public clock object
       * @namespace
       */
      clock = {};

      /** @type {clockSettings.label} */
      clock.label = settings.label;

      /** @type {clockSettings.countUp} */
      clock.countUp = settings.countUp;

      /**
       * Tracked time
       * @type {number}
       */
      clock.time = 0;

      /**
       * Clock state
       * @type {string}
       */
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
       * @param {number} milliseconds Amount of time in milliseconds to be added
       *                              to clock.time.
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