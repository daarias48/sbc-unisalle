const collectionEva = (data, info) => {
    const fullDate = new Date(data.ts)
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

    try {
        return eva = {
            id: data.ts,
            date: date,
            hour: myTime,
            temperature: data.val.temperatura.toFixed(1),
            rh: data.val.humedad,
            pm10_1: data.val.pm10_1.toFixed(2),
            pm10_2: data.val.pm10_2.toFixed(2),
            pm25_1: data.val.pm25_1.toFixed(2),
            pm25_2: data.val.pm25_2.toFixed(2),
            pressure: data.val.presion.toFixed(2),
            status: info.connection.active,
            country: info.connection.location.country,
            lat: info.connection.location.lat,
            lon: info.connection.location.lon,
            description: info.description,
            device: info.device,
            deviceName: info.name,
            type: info.type
        }
    } catch (error) {
        console.log('eva error', error);
    }
}

module.exports = collectionEva