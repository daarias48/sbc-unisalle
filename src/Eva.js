const collectionEva = (data, info) => {
    const fullDate = new Date(data.ts)
    const date = fullDate.toDateString()
    const hour = fullDate.toTimeString().split(' ')[0]

    return eva = {
        id: data.ts,
        date: date,
        hour: hour,
        temperature: data.val.temperatura.toFixed(3),
        rh: data.val.humedad,
        pm10_1: data.val.pm10_1,
        pm10_2: data.val.pm10_2,
        pm25_1: data.val.pm25_1,
        pm25_2: data.val.pm25_2,
        pressure: data.val.presion.toFixed(3),
        status: info.connection.active,
        country: info.connection.location.country,
        lat: info.connection.location.lat,
        lon: info.connection.location.lon,
        description: info.description,
        device: info.device,
        deviceName: info.name,
        type: info.type
    }
}

module.exports = collectionEva