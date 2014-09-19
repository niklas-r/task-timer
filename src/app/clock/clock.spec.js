'use strict';

describe('module: taskTimer.clock', function () {

  beforeEach(module('taskTimer.clock'));

  describe('class: Clock', function () {

    function setupClock(Clock, timeDirection) {
      return new Clock(
        'Writing tests', // label
        timeDirection // timeDirection
      );
    }

    function setupClockIncrease (Clock) {
      return setupClock(Clock, 'increase');
    }

    function setupClockDecrease (Clock) {
      return setupClock(Clock, 'decrease');
    }

    it('should be a "class"', inject (function (Clock) {
      var clock;

      clock = setupClockIncrease(Clock);

      expect(clock).to.be.an.instanceof(Clock);
    }));

    it('should have a label', inject(
      function (Clock) {
        var clock;

        clock = setupClockIncrease(Clock);

        expect(clock).to.have.property('label', 'Writing tests');
      })
    );

    it(
      'should be able to count up and down',
      inject( function (Clock) {
        var clockIncrease,
            clockDecrease ;

        clockIncrease = setupClockIncrease(Clock);
        clockDecrease = setupClockDecrease(Clock);

        expect(clockIncrease).to.have.property('timeDirection', 'increase');
        expect(clockDecrease).to.have.property('timeDirection', 'decrease');
      })
    );

    describe('actions', function () {

      it('should tick time', inject( function (Clock) {
        var clockIncrease,
            clockDecrease;

        clockIncrease = setupClockIncrease(Clock);
        clockDecrease = setupClockDecrease(Clock);

        clockIncrease.tick(143);
        clockDecrease.tick(143);

        expect(clockIncrease.time).to.equal(143);
        expect(clockDecrease.time).to.equal(-143);
      }));

      it(
        'should call $apply on each tick',
        inject(function ($rootScope, Clock) {
          var clock;

          clock = setupClockIncrease(Clock);
          $rootScope.$apply = sinon.spy();

          clock.tick();

          expect($rootScope.$apply).to.have.been.calledOnce;
        })
      );

      it(
        'should start ticking the time',
        inject(function (Clock) {
          var clock;
          this.clock = sinon.useFakeTimers();

          clock = setupClockIncrease(Clock);

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
        function (Clock) {
          var clock;

          clock = setupClockIncrease(Clock);
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
        function (Clock) {
          var clock;

          this.clock = sinon.useFakeTimers();
          clock = setupClockIncrease(Clock);

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
        function (Clock) {
          var clock;

          clock = setupClockIncrease(Clock);
          expect(clock.state).to.equal('stopped');
        })
      );

      it('should have ticking state', inject(
        function (Clock) {
          var clock;

          clock = setupClockIncrease(Clock);

          clock.start();

          expect(clock.state).to.equal('ticking');
        })
      );

      it('should have paused state', inject(
        function (Clock) {
          var clock;

          clock = setupClockIncrease(Clock);

          clock.start();
          clock.pause();

          expect(clock.state).to.equal('paused');
        })
      );

    });

  });
});