define([
  'libs/jquery',
  'libs/underscore',
  'libs/backbone',
  'views/IndexView'
  ], function ($, _, Backbone, IndexView) {

    var exports = {},
        AppRouter = Backbone.Router.extend({
          routes: {
            // Default
            '*actions': 'defaultAction'
          }
        });

    exports.init = function () {
      var appRouter = new AppRouter;

      appRouter.on("route:defaultAction", function (actions) {
        var indexView = new IndexView();
        indexView.render();
      });

      Backbone.history.start({pushState: true});
    };

    return exports;
});