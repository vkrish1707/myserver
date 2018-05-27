var express = require('express');
var router = express.Router();
var User = require('../models/userModel');

var app = express();

router.post('/checkuser', function(req, res, done) {
    var user = new User(req.body);
    console.log(user.firstName);
    User.get(user, function (done, err) {
        if (done) {
            res.json('=====Existing User======');
        } else {
            console.log(err);
        }        
    });
})

module.exports = router;
