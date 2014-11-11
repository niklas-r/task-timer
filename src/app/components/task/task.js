(function (angular) {
  'use strict';
  var taskModule;

  taskModule = angular.module('taskTimer.task', [
    'taskTimer.clock.stopWatch'
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
          _clock;

      _clock = stopWatch.create();
      _label = settings.label;



      /**
       * Task namespace
       * @namespace
       */
      task = {

        get label() {
          return _label;
        },

        get clock() {
          return _clock;
        }

      };

      return task;
    };

    return api;
  }
}(angular));