define([
  'plugins/text!templates/index/indexTmpl.html',
  'plugins/backbone-mediator',
  'jquery',
  'underscore',
  'backbone'
  ], function (indexTmpl) {

    var IndexView = Backbone.View.extend({
      el: $('#main'),

      initialize : function () {
        this.template = _.template(indexTmpl, {
          'message': 'Hello world!'
        });
      },

      render : function () {
        this.$el.html(this.template);

        // Trigger event to render timer
        Backbone.Mediator.pub("timer:large", {
          el: "#main #timer"
        });
        return this;
      }
    });

    return IndexView;
});