var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/work');
var db = mongoose.connect;

var UserSchema = mongoose.Schema({
    providerID: {
        type: String
    },

    providerName: {
        type: String
    },

    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    email: {
        type: String
    },

    contact: {
        type: Number
    },

    photoUrl: {
        type: String
    },

    last_login_date: {
        type: Date
    }

}, { timestamps: true });

UserSchema.statics.addUser = function (id, done) {
    User.findOne({ providerID: id.providerID })
        .exec(function (err, user) {
            if (err) {
                return done(err)
            } else if (user) {
                return done();
            } else {
                console.log('user saved');
                
                var user = new User;

                user.providerID = id.providerID;
                user.providerName = id.providerName;
                user.firstName = id.firstName;
                user.lastName = id.lastName;
                user.email = id.email;
                user.photoUrl = id.photoUrl;

                user.save();
                return done();
            }
        });
}

UserSchema.statics.get = function(user, next) {
    User.findOne({ providerID: user.providerID })
    .exec(function (error, result) {
        if (result) {
            console.log('====Existing user **user.get**=====');
            return next(result);
        } else {
            console.log('====New User **user.get**=====');
            return next(null);
        }
    })
}

var User = module.exports = mongoose.model('User', UserSchema);

module.exports = User;
