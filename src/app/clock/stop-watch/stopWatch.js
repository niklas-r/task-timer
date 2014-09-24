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
    return function stopWatchConstructor (settings) {
      var _settings,
          stopWatch;

      _settings = angular.copy(settings);
      _settings.countUp = true;

      /**
       * Stop watch
       * @namespace
       */
      stopWatch = clock(_settings);

      return stopWatch;
    };

  }

  stopWatchModule.factory('stopWatch', stopWatchFactory);

}(angular));