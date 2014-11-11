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

    api.create = function createStopWatch () {
      var stopWatch;

      stopWatch = clock.create({ countUp: true });

      return stopWatch;
    };

    return api;
  }

  stopWatchModule.factory('stopWatch', stopWatchFactory);

}(angular));