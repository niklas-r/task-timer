'use strict';

describe('module: taskTimer.stopWatch', function () {

  beforeEach(module('taskTimer.stopWatch'));

  describe('class: StopWatch', function () {
    var Clock,
        StopWatch,
        stopWatch;

    beforeEach(inject(function (_StopWatch_, _Clock_) {
      Clock     = _Clock_;
      StopWatch = _StopWatch_;
      stopWatch = new StopWatch();
    }));

    it('should have Clock as super class', function () {
      expect(stopWatch).to.be.an.instanceof(Clock);
    });

    it('should be its own class', function () {
      expect(stopWatch).to.be.an.instanceof(StopWatch);
    });
  });
});