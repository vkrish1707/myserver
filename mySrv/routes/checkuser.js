var express = require('express');
var router = express.Router();
var User = require('../models/userModel');

var app = express();

router.post('/checkuser', function(req, res, done) {
    var user = new User(req.body);
    User.get(user, function (done, err) {
        if (done) {
<<<<<<< HEAD
            res.json('====Existing User====');
=======
            res.json('=====Existing User======');
>>>>>>> a71799b9fd753dc1c4eae47d8164b9e8f3743d59
        } else {
            console.log(err);
        }        
    });
})

module.exports = router;
