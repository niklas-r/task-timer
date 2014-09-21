(function (angular) {
  'use strict';
  var app;

  app = angular.module('taskTimer.stopWatch', [
    'taskTimer.clock'
  ]);

  /**
   * The StopWatch class
   * @typedef {object} Clock.StopWatch
   */

  /**
   * StopWatch factory
   * @param {Clock} Clock The Clock class
   * @return {Clock.StopWatch}
   */
  function StopWatchFactory (Clock) {

    /**
     * Creates a StopWatch
     * @constructor
     * @extends Clock
     * @param {string} label A descriptive label
     */
    function StopWatch (label) {
      Clock.call(this, label, true);
    }

    StopWatch.prototype = Object.create(Clock.prototype);
    StopWatch.prototype.constructor = StopWatch;

    return StopWatch;
  }

  app.factory('StopWatch', StopWatchFactory);

}(angular));