'use strict';

describe('module: taskTimer.stopWatch', function () {

  beforeEach(module('taskTimer.stopWatch'));

  describe('class: StopWatch', function () {
    var $timeout,
        StopWatch,
        stopWatch;

    beforeEach(module(function($provide) {
      $provide.decorator('$timeout', function($delegate) {
        return sinon.spy($delegate);
      });
    }));

    beforeEach(inject(function (_$timeout_, _StopWatch_) {
      $timeout = _$timeout_;
      StopWatch = _StopWatch_;
      stopWatch = new StopWatch();

      this.clock = sinon.useFakeTimers();
    }));

    afterEach(function () {
      this.clock.reset();
    });

    it('should be a class', function () {
      expect(stopWatch).to.be.an.instanceof(StopWatch);
    });

    it('should have an elapsed time', function () {
      expect(stopWatch.elapsedTime).to.equal(0);
    });

    it('should start the stop watch', function () {
      expect(stopWatch.start).to.be.a("function");
    });

    it('should tick and tock', function () {
      stopWatch.start();

      expect($timeout.callCount).to.equal(1);
      expect($timeout.args[0][1]).to.equal(1000);

      this.clock.tick(1000);

      expect(stopWatch.elapsedTime).to.equal(1000);
    });
  });
});