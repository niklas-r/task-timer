(function (angular) {
  'use strict';
  var stopWatchModule;

  stopWatchModule = angular.module('taskTimer.clock.stopWatch', [
    'taskTimer.clock'
  ]);

  /**
   * Stop watch factory
   * @param {clock}
   * @ngInject
   * @return {stopWatch}
   */
  function stopWatchFactory (clock) {
    var api;

    api = {};

    /**
     * The stop watch settings object
     * @typedef {object} stopWatchSettings
     * @property {clockSettings.label}
     */

    /**
     * Stop watch constructor
     * @param  {stopWatchSettings}
     * @return {stopWatch}
     */
    api.create = function createStopWatch (settings) {
      var stopWatch;

      settings.countUp = true;

      stopWatch = clock.create(settings);

      return stopWatch;
    };

    return api;
  }

  stopWatchModule.factory('stopWatch', stopWatchFactory);

}(angular));