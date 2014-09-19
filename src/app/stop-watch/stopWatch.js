(function (angular) {
  'use strict';
  var app;

  app = angular.module('taskTimer.stopWatch', [
    'taskTimer.clock'
  ]);

  // @ngInject
  function StopWatchFactory (Clock) {

    function StopWatch () {
      Clock.call(this, 'increase');
    }

    StopWatch.prototype = Object.create(Clock.prototype);
    StopWatch.prototype.constructor = StopWatch;

    return StopWatch;
  }

  app.factory('StopWatch', StopWatchFactory);

}(angular));