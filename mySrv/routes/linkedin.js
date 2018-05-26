var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var request = require('request');
var User = require('../models/userModel');

var app = express();

router.route('/auth/linkedin')
    .post(function (req, res, next) {
        let Ltoken = req.headers['token'];
        console.log('LinkedIn token from client ==== ', Ltoken);

        var id = req.body;

        var user = new User(req.body);
        User.addUser(user, function (err) {
            if (err) {
                console.log(err);
            }
        });
    });

app.use('/api', router);

module.exports = router;