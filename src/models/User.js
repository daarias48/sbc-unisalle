const bcrypt = require('bcryptjs')
const admin = require('../controllers/database')
const db = admin.firestore()

class User {
    constructor(){}

    async encryptPassword(password) {
        const salt = await bcrypt.genSalt(10)
        const hash = bcrypt.hash(password, salt)
        return hash
    }

    async matchPasswords(password, confirmPassword) {
        return await bcrypt.compare(password, confirmPassword)
    }

    async addUser(user) {
        const ref = db.collection('users').doc(user.email)
        await ref.set(user)
    }

    async getUser(email) {
        const ref = db.collection('users').doc(email)
        const user = await ref.get()
        if(!user.exists) return null
        else return user.data()
    }



}

module.exports = User
