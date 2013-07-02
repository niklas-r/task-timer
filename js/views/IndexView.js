define([
  'utils/text!templates/indexTmpl.html',
  'libs/jquery',
  'libs/underscore',
  'libs/backbone'
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