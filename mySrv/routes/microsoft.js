var express = require('express');
var jwt = require('jsonwebtoken');
var request = require('superagent');

var User = require('../models/userModel');
var config = require('../config');

var router = express.Router();
var app = express();
var router = express.Router();

router.post('/auth/microsoft', function (req, res, next) {
    let mToken = req.headers['token'];

    getUserData(mToken, (err, user) => {
        if (!err) {
            console.log(user.body.displayName);
            console.log(user.body.mail);
            console.log(user.body.givenName);
        } else {
            renderError(err, res);
        }
    });

    var id = req.body;

    var user = new User(req.body);
    User.addUser(user, function (err) {
        if (err) {
            console.log(err);
        }
    });
});

<<<<<<< HEAD
    function getUserData(accessToken, callback) {
        request
            .get(config.development.microsoft.PATH)
            .set('Authorization', 'Bearer ' + accessToken)
            .end((err, res) => {
                callback(err, res);
            });
    }
=======
function getUserData(accessToken, callback) {
    request
        .get(config.microsoft.PATH)
        .set('Authorization', 'Bearer ' + accessToken)
        .end((err, res) => {
            callback(err, res);
        });
}
>>>>>>> fbbffdc78c97e2b53276eafef96cf990ce169665

app.use('/api', router);

module.exports = router;