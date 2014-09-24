'use strict';

describe('module: taskTimer.stopWatch', function () {

  beforeEach(module('taskTimer.clock.stopWatch'));

  describe('object: stopWatch', function () {
    var setupClockObject;

    setupClockObject = module(function ($provide) {
      $provide.value('clock', sinon.stub());
    });

    it('should call clock constructor', function () {
      setupClockObject();

      inject(function (clock, _stopWatch_) {
        var stopWatch;

        stopWatch = _stopWatch_({
          label: 'My Stopwatch'
        });

        expect(clock).to.have.been.calledWith({
          label: 'My Stopwatch',
          countUp: true
        });
      });
    });
  });
});