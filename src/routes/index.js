const { Router } = require('express') // El método Router desde express
const app = require('express') // El método Router desde express
const router = Router()
const validator = require('../controllers/validator')
const User = require('../models/User')
const passport = require('passport')
const admin = require('../controllers/database')
const db = admin.firestore()
const {OAuth2Client} = require('google-auth-library');

const CLIENT_ID = '72274332118-6qqr49ssj9u903hevdk3kmjhevv27m7q.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

const { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signOut
} = require('../config/firebase-config')

const user = new User()
const provider = new GoogleAuthProvider()
const auth = getAuth()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/modulair-pm', checkAuthenticated, (req, res) => {
    let user = req.user
    if(!user) {
        onAuthStateChanged(auth, user => {
            if(user) {
                res.render('modulair-pm-info', {user})
            }else {
                req.flash('errorsMsg', 'No está autorizado, por favor ingrese o regístrese')
                res.redirect('/login')
            }
        }) 
    }else {
        res.render('modulair-pm-info', {user})
    }
})

router.get('/modulair-pm2', checkAuthenticated, (req, res) => {
    let user = req.user
    if(!user) {
        onAuthStateChanged(auth, user => {
            if(user) {
                res.render('modulairpm2', {user})
            }else {
                req.flash('errorsMsg', 'No está autorizado, por favor ingrese o regístrese')
                res.redirect('/login')
            }
        }) 
    }else {
        res.render('modulairpm2', {user})
    }
})

router.get('/clarity', checkAuthenticated, (req, res) => {
    let user = req.user
    if(!user) {
        onAuthStateChanged(auth, user => {
            if(user) {
                res.render('clarity-info', {user})
            }else {
                req.flash('errorsMsg', 'No está autorizado, por favor ingrese o regístrese')
                res.redirect('/login')
            }
        }) 
    }else {
        res.render('clarity-info', {user})
    }
}
)
router.get('/clarity2', checkAuthenticated, (req, res) => {
    let user = req.user
    if(!user) {
        onAuthStateChanged(auth, user => {
            if(user) {
                res.render('clarity2', {user})
            }else {
                req.flash('errorsMsg', 'No está autorizado, por favor ingrese o regístrese')
                res.redirect('/login')
            }
        }) 
    }else {
        res.render('clarity2', {user})
    }
})

router.get('/about', checkAuthenticated, (req, res) => {
    let user = req.user
    if(!user) {
        onAuthStateChanged(auth, async user => {
            if(user) {
                res.render('about', {user})
            }else {
                res.render('about')
            }
        }) 
    }else {
        res.render('about', {user})
    }
})

router.get('/contact-clima', checkAuthenticated, (req, res) => {
    let user = req.user
    if(!user) {
        onAuthStateChanged(auth, async user => {
            if(user) {
                res.render('contact-clima', {user})
            }else {
                res.render('contact-clima')
            }
        }) 
    }else {
        res.render('contact-clima', {user})
    }
})

router.get('/plantower', checkAuthenticated, (req, res) => {
    let user = req.user
    if(!user) {
        onAuthStateChanged(auth, user => {
            if(user) {
                res.render('plantower', {user})
            }else {
                req.flash('errorsMsg', 'No está autorizado, por favor ingrese o regístrese')
                res.redirect('/login')
            }
        }) 
    }else {
        res.render('plantower', {user})
    }
})
router.get('/plantower2', checkAuthenticated, (req, res) => {
    let user = req.user
    if(!user) {
        onAuthStateChanged(auth, user => {
            if(user) {
                res.render('plantower2', {user})
            }else {
                req.flash('errorsMsg', 'No está autorizado, por favor ingrese o regístrese')
                res.redirect('/login')
            }
        }) 
    }else {
        res.render('plantower2', {user})
    }
})
router.get('/plantower3', checkAuthenticated, (req, res) => {
    let user = req.user
    if(!user) {
        onAuthStateChanged(auth, user => {
            if(user) {
                res.render('plantower3', {user})
            }else {
                req.flash('errorsMsg', 'No está autorizado, por favor ingrese o regístrese')
                res.redirect('/login')
            }
        }) 
    }else {
        res.render('plantower3', {user})
    }
})
router.get('/plantower4', checkAuthenticated, (req, res) => {
    let user = req.user
    if(!user) {
        onAuthStateChanged(auth, user => {
            if(user) {
                res.render('plantower4', {user})
            }else {
                req.flash('errorsMsg', 'No está autorizado, por favor ingrese o regístrese')
                res.redirect('/login')
            }
        }) 
    }else {
        res.render('plantower4', {user})
    }
})
router.get('/plantower5', checkAuthenticated, (req, res) => {
    let user = req.user
    if(!user) {
        onAuthStateChanged(auth, user => {
            if(user) {
                res.render('plantower5', {user})
            }else {
                req.flash('errorsMsg', 'No está autorizado, por favor ingrese o regístrese')
                res.redirect('/login')
            }
        }) 
    }else {
        res.render('plantower5', {user})
    }
})

router.get('/mhz', checkAuthenticated, (req, res) => {
    let user = req.user
    if(!user) {
        onAuthStateChanged(auth, user => {
            if(user) {
                res.render('mhz', {user})
            }else {
                req.flash('errorsMsg', 'No está autorizado, por favor ingrese o regístrese')
                res.redirect('/login')
            }
        }) 
    }else {
        res.render('mhz', {user})
    }
})

router.get('/contact', checkAuthenticated, (req, res) => {
    let user = req.user
    if(!user) {
        onAuthStateChanged(auth, user => {
            if(user) {
                res.render('contact', {user})
            }else {
                res.render('contact')
            }
        })
    }else {
        res.render('contact', {user})
    }
})

router.get('/nuboair', checkAuthenticated, (req, res) => {
    let user = req.user
    if(!user) {
        onAuthStateChanged(auth, user => {
            if(user) {
                res.render('nuboair', {user})
            }else {
                req.flash('errorsMsg', 'No está autorizado, por favor ingrese o regístrese')
                res.redirect('/login')
            }
        }) 
    }else {
        res.render('nuboair', {user})
    }
})

router.get('/eva', checkAuthenticated, (req, res) => {
    let user = req.user
    if(!user) {
        onAuthStateChanged(auth, user => {
            if(user) {
                res.render('eva', {user})
            }else {
                req.flash('errorsMsg', 'No está autorizado, por favor ingrese o regístrese')
                res.redirect('/login')
            }
        }) 
    }else {
        res.render('eva', {user})
    }
})

router.get('/eva2', checkAuthenticated, (req, res) => {
    let user = req.user
    if(!user) {
        onAuthStateChanged(auth, user => {
            if(user) {
                res.render('eva2', {user})
            }else {
                req.flash('errorsMsg', 'No está autorizado, por favor ingrese o regístrese')
                res.redirect('/login')
            }
        }) 
    }else {
        res.render('eva2', {user})
    }
})

router.get('/airlink', checkAuthenticated, (req, res) => {
    let user = req.user
    if(!user) {
        onAuthStateChanged(auth, user => {
            if(user) {
                res.render('airlink', {user})
            }else {
                req.flash('errorsMsg', 'No está autorizado, por favor ingrese o regístrese')
                res.redirect('/login')
            }
        }) 
    }else {
        res.render('airlink', {user})
    }
})

router.get('/purpleair', checkAuthenticated, (req, res) => {
    let user = req.user
    if(!user) {
        onAuthStateChanged(auth, user => {
            if(user) {
                res.render('purpleair', {user})
            }else {
                req.flash('errorsMsg', 'No está autorizado, por favor ingrese o regístrese')
                res.redirect('/login')
            }
        }) 
    }else {
        res.render('purpleair', {user})
    }
})

router.get('/politics', checkAuthenticated, (req, res) => {
    let user = req.user
    if(!user) {
        onAuthStateChanged(auth, user => {
            if(user) {
                res.render('politics', {user})
            }else {
                res.render('politics')
            }
        })
    }else {
        res.render('politics', {user})
    }
})

// User routes

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    let emailUser
    let tokenId
    signInWithEmailAndPassword(auth, email, password)
    .then(data => {
        emailUser = data.user.email
        return data.user.getIdToken()
    })
    .then(token => {
        tokenId = token
        return res.redirect('/info')
    })
    .catch(err => {
        const errors = []
        if(err.code === 'auth/user-not-found'){
            errors.push({ text: 'El usuario no existe' })
        }
        if(err.code === 'auth/wrong-password') {
            errors.push({ text: 'Contraseña incorrecta' })
        }
        if(err.code === 'auth/too-many-requests') {
            errors.push({ text: 'Excedió el número de intentos, por favor intente en un rato' })
        }
        return res.render('login', { errors })
        
    })
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', async (req, res) => {
    const { name, email, password, confirmPassword, phone } = req.body
    const errors = []
    const pass = await user.encryptPassword(password)
    const verifyUser = await user.getUser(req.body.email)

    if (verifyUser != null) {
        errors.push({ text: 'El email se encuentra registrado' })
        res.render('signup', { errors, name, email, password, phone })
    } else {
        let uid
        let tokenId
        createUserWithEmailAndPassword(auth, email, password)
        .then(data => {
            uid = data.user.uid
            // tokenId = await data.user.getIdToken()
            console.log(uid);
            if(errors.length <= 0) {
                user.addUser({ name, email, pass, phone, id: uid })
                req.flash('successMsg', 'Usuario añadido')
                return res.redirect('/info')
            }
        })
        .catch(err => {
            if(err.code === 'auth/weak-password') {
                errors.push({ text: 'La contraseña debe tener al menos 6 caracteres' })
            }
            if(password != confirmPassword) {
                errors.push({ text: 'Las contraseñas no coinciden' })
            }
            if(typeof name !== 'string') {
                errors.push({ text: 'El nombre debe contener solo contiene letras' })
            }
            if(name.length < 3) errors.push({ text: 'El nombre debe contener al menos 4 caracteres' })
            if(!/^[0-9]+/i.test(phone)) errors.push({ text: 'El teléfono no puede contener letras' })
            return res.render('signup', { errors })
        })
    }
})

router.get('/info', checkAuthenticated, (req, res) => {
    let user = req.user
    try {
        if(!user) {
            onAuthStateChanged(auth, async user => {
                if(user) {
                    const myRef = db.collection('users').doc(user.email)
                    const doc = await myRef.get()
                    user.name = doc.data().name
                    res.render('info-sensors', {user})
                }else {
                    req.flash('errorsMsg', 'No está autorizado, por favor ingrese o regístrese')
                    res.redirect('/login')
                }
            }) 
        }else {
            res.render('info-sensors', {user})
        }    
    } catch (error) {
        console.log(error);
    }
    
})

router.post('/googleLogin', (req, res) => {
    let token = req.body.token
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID, 
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success')
        })
        .catch(console.error);
})

router.get('/logout', (req, res) => {
    try {
        res.clearCookie('session-token')
        signOut(auth)
        req.logout()
        return res.redirect('/')
    } catch (error) {
        console.log(error);
    }
})

function checkAuthenticated(req, res, next){
    let token = req.cookies['session-token'];
    if(token) {
        let user = {};
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            });
            const payload = ticket.getPayload();
            user.name = payload.name;
            user.email = payload.email;
            user.picture = payload.picture;
          }
          verify()
          .then(()=>{
              req.user = user;
              next();
          })
          .catch(err=>{
              req.flash('errorsMsg', 'No está autorizado, por favor ingrese o regístrese')
              next()
              return res.redirect('/login')
            })
    } else {
        next()
    }

}

module.exports = router