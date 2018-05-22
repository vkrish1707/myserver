var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var cors = require('cors');
var jwt = require('jsonwebtoken');
var request = require('request');

var Alert = require('./models/alerts');
var User = require('./models/userModel');

var app = express();
var Port = 3000;

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
    });
});

router.route('/auth/google')
    .post(function (req, res, next) {
        let token = req.headers['token'];

        const { OAuth2Client } = require('google-auth-library');
        const client = new OAuth2Client(CLIENT_ID = '284779082637-o4uhhhiirkb7j89r8qd0jfkfmddnmq94.apps.googleusercontent.com');
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];

            jtoken = jwt.sign({ userid: payload.userid }, 'twinesoft', { expiresIn: '3h' });
            res.json(jtoken);
        }
        verify().catch(console.error);

        // creating user object and saving the user to database
        var user = {};

        User.findOne(function (error, user) {
            var user = new User;

            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.photoUrl = req.body.photoUrl;

            user.save();
        });
    });

// Facebook
router.route('/auth/facebook')
    .post(function verifyFacebookUserAccessToken(req, res, FBtoken) {
        var FBtoken = req.headers['token'];

        var path = 'https://graph.facebook.com/me?access_token=' + FBtoken;
        request(path, function (error, response, body) {
            var data = JSON.parse(body);

            if (!error && response && response.statusCode && response.statusCode == 200) {
                var user = {
                    facebookUserId: data.id,
                    fullName: data.name
                };
                var jtoken = jwt.sign({ facebookUserId: data.id }, 'twinesoft', { expiresIn: '3h' });
                res.json(jtoken);
            }
            else {
                console.log(data.error);
            }
        });
    });

// Microsoft
router.route('/auth/microsoft')
    .post(function (req, res, next) {
        let Mtoken = req.headers['token'];
        // console.log('microsoft token from client ==== ', Mtoken);

        // creating user object and saving the user to database
        var user = {};

        User.findOne(function (error, user) {
            var user = new User;

            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.photoUrl = req.body.photoUrl;

            user.save();
        });
    });

router.route('/auth/linkedin')
    .post(function (req, res, next) {
        let Ltoken = req.headers['token'];
        console.log('LinkedIn token from client ==== ', Ltoken);

        // creating user object and saving the user to database
        var user = {};

        User.findOne(function (error, user) {
            var user = new User;

            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.photoUrl = req.body.photoUrl;

            user.save();
        });
    });

app.post('/api/restricted', function (req, res) {
    let jwt = req.body;
    console.log('jwt from restricted ===', jwt);
    if (jwt != null) {
        res.send('Authentication done');
    }
    else {
        res.send('something broke from restricted');
    }
});

app.post('/api/generic', function (req, res) {
    let jwt = req.headers['jwt'];
    console.log('jwt from generic ===', jwt);
    if (jwt === null) {
        res.send('Authentication Required');
    }
    else {
        res.send('something broke from genric');
    }
});

app.use('/api', router);

app.listen(Port, function () {
    console.log('Server Running on Port ' + Port);
});

module.exports = app;