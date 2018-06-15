var express = require('express');

var User = require('../models/userModel');

var router = express.Router();
var app = express();

router.post('/checkuser', function(req, res, done) {
    var user = new User(req.body);
    User.get(user, function (done, err) {
        if (done) {
            res.json('=====Existing User======');
        } else {
            console.log('new user detected');
        }        
    });
})

router.post('/logoff', function(req, res, done) {
    console.log('api called');
    var user = new User(req.body);
    User.logoff(user, function (done, err) {
        if (done) {
            res.json('user logged out');
        } else {
            console.log('User not logged out');
        }        
    });

})


module.exports = router;
