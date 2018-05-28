var express = require('express');
var jwt = require('jsonwebtoken');
var request = require('request');

var User = require('../models/userModel');

var router = express.Router();
var app = express();

router.route('/auth/facebook')
    .post(function verifyFacebookUserAccessToken(req, res, FBtoken) {
        var FBtoken = req.headers['token'];

        var path = 'https://graph.facebook.com/me?access_token=' + FBtoken;
        request(path, function (error, response, body) {
            var data = JSON.stringify(body);

            if (!error && response && response.statusCode && response.statusCode == 200) {
                var user = {
                    facebookUserId: data.id,
                    fullName: data.name
                };
                var jtoken = jwt.sign({ facebookUserId: data.id }, 'twinesoft', { expiresIn: '3h' });
                res.send(jtoken);
            }
            else {
                console.log(data.error);
            }

            var id = req.body;

            var user = new User(req.body);
            User.addUser(user, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        })
    });

app.use('/api', router);

module.exports = router;
