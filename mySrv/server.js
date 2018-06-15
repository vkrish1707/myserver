var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken-refresh');

var google = require('./routes/google');
var facebook = require('./routes/facebook');
var microsoft = require('./routes/microsoft');
var linkedin = require('./routes/linkedin');
var alerts = require('./routes/alerts');
var signin = require('./routes/signin');
var checkuser = require('./routes/checkuser');
// var test = require('./routes/test');

var router = express.Router();
var app = express();
var Port = 3000;
var refreshTokens = {}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var corsOption = {
    origin: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOption));

app.use('/api', google);
app.use('/api', facebook);
app.use('/api', microsoft);
app.use('/api', linkedin);
app.use('/api', alerts);
app.use('/api', signin);
app.use(checkuser);
// app.use('/api', test);

app.post('/api/restricted', function (req, res) {
    let jtoken = req.headers.authorization;
    jwt.verify(jtoken, 'twinesoft', function (err, decoded) {
        if (err) {
            return res.status(401).json('Access denied');
        }
        else {
            res.status(200).send(refreshedJwt);
            var jwtdecoded = jwt.decode(jtoken, {completed: true});
            var refreshedJwt = jwt.refresh(jwtdecoded, '20m', 'twinesoft');
            console.log(refreshedJwt);
        }
    })
})

app.post('/api/generic', function (req, res) {
    res.status(200).json('Success');
})

app.use('/api', router);

app.listen(Port, function () {
    console.log('Server Running on Port ' + Port);
});

module.exports = app;
