// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  google: {
    client_id: '284779082637-o4uhhhiirkb7j89r8qd0jfkfmddnmq94.apps.googleusercontent.com',
    logout: 'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:4200'
  },

  facebook: {
    appId: '1820292001598094'
  },

  microsoft: {
    appId: '1c2981ca-6ec8-40c0-9842-41ce9e8ddc01',
    scope: 'User.Read User.ReadBasic.All',
    auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    redirect_uri: 'http://localhost:4200'
  },
  
  env: 'dev'
};
