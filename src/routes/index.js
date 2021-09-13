const { Router } = require('express') // El método Router desde express
const router = Router()
const { ExpressHandlebars } = require('express-handlebars')
const admin = require('firebase-admin')
const { restart } = require('nodemon')
const fetch = require('node-fetch')
const apis = require('../apis')
const modulairPM = require('../ModulairPM')
const claritySensor = require('../Clarity')
const MySensor = require('../mySensor')

const modulair = new MySensor(apis.api_keyModulair);
const clarity = new MySensor(apis.api_keyClarity);



var serviceAccount = require('../../mysensorinfo-firebase-adminsdk-n3tpr-a14a6527e5.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://mysensorinfo-default-rtdb.firebaseio.com/'
})

const db = admin.database()


router.get('/', (req, res) => {
    async function getting() {
        try {
            dataModulair = await modulair.getUpdateDataModulair(apis.urlDataModulair)
            infoModulair = await modulair.getSensorInfoModulAir(apis.urlInfoModulair)
            
            dataClarity = await clarity.getDataClarity(apis.urlDataClarity)
            infoClarity = await clarity.getInfoClarity(apis.urlInfoClarity)

            let sensorModulair = modulairPM(dataModulair, infoModulair)
            let sensorClarity = claritySensor(dataClarity, infoClarity)
            db.ref('ModulairPM').push(sensorModulair)
            db.ref('Clarity').push(sensorClarity)
            // db.ref('ModulairPM').once('child_added', (snapshot) => {
            //     const data = snapshot.val()
            //     console.log(data.hour);
            // })
        } catch (error) {
            console.log(error);
        }
    }
    getting()
    res.render('index')
})


router.get('/modulair-pm', (req, res) => {
    async function getting() {
        try {
            data = await modulair.getUpdateDataModulair(apis.urlDataModulair)
            info = await modulair.getSensorInfoModulAir(apis.urlInfoModulair)
            let sensorModulair = modulairPM(data, info);
            db.ref('ModulairPM').push(sensorModulair)
            res.render('modulair-pm-info', {info: sensorModulair})
        } catch (error) {
            console.log(error);
        }
    }
    getting()
})

router.get('/clarity', (req, res) => {
    const urlData ="https://clarity-data-api.clarity.io/v1/measurements?code=AN92S2XQ&limit=1";
    const urlDevice ="https://clarity-data-api.clarity.io/v1/devices?code=AN92S2XQ";
    let api_key="O67ZARLVyFiTnxx3Q8USbpy8iBenoCmD7DsT6oW6";
    const sensor = new MySensor(api_key)
    async function getting() {
        try {
            let data = await sensor.getDataClarity(urlData)
            let info = await sensor.getInfoClarity(urlDevice)
            let sensorClarity = claritySensor(data, info)
            res.render('clarity-info', {info: sensorClarity})
            db.ref('Clarity').push(sensorClarity)
        } catch (error) {
            console.log(error);
        }
    }
    getting()
})

module.exports = router