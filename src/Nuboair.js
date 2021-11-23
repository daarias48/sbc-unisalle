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
        rh: data.RH.toFixed(3),
        temperature: data.T.toFixed(3),
        pm25: data.PM2p5.toFixed(3),
        pm10: data.PM1p0.toFixed(3),
        pressure: data.AtmosphericPressure,
        airQuality: data.AirQualityIndex.toFixed(3),
        deviceId: info.deviceId,
        deviceName: info.deviceName,
        date: date,
        hour: hourFormat,
    }
}

module.exports = nuboairObj