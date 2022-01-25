const admin = require('firebase-admin')

var serviceAccount = require('../../aire-ciudadano-firebase-adminsdk-742xr-fba775cb94.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aire-ciudadano-default-rtdb.firebaseio.com"
});

module.exports = admin
