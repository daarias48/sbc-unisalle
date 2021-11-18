const nuboairObj = (data, info) => {
    const fullDate = new Date(data.timeWindowStart)
    const date = fullDate.toLocaleDateString()
    fullDate.setHours(-5)
    const hourData = fullDate.getUTCHours()
    const minData = fullDate.getUTCMinutes()
    let hour
    let min
    if(hourData < 10) hour = `0${hourData}`
    else hour = hourData
    if(minData < 10) min = `0${minData}`
    else min = minData

    const myTime = `${hour}:${min}`
    
    return nuboair = {
        id: data.timeWindowStart,
        rh: data.RH.toFixed(3),
        temperature: data.T.toFixed(3),
        pm25: data.PM2p5.toFixed(3),
        pm10: data.PM1p0.toFixed(3),
        pressure: data.AtmosphericPressure,
        airQuality: data.AirQualityIndex.toFixed(3),
        deviceId: info.deviceId,
        deviceName: info.deviceName,
        date: date,
        hour: myTime,
    }
}

module.exports = nuboairObj