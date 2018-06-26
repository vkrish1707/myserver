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

router.post('/logoff', function(req, res, done) {
    console.log('api called');
    var user = new User(req.body);
    User.logoff(user, function (done, err) {
        if (done) {
            res.status(200).json('user logged out');
        } else {
            res.status(401).json('user not logged out')
        }        
    });

})


module.exports = router;
