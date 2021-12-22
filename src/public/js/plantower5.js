import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, get, child, limitToLast, query, onValue } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

// var ctx = document.getElementById('myChartModulair').getContext('2d');

const firebaseConfig = {
    apiKey: "AIzaSyDTHKTT0EVfyPa1KLNIFz0_8zuyfT8OolQ",
    authDomain: "mysensorappuwu.firebaseapp.com",
    databaseURL: "https://mysensorappuwu-default-rtdb.firebaseio.com",
    projectId: "mysensorappuwu",
    storageBucket: "mysensorappuwu.appspot.com",
    messagingSenderId: "328704721464",
    appId: "1:328704721464:web:e9c4439a96d62b41121ccd",
    measurementId: "G-QLTKSRSBWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "daniAPP");
const dbRef = getDatabase(app);

const temp = document.getElementById('temp');
const rh = document.getElementById('rh');
const pm1_1 = document.getElementById('pm1');
const pm10_1 = document.getElementById('pm10');
const pm25_1 = document.getElementById('pm25');
const date = document.getElementById('date');
const hour = document.getElementById('hour');

const deviceName = document.getElementById('deviceName');
const device = document.getElementById('device');
const storage = document.getElementById('storage');
const comunication = document.getElementById('comunication');
const maker = document.getElementById('maker');

const macPlantower1 = '94:B9:7E:D3:20:1C'
const dates = []
const rhs = []
const temps = []
const pm1 = []
const pm10 = []
const pm25 = []

const hours = []
const datesFormat = []

const myRef = ref(dbRef, 'sensoresbajocosto')
get(child(myRef, `plantower/${macPlantower1}`))
.then(data => {
    if(data.exists()){
        const dato = data.val()
        for(let key in dato) {
            dates.push(key)
            rhs.push(dato[key].humedad)
            temps.push(dato[key].temperatura)
            pm1.push(dato[key].pm1)
            pm10.push(dato[key].pm10)
            pm25.push(dato[key].pm2)
        }
        dates.map(el => {
            const splited = el.split(':')
            const f = `${splited[2]}/${splited[1]}/${splited[0]}`
            const h = `${splited[3]}:${splited[4]}`
            hours.push(h)
            datesFormat.push(f)
        })

        deviceName.innerHTML = "Plantower 7003"
        device.innerHTML = macPlantower1
        storage.innerHTML = "110 VAC"
        comunication.innerHTML = "Wifi"
        maker.innerHTML = "AVARC"

        temp.innerHTML = `${temps[temps.length - 1].toFixed(0)} °C`
        rh.innerHTML = `${rhs[rhs.length - 1].toFixed(0)} (%)`
        hour.innerHTML = `${hours[hours.length - 1]}`
        date.innerHTML = `${datesFormat[datesFormat.length - 1]}`
        pm1_1.innerHTML = `${pm1[pm1.length - 1].toFixed(2)} µg/m3`
        pm10_1.innerHTML = `${pm10[pm10.length - 1].toFixed(2)} µg/m3`
        pm25_1.innerHTML = `${pm25[pm25.length - 1].toFixed(2)} µg/m3`
        

    }
    else console.log('no existe')
})
.catch(err => console.log(err))

