var express = require('express');

var User = require('../models/userModel');

var router = express.Router();
var app = express();

router.post('/checkuser', function (req, res, done) {
    var user = new User(req.body);

<<<<<<< HEAD
    try {
        User.get(user, function (done) {
            if (done) {
                res.status(200).json('=====Existing User======');
            }
        })
    } catch (err) {
        console.log('error');
        res.status(401).json(err);
    }
=======
    User.get(user, function (result) {
        if (result) {
            console.log('DONE');
            res.status(200).json('hello');
        } else {
            console.log('from catch');
            res.status(400).json('User Not Found');
        }
    })
>>>>>>> 0f39d487e802955948f010f96028b807db76f7bd
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
