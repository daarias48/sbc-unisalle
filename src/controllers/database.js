const admin = require('firebase-admin')
var serviceAccount = require('../../mysensorinfo-firebase-adminsdk-n3tpr-a14a6527e5.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://mysensorinfo-default-rtdb.firebaseio.com/',
})

module.exports = admin