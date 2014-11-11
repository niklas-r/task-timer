(function (angular) {
  'use strict';
  var clockModule;

  clockModule = angular.module('taskTimer.clock', []);

  /**
   * A clock factory from which new clocks can be instantiated
   * @param {angular.$rootScope} $rootScope
   * @param {timer} timer
   * @ngInject
   * @return {clock}
   */
  function clockFactory ($rootScope, timer) {
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
      clock.time = timer.create();

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
       *                              to clock.time.ms
       */
      clock.tick = function (milliseconds) {

        if ( clock.countUp ) {
          clock.time.ms += milliseconds;
        } else {
          clock.time.ms -= milliseconds;
        }

        // TODO: Replace this with $evalAsync because checking $$phase is hacky
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

  /**
   * Timer factory
   * @return {timer}
   */
  function timerFactory () {
    var api,
        _delimiter,
        MS_IN_ONE_HOUR,
        MS_IN_ONE_MINUTE,
        MS_IN_ONE_SECOND;

    /** @constant {number} */
    MS_IN_ONE_SECOND = 1000;
    /** @constant {number} */
    MS_IN_ONE_MINUTE = MS_IN_ONE_SECOND * 60;
    /** @constant {number} */
    MS_IN_ONE_HOUR = MS_IN_ONE_MINUTE * 60;

    _delimiter = ':';

    api = {};

    function updateTimeProperty(key, newValue, msConstant, time) {
      var oldValue,
          oldValueInMs,
          newValueInMs;

      // Store old value
      oldValue = time[key];
      newValue = parseInt(newValue, 10);

      // Convert values to ms
      oldValueInMs = oldValue * msConstant;
      newValueInMs = newValue * msConstant;

      // Update properties
      time.ms = time.ms - oldValueInMs + newValueInMs;
      time[key] = newValue;
    }

    function padNum (num) {
      if ( num < 10) {
        return '0' + num;
      } else {
        return num;
      }
    }

    api.create = function () {
      var timeObject,
          _time;

      _time = {
        __constructor__: 'timer',
        hr: 0,
        min: 0,
        sec: 0,
        ms: 0
      };

      /**
       * Timer object
       * @typedef {object} timer
       * @property {number} hr  Tracked hours
       * @property {number} min Tracked minuters
       * @property {number} sec Tracked seconds
       * @property {number} ms  Tracked milliseconds
       * @function toString Returns a formated string of the tracked time
       */
      timeObject = {
        //////////
        // Hour //
        //////////
        get hr() {
          return _time.hr;
        },
        set hr(newHr) {
          updateTimeProperty('hr', newHr, MS_IN_ONE_HOUR, _time);
        },
        ////////////
        // Minute //
        ////////////
        get min() {
          return _time.min;
        },
        set min(newMin) {
          updateTimeProperty('min', newMin, MS_IN_ONE_MINUTE, _time);
        },
        ////////////
        // Second //
        ////////////
        get sec() {
          return _time.sec;
        },
        set sec(newSec) {
          updateTimeProperty('sec', newSec, MS_IN_ONE_SECOND, _time);
        },
        /////////////////
        // Millisecond //
        /////////////////
        get ms() {
          return _time.ms;
        },
        set ms(newMs) {
          _time.ms = newMs;

          // Convert tracked milliseconds to hours
          _time.hr = Math.floor(newMs / MS_IN_ONE_HOUR);
          // Subtract tracked hours (in ms) from newly added ms
          newMs -= ( _time.hr * MS_IN_ONE_HOUR );

          // Continue to convert and set whole minutes
          _time.min = Math.floor(newMs / MS_IN_ONE_MINUTE);
          // Subtract tracked minutes (in ms)
          newMs -= ( _time.min * MS_IN_ONE_MINUTE );

          // Finally convert rest of milliseconds to whole seconds
          _time.sec = Math.floor(newMs / MS_IN_ONE_SECOND);
        },
        toString: function () {
          return (
            padNum(_time.hr) +
            _delimiter +
            padNum(_time.min) +
            _delimiter +
            padNum(_time.sec)
          );
        }
      };

      return Object.seal(timeObject);
    };

    return api;
  }

  clockModule.factory('clock', clockFactory);
  clockModule.factory('timer', timerFactory);

}(angular));