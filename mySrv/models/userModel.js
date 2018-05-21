var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost:27017/work');
var db = mongoose.connect;

var UserSchema = mongoose.Schema({
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
})

var User = module.exports = mongoose.model('User', UserSchema);