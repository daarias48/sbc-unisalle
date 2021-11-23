import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, get, child, limitToLast, query, onValue } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

var ctx = document.getElementById('myChartModulair').getContext('2d');

var firebaseConfig = {
    apiKey: "AIzaSyDeawHKlf1NBvPDIUer0sYDxn7WrIIL3ag",
    authDomain: "mysensorinfo.firebaseapp.com",
    databaseURL: "https://mysensorinfo-default-rtdb.firebaseio.com",
    projectId: "mysensorinfo",
    storageBucket: "mysensorinfo.appspot.com",
    messagingSenderId: "72274332118",
    appId: "1:72274332118:web:b0ee741dcfe8604fa13c77",
    measurementId: "G-RZMGVP8RQT"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const inputDates = document.querySelector('.p-dates')

const selectModulair = document.querySelector('.select-measures')

const temp = document.getElementById('temp');
const rh = document.getElementById('rh');
const pm10_1 = document.getElementById('pm10_1');
const pm10_2 = document.getElementById('pm10_2');
const pm25_1 = document.getElementById('pm25_1');
const pm25_2 = document.getElementById('pm25_2');
const atmP = document.getElementById('atmPressure');
const date = document.getElementById('date');
const hour = document.getElementById('hour');


const country = document.getElementById('country');
const status = document.getElementById('status');
const deviceName = document.getElementById('deviceName');
const device = document.getElementById('device');
const type = document.getElementById('type');

let eva = []
const allDates = []

const dbRef = getDatabase();
const commentsRef = ref(dbRef, 'sensors/eva')
onChildAdded(commentsRef, (data) => {
    eva = data.val()
    temp.innerHTML = `${eva.temperature} °C`
    rh.innerHTML = `${eva.rh} (%)`
    atmP.innerHTML = `${eva.pressure} hPa`
    pm10_1.innerHTML = `${eva.pm10_1} µg/m3`
    pm10_2.innerHTML = `${eva.pm10_2} µg/m3`
    pm25_1.innerHTML = `${eva.pm25_1} µg/m3`
    pm25_2.innerHTML = `${eva.pm25_2} µg/m3`
    date.innerHTML = eva.date
    hour.innerHTML = eva.hour
    country.innerHTML = eva.country
    status.innerHTML = eva.status
    device.innerHTML = eva.device
    deviceName.innerHTML = eva.deviceName
    type.innerHTML = eva.type
}, {
    onlyOn: true
})

const allHours = []
const allTemperatures = []
const allRh = []
const allAtmP = []
const allPm10_1 = []
const allPm10_2 = []
const allPm25_1 = []
const allPm25_2 = []

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: [],
    datasets: [{
        label: `Temperatura °C` ,
        data: [],
        backgroundColor: 'rgb(255, 0, 0)',
        borderColor: 'rgb(255, 255, 255)',
        tension: 0
    }]},
    options: {
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 15,
                    font: {size: 30},
                    color: '#fff'
                }
            },
            tooltips: {
                enabled: true,
                backgroundColor: 'red'
            }
        },
        elements: {
            line: {
                borderWidth: 2
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
                    color: '#fff'
                }

            },
            x: {
                grid: {display: false},
                ticks: {
                    color: '#fff'
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

let datesReduced = []

const reference = ref(dbRef, 'sensors/eva')
onValue(reference, (snap) => {
    const data = snap.val()
    for (const key in data) {
        allDates.push(data[key].date)
        allHours.push(data[key].hour)
        allTemperatures.push(data[key].temperature)
        allRh.push(data[key].rh)
        allAtmP.push(data[key].pressure)
        allPm10_1.push(data[key].pm10_1)
        allPm10_2.push(data[key].pm10_2)
        allPm25_1.push(data[key].pm25_1)
        allPm25_2.push(data[key].pm25_2)
    }
    const hour = allHours.reverse().filter((el, i) => i < 20).reverse()
    const temperature = allTemperatures.reverse().filter((el, i) => i < 20).reverse()
    const rh = allRh.reverse().filter((el, i) => i < 20).reverse()
    const atmP = allAtmP.reverse().filter((el, i) => i < 20).reverse()
    const pm10_1 = allPm10_1.reverse().filter((el, i) => i < 20).reverse()
    const pm10_2 = allPm10_2.reverse().filter((el, i) => i < 20).reverse()
    const pm25_1 = allPm25_1.reverse().filter((el, i) => i < 20).reverse()
    const pm25_2 = allPm25_2.reverse().filter((el, i) => i < 20).reverse()
    datesReduced = allDates.reverse().filter((el, i) => i < 20).reverse()
    const dates = myDates(datesReduced) 
    inputDates.innerHTML = `Fecha: ${dates}`


    selectModulair.value = "0"
    myChart.data.datasets[0].data = temperature
    myChart.data.datasets[0].label = `Temperatura °C` 
    myChart.data.labels = hour
    myChart.update()
    selectModulair.addEventListener('change', updateSelect)
    function updateSelect() {
        const measureModulair = selectModulair.value
        switch(measureModulair) {
            case "0":
                myChart.data.labels = hour
                myChart.data.datasets[0].data = temperature
                myChart.data.datasets[0].label = `Temperatura °C` 
                myChart.update()
                break;
            case "1": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = rh
                myChart.data.datasets[0].label = `Humedad Rel. (%)`
                myChart.update()
                break;
            case "2": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = atmP
                myChart.data.datasets[0].label = `hPa`
                myChart.update()
                break;
            case "3": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = pm10_1
                myChart.data.datasets[0].label = `PM10_1 µg/m3`
                myChart.update()
                break;
            case "4": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = pm10_2
                myChart.data.datasets[0].label = `PM10_2 µg/m3`
                myChart.update()
                break;
            case "5": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = pm25_1
                myChart.data.datasets[0].label = `PM2.5_1 µg/m3`
                myChart.update()
                break;
            case "6": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = pm25_2
                myChart.data.datasets[0].label = `PM2.5_2 µg/m3`
                myChart.update()
                break;
        }
    }
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
    return datesFiltered
}
