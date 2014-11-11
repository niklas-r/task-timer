'use strict';

describe('module: taskTimer.stopWatch', function () {

  beforeEach(module('taskTimer.clock.stopWatch'));

  describe('model: stopWatch', function () {
    var provideClockStub,
        clockStub;

    function provideClockStub($provide) {

      clockStub = {
        create: sinon.stub()
      };

      $provide.value('clock', clockStub);
    }

    it('should have create a stop watch', function () {
      module(function ($provide) {
        provideClockStub($provide);
      });

      inject(function (stopWatch) {
        var sw;

        sw = stopWatch.create({ label: 'Test' });

        expect(stopWatch.create).to.be.a('function');
      });
    });

    it('should call clock constructor with correct settings', function () {

      module(function ($provide) {
        provideClockStub($provide);
      });

      inject(function (clock, stopWatch) {
        var sw;

        sw = stopWatch.create({
          label: 'My Stopwatch'
        });

        expect(clock.create).to.have.been.calledWith({
          label: 'My Stopwatch',
          countUp: true
        });
      });
    });
  });
});