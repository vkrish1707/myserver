var express = require('express'),
    router = express.Router();

router.route('/auth/google')
    .post(function (req, res, next) {
        var token = req.headers['token'];
        console.log('token from the Google ====', token);

        const { OAuth2Client } = require('google-auth-library');
        const client = new OAuth2Client(CLIENT_ID = '284779082637-o4uhhhiirkb7j89r8qd0jfkfmddnmq94.apps.googleusercontent.com');
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            console.log('UserID:', userid);
            console.log('Full Name:', payload.name);
            console.log('Email: ', payload.email);
            console.log('Mobile:', payload.picture);
        }
        verify().catch(console.error);
    });

module.exports = router;