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

    login: {
        type: Object
    },

    last_login_UTC: {
        type: Date
    },
    last_logout_UTC: {
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
                return done(user);
            }
        });
}

Date.prototype.getUTCTime = function () {
    return this.getTime() + (this.getTimezoneOffset() * 60000);
};

UserSchema.statics.get = function (id, next) {
    User.findOne({ providerID: id.providerID })
        .exec(function (err, user) {
            if (user) {
                user.login = {};
                user.login.last_login_UTC = new Date(); 
                user.last_login_UTC = new Date().getUTCTime();
                user.save();
                console.log('====Existing user **user.get**=====')
                return next(user)
            } else {
                console.log('====New User **user.get**=====')
                return next(null);
            }
        })
}

UserSchema.statics.logoff = function (id, done) {
    User.findOne({ providerID: id.providerID })
        .exec(function (err, user) {
            if (user) {
                user.login = {};
                user.login.last_logout_UTC = new Date();
                user.last_logout_UTC = new Date().getUTCTime();
                user.save();
                console.log('user logged out');
                return done(user)
            } else {
                console.log(err);
            }
        })
}

var User = module.exports = mongoose.model('User', UserSchema);

module.exports = User;
