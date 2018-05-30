var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/userModel');

var app = express();

router.post('/auth/linkedin', function (req, res, next) {
        let lToken = req.headers['token'];
        console.log('LinkedIn token from client ==== ', lToken);

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