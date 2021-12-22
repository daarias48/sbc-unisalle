const purpleairSensor = (data) => {
    let dateObj = data.LastSeen
    const format = new Date(dateObj = new Date())
    const dateFormat = format.toLocaleString('es-MX', { timeZone: 'America/Guayaquil' }).split(' ')
    const date = dateFormat[0]
    const hourFormat = dateFormat[1].split(':')
    const hour = `${hourFormat[0]}:${hourFormat[1]}`
    const rh = parseFloat(data.humidity).toFixed(0)
    const pm1 = parseFloat(data.pm1_0_atm).toFixed(2)
    const pm10 = parseFloat(data.pm10_0_atm).toFixed(2)
    const pm25 = parseFloat(data.pm2_5_atm).toFixed(2)
    
    const tempF = parseFloat(data.temp_f).toFixed(0)
    const tempe = ((tempF - 32) * (5 / 9)).toFixed(0)

    return Sensor = {
        id: data.LastSeen,
        rh,
        tempe,
        pm1,
        pm10,
        pm25,
        date,
        hour,
        storage: '110 VAC',
        maker: 'PurpleAir',
        model: 'PurpleAir',
        comunication: 'Wifi',
        device: data.ID
    }
}
module.exports = purpleairSensor