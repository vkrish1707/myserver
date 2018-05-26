var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var cors = require('cors');
var jwt = require('jsonwebtoken');

var Routes = require('./routes/routes');
var alerts = require('./routes/alerts');

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
app.use('/api', alerts);


app.post('/api/restricted', function (req, res) {
    let jtoken = req.headers.authorization;
    console.log(jtoken, typeof jtoken);
    jwt.verify(jtoken, 'twinesoft', function (err, decoded) {
        if (err) {
            return res.status(401).json('Access denied');
        }
        else {
            res.status(200).json('Access granted');
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
