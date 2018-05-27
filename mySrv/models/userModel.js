var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/work');
var db = mongoose.connect;

var UserSchema = mongoose.Schema({
    providerID: {
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
                var user = new User;

                user.providerID = id.providerID;
                user.firstName = id.firstName;
                user.lastName = id.lastName;
                user.email = id.email;
                user.photoUrl = id.photoUrl;

                user.save();
                return done();
            }
        });
}

UserSchema.statics.get = function(id, done) {
    User.findOne({ providerID: id.providerID })
    .exec(function (err, user) {
        if (user) {
            console.log('====Existing user **user.get**=====')
            return done(user)
        } else {
            console.log('====New User **user.get**=====')
            return err;
        }
    })
}

var User = module.exports = mongoose.model('User', UserSchema);

module.exports = User;
