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

// AlertSchema.methods.generateJWT = function () {
//     var today = new Date();
//     var exp = new Date(today);
//     exp.setDate(today.getDate() + 60);

//     return jwt.sign({
//         userid: this.userid,
//         email: this.email,
//         exp: parseInt(exp.getTime() / 1000),
//     }, secret);
// };