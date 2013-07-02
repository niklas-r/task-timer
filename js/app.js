define(
  [ 'utils/router',
    'utils/helpers'
  ], function (Router, helpers) {
    
    var exports = {};

    exports.init = Router.init;
    exports.helpers = helpers;

    return exports;
});