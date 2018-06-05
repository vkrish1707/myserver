var express = require('express');

var User = require('../models/userModel');

var router = express.Router();
var app = express();

router.post('/checkuser', function (req, res, done) {
    var user = new User(req.body);

    try {
        User.get(user, function (done) {
            if (done) {
                res.status(200).json('=====Existing User======');
            }
        })
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router;
