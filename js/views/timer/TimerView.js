define([
  'plugins/text!templates/timer/timerTmpl.html',
  'plugins/backbone-mediator',
  'jquery',
  'underscore',
  'backbone'
  ], function (timerTmpl) {

    var TimerView = Backbone.View.extend({
      el: $('#timer'),

      initialize: function () {
        console.log("TIMER");
      },

      render : function () {

        return this;
      }
    });

    return TimerView;
});