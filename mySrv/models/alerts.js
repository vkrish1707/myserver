var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/work');
var db = mongoose.connect;

//Alerts Schema
var AlertSchema = mongoose.Schema({
    id: { type: Number },
    message: { type: String },
    icon: { type: String }
}, { timestamps: true });

var Alert = module.exports = mongoose.model('Alert', AlertSchema);

//Fetch Alerts data from db
module.exports.getAlerts = function (callback) {
    Alert.find(callback);
}

//Insert Alerts data to db
module.exports.addAlert = function (alert, callback) {
    Alert.create(alert, callback);
}
