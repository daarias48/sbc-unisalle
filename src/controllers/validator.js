const validator = (data) => {
    const { name, email, password, confirmPassword, phone } = data
    const errors = []
    if(typeof name !== 'string') {
        errors.push({ text: 'El nombre solo contiene letras' })
    }
    if(name.length < 3) errors.push({ text: 'El nombre debe contener al menos 4 caracteres' })
    if(password.length < 6) errors.push({ text: 'La contraseña debe contener al menos 5 caracteres' })
    if(password != confirmPassword) {
        errors.push({ text: 'Las contraseñas no coinciden' })
    }
    if(!/^[0-9]+/i.test(phone)) errors.push({ text: 'El teléfono no puede contener letras' })

    return errors

}

module.exports = validator