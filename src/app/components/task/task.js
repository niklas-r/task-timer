(function (angular) {
  'use strict';
  var taskModule;

  taskModule = angular.module('taskTimer.task', [
    'taskTimer.timer.stopWatch'
  ]);

  taskModule.factory('task', taskFactory);
  /**
   * Task factory from which new tasks can be created
   * @param  {stopWatch} stopWatch
   * @ngInject
   * @return {object}
   */
  function taskFactory (stopWatch) {
    var api;

    api = {};

    /**
     * The task settings object
     * @typedef {object} taskSettings
     * @property {string} label Name of task
     */

    /**
     * Task constructor
     * @param  {taskSettings} settings
     * @return {task}
     */
    api.create = function createTask(settings) {
      var task,
          _label,
          _timer;

      _timer = stopWatch.create();
      _label = settings.label;



      /**
       * Task namespace
       * @namespace
       */
      task = {

        get label() {
          return _label;
        },

        get timer() {
          return _timer;
        }

      };

      return task;
    };

    return api;
  }
}(angular));