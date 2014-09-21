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
   * @property {number} startTimestamp A timestamp which tells us when the clock
   *                                   was started.
   * @property {object} intervalId     ID of the internal interval
   */

  /**
   * A clock factory from which new clocks can be instantiated
   * @param {angular.$rootScope} $rootScope
   * @ngInject
   * @return {Clock} clock class
   */
  function ClockFactory ($rootScope) {
    var _intervalDelay;

    /**
     * Creates a new Clock.
     *
     * @constructor
     * @param {string} label    A descriptive label
     * @param {boolean} countUp Indicates wether the clock counts up or down
     */
    function Clock (label, countUp) {
      this.label = label;
      this.countUp = countUp;
      this.time = 0;
      this.state = 'stopped';
      this.startTimestamp = null;
      this.intervalId = null;

      // Default interval delay
      _intervalDelay = 200;
    }

    /** Start ticking time */
    Clock.prototype.start = function() {
      var _self,
          _callTick;

      // Update state
      this.state = 'ticking';

      // Store this context
      _self = this;

      // Get time at interval start. This will be used when pausing the timer.
      this.startTimestamp = new Date().getTime();

      _callTick = function () {

        // Get new time on each tick
        _self.startTimestamp = new Date().getTime();

        // Tick clock
        /**
         * NOTE: Why fn.proto.call rather than fn.proto.bind?
         * According to this jsperf http://jsperf.com/bind-vs-emulate
         * Bind is about 90% slower than call.
         */
        _self.tick.call(_self, 200);
      };

      this.intervalId = setInterval(
        _callTick,
        _intervalDelay
      );
    };

    /**
     * Tick time
     * @param  {number} milliseconds Amount of time in milliseconds to be added
     *                               to this.time.
     */
    Clock.prototype.tick = function (milliseconds) {

      if ( this.countUp ) {
        this.time += milliseconds;
      } else {
        this.time -= milliseconds;
      }

      if ( !$rootScope.$$phase ) {
        $rootScope.$apply();
      }
    };

    /**
     * Pauses a ticking clock
     */
    Clock.prototype.pause = function() {
      var timeAtPause,
          timeSinceLastTick;

      // Cancel current interval
      clearInterval(this.intervalId);

      // Update state
      this.state = 'paused';

      // Get current time
      timeAtPause = new Date().getTime();

      timeSinceLastTick = timeAtPause - this.startTimestamp;

      this.tick(timeSinceLastTick);
    };

    /**
     * Unpauses a paused clock
     */
    Clock.prototype.unpause = function() {
      this.start();
    };

    return Clock;
  }

  app.factory('Clock', ClockFactory);

}(angular));