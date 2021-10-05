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
const cron = require('node-cron')

const db = admin.database()

const modulair = new MySensor(apis.api_keyModulair);
const clarity = new MySensor(apis.api_keyClarity);
const clarityCursor = new CursorDB()
const modulairCursor = new CursorDB()


router.get('/', (req, res) => {
    res.render('index')
})

router.get('/login', (req, res) => {
    res.render('login')
})


router.get('/modulair-pm', (req, res) => {
    try {
        console.log('ff');
        let data = []
        let sensorModulair = []
        db.ref('sensors/modulairPm').on('value', (snapshot) => {
            data = snapshot.val()
            return data
        })
        db.ref('sensors/modulairPm').on('child_added', (snapshot) => {
            sensorModulair = snapshot.val()
            return sensorModulair = snapshot.val()
        })
        const collection = modulairCursor.modulairCollection(data)
        console.log(collection);
        res.render('modulair-pm-info', {sensorModulair, collection})
    } catch (error) {
        console.log(error);
    }
})

router.get('/clarity', (req, res) => {
    try {
        db.ref('sensors/clarity').on('value', (snapshot) => {
            return data = snapshot.val()
        })
        db.ref('sensors/clarity').on('child_added', (snapshot) => {
            return sensorClarity = snapshot.val()
        })
        const collection = clarityCursor.clarityColletion(data)
        res.render('clarity-info', {sensorClarity, collection})
    } catch (error) {}
})

router.get('/about', (req, res) => {
    res.render('about')
})

module.exports = router