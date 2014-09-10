'use strict';

describe('module: taskTimer.timer', function () {

  beforeEach(module('taskTimer.timer'));

  describe('class: Timer', function () {
    var Timer;

    beforeEach(inject(function (_Timer_) {
      Timer = _Timer_;
    }));

    it('should be a class', function () {
      var timer = new Timer();

      expect(timer).to.be.an.instanceof(Timer);
    });

    it('should have a start time', function () {
      var timer = new Timer();
    });
  });

});