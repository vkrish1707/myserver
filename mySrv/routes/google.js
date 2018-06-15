var express = require('express');
var jwt = require('jsonwebtoken');
var request = require('request');
var { OAuth2Client } = require('google-auth-library');

var User = require('../models/userModel');
var config = require('../config');

var router = express.Router();
var app = express();

router.post('/auth/google', async function (req, res, next) {
    var gToken = req.headers['token'];
    var id = req.body;
    var user = new User(req.body);

    try {
        await verify(gToken);

        User.addUser(user, function (err) {
            if (err) {
                console.log(err);
            }
        });

        let jToken = jwt.sign({ googleUserId: user.id }, 'twinesoft', {expiresIn: '3h'});
        res.status(200).send(jToken);
    } catch (error) {
        
    }
});

async function verify(token) {
    let client = new OAuth2Client(CLIENT_ID = config.google.CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
};

app.use('/api', router);

module.exports = router;
