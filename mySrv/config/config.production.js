var config = require('./config.development');

config.env = 'production';

config.google.google_client_id = '284779082637-o4uhhhiirkb7j89r8qd0jfkfmddnmq94.apps.googleusercontent.com';
config.facebook.facebook_path = 'https://graph.facebook.com/me?access_token=';
config.microsoft.microsoft_path = 'https://graph.microsoft.com/v1.0/me';

module.exports = config;
