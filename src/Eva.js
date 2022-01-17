const collectionEva = (data, info) => {
    const fullDate = new Date(data.ts)
    const test = fullDate.toLocaleString('es-MX', { timeZone: 'America/Guayaquil' }).split(' ')
    const date = test[0]
    const myHour = test[1].split(':')
    const hourFormat = `${myHour[0]}:${myHour[1]}`
    try {
        return eva = {
            id: data.ts,
            date: date,
            hour: hourFormat,
            temperature: data.val.temperatura.toFixed(0),
            rh: data.val.humedad.toFixed(0),
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
            type: info.type,
            'storage': '110 VAC',
            'maker': 'Makesens',
            'comunication': 'Wifi',
            'model': 'Eva'
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = collectionEva
