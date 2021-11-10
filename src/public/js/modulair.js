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
const pm1 = document.getElementById('pm1');
const pm10 = document.getElementById('pm10');
const pm25 = document.getElementById('pm25');
const date = document.getElementById('date');
const hour = document.getElementById('hour');
const model = document.getElementById('model');
const description = document.getElementById('description');
const country = document.getElementById('country');
const city = document.getElementById('city');
const status = document.getElementById('status');
const nSerial = document.getElementById('n-serie');
const lat = document.getElementById('lat');
const lon = document.getElementById('lon');

let modulair = []
const allDates = []

const dbRef = getDatabase();
const commentsRef = ref(dbRef, 'sensors/modulairPm')
onChildAdded(commentsRef, (data) => {
    modulair = data.val()
    temp.innerHTML = modulair.temperature
    rh.innerHTML = modulair.rh
    pm1.innerHTML = modulair.pm1
    pm10.innerHTML = modulair.pm10
    pm25.innerHTML = modulair.pm25
    date.innerHTML = modulair.date
    hour.innerHTML = modulair.hour
    model.innerHTML = modulair.model
    description.innerHTML = modulair.description
    country.innerHTML = modulair.country
    city.innerHTML = modulair.city
    status.innerHTML = modulair.status
    nSerial.innerHTML = modulair.sn
    lat.innerHTML = modulair.lat
    lon.innerHTML = modulair.lon

}, {
    onlyOn: true
})

const allHours = []
const allTemperatures = []
const allRh = []
const allPm1 = []
const allPm10 = []
const allPm25 = []

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
            title: {
                display: true,
                text: `Datos tomados modulairPM`,
                font: {size: 30},
                color: '#fff'
            },
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 15,
                    font: {size: 16},
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
                borderWidth: 5
            },
            point: {
                radius: 7,
                
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

const reference = ref(dbRef, 'sensors/modulairPm')
onValue(reference, (snap) => {
    const data = snap.val()
    for (const key in data) {
        allDates.push(data[key].date)
        allHours.push(data[key].hour)
        allTemperatures.push(data[key].temperature)
        allRh.push(data[key].rh)
        allPm1.push(data[key].pm1)
        allPm10.push(data[key].pm10)
        allPm25.push(data[key].pm25)
    }
    const hour = allHours.reverse().filter((el, i) => i < 30).reverse()
    const temperature = allTemperatures.reverse().filter((el, i) => i < 30).reverse()
    const rh = allRh.reverse().filter((el, i) => i < 30).reverse()
    const pm1 = allPm1.reverse().filter((el, i) => i < 30).reverse()
    const pm10 = allPm10.reverse().filter((el, i) => i < 30).reverse()
    const pm25 = allPm25.reverse().filter((el, i) => i < 30).reverse()
    datesReduced = allDates.reverse().filter((el, i) => i < 30).reverse()
    const dates = myDates(datesReduced) 
    inputDates.innerHTML = `Fecha de los datos tomados: ${dates}`


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
                myChart.data.datasets[0].data = pm1
                myChart.data.datasets[0].label = `PM1 µg/m3`
                myChart.update()
                break;
            case "3": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = pm10
                myChart.data.datasets[0].label = `PM10 µg/m3`
                myChart.update()
                break;
            case "4": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = pm25
                myChart.data.datasets[0].label = `PM2.5 µg/m3`
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

