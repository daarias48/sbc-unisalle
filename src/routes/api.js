const { Router } = require('express')
const { ExpressHandlebars } = require('express-handlebars')
const router = Router()
const admin = require('../controllers/database')
const CursorDB = require('../controllers/getColletionDB')

const modulairCursor = new CursorDB()
const clarityCursor = new CursorDB()

const db = admin.database()

router.get('/', (req, res) => {
    res.render('prueba')
})

router.get('/clarity', (req, res) => {
    
})

router.get('/modulairpm', (req, res) => {
    
})

router.get('/graph-modulairpm', (req, res) => {
    
})

router.get('/graph-clarity', (req, res) => {
    
})

module.exports = router