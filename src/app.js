// Para configurar el server
const express = require('express')
const morgan = require('morgan') // middleware
const expressHandle = require('express-handlebars')
const path = require('path') // permite trabajar con directorio
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const passport = require('passport')



const app = express()

//settings
app.set('port', process.env.PORT || 5000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', expressHandle({      //motor de plantillas
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false})) // para aceptar los datos de formularios html (false = solo recibe datos JSON)
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: 'mySecretApp',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//Global variables
app.use((req, res, next) => {
    res.locals.successMsg = req.flash('successMsg')
    res.locals.errorsMsg = req.flash('errorsMsg')
    res.locals.validation = req.flash('validation')
    res.locals.user = req.user || null

    next()
})

//routes
app.use(require('./routes/index'))
//app.use('/api', require('./routes/api'))


//static files
app.use(express.static(path.join(__dirname, '/public')))


module.exports = app
