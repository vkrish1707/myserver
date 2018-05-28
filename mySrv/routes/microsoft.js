var express = require('express');
var jwt = require('jsonwebtoken');
var request = require('superagent');

var User = require('../models/userModel');

var router = express.Router();
var app = express();

router.post('/auth/microsoft', function (req, res, next) {
        let mToken = req.headers['token'];
        console.log('microsoft token from client ==== ', mToken);

    getUserData(mToken, (err, user) => {
        if (!err) {
            console.log(user.body.displayName);
            console.log(user.body.mail);
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

    function getUserData(accessToken, callback) {
        request
            .get('https://graph.microsoft.com/v1.0/me')
            .set('Authorization', 'Bearer ' + accessToken)
            .end((err, res) => {
                callback(err, res);
            });
}

app.use('/api', router);

module.exports = router;