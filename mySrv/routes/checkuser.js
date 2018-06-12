var express = require('express');

var User = require('../models/userModel');

var router = express.Router();
var app = express();

router.post('/checkuser', function (req, res, done) {
    var user = new User(req.body);

    try {
        User.get(user, function (done) {
            if (done) {
                console.log('DONE');                
                res.status(200).json('hello');
            }
        })
        console.log('in try, after user.get');
    } catch (err) {
        console.log('from catch');
        res.status(400).send(err);
    }
})

module.exports = router;
