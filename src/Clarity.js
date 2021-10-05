const claritySensor = (data, info) => {
    const time = data.time
    const date = time.slice(0, 10)
    const hour = time.slice(11, 19)
    const temperature = (data.characteristics.temperature.value).toFixed(3)
    const rh = (data.characteristics.relHumid.value).toFixed(3)
    const no2 = (data.characteristics.no2Conc.value).toFixed(3)
    const pm2_5mass = (data.characteristics.pm2_5ConcMass.value).toFixed(3)
    const pm2_5num = (data.characteristics.pm2_5ConcNum.value).toFixed(3)
    const pm1mass = (data.characteristics.pm1ConcMass.value).toFixed(3)
    const pm1num = (data.characteristics.pm1ConcNum.value).toFixed(3)
    const pm10mass = (data.characteristics.pm10ConcMass.value).toFixed(3)
    const pm10num = (data.characteristics.pm10ConcNum.value).toFixed(3)
    const lat = (data.location.coordinates[0]).toFixed(4)
    const lon = (data.location.coordinates[1]).toFixed(4)
    const id = data.recId.slice(26, 30)
    return sensor = {
        'id': id,
        'deviceID' : data.deviceCode,
        'model' : 'Clarity Node-S',
        'batteryStatus' : info.batteryStatus,
        'batteryValue' : info.batteryPercentage,
        'signal' : info.signalStrength,
        'date' : date,
        'hour' : hour,
        'lat' : lat,
        'lon' : lon,
        'temperature' : temperature,
        'rh' : rh,
        'NO2' : no2,
        'pm2_5Num': pm2_5num,
        'pm2_5Mass': pm2_5mass,
        'pm1Num': pm1num,
        'pm1Mass': pm1mass,
        'pm10Num': pm10num,
        'pm10Mass': pm10mass
    }
}

module.exports = claritySensor