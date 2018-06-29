var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken-refresh');

var google = require('./routes/google');
var facebook = require('./routes/facebook');
var microsoft = require('./routes/microsoft');
var linkedin = require('./routes/linkedin');
var alerts = require('./routes/alerts');
var checkuser = require('./routes/checkuser');
// var test = require('./routes/test');
var cfg = require('./config/config');
var tryme = require('./routes/tryme');
var test = require('tape');
var request = require('supertest');

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
app.use('/api', tryme);
app.use(checkuser);
// app.use('/api', test);

app.use('/api', router);

test('Correct users returned', function (t) {
    request(app)
      .get('/api/tryme')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        t.end();
      });
  });
app.listen(Port, function () {
    console.log('Server Running on Port ' + Port);
});

module.exports = app;
