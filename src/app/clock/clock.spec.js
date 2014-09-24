'use strict';

describe('module: taskTimer.clock', function () {

  beforeEach(module('taskTimer.clock'));

  describe('object: clock', function () {

    function setupClock(clock, settings) {
      return clock(settings);
    }

    function setupClockIncrease (clock) {
      return setupClock(clock, {
        label: 'Count up clock',
        countUp: true
      });
    }

    function setupClockDecrease (clock) {
      return setupClock(clock, {
        label: 'Count down clock',
        countUp: false
      });
    }

    describe('properties', function () {
      it('should have a label', inject(
        function (_clock_) {
          var clockIncrease,
              clockDecrease;

          clockIncrease = setupClockIncrease(_clock_);
          clockDecrease = setupClockDecrease(_clock_);

          expect(clockIncrease).to.have.property('label', 'Count up clock');
          expect(clockDecrease).to.have.property('label', 'Count down clock');
        })
      );

      it(
        'should be able to count up and down',
        inject( function (_clock_) {
          var clockIncrease,
              clockDecrease;

          clockIncrease = setupClockIncrease(_clock_);
          clockDecrease = setupClockDecrease(_clock_);

          expect(clockIncrease).to.have.property('countUp', true);
          expect(clockDecrease).to.have.property('countUp', false);
        })
      );
    });

    describe('actions', function () {

      it('should tick time', inject( function (_clock_) {
        var clockIncrease,
            clockDecrease;

        clockIncrease = setupClockIncrease(_clock_);
        clockDecrease = setupClockDecrease(_clock_);

        clockIncrease.tick(143);
        clockDecrease.tick(143);

        expect(clockIncrease.time).to.equal(143);
        expect(clockDecrease.time).to.equal(-143);
      }));

      it(
        'should call $apply on each tick',
        inject(function ($rootScope, _clock_) {
          var clock;

          clock = setupClockIncrease(_clock_);
          $rootScope.$apply = sinon.spy();

          clock.tick();

          expect($rootScope.$apply).to.have.been.calledOnce;
        })
      );

      it(
        'should start ticking the time',
        inject(function (_clock_) {
          var clock;
          this.clock = sinon.useFakeTimers();

          clock = setupClockIncrease(_clock_);

          clock.start();
          expect(clock.time).to.equal(0);

          this.clock.tick(200);
          expect(clock.time).to.equal(200);

          this.clock.tick(200);
          expect(clock.time).to.equal(400);

          this.clock.restore();
        })
      );

      it('should pause ticking a started clock', inject(
        function (_clock_) {
          var clock;

          clock = setupClockIncrease(_clock_);
          this.clock = sinon.useFakeTimers();

          clock.start();
          this.clock.tick(554);
          clock.pause();

          expect(clock.time).to.equal(554);

          this.clock.tick(100);

          expect(clock.time).to.equal(554);

          this.clock.restore();
        })
      );

      it('should unpause a paused clock', inject(
        function (_clock_) {
          var clock;

          this.clock = sinon.useFakeTimers();
          clock = setupClockIncrease(_clock_);

          // Start clock
          clock.start();
          // Should be zero on init
          expect(clock.time).to.equal(0);
          // Tick some time
          this.clock.tick(554);
          // On pause it should always update time
          clock.pause();
          // So expect it
          expect(clock.time).to.equal(554);
          // Time should not be added when paused and ticking
          this.clock.tick(600);
          // Expect it
          expect(clock.time).to.equal(554);
          // Unpause
          clock.unpause();
          // Now time should be added
          this.clock.tick(200);
          // Expect it
          expect(clock.time).to.equal(754);

          this.clock.restore();
        })
      );

    });

    describe('states', function () {

      it('should have stopped state', inject(
        function (_clock_) {
          var clock;

          clock = setupClockIncrease(_clock_);
          expect(clock.state).to.equal('stopped');
        })
      );

      it('should have ticking state', inject(
        function (_clock_) {
          var clock;

          clock = setupClockIncrease(_clock_);

          clock.start();

          expect(clock.state).to.equal('ticking');
        })
      );

      it('should have paused state', inject(
        function (_clock_) {
          var clock;

          clock = setupClockIncrease(_clock_);

          clock.start();
          clock.pause();

          expect(clock.state).to.equal('paused');
        })
      );

    });

  });
});