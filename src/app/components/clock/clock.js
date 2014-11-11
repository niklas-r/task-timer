(function (angular) {
  'use strict';
  var clockModule;

  clockModule = angular.module('taskTimer.clock', [
    'taskTimer.timer'
  ]);

  clockModule.factory('clock', clockFactory);
  /**
   * A clock factory from which new clocks can be instantiated
   * @param {angular.$rootScope} $rootScope
   * @param {timer} timer
   * @ngInject
   * @return {object}
   */
  function clockFactory ($rootScope, timer) {
    var api;

    api = {};

    /**
     * The clock settings object
     * @typedef {object} clockSettings
     * @property {boolean} countUp       Indicates wether the clock counts up or
     *                                   down
     */

    /**
     * clock constructor
     * @param  {clockSettings} clock settings object
     */
    api.create = function createClock(settings) {
      var _intervalDelay,
        _countUp,
        _startTimestamp,
        _intervalId,
        _state,
        _timer,
        clock;

      // Private
      _startTimestamp = null;
      _intervalId = null;
      _intervalDelay = 200;
      _state = 'stopped';
      _timer = timer.create();
      _countUp = settings.countUp;

      /** Start ticking time */
      function startClock() {
        var _callTick;

        // Update state
        _state = 'ticking';

        // Get time at interval start. This will be used when pausing the timer.
        _startTimestamp = new Date().getTime();

        _callTick = function () {

          // Get new time on each tick
          _startTimestamp = new Date().getTime();

          // Tick clock
          tickClock(200);
        };

        _intervalId = setInterval(
          _callTick,
          _intervalDelay
        );
      }

      /**
       * Tick time
       * @param {number} milliseconds Amount of time in milliseconds to be added
       *                              to clock.timer.ms
       */
      function tickClock (milliseconds) {

        if ( _countUp ) {
          _timer.ms += milliseconds;
        } else {
          _timer.ms -= milliseconds;
        }

        // TODO: Replace this with $evalAsync because checking $$phase is hacky
        if ( !$rootScope.$$phase ) {
          $rootScope.$apply();
        }

      }

      /** Pauses a ticking clock */
      function pauseClock () {
        var timeAtPause,
            timeSinceLastTick;

        // Cancel current interval
        window.clearInterval(_intervalId);

        // Update state
        _state = 'paused';

        // Get current time
        timeAtPause = new Date().getTime();

        timeSinceLastTick = timeAtPause - _startTimestamp;

        tickClock(timeSinceLastTick);
      }

      /**
       * Public clock object
       * @namespace
       */
      clock = {

        /**
         * Clock state
         * @type {string}
         */
        get state() {
          return _state;
        },

        /**
         * Tracked time
         * @type {timer}
         */
        get timer() {
          return _timer;
        },

        start: startClock,

        tick: tickClock,

        pause: pauseClock,

        unpause: startClock
      };

      return Object.seal(clock);
    };

    return api;
  }

}(angular));