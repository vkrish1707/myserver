var express = require('express');
var jwt = require('jsonwebtoken');
var request = require('request');
var { OAuth2Client } = require('google-auth-library');

var User = require('../models/userModel');

var router = express.Router();
var app = express();

router.post('/auth/google', function (req, res, next) {
        let gToken = req.headers['token'];

        const client = new OAuth2Client(CLIENT_ID = '284779082637-o4uhhhiirkb7j89r8qd0jfkfmddnmq94.apps.googleusercontent.com');
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: gToken,
                audience: CLIENT_ID
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];

            jtoken = jwt.sign({ userid: payload.userid }, 'twinesoft', { expiresIn: '3h' });
            res.json(jtoken);
        }
        verify().catch(console.error);

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