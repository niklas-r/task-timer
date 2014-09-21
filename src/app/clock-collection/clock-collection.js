(function (angular) {
  'use strict';
  var clockCollectionModule;

  clockCollectionModule = angular.module('taskTimer.clockCollection', [
    'taskTimer.stopWatch'
  ]);

  // @ngInject
  function clockCollection(StopWatch) {
    var _addNewStopWatch,
        _collection,
        _remove;

    _collection = [];

    _addNewStopWatch = function (label) {
      _collection.push(new StopWatch(label));
    };

    _remove = function (clock) {
      var index;

      index = _collection.indexOf(clock);

      if ( index === -1 ) { return; }

      return _collection.splice(index, 1);
    };

    return {
      get collection() {
        return _collection;
      },
      addNewStopWatch: _addNewStopWatch,
      remove: _remove
    };
  }

  clockCollectionModule.service('clockCollection', clockCollection);
}(angular));