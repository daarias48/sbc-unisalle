// Para configurar el server
const express = require('express')
const morgan = require('morgan') // middleware
const expressHandle = require('express-handlebars')
const path = require('path') // permite trabajar con directorio
const app = express()

//settings
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', expressHandle({      //motor de plantillas
    defaultLayout: 'main',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))


//routes
app.use(require('./routes/index'))


//static files
app.use(express.static(path.join(__dirname, 'public')))


module.exports = app