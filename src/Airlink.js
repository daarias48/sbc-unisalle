const airlinkSensor = (data) => {
    let objDate = data.ts
    const format = new Date(objDate = new Date())
    const dateFormat = format.toLocaleString('es-MX', { timeZone: 'America/Guayaquil' }).split(' ')
    const date = dateFormat[0]
    const hourFormat = dateFormat[1].split(':')
    const hour = `${hourFormat[0]}:${hourFormat[1]}`
    const tempF = parseFloat(data.temp).toFixed(0)
    const temp = ((tempF - 32) * (5 / 9)).toFixed(0)

    return sensor = {
        id: data.ts,
        rh: data.hum.toFixed(0),
        temp,
        pm_1: data.pm_1.toFixed(2),
        pm_10: data.pm_10.toFixed(2),
        pm_25: data.pm_2p5.toFixed(2),
        date,
        hour,
        storage: '110 VAC',
        marker: 'Davis',
        model: 'Airlink',
        comunication: 'Wifi',
        device: '464838'        
    }
}

module.exports = airlinkSensor