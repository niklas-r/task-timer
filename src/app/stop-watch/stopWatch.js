(function (angular) {
  'use strict';
  var app;

  app = angular.module('taskTimer.stopWatch', []);

  // @ngInject
  function StopWatchFactory ($timeout) {

    function StopWatch () {
      this.elapsedTime = 0;
    }

    StopWatch.prototype.start = function () {
      $timeout(
        (function () {
          this.elapsedTime += 1000;
        }).apply(this),
      1000);
    };

    return StopWatch;
  }

  app.factory('StopWatch', StopWatchFactory);

}(angular));