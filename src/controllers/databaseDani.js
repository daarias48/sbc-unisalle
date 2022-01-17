var admin = require("firebase-admin");

var serviceAccount = require("../../mysensorappuwu-firebase-adminsdk-ax1nr-45309bfbac.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mysensorappuwu-default-rtdb.firebaseio.com"
}, 'databaseDani');

module.exports = admin
