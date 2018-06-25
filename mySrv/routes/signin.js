var express = require('express');

var User = require('../models/userModel');

var app = express();
var router = express.Router();

router.post('/signin', function (req, res) {
    var user = req.body.date;
    console.log('response from signin', user);

    User.findOneAndUpdate
});

module.exports = router;
