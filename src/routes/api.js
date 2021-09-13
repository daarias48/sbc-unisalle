const { Router } = require('express')
const { ExpressHandlebars } = require('express-handlebars')
const router = Router()
const admin = require('firebase-admin')
var serviceAccount = require('../../mysensorinfo-firebase-adminsdk-n3tpr-a14a6527e5.json')

const db = admin.database()

router.get('/', (req, res) => {
    res.send('Complete route for api')
})

router.get('/clarity', (req, res) => {
    db.ref('Clarity').once('value', (snapshot) => {
        const data = snapshot.val()
        res.json(data)
    }) 
})

router.get('/modulairpm', (req, res) => {
    db.ref('ModulairPM').once('value', (snapshot) => {
        const data = snapshot.val()
        res.json(data)
    })
})


module.exports = router