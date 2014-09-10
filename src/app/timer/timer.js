(function (angular) {
  'use strict';
  var app;

  app = angular.module('taskTimer.timer', []);

  function TimerFactory () {
    function Timer () {

    }

    return Timer;
  }

  app.factory('Timer', TimerFactory);

}(angular));