const { Router } = require('express')
const { ExpressHandlebars } = require('express-handlebars')
const router = Router()
const admin = require('../controllers/database')
const CursorDB = require('../controllers/getColletionDB')

const modulairCursor = new CursorDB()
const clarityCursor = new CursorDB()

const db = admin.database()

router.get('/', (req, res) => {
    res.render('api-index')
})

router.get('/clarity', (req, res) => {
    db.ref('Clarity').once('value', (snapshot) => {
        const data = snapshot.val()
        res.json(data)
    }) 
})

router.get('/modulairpm', (req, res) => {
    db.ref('sensors/modulairPm').on('value', (snapshot) => {
        const data = snapshot.val()
        res.json(data)
    })
})

router.get('/graph-modulairpm', (req, res) => {
    db.ref('sensors/modulairPm').once('value', (snapshot) => {
        const data = snapshot.val()
        const collection = modulairCursor.modulairCollection(data)
        res.render('api-graph-modulair', {collection})
    })
})

router.get('/graph-clarity', (req, res) => {
    db.ref('sensors/clarity').once('value', (snapshot) => {
        const data = snapshot.val()
        const collection = clarityCursor.clarityColletion(data)
        res.render('api-graph-clarity', {collection})
    })
})

module.exports = router