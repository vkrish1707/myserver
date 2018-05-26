var express = require('express');
var router = express.Router();
var User = require('../models/userModel');

var app = express();

router.post('/checkuser', function(req, res, done) {
    var user = new User(req.headers['check']);
    console.log(user);
})

module.exports = router;