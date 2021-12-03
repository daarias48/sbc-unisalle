const modulairPM = (data, info) => {
    const tiempo = data.timestamp_local
    const fullDate = new Date(data.timestamp_local)
    const test = fullDate.toLocaleString('es-MX', { timeZone: 'America/Guayaquil' }).split(' ')
    const date = test[0]
    const hora = tiempo.slice(11, 16)

    return sensor = {
        'id': tiempo,
        'temperature': data.met.temp.toFixed(0),
        'rh': data.met.rh.toFixed(0),
        'pm1' : data.pm1.toFixed(2),
        'pm10' : data.pm10.toFixed(2),
        'pm25' : data.pm25.toFixed(2),
        'date': date,
        'hour' : hora,
        'model': 'Modulair PM',
        'description': info.description,
        'country' : info.country,
        'city' : info.city,
        'status' : info.status,
        'sn': info.sn,
        'battery' : 'NA',
        'lat': info.geo.lat,
        'lon' : info.geo.lon,
        'storage': '110 VAC',
        'maker': 'Quantaq',
        'comunication': 'Celular 3G',
    }
}
module.exports = modulairPM