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

var User = module.exports = mongoose.model('User', UserSchema);
