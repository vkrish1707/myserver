export const environment = {
  production: true,
  google: {
    client_id: '284779082637-o4uhhhiirkb7j89r8qd0jfkfmddnmq94.apps.googleusercontent.com',
    logout: 'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:4200'
  },

  facebook: {
    appId: '1659111817541772'
  },

  microsoft: {
    appId: '1c2981ca-6ec8-40c0-9842-41ce9e8ddc01',
    scope: 'User.Read User.ReadBasic.All',
    auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    redirect_uri: 'http://localhost:4200'
  },
  
  env: 'prod'
};