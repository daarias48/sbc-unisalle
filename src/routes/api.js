const { Router } = require('express')
const { ExpressHandlebars } = require('express-handlebars')
const router = Router()


router.get('/', (req, res) => {
    res.send('Complete route for api')
})


module.exports = router