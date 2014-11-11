(function (angular) {
  'use strict';
  var timerModule;

  timerModule = angular.module('taskTimer.timer', []);

  timerModule.factory('timer', timerFactory);
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

}(angular));