import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, get, child, limitToLast, query, onValue } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

var ctx = document.getElementById('myChartModulair').getContext('2d');

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

const inputDates = document.querySelector('.p-dates')

const temp = document.getElementById('temp');
const rh = document.getElementById('rh');
const pm1_1 = document.getElementById('pm1');
const pm10_1 = document.getElementById('pm10');
const pm25_1 = document.getElementById('pm25');
const date = document.getElementById('date');
const hour = document.getElementById('hour');

const measures = document.querySelector('.select-measures')

const deviceName = document.getElementById('deviceName');
const device = document.getElementById('device');
const storage = document.getElementById('storage');
const comunication = document.getElementById('comunication');
const maker = document.getElementById('maker');

const macPlantower1 = '10:52:1C:5E:18:44'
const dates = []
const rhs = []
const temps = []
const pm1 = []
const pm10 = []
const pm25 = []

const hours = []
const datesFormat = []

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: `PM2.5 µg/m3`,
            data: [],
            backgroundColor: '#0a3356',
            borderColor: '#0056b4',
            tension: 0
        }]
    },
    options: {
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 15,
                    font: { size: 30 },
                    color: '#000'
                }
            },
            tooltips: {
                enabled: true,
                backgroundColor: 'red'
            }
        },
        elements: {
            line: {
                borderWidth: 1
            },
            point: {
                radius: 3,

            }
        },
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    color: '#000'
                }

            },
            x: {
                grid: { display: false },
                ticks: {
                    color: '#000'
                }
            }
        },
        layout: {
            padding: {
                bottom: 40
            }
        },
        responsive: true
    }
});

const myRef = ref(dbRef, `sensoresbajocosto/plantower/${macPlantower1}`)
onValue(myRef, data => {
    if (data.exists()) {
        const dato = data.val()
        for (let key in dato) {
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
<<<<<<< HEAD

        const temperatura = temps.reverse().filter((el, i) => i < 20).reverse()
        const humedad = rhs.reverse().filter((el, i) => i < 20).reverse()
        const horas = hours.reverse().filter((el, i) => i < 20).reverse()
        const fechas = datesFormat.reverse().filter((el, i) => i < 20).reverse()
        const pm_1 = pm1.reverse().filter((el, i) => i < 20).reverse()
        const pm_10 = pm10.reverse().filter((el, i) => i < 20).reverse()
        const pm_25 = pm25.reverse().filter((el, i) => i < 20).reverse()


        measures.value = "0"
        myChart.data.datasets[0].data = pm_25
        myChart.data.datasets[0].label = `PM2.5 µg/m3`
=======
         
	const temperatura = temps.reverse().filter((el, i) => i < 20).reverse()
	const humedad = rhs.reverse().filter((el, i) => i < 20).reverse()
	const horas = hours.reverse().filter((el, i) => i < 20).reverse()
	const fechas = datesFormat.reverse().filter((el, i) => i < 20).reverse()
	const pm_1 = pm1.reverse().filter((el, i) => i < 20).reverse()
	const pm_10 = pm10.reverse().filter((el, i) => i < 20).reverse()
	const pm_25 = pm25.reverse().filter((el, i) => i < 20).reverse()
    const fechasFilter = myDates(fechas)
    inputDates.innerHTML = `Fecha: ${fechasFilter}`

	measures.value = "0"
        myChart.data.datasets[0].data = temperatura
	myChart.data.datasets[0].label = `Temperatura externa °C` 
>>>>>>> 2e29d32bf3db76cde184de61526ff76a20d1a21a
        myChart.data.labels = horas
        myChart.update()
        measures.addEventListener('change', updateSelect)
        function updateSelect() {
            const measuresPlantower = measures.value
            switch (measuresPlantower) {
                case "3":
                    myChart.data.labels = horas
                    myChart.data.datasets[0].data = temperatura
                    myChart.data.datasets[0].label = `Temperatura externa °C`
                    myChart.update()
                    break;
                case "4":
                    myChart.data.labels = horas
                    myChart.data.datasets[0].data = humedad
                    myChart.data.datasets[0].label = `Humedad Rel. externa (%)`
                    myChart.update()
                    break;
                case "1":
                    myChart.data.labels = horas
                    myChart.data.datasets[0].data = pm_1
                    myChart.data.datasets[0].label = `PM1 µg/m3`
                    myChart.update()
                    break;
                case "2":
                    myChart.data.labels = horas
                    myChart.data.datasets[0].data = pm_10
                    myChart.data.datasets[0].label = `PM10 µg/m3`
                    myChart.update()
                    break;
                case "0":
                    myChart.data.labels = horas
                    myChart.data.datasets[0].data = pm_25
                    myChart.data.datasets[0].label = `PM2.5 µg/m3`
                    myChart.update()
                    break;
            }
        }
    } else console.log('no existe')
})

let myDates = (dates) => {
    const datesReduced = dates.reduce((acc, el) => {
        if(!acc[el]) acc[el] = el
        return acc
    }, {})
    const datesFiltered = []
    for(let date in datesReduced){
        datesFiltered.push(datesReduced[date])
    }
    return datesFiltered.join(', ')
}
