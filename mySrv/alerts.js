var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var Alert = require('./models/alerts');

var app = express();
var Port = 3000;

app.use(bodyParser.json());
app.use(cors());

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

app.listen(Port, function () {
    console.log('Server Running on Port ' + Port);
});

module.exports = app;