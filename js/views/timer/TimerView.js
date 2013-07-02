define([
  'plugins/text!templates/timer/timerTmpl.html',
  'plugins/backbone-mediator',
  'jquery',
  'underscore',
  'backbone'
  ], function (timerTmpl) {

    var TimerView = Backbone.View.extend({
      el: $('#timer'),

      subscriptions: {
        "timer:large": 'largeTimer'
      },

      initialize: function () {
        this.twentyfour = true;
        this.timerData = {
          delimiter: ":",
          hours: {
            firstDigit: 0,
            secondDigit: 1,
          },
          minutes: {
            firstDigit: 2,
            secondDigit: 3,
          },
          seconds: {
            firstDigit: 4,
            secondDigit: 5,
          }
        };
        this.template = _.template(timerTmpl, this.timerData);
      },

      largeTimer : function (data) {
        // Update el
        this.$el = this.el = $(data.el);
        this.render();
      },

      render : function () {
        this.$el.html(this.template);
        return this;
      }
    });

    return TimerView;
});