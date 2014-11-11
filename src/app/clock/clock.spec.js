/* jshint expr: true */
'use strict';

describe('module: taskTimer.clock', function () {

  beforeEach(module('taskTimer.clock'));

  describe('model: timer', function () {

    it('it should have properties representing time', inject(
      function (timer) {
        var time = timer.create();

        expect(time.hr).to.equal(0);
        expect(time.min).to.equal(0);
        expect(time.sec).to.equal(0);
        expect(time.ms).to.equal(0);

      })
    );

    it('should provide a string in the format of HH:MM:SS', inject(
      function (timer) {
        var time = timer.create();

        expect(time.toString()).to.equal('00:00:00');

        time.hr = 4;
        time.min = 32;
        time.sec = 8;

        expect(time.toString()).to.equal('04:32:08');
      })
    );

    it('should return new objects on each function call', inject(
      function (timer) {
        var t1, t2;

        t1 = timer.create();
        t2 = timer.create();

        expect(t1).not.to.equal(t2);
      })
    );

    describe('when updating', function () {

      describe('hours', function () {

        it('should auto update ms', inject(
          function (timer) {
            var time = timer.create();

            time.hr = 5;

            expect(time.hr).to.equal(5);
            expect(time.ms).to.equal(18000000);

          })
        );

      });

      describe('minutes', function () {

        it('should auto update ms', inject(
          function (timer) {
            var time = timer.create();

            time.min = 4;

            expect(time.min).to.equal(4);
            expect(time.ms).to.equal(240000);

          })
        );

      });

      describe('seconds', function () {

        it('should auto update ms', inject(
          function (timer) {
            var time = timer.create();

            time.sec = 45;

            expect(time.sec).to.equal(45);
            expect(time.ms).to.equal(45000);

          })
        );

      });

      describe('milliseconds', function () {

        it('should auto update hours, minutes and seconds', inject(
          function (timer) {
            var time = timer.create();

            time.ms = 50972000;

            // (1000) * 32 + (1000 * 60) * 9 + (1000 * 60 * 60) * 14 = 50972000

            expect(time.sec).to.equal(32);
            expect(time.min).to.equal(9);
            expect(time.hr).to.equal(14);
            expect(time.ms).to.equal(50972000);

          })
        );

      });

      describe('mixed properties', function () {
        it('it should work together', inject(
          function (timer) {
            var time = timer.create();

            time.sec = 45;
            time.min = 50;
            time.hr = 2;

            expect(time.sec).to.equal(45);
            expect(time.min).to.equal(50);
            expect(time.hr).to.equal(2);
            expect(time.ms).to.equal(10245000);

          })
        );
      });

    });

  });

  describe('model: clock', function () {
    var timerStub;

    function setupClock(clock, settings) {
      return clock.create(settings);
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

    function provideTimeObjectMock ($provide) {
      timerStub = {
        create: sinon.stub()
      };

      timerStub.create.returns({
        ms: 0
      });

      $provide.value('timer', timerStub);
    }

    describe('properties', function () {

      it('should have a label', function () {

        module(function ($provide) {
          provideTimeObjectMock($provide);
        });

        inject(function (_clock_) {
          var clockIncrease,
              clockDecrease;

          clockIncrease = setupClockIncrease(_clock_);
          clockDecrease = setupClockDecrease(_clock_);

          expect(clockIncrease).to.have.property('label', 'Count up clock');
          expect(clockDecrease).to.have.property('label', 'Count down clock');
        });

      });

      it('should use timer to track time', function () {

        module(function ($provide) {
          provideTimeObjectMock($provide);
        });

        inject(function (_clock_) {
          var clock;

          clock = setupClockIncrease(_clock_);

          expect(clock.timer).to.eql({
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
          expect(clock.timer.ms).to.equal(0);

          this.clock.tick(200);
          expect(clock.timer.ms).to.equal(200);

          this.clock.tick(200);
          expect(clock.timer.ms).to.equal(400);

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

          expect(clock.timer.ms).to.equal(554);

          this.clock.tick(100);

          expect(clock.timer.ms).to.equal(554);

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
          expect(clock.timer.ms).to.equal(0);
          // Tick some time
          this.clock.tick(554);
          // On pause it should always update time
          clock.pause();
          // So expect it
          expect(clock.timer.ms).to.equal(554);
          // Time should not be added when paused and ticking
          this.clock.tick(600);
          // Expect it
          expect(clock.timer.ms).to.equal(554);
          // Unpause
          clock.unpause();
          // Now time should be added
          this.clock.tick(200);
          // Expect it
          expect(clock.timer.ms).to.equal(754);

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

          timerStub.create.returns({ ms: 0 });
          clockIncrease = setupClockIncrease(_clock_);

          timerStub.create.returns({ ms: 0 });
          clockDecrease = setupClockDecrease(_clock_);

          clockIncrease.start();
          clockDecrease.start();

          this.clock.tick(432);

          clockIncrease.pause();
          clockDecrease.pause();

          expect(clockIncrease.timer.ms).to.equal(432);
          expect(clockDecrease.timer.ms).to.equal(-432);

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