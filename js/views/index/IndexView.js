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
        return this;
      }
    });

    return IndexView;
});