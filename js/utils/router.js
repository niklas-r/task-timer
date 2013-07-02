define([
  'views/index/IndexView',
  'views/timer/TimerView',
  'jquery',
  'underscore',
  'backbone'
  ], function (IndexView, TimerView) {

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
        var timerView = new TimerView(),
            indexView = new IndexView();

        indexView.render();
      });

      Backbone.history.start({pushState: true});
    };

    return exports;
});