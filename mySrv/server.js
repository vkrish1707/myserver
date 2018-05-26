var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var cors = require('cors');

var google = require('./routes/google');
var facebook = require('./routes/facebook');
var microsoft = require('./routes/microsoft');
var linkedin = require('./routes/linkedin');
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

app.use('/api', google);
app.use('/api', facebook);
app.use('/api', microsoft);
app.use('/api', linkedin);
app.use('/api', alerts);


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
