const passport = require('passport')
const Local = require('passport-local').Strategy
const admin = require('../controllers/database')
const db = admin.firestore()
const User = require('../models/User')

const user = new User()

passport.use(new Local({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const myUser = user.getUser(email)
    if(!myUser) {
        return done(null, false, { message: 'El usuario no existe' })
    }else {
        const match = user.matchPasswords(password)
        if(match) { return done(null, myUser) }
        else { return done(null, false, { message: 'Contraseña incorrecta' }) }
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
    console.log(done);
})

passport.deserializeUser( async (id, done) => {
    const ref = db.collection('users');
    const snapshot = await ref.where('id', '==', id).get();
    if (snapshot.empty) {
        done(null, null)
    }else {
        await snapshot.forEach(doc => {
            done(null, doc.data())
        })
    }
    console.log(done);
})
