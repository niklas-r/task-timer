(function (angular) {
  'use strict';
  var taskCollectionModule;

  taskCollectionModule = angular.module('taskTimer.task.collection', [
    'taskTimer.task'
  ]);

  taskCollectionModule.factory('taskCollection', taskCollectionFactory);
  /**
   * Task collection
   * @param {task} task
   * @return {taskCollection}
   */
  function taskCollectionFactory(task) {
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
     * @param {taskSettings} taskSettings
     */
    taskCollection.addNewStopWatch = function (taskSettings) {

      taskCollection.collection.push(task.create(taskSettings));

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
