describe('module: taskTimer.clockCollection', function () {
  'use strict';

  beforeEach(module('taskTimer.clockCollection'));

  describe('service: clockCollection', function () {
    var stubStopWatch;

    stubStopWatch = module(function ($provide) {
      $provide.value('stopWatch', sinon.stub());
    });

    it('should get the collection of Clocks', function () {
      stubStopWatch();

      inject(function (clockCollection) {
        expect(clockCollection.collection).to.be.an("array");
      });
    });

    it('should add stop watches to the collection', function () {
      stubStopWatch();

      inject(function (clockCollection, stopWatch) {
        var collection;

        collection = clockCollection.collection;
        clockCollection.addNewStopWatch('stop watch name');

        expect(stopWatch).to.have.been.calledWithExactly('stop watch name');
        expect(clockCollection.collection.length).to.equal(1);
      });
    });

    it('should remove clock from collection by reference', function () {
      stubStopWatch();

      inject(function (clockCollection, stopWatch) {
        var collection,
            swToBeRemoved;

        collection = clockCollection.collection;

        stopWatch.onFirstCall().returns({label: 'sw1'});
        stopWatch.onSecondCall().returns({label: 'sw2'});
        stopWatch.onThirdCall().returns({label: 'sw3'});

        clockCollection.addNewStopWatch('sw1');
        clockCollection.addNewStopWatch('sw2');
        clockCollection.addNewStopWatch('sw3');

        swToBeRemoved = collection[1];

        expect(collection).to.contain(swToBeRemoved);
        clockCollection.remove(swToBeRemoved);
        expect(collection).not.to.contain(swToBeRemoved);
      });
    });

    it('should return reference to removed object', function () {
      stubStopWatch();

      inject(function (clockCollection, stopWatch) {
        var collection,
            swToBeRemoved,
            removedSw;

        collection = clockCollection.collection;

        stopWatch.returns({label: 'Stopwatch'});

        clockCollection.addNewStopWatch('Stopwatch');

        swToBeRemoved = collection[0];

        removedSw = clockCollection.remove(swToBeRemoved);

        expect(removedSw).to.not.be.undefined;
        expect(swToBeRemoved).to.not.be.undefined;
        expect(removedSw).to.equal(swToBeRemoved);
      });
    });

  });
});