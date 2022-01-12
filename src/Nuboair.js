const nuboairObj = (data, info) => {
    const id = data.timeWindowStart
    data.timeWindowStart = new Date()
    const fullDate = new Date(data.timeWindowStart)
    const test = fullDate.toLocaleString('es-MX', { timeZone: 'America/Guayaquil' }).split(' ')
    const date = test[0]
    const myHour = test[1].split(':')
    const hourFormat = `${myHour[0]}:${myHour[1]}`
    
    return nuboair = {
        id: id,
        rh: data.RH.toFixed(0),
        temperature: data.T.toFixed(0),
        pm25: data.PM2p5.toFixed(2),
        pm10: data.PM1p0.toFixed(2),
        pressure: data.AtmosphericPressure.toFixed(2),
        airQuality: data.AirQualityIndex.toFixed(0),
        deviceId: info.deviceId,
        deviceName: info.deviceName,
        date: date,
        hour: hourFormat,
        'storage': 'Panel solar',
        'maker': 'Sensirion',
        'comunication': 'Celular 2G',
        'model' : 'NuboAir'
    }
}

module.exports = nuboairObj
