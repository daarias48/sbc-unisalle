const claritySensor = (data, info) => {
    const time = data.time
    const date = time.slice(0, 10)
    const hour = time.slice(11, 19)
    return sensor = {
        'deviceID' : data.deviceCode,
        'model' : 'Clarity Node-S',
        'batteryStatus' : info.batteryStatus,
        'batteryValue' : info.batteryPercentage,
        'signal' : info.signalStrength,
        'date' : date,
        'hour' : hour,
        'location' : data.location.coordinates,
        'temperature' : data.characteristics.temperature.value,
        'rh' : data.characteristics.relHumid.value,
        'NO2' : data.characteristics.no2Conc.value,
        'pm2_5Num': data.characteristics.pm2_5ConcNum.value,
        'pm2_5Mass': data.characteristics.pm2_5ConcMass.value,
        'pm1Num': data.characteristics.pm1ConcNum.value,
        'pm1Mass': data.characteristics.pm1ConcMass.value,
        'pm10Num': data.characteristics.pm10ConcNum.value,
        'pm10Mass': data.characteristics.pm10ConcMass.value
    }
}

module.exports = claritySensor