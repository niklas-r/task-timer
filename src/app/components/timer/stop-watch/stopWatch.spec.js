'use strict';

describe('module: taskTimer.timer.stopWatch', function () {

  beforeEach(module('taskTimer.timer.stopWatch'));

  describe('model: stopWatch', function () {
    var provideTimerStub,
        timerStub;

    function provideTimerStub($provide) {

      timerStub = {
        create: sinon.stub()
      };

      $provide.value('timer', timerStub);
    }

    it('should have create a stop watch', function () {
      module(function ($provide) {
        provideTimerStub($provide);
      });

      inject(function (stopWatch) {
        var sw;

        sw = stopWatch.create();

        expect(stopWatch.create).to.be.a('function');
      });
    });

    it('should call timer constructor with correct settings', function () {

      module(function ($provide) {
        provideTimerStub($provide);
      });

      inject(function (timer, stopWatch) {
        var sw;

        sw = stopWatch.create();

        expect(timer.create).to.have.been.calledWith({
          countUp: true
        });
      });
    });
  });
});