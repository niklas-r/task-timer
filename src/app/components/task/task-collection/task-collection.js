(function (angular) {
  'use strict';
  var taskCollectionModule;

  taskCollectionModule = angular.module('taskTimer.task.collection', [
    'taskTimer.timer.stopWatch'
  ]);

  taskCollectionModule.factory('taskCollection', taskCollectionFactory);
  /**
   * Task collection
   * @param  {stopWatch}
   * @return {taskCollection}
   */
  function taskCollectionFactory(stopWatch) {
    var taskCollection;

    /**
     * Task collection namespace
     * @namespace
     */
    taskCollection = {};

    /**
     * Collection of tasks
     * @type {Array}
     */
    taskCollection.collection = [];

    /**
     * Add a new stop watch to the collection
     * @param {stopWatchSettings}
     */
    taskCollection.addNewStopWatch = function (stopWatchSettings) {
      taskCollection.collection.push(stopWatch(stopWatchSettings));
    };

    /**
     * Remove timer from collection by object reference
     * @param  {timer} timer
     */
    taskCollection.remove = function (timer) {
      var index;

      index = taskCollection.collection.indexOf(timer);

      if ( index === -1 ) { return; }

      taskCollection.collection.splice(index, 1);
    };

    return taskCollection;
  }

}(angular));
