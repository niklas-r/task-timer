/* jshint expr: true */
'use strict';

describe('module: taskTimer.timer', function () {

  beforeEach(module('taskTimer.timer'));

  describe('model: timer', function () {
    var timeTrackerStub;

    function setupTimer(timer, settings) {
      return timer.create(settings);
    }

    function setupTimerIncrease (timer) {
      return setupTimer(timer, {
        countUp: true
      });
    }

    function setupTimerDecrease (timer) {
      return setupTimer(timer, {
        countUp: false
      });
    }

    function provideTimeObjectMock ($provide) {
      timeTrackerStub = {
        create: sinon.stub()
      };

      timeTrackerStub.create.returns({
        ms: 0
      });

      $provide.value('timeTracker', timeTrackerStub);
    }

    describe('properties', function () {

      it('should track time', function () {

        module(function ($provide) {
          provideTimeObjectMock($provide);
        });

        inject(function (_timer_) {
          var timer;

          timer = setupTimerIncrease(_timer_);

          expect(timer.trackedTime).to.eql({
            ms: 0
          });
        });
      });

    });

    describe('actions', function () {

      it('should call $apply on each tick', function () {

        module(function ($provide) {
          provideTimeObjectMock($provide);
        });

        inject(function ($rootScope, _timer_) {
          var timer;

          timer = setupTimerIncrease(_timer_);
          $rootScope.$apply = sinon.spy();

          timer.tick();

          expect($rootScope.$apply).to.have.been.calledOnce;
        });

      });

      it('should start ticking the time', function () {

        module(function ($provide) {
          provideTimeObjectMock($provide);
        });

        inject(function (_timer_) {
          var timer;
          this.clock = sinon.useFakeTimers();

          timer = setupTimerIncrease(_timer_);

          timer.start();
          expect(timer.trackedTime.ms).to.equal(0);

          this.clock.tick(200);
          expect(timer.trackedTime.ms).to.equal(200);

          this.clock.tick(200);
          expect(timer.trackedTime.ms).to.equal(400);

          this.clock.restore();
        });
      });

      it('should pause ticking a started timer', function () {

        module(function ($provide) {
          provideTimeObjectMock($provide);
        });

        inject(function (_timer_) {
          var timer;

          timer = setupTimerIncrease(_timer_);
          this.clock = sinon.useFakeTimers();

          timer.start();
          this.clock.tick(554);
          timer.pause();

          expect(timer.trackedTime.ms).to.equal(554);

          this.clock.tick(100);

          expect(timer.trackedTime.ms).to.equal(554);

          this.clock.restore();
        });
      });

      it('should unpause a paused timer', function () {

        module(function ($provide) {
          provideTimeObjectMock($provide);
        });

        inject(function (_timer_) {
          var timer;

          this.clock = sinon.useFakeTimers();
          timer = setupTimerIncrease(_timer_);

          // Start timer
          timer.start();
          // Should be zero on init
          expect(timer.trackedTime.ms).to.equal(0);
          // Tick some time
          this.clock.tick(554);
          // On pause it should always update time
          timer.pause();
          // So expect it
          expect(timer.trackedTime.ms).to.equal(554);
          // Time should not be added when paused and ticking
          this.clock.tick(600);
          // Expect it
          expect(timer.trackedTime.ms).to.equal(554);
          // Unpause
          timer.unpause();
          // Now time should be added
          this.clock.tick(200);
          // Expect it
          expect(timer.trackedTime.ms).to.equal(754);

          this.clock.restore();
        });
      });

      it('should be able to count timer up and down', function () {

        module(function ($provide) {
          provideTimeObjectMock($provide);
        });

        inject( function (_timer_) {
          var timerIncrease,
              timerDecrease;

          this.clock = sinon.useFakeTimers();

          timeTrackerStub.create.returns({ ms: 0 });
          timerIncrease = setupTimerIncrease(_timer_);

          timeTrackerStub.create.returns({ ms: 0 });
          timerDecrease = setupTimerDecrease(_timer_);

          timerIncrease.start();
          timerDecrease.start();

          this.clock.tick(432);

          timerIncrease.pause();
          timerDecrease.pause();

          expect(timerIncrease.trackedTime.ms).to.equal(432);
          expect(timerDecrease.trackedTime.ms).to.equal(-432);

          this.clock.reset();
        });
      });

    });

    describe('states', function () {

      it('should have stopped state', function () {

        module(function ($provide) {
          provideTimeObjectMock($provide);
        });

        inject(function (_timer_) {
          var timer;

          timer = setupTimerIncrease(_timer_);
          expect(timer.state).to.equal('stopped');
        });

      });

      it('should have ticking state', function () {

        module(function ($provide) {
          provideTimeObjectMock($provide);
        });

        inject(function (_timer_) {
          var timer;

          timer = setupTimerIncrease(_timer_);

          timer.start();

          expect(timer.state).to.equal('ticking');
        });

      });

      it('should have paused state', function () {

        module(function ($provide) {
          provideTimeObjectMock($provide);
        });

        inject(function (_timer_) {
          var timer;

          timer = setupTimerIncrease(_timer_);

          timer.start();
          timer.pause();

          expect(timer.state).to.equal('paused');
        });

      });

    });

  });
});