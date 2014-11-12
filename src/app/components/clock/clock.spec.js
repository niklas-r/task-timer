/* jshint expr: true */
'use strict';

describe('module: taskTimer.clock', function () {

  beforeEach(module('taskTimer.clock'));

  describe('model: clock', function () {
    var timeTrackerStub;

    function setupClock(clock, settings) {
      return clock.create(settings);
    }

    function setupClockIncrease (clock) {
      return setupClock(clock, {
        countUp: true
      });
    }

    function setupClockDecrease (clock) {
      return setupClock(clock, {
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

        inject(function (_clock_) {
          var clock;

          clock = setupClockIncrease(_clock_);

          expect(clock.trackedTime).to.eql({
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

        inject(function ($rootScope, _clock_) {
          var clock;

          clock = setupClockIncrease(_clock_);
          $rootScope.$apply = sinon.spy();

          clock.tick();

          expect($rootScope.$apply).to.have.been.calledOnce;
        });

      });

      it('should start ticking the time', function () {

        module(function ($provide) {
          provideTimeObjectMock($provide);
        });

        inject(function (_clock_) {
          var clock;
          this.clock = sinon.useFakeTimers();

          clock = setupClockIncrease(_clock_);

          clock.start();
          expect(clock.trackedTime.ms).to.equal(0);

          this.clock.tick(200);
          expect(clock.trackedTime.ms).to.equal(200);

          this.clock.tick(200);
          expect(clock.trackedTime.ms).to.equal(400);

          this.clock.restore();
        });
      });

      it('should pause ticking a started clock', function () {

        module(function ($provide) {
          provideTimeObjectMock($provide);
        });

        inject(function (_clock_) {
          var clock;

          clock = setupClockIncrease(_clock_);
          this.clock = sinon.useFakeTimers();

          clock.start();
          this.clock.tick(554);
          clock.pause();

          expect(clock.trackedTime.ms).to.equal(554);

          this.clock.tick(100);

          expect(clock.trackedTime.ms).to.equal(554);

          this.clock.restore();
        });
      });

      it('should unpause a paused clock', function () {

        module(function ($provide) {
          provideTimeObjectMock($provide);
        });

        inject(function (_clock_) {
          var clock;

          this.clock = sinon.useFakeTimers();
          clock = setupClockIncrease(_clock_);

          // Start clock
          clock.start();
          // Should be zero on init
          expect(clock.trackedTime.ms).to.equal(0);
          // Tick some time
          this.clock.tick(554);
          // On pause it should always update time
          clock.pause();
          // So expect it
          expect(clock.trackedTime.ms).to.equal(554);
          // Time should not be added when paused and ticking
          this.clock.tick(600);
          // Expect it
          expect(clock.trackedTime.ms).to.equal(554);
          // Unpause
          clock.unpause();
          // Now time should be added
          this.clock.tick(200);
          // Expect it
          expect(clock.trackedTime.ms).to.equal(754);

          this.clock.restore();
        });
      });

      it('should be able to count timer up and down', function () {

        module(function ($provide) {
          provideTimeObjectMock($provide);
        });

        inject( function (_clock_) {
          var clockIncrease,
              clockDecrease;

          this.clock = sinon.useFakeTimers();

          timeTrackerStub.create.returns({ ms: 0 });
          clockIncrease = setupClockIncrease(_clock_);

          timeTrackerStub.create.returns({ ms: 0 });
          clockDecrease = setupClockDecrease(_clock_);

          clockIncrease.start();
          clockDecrease.start();

          this.clock.tick(432);

          clockIncrease.pause();
          clockDecrease.pause();

          expect(clockIncrease.trackedTime.ms).to.equal(432);
          expect(clockDecrease.trackedTime.ms).to.equal(-432);

          this.clock.reset();
        });
      });

    });

    describe('states', function () {

      it('should have stopped state', function () {

        module(function ($provide) {
          provideTimeObjectMock($provide);
        });

        inject(function (_clock_) {
          var clock;

          clock = setupClockIncrease(_clock_);
          expect(clock.state).to.equal('stopped');
        });

      });

      it('should have ticking state', function () {

        module(function ($provide) {
          provideTimeObjectMock($provide);
        });

        inject(function (_clock_) {
          var clock;

          clock = setupClockIncrease(_clock_);

          clock.start();

          expect(clock.state).to.equal('ticking');
        });

      });

      it('should have paused state', function () {

        module(function ($provide) {
          provideTimeObjectMock($provide);
        });

        inject(function (_clock_) {
          var clock;

          clock = setupClockIncrease(_clock_);

          clock.start();
          clock.pause();

          expect(clock.state).to.equal('paused');
        });

      });

    });

  });
});