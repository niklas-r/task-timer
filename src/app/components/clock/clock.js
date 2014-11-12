(function (angular) {
  'use strict';
  var timerModule;

  timerModule = angular.module('taskTimer.timer', [
    'taskTimer.timeTracker'
  ]);

  timerModule.factory('timer', timerFactory);
  /**
   * A timer factory from which new timers can be created
   * @param {angular.$rootScope} $rootScope
   * @param {timeTracker} timeTracker
   * @ngInject
   * @return {object}
   */
  function timerFactory ($rootScope, timeTracker) {
    var api;

    api = {};

    /**
     * The timer settings object
     * @typedef {object} timerSettings
     * @property {boolean} countUp       Indicates wether the timer counts up or
     *                                   down
     */

    /**
     * Creates a new timer
     * @param  {timerSettings} timer settings object
     */
    api.create = function createTimer(settings) {
      var _intervalDelay,
        _countUp,
        _startTimestamp,
        _intervalId,
        _state,
        _trackedTime,
        timer;

      // Private
      _startTimestamp = null;
      _intervalId = null;
      _intervalDelay = 200;
      _state = 'stopped';
      _trackedTime = timeTracker.create();
      _countUp = settings.countUp;

      /** Start ticking time */
      function startTimer() {
        var _callTick;

        // Update state
        _state = 'ticking';

        // Get time at interval start. This will be used when pausing the timer.
        _startTimestamp = new Date().getTime();

        _callTick = function () {

          // Get new time on each tick
          _startTimestamp = new Date().getTime();

          // Tick clock
          tickTimer(200);
        };

        _intervalId = setInterval(
          _callTick,
          _intervalDelay
        );
      }

      /**
       * Tick time
       * @param {number} milliseconds Amount of time in milliseconds to be added
       *                              to timer.trackedTime.ms
       */
      function tickTimer (milliseconds) {

        if ( _countUp ) {
          _trackedTime.ms += milliseconds;
        } else {
          _trackedTime.ms -= milliseconds;
        }

        // TODO: Replace this with $evalAsync because checking $$phase is hacky
        if ( !$rootScope.$$phase ) {
          $rootScope.$apply();
        }

      }

      /** Pauses a ticking clock */
      function pauseTimer () {
        var timeAtPause,
            timeSinceLastTick;

        // Cancel current interval
        window.clearInterval(_intervalId);

        // Update state
        _state = 'paused';

        // Get current time
        timeAtPause = new Date().getTime();

        timeSinceLastTick = timeAtPause - _startTimestamp;

        tickTimer(timeSinceLastTick);
      }

      /**
       * Public timer object
       * @namespace
       */
      timer = {

        /**
         * Clock state
         * @type {string}
         */
        get state() {
          return _state;
        },

        /**
         * Tracked time
         * @type {timeTracker}
         */
        get trackedTime() {
          return _trackedTime;
        },

        start: startTimer,

        tick: tickTimer,

        pause: pauseTimer,

        unpause: startTimer
      };

      return Object.seal(timer);
    };

    return api;
  }

}(angular));