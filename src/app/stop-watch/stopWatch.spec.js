'use strict';

describe('module: taskTimer.stopWatch', function () {

  beforeEach(module('taskTimer.stopWatch'));

  describe('class: StopWatch', function () {
    var setupClockClass;

    setupClockClass = module(function ($provide) {
      $provide.value('Clock', sinon.stub());
    });

    it('should have Clock as super class', function () {
      setupClockClass();

      inject(function (Clock, StopWatch) {
        var stopWatch;

        stopWatch = new StopWatch('my label');

        expect(stopWatch).to.be.an.instanceof(Clock);
      });
    });

    it('should call Clock properly', function () {
      setupClockClass();

      inject(function (Clock, StopWatch) {
        var stopWatch;

        stopWatch = new StopWatch('my label');

        expect(Clock).to.have.been.calledWith('my label', true);
      });
    });

    it('should be its own class', function () {
      setupClockClass();

      inject(function (StopWatch) {
        var stopWatch;

        stopWatch = new StopWatch();

        expect(stopWatch).to.be.an.instanceof(StopWatch);
      });
    });
  });
});