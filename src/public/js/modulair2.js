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
const nSerial = document.getElementById('idModulair');
const storage = document.getElementById('storage');
const comunication = document.getElementById('comunication');
const maker = document.getElementById('maker');

let modulair = []
const allDates = []

const dbRef = getDatabase();
const commentsRef = query(ref(dbRef, 'sensors/modulairPm2'), limitToLast(1))
onValue(commentsRef, (data) => {
    data.forEach((doc) => {
        modulair = doc.val()
        console.log(modulair);
        temp.innerHTML = `${modulair.temperature} °C`
        rh.innerHTML = `${modulair.rh} (%)`
        pm1.innerHTML = `${modulair.pm1} µg/m3`
        pm10.innerHTML = `${modulair.pm10} µg/m3`
        pm25.innerHTML = `${modulair.pm25} µg/m3`
        date.innerHTML = modulair.date
        hour.innerHTML = modulair.hour
        model.innerHTML = modulair.model
        nSerial.innerHTML = modulair.sn
        storage.innerHTML = modulair.storage
        comunication.innerHTML = modulair.comunication
        maker.innerHTML = modulair.maker
    })
}, { onlyOnce: true })

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
        label: `PM2.5 µg/m3` ,
        data: [],
        backgroundColor: '#0a3356',
        borderColor: '#0056b4',
        tension: 0
    }]},
    options: {
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 15,
                    font: {size: 30},
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
                grid: {display: false},
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

let datesReduced = []

const reference = query(ref(dbRef, 'sensors/modulairPm2'), limitToLast(20))
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
    const hour = allHours.reverse().filter((el, i) => i < 20).reverse()
    const temperature = allTemperatures.reverse().filter((el, i) => i < 20).reverse()
    const rh = allRh.reverse().filter((el, i) => i < 20).reverse()
    const pm1 = allPm1.reverse().filter((el, i) => i < 20).reverse()
    const pm10 = allPm10.reverse().filter((el, i) => i < 20).reverse()
    const pm25 = allPm25.reverse().filter((el, i) => i < 20).reverse()
    datesReduced = allDates.reverse().filter((el, i) => i < 20).reverse()
    const dates = myDates(datesReduced) 
    inputDates.innerHTML = `Fecha: ${dates}`


    selectModulair.value = "0"
    myChart.data.datasets[0].data = pm25
    myChart.data.datasets[0].label = `PM2.5 µg/m3` 
    myChart.data.labels = hour
    myChart.update()
    selectModulair.addEventListener('change', updateSelect)
    function updateSelect() {
        const measureModulair = selectModulair.value
        switch(measureModulair) {
            case "3":
                myChart.data.labels = hour
                myChart.data.datasets[0].data = temperature
                myChart.data.datasets[0].label = `Temperatura interna °C` 
                myChart.update()
                break;
            case "4": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = rh
                myChart.data.datasets[0].label = `Humedad Rel. interna (%)`
                myChart.update()
                break;
            case "1": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = pm1
                myChart.data.datasets[0].label = `PM1 µg/m3`
                myChart.update()
                break;
            case "2": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = pm10
                myChart.data.datasets[0].label = `PM10 µg/m3`
                myChart.update()
                break;
            case "0": 
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
    return datesFiltered.join(', ')
}
