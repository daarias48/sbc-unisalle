const { Router } = require('express')
const { ExpressHandlebars } = require('express-handlebars')
const router = Router()
const admin = require('firebase-admin')
const fetch = require('node-fetch')
const MySensor = require('../mySensor')


var serviceAccount = require('../../mysensorinfo-firebase-adminsdk-n3tpr-a14a6527e5.json')
const { restart } = require('nodemon')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://mysensorinfo-default-rtdb.firebaseio.com/'
})

const db = admin.database()


router.get('/', (req, res) => {
    res.render('index')
})


router.get('/modulair-pm', (req, res) => {
    const urlData = "https://api.quant-aq.com/device-api/v1/devices/MOD-PM-00053/data/?sort=timestamp,desc&limit=1";
    const urlInfo = "https://api.quant-aq.com/device-api/v1/devices/MOD-PM-00053"
    const api_key = 'Y25LI6BNJQ4YPGGHXM0GT08M'
    const sensor = new MySensor(api_key)
    
    async function getting() {
        try {
            data = await sensor.getUpdateDataModulair(urlData)
            info = await sensor.getSensorInfoModulAir(urlInfo)
            showInfo(data, info)
        } catch (error) {
            console.log(error);
        }
    }
    getting()
    const showInfo = (data, info) => {
        const tiempo = data.timestamp_local
        const fechaa = tiempo.slice(0, 10)
        const hora = tiempo.slice(11, 19)
        const sensor = {
            'temperature': data.met.temp,
            'rh': data.met.rh,
            'pm1' : data.pm1,
            'pm10' : data.pm10,
            'pm25' : data.pm25,
            'date': fechaa,
            'hour' : hora,
            'model': info.model,
            'description': info.description,
            'country' : info.country,
            'city' : info.city,
            'status' : info.status,
            'sn': info.sn,
            'lat': info.geo.lat,
            'lon' : info.geo.lon
        }
        db.ref('ModulairPM').push(sensor)
        res.render('modulair-pm-info', {info: sensor})
    }
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
            showInfo(data, info)
        } catch (error) {
            console.log(error);
        }
    }
    getting()
    const showInfo = (data, info) => {
        const time = data.time
        const date = time.slice(0, 10)
        const hour = time.slice(11, 19)
        const claritySensor = {
            'deviceID' : data.deviceCode,
            'model' : 'Clarity Node-S',
            'batteryStatus' : info.batteryStatus,
            'batteryValue' : info.batteryPercentage,
            'signal' : info.signalStrength,
            'date' : date,
            'hour' : hour,
            'location' : data.location.coordinates,
            'temperature' : data.characteristics.temperature.value,
            'rh' : data.characteristics.relHumid.value,
            'NO2' : data.characteristics.no2Conc.value,
            'pm2_5Num': data.characteristics.pm2_5ConcNum.value,
            'pm2_5Mass': data.characteristics.pm2_5ConcMass.value,
            'pm1Num': data.characteristics.pm1ConcNum.value,
            'pm1Mass': data.characteristics.pm1ConcMass.value,
            'pm10Num': data.characteristics.pm10ConcNum.value,
            'pm10Mass': data.characteristics.pm10ConcMass.value
        }
        res.render('clarity-info', {info: claritySensor})
    }
})

module.exports = router