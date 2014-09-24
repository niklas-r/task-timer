(function (angular) {
  'use strict';
  var clockCollectionModule;

  clockCollectionModule = angular.module('taskTimer.clockCollection', [
    'taskTimer.clock.stopWatch'
  ]);

  /**
   * Clock collection
   * @param  {stopWatch}
   * @return {clockCollection}
   */
  function clockCollectionFactory(stopWatch) {
    var clockCollection;

    /**
     * Clock collection namespace
     * @namespace
     */
    clockCollection = {};

    /**
     * Collection of clocks
     * @type {Array}
     */
    clockCollection.collection = [];

    /**
     * Add a new stop watch to the collection
     * @param {stopWatchSettings}
     */
    clockCollection.addNewStopWatch = function (stopWatchSettings) {
      clockCollection.collection.push(stopWatch(stopWatchSettings));
    };

    /**
     * Remove clock from collection by object reference
     * @param  {clock} clock
     * @return {clock} Removed clock
     */
    clockCollection.remove = function (clock) {
      var index,
          removedItems;

      index = clockCollection.collection.indexOf(clock);

      if ( index === -1 ) { return; }

      return clockCollection.collection.splice(index, 1)[0];
    };

    return clockCollection;
  }

  clockCollectionModule.service('clockCollection', clockCollectionFactory);

}(angular));
