const modulairPM = (data, info) => {
    const tiempo = data.timestamp_local
    const fechaa = tiempo.slice(0, 10)
    const hora = tiempo.slice(11, 19)
    return sensor = {
        'id': tiempo,
        'temperature': data.met.temp,
        'rh': data.met.rh,
        'pm1' : data.pm1,
        'pm10' : data.pm10,
        'pm25' : data.pm25,
        'date': fechaa,
        'hour' : hora,
        'model': info.model,
        'description': info.description,
        'country' : info.country,
        'city' : info.city,
        'status' : info.status,
        'sn': info.sn,
        'battery' : 'NA',
        'lat': info.geo.lat,
        'lon' : info.geo.lon
    }
}
module.exports = modulairPM