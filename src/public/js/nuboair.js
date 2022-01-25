import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, get, child, limitToLast, query, onValue } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

var ctx = document.getElementById('myChartModulair').getContext('2d');

const firebaseConfig = {
  apiKey: "AIzaSyAP4ipIhAWYl8PEuMcnsbBAMhlaq_F5L40",
  authDomain: "aire-ciudadano.firebaseapp.com",
  databaseURL: "https://aire-ciudadano-default-rtdb.firebaseio.com",
  projectId: "aire-ciudadano",
  storageBucket: "aire-ciudadano.appspot.com",
  messagingSenderId: "109955859655",
  appId: "1:109955859655:web:17471d237468c5ce476ae2",
  measurementId: "G-CRLNK0PD2L"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const inputDates = document.querySelector('.p-dates')

const selectModulair = document.querySelector('.select-measures')

const temp = document.getElementById('temp');
const rh = document.getElementById('rh');
const atmP = document.getElementById('atmPressure');
const airQ = document.getElementById('airQuality');
const pm10 = document.getElementById('pm10');
const pm25 = document.getElementById('pm25');
const date = document.getElementById('date');
const hour = document.getElementById('hour');
const dName = document.getElementById('deviceName')
const dId = document.getElementById('deviceId')
const storage = document.getElementById('storage');
const comunication = document.getElementById('comunication');
const maker = document.getElementById('maker');

let nuboair = []
const allDates = []
const database = ref(getDatabase());
const dbRef = getDatabase();
const commentsRef = ref(dbRef, 'sensors/nuboair')
onChildAdded(commentsRef, (data) => {
    nuboair = data.val()
    temp.innerHTML = `${nuboair.temperature} °C`
    rh.innerHTML = `${nuboair.rh} (%)`
    pm10.innerHTML = `${nuboair.pm10} µg/m3`
    pm25.innerHTML = `${nuboair.pm25} µg/m3`
    date.innerHTML = nuboair.date
    hour.innerHTML = nuboair.hour
    airQ.innerHTML = nuboair.airQuality
    atmP.innerHTML = `${nuboair.pressure} hPa`
    dName.innerHTML = nuboair.model
    dId.innerHTML = nuboair.deviceId
    storage.innerHTML = nuboair.storage
    comunication.innerHTML = nuboair.comunication
    maker.innerHTML = nuboair.maker

}, {
    onlyOn: true
})

const allHours = []
const allTemperatures = []
const allRh = []
const allAtmP = []
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

const reference = ref(dbRef, 'sensors/nuboair')
onValue(reference, (snap) => {
    const data = snap.val()
    for (const key in data) {
        allDates.push(data[key].date)
        allHours.push(data[key].hour)
        allTemperatures.push(data[key].temperature)
        allRh.push(data[key].rh)
        allAtmP.push(data[key].pressure)
        allPm10.push(data[key].pm10)
        allPm25.push(data[key].pm25)
    }
    const hour = allHours.reverse().filter((el, i) => i < 20).reverse()
    const temperature = allTemperatures.reverse().filter((el, i) => i < 20).reverse()
    const rh = allRh.reverse().filter((el, i) => i < 20).reverse()
    const atmP = allAtmP.reverse().filter((el, i) => i < 20).reverse()
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
            case "2":
                myChart.data.labels = hour
                myChart.data.datasets[0].data = temperature
                myChart.data.datasets[0].label = `Temperatura ambiente °C` 
                myChart.update()
                break;
            case "3": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = rh
                myChart.data.datasets[0].label = `Humedad Rel. externa (%)`
                myChart.update()
                break;
            case "4": 
                myChart.data.labels = hour
                myChart.data.datasets[0].data = atmP
                myChart.data.datasets[0].label = `Presión atm hPa`
                myChart.update()
                break;
            case "1": 
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


const formExport = document.getElementById('formExport')
const date1 = document.getElementById('date1')

formExport.addEventListener('submit', e => {
    e.preventDefault()
    get(child(database, 'sensors/nuboair'))
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
    saveAsExcel(excelBuffer, 'Mediciones-Nuboair')
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetmt.sheet;charset=UTF-8'
const EXCEL_EXTENSION = '.xlsx'

const saveAsExcel = (buffer, fileName) => {
    const data = new Blob([buffer], { type: EXCEL_TYPE })
    saveAs(data, fileName + EXCEL_EXTENSION)
}
