var prod = require('./production');
var dev = require('./development');
var test = require('./test');

var config = {
    dev,
    test,
    prod
}

module.exports = config;
