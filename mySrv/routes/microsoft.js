var express = require('express');
var jwt = require('jsonwebtoken');
var request = require('superagent');

var User = require('../models/userModel');
var config = require('../config');

var app = express();
var router = express.Router();

router.post('/auth/microsoft', function (req, res, next) {
    let mToken = req.headers['token'];

    getUserData(mToken, (err, user) => {
        if (!err) {

            console.log(user.body.id);
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
        } else {
            let jToken = jwt.sign({ microsoftUserId: user.id }, 'twinesoft', { expiresIn: '3h' });
            res.status(200).send(jToken);
        }
    });
});

function getUserData(accessToken, callback) {
    request
        .get(config.microsoft.PATH)
        .set('Authorization', 'Bearer ' + accessToken)
        .end((err, res) => {
            callback(err, res);
        });
}

app.use('/api', router);

module.exports = router;