var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var request = require('request');
var User = require('../models/userModel');

var app = express();

router.post('/auth/microsoft', function (req, res, next) {
        let mToken = req.headers['token'];
        console.log('microsoft token from client ==== ', mToken);

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