// Para iniciar el server
const app = require('./app')
const MySensor = require('./mySensor')
const fetch = require("node-fetch");
var cron = require('node-cron');
const admin = require('./controllers/database')
const apis = require('./apis')

const modulairObj = require('./ModulairPM')
const clarityObj = require('./Clarity')
const nuboairObj = require('./Nuboair')
const evaObj = require('./Eva')

const modulairPMTest = new MySensor(apis.api_keyModulair)
const claritySensor = new MySensor(apis.api_keyClarity)
const nuboair = new MySensor(apis.api_keyNuboair)
const eva = new MySensor(apis.api_keyEva)


const db = admin.database()
app.listen(app.get('port'))
console.log('Server on port', app.get('port'));


const pushingModulair = async () => {
    const dataModulair = await modulairPMTest.getUpdateDataModulair(apis.urlDataModulair)
    const infoModulair = await modulairPMTest.getSensorInfoModulAir(apis.urlInfoModulair)
    
    const dataModulair2 = await modulairPMTest.getUpdateDataModulair(apis.urlDataModulair2)
    const infoModulair2 = await modulairPMTest.getSensorInfoModulAir(apis.urlInfoModulair2)

    const dataEva = await eva.getDataEva(apis.urlDataEva)
    const infoEva = await eva.getInfoEva(apis.urlInfoEva)

    const collectionEva = evaObj(dataEva, infoEva)
    const collectionModulair = modulairObj(dataModulair, infoModulair)
    const collectionModulair2 = modulairObj(dataModulair2, infoModulair2)
    

    try {
        db.ref('sensors/eva').orderByChild('id').equalTo(collectionEva.id).once('value', (snapshot) =>{
            if(!snapshot.exists()) db.ref('sensors/eva').push(collectionEva)            
        })
    } catch (error) {
        console.log(error);
    }
    db.ref('sensors/modulairPm').orderByChild('id').equalTo(collectionModulair.id).once('value', (snapshot) =>{
        if(!snapshot.exists()) db.ref('sensors/modulairPm').push(collectionModulair)            
    })
    db.ref('sensors/modulairPm2').orderByChild('id').equalTo(collectionModulair2.id).once('value', (snapshot) =>{
        if(!snapshot.exists()) db.ref('sensors/modulairPm2').push(collectionModulair2)            
    })
}

const pushingClarity = async () => {
    const dataClarity = await claritySensor.getDataClarity(apis.urlDataClarity)
    const infoClarity = await claritySensor.getInfoClarity(apis.urlInfoClarity)

    const dataNuboair = await nuboair.getDataNubo(apis.urlDataNuboair)
    const infoNuboair = await nuboair.getDataNubo(apis.urlInfoNuboair)

    const collectionNuboair = nuboairObj(dataNuboair, infoNuboair)
    const collectionClarity = clarityObj(dataClarity, infoClarity)

    db.ref('sensors/nuboair').orderByChild('id').equalTo(collectionNuboair.id).once('value', (snapshot) =>{
        if(!snapshot.exists()) db.ref('sensors/nuboair').push(collectionNuboair)            
    })
    db.ref('sensors/clarity').orderByChild('id').equalTo(collectionClarity.id).once('value', (snapshot) =>{
        if(!snapshot.exists()) db.ref('sensors/clarity').push(collectionClarity)            
    })

}

cron.schedule('*/30 * * * * *', () => {
    try {
        pushingModulair()
    }catch(err) {
        console.log(err);
    }
});
cron.schedule('*/120 * * * * *', () => {
    try {
        pushingClarity()
    }catch(err) {
        console.log(err);
    }
});
