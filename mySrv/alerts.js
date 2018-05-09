var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var cors = require('cors');
var jwt = require('jsonwebtoken');
var request = require('request');
var jwt_decode = require('jwt-decode');

var Alert = require('./models/alerts');

var app = express();
var Port = 3000;
var gjtoken = '';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var corsOption = {
    origin: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOption));

app.get('/api/alerts', function (req, res, next) {
    Alert.getAlerts(function (err, alerts) {
        if (err) {
            res.sendStatus(401);
        }

        res.json(alerts);
    });
});

app.post('/api/alerts', function (req, res) {
    var alert = new Alert(req.body);
    Alert.addAlert(alert, function (err, alert) {
        if (err) {
            res.sendStatus(401);
        }

        res.json(alert);
        console.log(alert);
    });
});

router.route('/auth/google')
    .post(function (req, res, next) {
        var token = req.headers['token'];
        // console.log('token from the Google ====', token);

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
            console.log('ImageUrl:', payload.picture);

            gjtoken = jwt.sign({ userid: payload.userid }, 'twinesoft', { expiresIn: '3h' });
            console.log(gjtoken);
        }
        verify().catch(console.error);
    });

// Facebook
router.route('/auth/facebook')
    .post(function verifyFacebookUserAccessToken(req, res, token2) {
        var token2 = req.headers['token2'];

        var path = 'https://graph.facebook.com/me?access_token=' + token2;
        request(path, function (error, response, body) {
            var data = JSON.parse(body);
            
            if (!error && response && response.statusCode && response.statusCode == 200) {
                var user = {
                    facebookUserId: data.id,
                    username: data.profile,
                    firstName: data.displayName,
                    lastName: data.name,
                    email: data.email
                };
                var jtoken = jwt.sign({ facebookUserId: data.id, name:data.name }, 'twinesoft', { expiresIn: '3h' });

                decoded = jwt_decode(jtoken);
                res.json(decoded);
            }
            else {
                console.log(data.error);
            }
        });
    });

app.get('/gjwt', function(req, res) {
    res.json(gjtoken);
    console.log(' The google JWT is ',gjtoken);
});

app.use('/api', router);

app.listen(Port, function () {
    console.log('Server Running on Port ' + Port);
});

module.exports = app;