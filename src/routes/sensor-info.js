const { Router } = require('express')
const { ExpressHandlebars } = require('express-handlebars')
const router = Router()


router.get('/', (req, res) => {
    res.render('index')
})

router.post('/sensor-info', (req, res) => {
    console.log(req.body);
    
    res.send('Received')
})


module.exports = router