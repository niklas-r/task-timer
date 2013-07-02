requirejs.config({
  baseUrl: 'js',
  paths: {
    'jquery': 'libs/jquery',
    'underscore': 'libs/underscore',
    'backbone': 'libs/backbone',
    'templates': '../templates'
  },
  // register dependecies for non-AMD script
  shim : {
    'backbone': {
      //These script dependencies should be loaded before loading
      //backbone.js
      deps: ['underscore', 'jquery'],
      //Once loaded, use the global 'Backbone' as the
      //module value.
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    },
    'jquery': {
      exports: '$'
    }
  }
});

require(['app'], function (App) {
  // It's time to kick ass and chew bubble gum,
  // and I'm all out of gum.
  App.init();
});