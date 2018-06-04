var prod = require('./production');
var dev = require('./development');
var test = require('./test');

var config = {
    dev,
    prod,
    test
}

module.exports = config;

// exports.get = function get(env) {
//     return config[env] || config.development || config.testing ;
//   }
