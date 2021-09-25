const { Router } = require('express') // El método Router desde express
const router = Router()
const { ExpressHandlebars } = require('express-handlebars')
const { restart } = require('nodemon')
const fetch = require('node-fetch')
const apis = require('../apis')
const modulairPM = require('../ModulairPM')
const claritySensor = require('../Clarity')
const MySensor = require('../mySensor')
const admin = require('../controllers/database')
const CursorDB = require('../controllers/getColletionDB')

const db = admin.database()

const modulair = new MySensor(apis.api_keyModulair);
const clarity = new MySensor(apis.api_keyClarity);
const clarityCursor = new CursorDB()
const modulairCursor = new CursorDB()


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
            db.ref('ModulairPM').once('value', (snapshot) => {
                const data = snapshot.val()
                const collection = modulairCursor.modulairCollection(data)
                res.render('modulair-pm-info', {sensorModulair, collection})
            })
        } catch (error) {
            console.log(error);
        }
    }
    getting()
})

router.get('/clarity', (req, res) => {
    async function getting() {
        try {
            let data = await clarity.getDataClarity(apis.urlDataClarity)
            let info = await clarity.getInfoClarity(apis.urlInfoClarity)
            let sensorClarity = claritySensor(data, info)
            db.ref('Clarity').push(sensorClarity)
            db.ref('Clarity').once('value', (snapshot) => {
                const data = snapshot.val()
                const collection = clarityCursor.clarityColletion(data)
                res.render('clarity-info', {sensorClarity, collection})
            })
        } catch (error) {
            console.log(error);
        }
    }
    getting()
})

router.get('/about', (req, res) => {
    res.render('about')
})

module.exports = router