var config = {
    production: {
        google: {
            CLIENT_ID: '284779082637-o4uhhhiirkb7j89r8qd0jfkfmddnmq94.apps.googleusercontent.com'
        },

        facebook: {
            PATH: 'https://graph.facebook.com/me?access_token='
        },

        microsoft: {
            PATH: 'https://graph.microsoft.com/v1.0/me'
        }
    },

    development: {
        google: {
            CLIENT_ID: '284779082637-o4uhhhiirkb7j89r8qd0jfkfmddnmq94.apps.googleusercontent.com'
        },

        facebook: {
            PATH: 'https://graph.facebook.com/me?access_token='
        },

        microsoft: {
            PATH: 'https://graph.microsoft.com/v1.0/me'
        }
    },

    testing: {
        google: {
            CLIENT_ID: '284779082637-o4uhhhiirkb7j89r8qd0jfkfmddnmq94.apps.googleusercontent.com'
        },

        facebook: {
            PATH: 'https://graph.facebook.com/me?access_token='
        },

        microsoft: {
            PATH: 'https://graph.microsoft.com/v1.0/me'
        }
    },
}

module.exports = config;

// exports.get = function get(env) {
//     return config[env] || config.development || config.testing ;
//   }
