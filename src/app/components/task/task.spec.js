'use strict';

describe('module: taskTimer.task', function () {
  var stopWatchStub;

  beforeEach(module('taskTimer.task'));

  function provideStopWatchStub ($provide) {
    stopWatchStub = {
      create: sinon.stub()
    };

    $provide.value('stopWatch', stopWatchStub);
  }

  describe('properties', function () {

    it('should have a label', function () {
      module(function ($provide) {
        provideStopWatchStub($provide);
      });

      inject(function (task) {
        var t;

        t = task.create({ label: 'Task label' });

        expect(t.label).to.equal('Task label');
      });
    });

  });
});