(function (angular) {
  'use strict';
  var stopWatchModule;

  stopWatchModule = angular.module('taskTimer.timer.stopWatch', [
    'taskTimer.timer'
  ]);

  /**
   * Stop watch factory
   * @param {timer} timer
   * @ngInject
   * @return {stopWatch}
   */
  function stopWatchFactory (timer) {
    var api;

    api = {};

    api.create = function createStopWatch () {
      var stopWatch;

      stopWatch = timer.create({ countUp: true });

      return stopWatch;
    };

    return api;
  }

  stopWatchModule.factory('stopWatch', stopWatchFactory);

}(angular));