(function (angular) {
  'use strict';
  var timeTrackerModule;

  timeTrackerModule = angular.module('taskTimer.timeTracker', []);

  timeTrackerModule.factory('timeTracker', timeTrackerFactory);
  /**
   * Timer factory
   * @return {object}
   */
  function timeTrackerFactory () {
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

    api.create = function createTimer() {
      var timeTracker,
          _timeTrackerModel;

      _timeTrackerModel = {
        hr: 0,
        min: 0,
        sec: 0,
        ms: 0
      };

      /**
       * Time tracker object
       * @typedef {object} timeTracker
       * @property {number} hr  Tracked hours
       * @property {number} min Tracked minuters
       * @property {number} sec Tracked seconds
       * @property {number} ms  Tracked milliseconds
       * @function toString Returns a formated string of the tracked time
       */
      timeTracker = {
        //////////
        // Hour //
        //////////
        get hr() {
          return _timeTrackerModel.hr;
        },
        set hr(newHr) {
          updateTimeProperty('hr', newHr, MS_IN_ONE_HOUR, _timeTrackerModel);
        },
        ////////////
        // Minute //
        ////////////
        get min() {
          return _timeTrackerModel.min;
        },
        set min(newMin) {
          updateTimeProperty('min', newMin, MS_IN_ONE_MINUTE, _timeTrackerModel);
        },
        ////////////
        // Second //
        ////////////
        get sec() {
          return _timeTrackerModel.sec;
        },
        set sec(newSec) {
          updateTimeProperty('sec', newSec, MS_IN_ONE_SECOND, _timeTrackerModel);
        },
        /////////////////
        // Millisecond //
        /////////////////
        get ms() {
          return _timeTrackerModel.ms;
        },
        set ms(newMs) {
          _timeTrackerModel.ms = newMs;

          // Convert tracked milliseconds to hours
          _timeTrackerModel.hr = Math.floor(newMs / MS_IN_ONE_HOUR);
          // Subtract tracked hours (in ms) from newly added ms
          newMs -= ( _timeTrackerModel.hr * MS_IN_ONE_HOUR );

          // Continue to convert and set whole minutes
          _timeTrackerModel.min = Math.floor(newMs / MS_IN_ONE_MINUTE);
          // Subtract tracked minutes (in ms)
          newMs -= ( _timeTrackerModel.min * MS_IN_ONE_MINUTE );

          // Finally convert rest of milliseconds to whole seconds
          _timeTrackerModel.sec = Math.floor(newMs / MS_IN_ONE_SECOND);
        },
        toString: function () {
          return (
            padNum(_timeTrackerModel.hr) +
            _delimiter +
            padNum(_timeTrackerModel.min) +
            _delimiter +
            padNum(_timeTrackerModel.sec)
          );
        }
      };

      return Object.seal(timeTracker);
    };

    return api;
  }

}(angular));