describe('module: taskTimer.common.millisecondsToTimeString', function () {
  'use strict';

  beforeEach(module('taskTimer.common.millisecondsToTimeString'));

  describe('filter: millisecondsToTimeString', function () {

    it('it should convert milliseconds to time string', inject(
      function ($filter) {
        var msToTimeString = $filter('millisecondsToTimeString');

        // Seconds
        expect(msToTimeString(0)).to.equal('00:00:00');
        expect(msToTimeString(1)).to.equal('00:00:00');
        expect(msToTimeString(999)).to.equal('00:00:00');
        expect(msToTimeString(1000)).to.equal('00:00:01');
        expect(msToTimeString(1500)).to.equal('00:00:01');
        expect(msToTimeString(32100)).to.equal('00:00:32');
        expect(msToTimeString(59000)).to.equal('00:00:59');

        // Minutes
        expect(msToTimeString(60000)).to.equal('00:01:00');
        expect(msToTimeString(60001)).to.equal('00:01:00');
        expect(msToTimeString(61000)).to.equal('00:01:01');
        expect(msToTimeString(88432)).to.equal('00:01:28');
        expect(msToTimeString(3599999)).to.equal('00:59:59');

        // Hours
        expect(msToTimeString(3600000)).to.equal('01:00:00');
        expect(msToTimeString(359999999)).to.equal('99:59:59');
        expect(msToTimeString(360000000)).to.equal('100:00:00');
      })
    );
  });
});