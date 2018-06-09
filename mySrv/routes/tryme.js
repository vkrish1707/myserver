var express = require('express');
var jwt = require('jsonwebtoken');

var router = express.Router();
var app = express();

router.post('/restricted', function (req, res) {
    let jtoken = req.headers.authorization;
    jwt.verify(jtoken, 'twinesoft', function (err, decoded) {
        if (err) {
            return res.status(401).json('Access denied');
        }
        else {
            res.status(200).json('Access granted');
        }
    })
})

router.post('/generic', function (req, res) {
    res.status(200).json('Success');
})

module.exports = router;