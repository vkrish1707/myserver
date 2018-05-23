var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var cors = require('cors');

var Alert = require('./models/alerts');
var User = require('./models/userModel');
var Routes = require('./routes/routes');

var app = express();
var Port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var corsOption = {
    origin: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOption));

app.use('/api', Routes);

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

app.post('/api/restricted', function (req, res) {
    let jwt = req.headers.authorization;
    console.log('restricted==', jwt);
})

app.post('/api/generic', function (req, res) {
    let jwt = req.headers.authorization;
    console.log('generic==', jwt);
})


app.use('/api', router);

app.listen(Port, function () {
    console.log('Server Running on Port ' + Port);
});

module.exports = app;
