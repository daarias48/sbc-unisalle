import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, get, child, limitToLast, query, onValue } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";
var ctx = document.getElementById('myChartClarity').getContext('2d');
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

const inputDatesClarity = document.querySelector('.p-dates-clarity')

const selectClarity = document.querySelector('.select-measuresClarity')

const temp = document.getElementById('temperatureClarity');
const rh = document.getElementById('rhClarity');
const no2 = document.getElementById('no2Clarity');
const pm1mass = document.getElementById('pm1massClarity');
const pm10mass = document.getElementById('pm10massClarity');
const pm25mass = document.getElementById('pm25massClarity');
const date = document.getElementById('dateClarity');
const hour = document.getElementById('hourClarity');
const idClarity = document.getElementById('idClarity');
const battery = document.getElementById('storage');
const model = document.getElementById('modelClarity');
const comunication = document.getElementById('comunication')
const maker = document.getElementById('maker')

let clarity = []
const allDates = []
const database = ref(getDatabase());
const dbRef = getDatabase();
const commentsRef = ref(dbRef, 'sensors/clarity')
onChildAdded(commentsRef, (data) => {
    clarity = data.val()
    temp.innerHTML = `${clarity.temperature} °C`
    rh.innerHTML = `${clarity.rh} (%)`
    no2.innerHTML = `${clarity.NO2} PPB`
    pm1mass.innerHTML = `${clarity.pm1Mass} µg/m3`
    pm10mass.innerHTML = `${clarity.pm10Mass} µg/m3`
    pm25mass.innerHTML = `${clarity.pm2_5Mass} µg/m3`
    date.innerHTML = clarity.date
    hour.innerHTML = clarity.hour
    model.innerHTML = clarity.model
    idClarity.innerHTML = clarity.deviceID
    battery.innerHTML = clarity.storage
    comunication.innerHTML = clarity.comunication
    maker.innerHTML = clarity.maker
}, {
    onlyOn: true
})

const allHours = []
const allTemperatures = []
const allNO2 = []
const allRh = []
const allPm1Mass = []
const allPm1Num = []
const allPm10Mass = []
const allPm10Num = []
const allPm25Mass = []
const allPm25Num = []

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
                borderWidth: 1,
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
            },
            color: '#000'
        },
        responsive: true
    }
});

let datesReduced = []

const reference = ref(dbRef, 'sensors/clarity')
onValue(reference, (snap) => {
    const data = snap.val()
    for (const key in data) {
        allDates.push(data[key].date)
        allHours.push(data[key].hour)
        allTemperatures.push(data[key].temperature)
        allNO2.push(data[key].NO2)
        allRh.push(data[key].rh)
        allPm1Mass.push(data[key].pm1Mass)
        allPm1Num.push(data[key].pm1Num)
        allPm10Mass.push(data[key].pm10Mass)
        allPm10Num.push(data[key].pm10Num)
        allPm25Mass.push(data[key].pm2_5Mass)
        allPm25Num.push(data[key].pm2_5Num)
    }
    const hour = allHours.reverse().filter((el, i) => i < 20).reverse()
    const temperature = allTemperatures.reverse().filter((el, i) => i < 20).reverse()
    const no2 = allNO2.reverse().filter((el, i) => i < 20).reverse()
    const rh = allRh.reverse().filter((el, i) => i < 20).reverse()
    const pm1Mass = allPm1Mass.reverse().filter((el, i) => i < 20).reverse()
    const pm10Mass = allPm10Mass.reverse().filter((el, i) => i < 20).reverse()
    const pm25Mass = allPm25Mass.reverse().filter((el, i) => i < 20).reverse()
    datesReduced = allDates.reverse().filter((el, i) => i < 20).reverse()
    const dates = myDates(datesReduced)
    inputDatesClarity.innerHTML = `Fecha: ${dates}`

    selectClarity.value = "0"
    myChart.data.datasets[0].data = pm25Mass
    myChart.data.datasets[0].label = `PM2.5 µg/m3`
    myChart.data.labels = hour
    myChart.update()
    selectClarity.addEventListener('change', updateSelect)
    function updateSelect() {
        const measureClarity = selectClarity.value
        switch (measureClarity) {
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
            case "5":
                myChart.data.labels = hour
                myChart.data.datasets[0].data = no2
                myChart.data.datasets[0].label = `PPB`
                myChart.update()
                break;
            case "1":
                myChart.data.labels = hour
                myChart.data.datasets[0].data = pm1Mass
                myChart.data.datasets[0].label = `PM1 µg/m3`
                myChart.update()
                break;
            case "2":
                myChart.data.labels = hour
                myChart.data.datasets[0].data = pm10Mass
                myChart.data.datasets[0].label = `PM10 µg/m3`
                myChart.update()
                break;
            case "0":
                myChart.data.labels = hour
                myChart.data.datasets[0].data = pm25Mass
                myChart.data.datasets[0].label = `PM2.5 µg/m3`
                myChart.update()
                break;
        }
    }
})
let myDates = (dates) => {
    const datesReduced = dates.reduce((acc, el) => {
        if (!acc[el]) acc[el] = el
        return acc
    }, {})
    const datesFiltered = []
    for (let date in datesReduced) {
        datesFiltered.push(datesReduced[date])
    }
    return datesFiltered.join(', ')
}

const formExport = document.getElementById('formExport')
const date1 = document.getElementById('date1')

formExport.addEventListener('submit', e => {
    e.preventDefault()
    get(child(database, 'sensors/clarity'))
        .then(snapshot => {
            let dayFormat = parseInt(date1.value.split('-').reverse()[0])
            let monthFormat = parseInt(date1.value.split('-').reverse()[1])
            let yearFormat = date1.value.split('-').reverse()[2]
            const dateFormated = `${dayFormat}/${monthFormat}/${yearFormat}`
            let dateFiltered
            let dateFlag

            dayFormat === 1 ? dateFlag = false : dateFlag = true

            if(dateFlag) dateFiltered = `${dayFormat - 1}/${monthFormat}/${yearFormat}`
            else dateFiltered = dateFormated
            
            const dato = snapshot.val()
            let structure = []
            let indice = 0
            let indiceFiltered = 0

            for (let key in dato) {
                if(dato[key].date == dateFiltered.toString()) {
                    indiceFiltered = indice
                }
                structure.push(dato[key])
                indice++
            }

            if(indiceFiltered != 0) {
                let datas = structure.map((el, i) => {
                    let obj = {}
                    if(i === indiceFiltered) {
                        indiceFiltered++
                        obj = el
                    }
                    return obj
                })
                dataToExport(datas)
            }else {
                alert('Fecha fuera de rango')
            }
            indiceFiltered = 0 
        })
})

const dataToExport = async (obj) => {
    await obj
    let datas = obj.filter((el) => el.date ? el : null)
    datas != null ? downloadExcel(datas) : alert('Ocurrió un error')
}

const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = {
        Sheets: {
            'data': worksheet
        },
        SheetNames: ['data']
    }
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    saveAsExcel(excelBuffer, 'Mediciones-Clarity')
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetmt.sheet;charset=UTF-8'
const EXCEL_EXTENSION = '.xlsx'

const saveAsExcel = (buffer, fileName) => {
    const data = new Blob([buffer], { type: EXCEL_TYPE })
    saveAs(data, fileName + EXCEL_EXTENSION)
}