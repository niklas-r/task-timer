(function (angular) {
  'use strict';
  var app;

  app = angular.module('taskTimer.clock', []);

  // @ngInject
  function ClockFactory ($rootScope) {
    var _intervalId,
        _intervalDelay,
        _intervalStartTime;

    function Clock (label, timeDirection) {
      // TODO: throw on missing timeDirection
      // TODO: throw if function is not called with `new` keyword
      this.time = 0;
      this.label = label;
      this.timeDirection = timeDirection;
      this.state = 'stopped';

      // Default interval delay
      _intervalDelay = 200;
    }

    Clock.prototype.start = function() {
      // Update state
      this.state = 'ticking';

      // Get time at interval start. This will be used when pausing the timer.
      _intervalStartTime = new Date().getTime();

      _intervalId = setInterval(

        function () {

          // Get new time on each tick
          _intervalStartTime = new Date().getTime();

          // Tick clock
          this.tick(200);

        }.bind(this),

        _intervalDelay
      );
    };

    Clock.prototype.tick = function (milliseconds) {

      switch ( this.timeDirection ) {

        case 'increase':
          this.time += milliseconds;
          break;

        case 'decrease':
          this.time -= milliseconds;
          break;

      }

      $rootScope.$apply();
    };

    Clock.prototype.pause = function() {
      var timeAtPause,
          timeSinceLastTick;

      // Cancel current interval
      clearInterval(_intervalId);

      // Update state
      this.state = 'paused';

      // Get current time
      timeAtPause = new Date().getTime();

      timeSinceLastTick = timeAtPause - _intervalStartTime;

      this.tick(timeSinceLastTick);
    };

    Clock.prototype.unpause = function() {
      this.start();
    };

    return Clock;
  }

  app.factory('Clock', ClockFactory);

}(angular));