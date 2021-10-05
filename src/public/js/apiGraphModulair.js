try {
    var ctx = document.getElementById('myChart-api-modulair').getContext('2d');
    const test = document.querySelector('.test').value
    const DatesModulair = document.querySelector('.datesModulairpm').value
    const HoursModulair = document.querySelector('.hoursModulairpm').value
    const TemperatureModulair = document.querySelector('.temperaturesModulairpm').value
    const RhModulair = document.querySelector('.rhModulairpm').value
    const PM1Modulair = document.querySelector('.pm1Modulairpm').value
    const PM10Modulair = document.querySelector('.pm10Modulairpm').value
    const PM25Modulair = document.querySelector('.pm25Modulairpm').value

    let temperaturesModulair = TemperatureModulair.split(',')
    let rhModulair = RhModulair.split(',')
    let pm1Modulair = PM1Modulair.split(',')
    let pm10Modulair = PM10Modulair.split(',')
    let pm25Modulair = PM25Modulair.split(',')

    let hoursModulair = HoursModulair.split(',')
    let datesModulair = DatesModulair.split(',')
    

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: hoursModulair,
        datasets: [{
            label: 'Temperatura °C',
            data: temperaturesModulair,
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

    const selectModulairPm = document.querySelector('.measuresModulair')
    selectModulairPm.addEventListener('change', updateSelect)
    function updateSelect() {
        const measureModulairPm = selectModulairPm.value
        switch(measureModulairPm) {
            case "0":
                myChart.data.datasets[0].data = temperaturesModulair
                myChart.data.datasets[0].label = 'Temperatura °C'
                myChart.update()
                break;
            case "1": 
                myChart.data.datasets[0].data = rhModulair
                myChart.data.datasets[0].label = 'Humedad Rel. (%)'
                myChart.update()
                break;
            case "2": 
                myChart.data.datasets[0].data = pm1Modulair
                myChart.data.datasets[0].label = 'PM1 µg/m3'
                myChart.update()
                break;
            case "3": 
                myChart.data.datasets[0].data = pm10Modulair
                myChart.data.datasets[0].label = 'PM10 µg/m3'
                myChart.update()
                break;
            case "4": 
                myChart.data.datasets[0].data = pm25Modulair
                myChart.data.datasets[0].label = 'PM2.5 µg/m3'
                myChart.update()
                break;
        }

    }
} catch (error) {
    console.log(error);
}
