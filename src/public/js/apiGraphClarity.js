try {
    var ctx = document.getElementById('myChart-api-clarity').getContext('2d');
    const strDatesClarity = document.querySelector('.datesClarity').value
    const strHoursClarity = document.querySelector('.hoursClarity').value
    const strRhClarity = document.querySelector('.rhClarity').value
    const strTemperatureClarity = document.querySelector('.temperaturesClarity').value
    const strNo2Clarity = document.querySelector('.no2Clarity').value
    const strPm25MassClarity = document.querySelector('.pm25massClarity').value
    const strPm25NumClarity = document.querySelector('.pm25numClarity').value
    const strPm1MassClarity = document.querySelector('.pm1massClarity').value
    const strPm1NumClarity = document.querySelector('.pm1numClarity').value
    const strPm10MassClarity = document.querySelector('.pm10massClarity').value
    const strPm10NumClarity = document.querySelector('.pm10numClarity').value

    let rh = strRhClarity.split(',')
    let temperatures = strTemperatureClarity.split(',')
    let no2 = strNo2Clarity.split(',')
    let pm25mass = strPm25MassClarity.split(',')
    let pm25num = strPm25NumClarity.split(',')
    let pm1mass = strPm1MassClarity.split(',')
    let pm1num = strPm1NumClarity.split(',')
    let pm10mass = strPm10MassClarity.split(',')
    let pm10num = strPm10NumClarity.split(',')

    let hours = strHoursClarity.split(',')
    let dates = strDatesClarity.split(',')
    
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: hours,
        datasets: [{
            label: 'Temperatura °C',
            data: temperatures,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgb(0, 0, 0)',
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
    const selectClarity = document.querySelector('.measuresClarity')
    selectClarity.addEventListener('change', updateSelect)
    function updateSelect() {
        console.log(selectClarity.value);
        const measureClarity = selectClarity.value
        switch(measureClarity) {
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
