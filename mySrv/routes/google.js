var express = require('express');
var jwt = require('jsonwebtoken');
var request = require('request');
var { OAuth2Client } = require('google-auth-library');

var User = require('../models/userModel');
var config = require('../config');

var router = express.Router();
var app = express();

const client = new OAuth2Client(CLIENT_ID = config.google.CLIENT_ID);
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
};

router.post('/auth/google', function (req, res, next) {
    var gToken = req.headers['token'];

    try {
        this.verify(gToken);

        jtoken = jwt.sign({ userid: payload.userid }, 'twinesoft', { expiresIn: '3h' });
        res.send(jtoken);

    } catch (error) {
        verify().catch(console.error);
    }
    var id = req.body;

    var user = new User(req.body);
    User.addUser(user, function (err) {
        if (err) {
            console.log(err);
        }
    });
});

app.use('/api', router);

module.exports = router;