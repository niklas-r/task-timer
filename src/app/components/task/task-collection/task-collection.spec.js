/* jshint expr: true */
describe('module: taskTimer.task.collection', function () {
  'use strict';

  beforeEach(module('taskTimer.task.collection'));

  describe('factory: taskCollection', function () {
    var stubStopWatch;

    stubStopWatch = module(function ($provide) {
      $provide.value('stopWatch', sinon.stub());
    });

    it('should get the collection of tasks', function () {
      stubStopWatch();

      inject(function (taskCollection) {
        expect(taskCollection.collection).to.be.an("array");
      });
    });

    it('should add stop watches to the collection', function () {
      stubStopWatch();

      inject(function (taskCollection, stopWatch) {
        var collection;

        collection = taskCollection.collection;
        taskCollection.addNewStopWatch('stop watch name');

        expect(stopWatch).to.have.been.calledWithExactly('stop watch name');
        expect(taskCollection.collection.length).to.equal(1);
      });
    });

    it('should remove task from collection by reference', function () {
      stubStopWatch();

      inject(function (taskCollection, stopWatch) {
        var collection,
            swToBeRemoved;

        collection = taskCollection.collection;

        stopWatch.onFirstCall().returns({label: 'sw1'});
        stopWatch.onSecondCall().returns({label: 'sw2'});
        stopWatch.onThirdCall().returns({label: 'sw3'});

        taskCollection.addNewStopWatch('sw1');
        taskCollection.addNewStopWatch('sw2');
        taskCollection.addNewStopWatch('sw3');

        swToBeRemoved = collection[1];

        expect(collection).to.contain(swToBeRemoved);
        taskCollection.remove(swToBeRemoved);
        expect(collection).not.to.contain(swToBeRemoved);
      });
    });
  });
});