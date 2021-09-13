// Para iniciar el server
const app = require('./app')
const MySensor = require('./mySensor')
const fetch = require("node-fetch");
app.listen(app.get('port'))

// const urlData ="https://clarity-data-api.clarity.io/v1/measurements?code=AN92S2XQ&limit=1";
// const urlDevice ="https://clarity-data-api.clarity.io/v1/devices?code=AN92S2XQ";
// let api_key="O67ZARLVyFiTnxx3Q8USbpy8iBenoCmD7DsT6oW6";
// const sensor =  new MySensor(api_key)

// sensor.getInfoClarity(urlDevice)
//     .then((data) => {
//         console.log(data);
//     })

const urlInfo = "https://api.quant-aq.com/device-api/v1/devices/MOD-PM-00053"
const urlData = "https://api.quant-aq.com/device-api/v1/devices/MOD-PM-00053/data/?"
const api_key2 = 'Y25LI6BNJQ4YPGGHXM0GT08M'
const sensorModul = new MySensor(api_key2)
sensorModul.getSensorInfoModulAir(urlData)
    .then((data) => {
        // console.log(data.data);
    })

