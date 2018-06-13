var express = require('express');

var User = require('../models/userModel');

var router = express.Router();
var app = express();

router.post('/checkuser', function (req, res, done) {
    var user = new User(req.body);

    User.get(user, function (result) {
        if (result) {
            console.log('DONE');
            res.status(200).json('hello');
        } else {
            console.log('from catch');
            res.status(400).json('User Not Found');
        }
    })
})

module.exports = router;
