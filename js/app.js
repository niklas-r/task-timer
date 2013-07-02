define(
  [ 'utils/router',
    'utils/helpers'
  ], function (Router, helpers) {
    
    var exports = {};

    exports.init = function () {
      Router.init();
    };

    return exports;
});