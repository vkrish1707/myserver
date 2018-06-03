var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/userModel');

var app = express();

router.post('/auth/linkedin', function (req, res, next) {
    let lToken = req.headers['token'];
    console.log('LinkedIn token from client ==== ', lToken);
    request.get('http://api.linkedin.com/v1/people/~', {
        'host': 'api.linkedin.com',
        'connection': 'Keep-Alive',
        'Authorization': 'Bearer ' + lToken
    },
        function (error, data) {
            console.log('I am here..');
            if (error) {
                console.log('This is inside error condition ', error)
            } else {
                console.log('this is data== ', data);
            }
        });
});

//     getUserData(lToken, (err, user) => {
//         if (!err) {
//             console.log(user.body.firstName);
//         } else {
//             console.log(err, res);
//         }
//     });


//     var id = req.body;

//     var user = new User(req.body);
//     User.addUser(user, function (err) {
//         if (err) {
//             console.log(err);
//         }
//     });
// });

// function getUserData(accessToken, callback) {
//     request
//         .get(' https://api.linkedin.com/v1/people')
//         .set('Authorization', 'Bearer ' + accessToken)
//         .end((err, res) => {
//             callback(err, res);
//         });


//     var options = {
//         host: 'api.linkedin.com',
//         connection: keep-alive,
//         Authorization: 'Bearer' + lToken
//     }


// var verify = https.request(options, function(res, err) {
//     console.log('response====',res);
//     console.log('error====',err)

// })
// console.log(verify)

app.use('/api', router);

module.exports = router;