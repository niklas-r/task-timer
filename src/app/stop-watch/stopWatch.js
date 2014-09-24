(function (angular) {
  'use strict';
  var app;

  app = angular.module('taskTimer.stopWatch', [
    'taskTimer.clock'
  ]);

  // TODO: add jsdoc comments
  function stopWatchFactory (clock) {

    return function stopWatchConstructor (settings) {
      var _settings,
          stopWatch;

      _settings = angular.copy(settings);
      _settings.countUp = true;

      stopWatch = clock(_settings);

      return stopWatch;
    };

  }

  app.factory('stopWatch', stopWatchFactory);

}(angular));