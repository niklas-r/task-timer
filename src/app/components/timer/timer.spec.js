'use strict';

describe('module: taskTimer.timer', function() {

  beforeEach(module('taskTimer.timer'));

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
});