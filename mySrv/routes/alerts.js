var express = require('express');
var router = express.Router();
var Alert = require('../models/alerts');

var app = express();

router.get('/alerts', function (req, res, next) {
    Alert.getAlerts(function (err, alerts) {
        if (err) {
            res.sendStatus(401);
        }

        res.status(200).json(alerts);
    });
});

router.post('/alerts', function (req, res) {
    var alert = new Alert(req.body);
    Alert.addAlert(alert, function (err, alert) {
        if (err) {
            res.sendStatus(401);
        }

        res.status(200).json(alert);
    });
});

module.exports = router;
