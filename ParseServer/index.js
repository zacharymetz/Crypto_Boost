

var api = new ParseServer({
    databaseURI: 'mongodb://your.mongo.uri',
    cloud: './cloud/main.js',
    appId: 'myAppId',
    fileKey: 'myFileKey',
    masterKey: 'mySecretMasterKey',
    push: {  }, 
    filesAdapter: ,
  });