try {
    var ctx = document.getElementById('myChart').getContext('2d');
    const strDates = document.querySelector('.dates').value
    const strHours = document.querySelector('.hours').value
    const strRh = document.querySelector('.rh').value
    const strTemperature = document.querySelector('.temperatures').value
    const strNo2 = document.querySelector('.no2').value
    const strPm25Mass = document.querySelector('.pm25mass').value
    const strPm25Num = document.querySelector('.pm25num').value
    const strPm1Mass = document.querySelector('.pm1mass').value
    const strPm1Num = document.querySelector('.pm1num').value
    const strPm10Mass = document.querySelector('.pm10mass').value
    const strPm10Num = document.querySelector('.pm10num').value

    let rh = strRh.split(',')
    let temperatures = strTemperature.split(',')
    let no2 = strNo2.split(',')
    let pm25mass = strPm25Mass.split(',')
    let pm25num = strPm25Num.split(',')
    let pm1mass = strPm1Mass.split(',')
    let pm1num = strPm1Num.split(',')
    let pm10mass = strPm10Mass.split(',')
    let pm10num = strPm10Num.split(',')

    let hours = strHours.split(',')
    let dates = strDates.split(',')
    const labelDates = document.querySelector('.p-dates')
    labelDates.innerHTML = dates
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: hours,
        datasets: [{
            label: 'Temperatura °C',
            data: temperatures,
            backgroundColor: 'rgb(75, 192, 192)',
            // borderColor: 'rgb(0, 0, 0)',
            borderDash: [10,5],
            tension: 0.1
        }]},
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Datos contra tiempo',
                    font: {size: 20},
                    color: '#000'
                },
            },
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,

                },
                x: {
                    grid: {display: false}
                }
            },
            layout: {
                padding: {
                    bottom: 50
                }
            },
            responsive: true
        }
    });
    const select = document.querySelector('.select-measures')
    select.addEventListener('change', updateSelect)
    function updateSelect() {
        console.log(select.value);
        const measure = select.value
        switch(measure) {
            case "0":
                myChart.data.datasets[0].data = temperatures
                myChart.data.datasets[0].label = 'Temperatura °C'
                myChart.update()
                break;
            case "1": 
                myChart.data.datasets[0].data = rh
                myChart.data.datasets[0].label = 'Humedad Rel. (%)'
                myChart.update()
                break;
            case "2": 
                myChart.data.datasets[0].data = no2
                myChart.data.datasets[0].label = 'NO2 ppb'
                myChart.update()
                break;
            case "3": 
                myChart.data.datasets[0].data = pm25mass
                myChart.data.datasets[0].label = 'PM2.5 Concetración masas µg/m3'
                myChart.update()
                break;
            case "4": 
                myChart.data.datasets[0].data = pm25num
                myChart.data.datasets[0].label = 'PM2.5 Concetración números µg/m3'
                myChart.update()
                break;
            case "5": 
                myChart.data.datasets[0].data = pm1mass
                myChart.data.datasets[0].label = 'PM1 Concetración masas µg/m3'
                myChart.update()
                break;
            case "6": 
                myChart.data.datasets[0].data = pm1num
                myChart.data.datasets[0].label = 'PM1 Concetración números µg/m3'
                myChart.update()
                break;
            case "7": 
                myChart.data.datasets[0].data = pm10mass
                myChart.data.datasets[0].label = 'PM10 Concetración masas µg/m3'
                myChart.update()
                break;
            case "8": 
                myChart.data.datasets[0].data = pm10num
                myChart.data.datasets[0].label = 'PM10 Concetración números µg/m3'
                myChart.update()
                break;
        }
    }
} catch (error) {
    console.log(error);
}
