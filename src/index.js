// Para iniciar el server
const app = require('./app')
const MySensor = require('./mySensor')
const fetch = require("node-fetch");
var cron = require('node-cron');
const admin = require('./controllers/database')
const apis = require('./apis')
const modulairObj = require('./ModulairPM')
const modulairPMTest = new MySensor(apis.api_keyModulair)
const claritySensor = new MySensor(apis.api_keyClarity)
const clarityObj = require('./Clarity')

const db = admin.database()

app.listen(app.get('port'))
console.log('Server on port', app.get('port'));


const pushing = async () => {
    const dataModulair = await modulairPMTest.getUpdateDataModulair(apis.urlDataModulair)
    const infoModulair = await modulairPMTest.getSensorInfoModulAir(apis.urlInfoModulair)

    const dataClarity = await claritySensor.getDataClarity(apis.urlDataClarity)
    const infoClarity = await claritySensor.getInfoClarity(apis.urlInfoClarity)

    const collectionModulair = modulairObj(dataModulair, infoModulair)
    const collectionClarity = clarityObj(dataClarity, infoClarity)
    db.ref('sensors/clarity').orderByChild('id').equalTo(collectionClarity.id).once('value', (snapshot) =>{
        if(!snapshot.exists()) db.ref('sensors/clarity').push(collectionClarity)            
    })
    db.ref('sensors/modulairPm').orderByChild('id').equalTo(collectionModulair.id).once('value', (snapshot) =>{
        if(!snapshot.exists()) db.ref('sensors/modulairPm').push(collectionModulair)            
    })
}
// cron.schedule('*/20 * * * * *', () => {
//     pushing()
// });
