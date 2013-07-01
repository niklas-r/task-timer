requirejs.config({
  baseUrl: 'js',
  paths: {
    'collections': 'collections',
    'libs': 'libs',
    'models': 'models',
    'routes': 'routes',
    'utils': 'utils',
    'views': 'views',
    'templates': '../templates'
  },
  // register dependecies for non-AMD script
  shim : {
    'libs/backbone': {
      //These script dependencies should be loaded before loading
      //backbone.js
      deps: ['libs/underscore', 'libs/jquery'],
      //Once loaded, use the global 'Backbone' as the
      //module value.
      exports: 'Backbone'
    },
    'libs/underscore': {
      exports: '_'
    },
    'libs/jquery': {
      exports: '$'
    }
  }
});

require(['app'], function (App) {
  // It's time to kick ass and chew bubble gum,
  // and I'm all out of gum.
  App.init();
});