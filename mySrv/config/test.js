var test = {
    ENV: 'test',

    google: {
        CLIENT_ID: process.env.CLIENT_ID || '284779082637-o4uhhhiirkb7j89r8qd0jfkfmddnmq94.apps.googleusercontent.com'
    },

    facebook: {
        FACEBOOK_PATH: process.env.FACEBOOK_PATH || 'https://graph.facebook.com/me?access_token='
    },

    microsoft: {
        path: process.env.path || 'https://graph.microsoft.com/v1.0/me'
    }
}

module.exports = test;
