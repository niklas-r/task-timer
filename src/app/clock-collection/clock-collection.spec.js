describe('module: taskTimer.clockCollection', function () {
  'use strict';

  beforeEach(module('taskTimer.clockCollection'));

  describe('service: clockCollection', function () {
    var stubStopWatch;

    stubStopWatch = module(function ($provide) {
      $provide.value('StopWatch', sinon.stub());
    });

    it('should get the collection of Clocks', function () {
      stubStopWatch();

      inject(function (clockCollection) {
        expect(clockCollection.collection).to.be.an("array");
      });
    });

    it('should add stop watches to the collection', function () {
      stubStopWatch();

      inject(function (clockCollection, StopWatch) {
        var collection;

        collection = clockCollection.collection;
        clockCollection.addNewStopWatch('stop watch name');

        expect(StopWatch).to.have.been.calledWithExactly('stop watch name');
        expect(collection[0]).to.be.an.instanceof(StopWatch);
      });
    });

    it('should remove clock from collection by reference', function () {
      stubStopWatch();

      inject(function (clockCollection, StopWatch) {
        var collection,
            swToBeRemoved;

        collection = clockCollection.collection;

        StopWatch.onFirstCall().returns({label: 'sw1'});
        StopWatch.onSecondCall().returns({label: 'sw2'});
        StopWatch.onThirdCall().returns({label: 'sw3'});

        clockCollection.addNewStopWatch('sw1');
        clockCollection.addNewStopWatch('sw2');
        clockCollection.addNewStopWatch('sw3');

        swToBeRemoved = collection[1];

        expect(collection).to.contain(swToBeRemoved);
        clockCollection.remove(swToBeRemoved);
        expect(collection).not.to.contain(swToBeRemoved);
      });
    });

  });
});