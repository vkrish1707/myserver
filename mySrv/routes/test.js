var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var request = require('request');
var User = require('../models/userModel');

var app = express();

router.post('/auth/linkedin', async function (req, res, next) {
    let lToken = req.headers['token'];
    console.log('LinkedIn token from client ==== ', lToken);
    await getAt(lToken)        
});

// function getAt(authToken) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', 'https://www.linkedin.com/oauth/v2/accessToken');
//     console.log('after post');

//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     console.log('after set header');

//     xhr.onreadystatechange = () => {
//         console.log('on ready state');

//         if (xhr.readyState == 4 && xhr.status == 200) {
//             console.log('in if');

//             this.token = xhr.response;
//             console.log('token======', this.token);
//         }
//     };
//     xhr.send('grant_type=authorization_code&code=' + authToken + '&redirect_uri=' + 'http://localhost:4200/' + '&client_id=78ov5vlwhek3gu&client_secret=yF1vcU7ESIn8e0HI');
// }

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