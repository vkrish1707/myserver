var express = require('express');
var jwt = require('jsonwebtoken');
var { OAuth2Client } = require('google-auth-library');

var User = require('../models/userModel');
var cfg = require('../config/config');

var router = express.Router();
var app = express();

router.post('/auth/google', async function (req, res, next) {
    var gToken = req.headers['token'];
    var id = req.body;
    var user = new User(req.body);

    try {
        var data = await verify(gToken);

        User.addUser(user, function (err) {
            if (err) {
                console.log(err);
            }
        })
        
        var jToken = jwt.sign({ userid: data.userid }, 'twinesoft', {expiresIn: '3h'});
        res.status(200).send(jToken);

    } catch (error) {
        res.status(400).send(error);
    }
});

async function verify(gToken) {
    const client = new OAuth2Client(CLIENT_ID = cfg.google.google_client_id);
    const ticket = await client.verifyIdToken({
        idToken: gToken,
        audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    return payload;
}


app.use('/api', router);

module.exports = router;
