try {
    var ctx = document.getElementById('myChartModulair').getContext('2d');
    const strDatesModulair = document.querySelector('.datesModulair').value
    const strHoursModulair = document.querySelector('.hoursModulair').value
    const strTemperatureModulair = document.querySelector('.temperaturesModulair').value
    const strRhModulair = document.querySelector('.rhModulair').value
    const strPM1Modulair = document.querySelector('.pm1Modulair').value
    const strPM10Modulair = document.querySelector('.pm10Modulair').value
    const strPM25Modulair = document.querySelector('.pm25Modulair').value

    
    let temperaturesModulair = strTemperatureModulair.split(',')
    let rhModulair = strRhModulair.split(',')
    let pm1Modulair = strPM1Modulair.split(',')
    let pm10Modulair = strPM10Modulair.split(',')
    let pm25Modulair = strPM25Modulair.split(',')
    let hoursModulair = strHoursModulair.split(',')
    let datesModulair = strDatesModulair.split(',')
    
    console.log(hoursModulair);
    const axisXModulair = hoursModulair
    
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: axisXModulair,
        datasets: [{
            label: `Temperatura °C` ,
            data: temperaturesModulair,
            backgroundColor: 'rgb(75, 192, 0)',
            borderColor: 'rgb(0, 0, 0)',
            tension: .4
        }]},
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Datos tomados`,
                    font: {size: 30},
                    color: 'rgb(0, 0, 0)'
                },
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 15,
                        font: {size: 16}
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

                },
                x: {
                    grid: {display: false}
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

    const selectModulair = document.querySelector('.select-measures')
    selectModulair.addEventListener('change', updateSelect)
    function updateSelect() {
        const measureModulair = selectModulair.value
        switch(measureModulair) {
            case "0":
                myChart.data.datasets[0].data = temperaturesModulair
                myChart.data.datasets[0].label = `Temperatura °C` 
                myChart.update()
                break;
            case "1": 
                myChart.data.datasets[0].data = rhModulair
                myChart.data.datasets[0].label = `Humedad Rel. (%)`
                myChart.update()
                break;
            case "2": 
                myChart.data.datasets[0].data = pm1Modulair
                myChart.data.datasets[0].label = `PM1 µg/m3`
                myChart.update()
                break;
            case "3": 
                myChart.data.datasets[0].data = pm10Modulair
                myChart.data.datasets[0].label = `PM10 µg/m3`
                myChart.update()
                break;
            case "4": 
                myChart.data.datasets[0].data = pm25Modulair
                myChart.data.datasets[0].label = `PM2.5 µg/m3`
                myChart.update()
                break;
        }

    }
    const datesP = document.querySelector('.p-dates')
    datesP.innerHTML = datesModulair 
    
} catch (error) {
    
}
