/* jshint expr: true */
describe('module: taskTimer.task.collection', function () {
  'use strict';

  beforeEach(module('taskTimer.task.collection'));

  describe('factory: taskCollection', function () {
    var taskStub;

    function provideTaskStub ($provide) {

      taskStub = {
        create: sinon.stub()
      };

      $provide.value('task', taskStub);
    }

    it('should get the collection of tasks', function () {
      module(function ($provide) {
        provideTaskStub($provide);
      });

      inject(function (taskCollection) {
        expect(taskCollection.collection).to.be.an("array");
      });
    });

    it('should add stop watches to the collection', function () {
      module(function ($provide) {
        provideTaskStub($provide);
      });

      inject(function (taskCollection, task) {
        var collection;

        collection = taskCollection.collection;
        taskCollection.addNewStopWatch('stop watch name');

        expect(task.create).to.have.been.calledWithExactly('stop watch name');
        expect(taskCollection.collection.length).to.equal(1);
      });
    });

    it('should remove task from collection by reference', function () {
      module(function ($provide) {
        provideTaskStub($provide);
      });

      inject(function (taskCollection, task) {
        var collection,
            swToBeRemoved;

        collection = taskCollection.collection;

        task.create.onFirstCall().returns({label: 'sw1'});
        task.create.onSecondCall().returns({label: 'sw2'});
        task.create.onThirdCall().returns({label: 'sw3'});

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