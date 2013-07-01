define([
  'libs/jquery',
  'libs/underscore',
  'libs/backbone',
  'router'
  ], function ($, _, Backbone, Router) {
    
    var exports = {};

    exports.init = function () {
      Router.init();
    };

    return exports;
});