class CursorDB {
    constructor(){}

    clarityColletion(collection) {
        const allDates = []
        const allHours = []
        const allTemperatures = []
        const allRh = []
        const allNo2 = []
        const allPm25Mass = []
        const allPm25Num = []
        const allPm1Mass = []
        const allPm1Num = []
        const allPm10Mass = []
        const allPm10Num = []
        
        for (const data in collection) {
            allDates.push(collection[data].date)
            allTemperatures.push(collection[data].temperature)
            allHours.push(collection[data].hour)
            allRh.push(collection[data].rh)
            allNo2.push(collection[data].NO2)
            allPm25Mass.push(collection[data].pm2_5Mass)
            allPm25Num.push(collection[data].pm2_5Num)
            allPm1Mass.push(collection[data].pm1Mass) 
            allPm1Num.push(collection[data].pm1Num)
            allPm10Mass.push(collection[data].pm10Mass)
            allPm10Num.push(collection[data].pm10Num)
        }
        const hours = allHours.reverse().filter((el, i) => i < 120 ).reverse()
        const dates = allDates.reverse().filter((el, i) => i < 120 ).reverse()
        const objDatesReduced = dates.reduce((acc, el) => {
            if(!acc[el]) acc[el] = el
            return acc
        }, {})
        const datesFiltered = []
        for(let date in objDatesReduced){
            datesFiltered.push(objDatesReduced[date])
        }
        const temperatures = allTemperatures.reverse().filter((el, i) => i < 120 ).reverse()
        const rh = allRh.reverse().filter((el, i) => i < 120 ).reverse()
        const no2 = allNo2.reverse().filter((el, i) => i < 120 ).reverse()
        const pm25mass = allPm25Mass.reverse().filter((el, i) => i < 120 ).reverse()
        const pm25num = allPm25Num.reverse().filter((el, i) => i < 120 ).reverse()
        const pm1mass = allPm1Mass.reverse().filter((el, i) => i < 120 ).reverse()
        const pm1num = allPm1Num.reverse().filter((el, i) => i < 120 ).reverse()
        const pm10mass = allPm10Mass.reverse().filter((el, i) => i < 120 ).reverse()
        const pm10num = allPm10Num.reverse().filter((el, i) => i < 120 ).reverse()
        const analytics = {
            'dates': datesFiltered,
            'hours': hours,
            'temperatures': temperatures,
            'rh' : rh,
            'no2' : no2,
            'pm25mass' : pm25mass,
            'pm25num' : pm25num,
            'pm1mass' : pm1mass,
            'pm1num' : pm1num,
            'pm10mass' : pm10mass,
            'pm10num' : pm10num
        }
        return analytics
    }

    modulairCollection(collection) {
        const allDates = []
        const allHours = []
        const allTemperatures = []
        const allRh = []
        const allPM1 = []
        const allPM10 = []
        const allPM25 = []

        for(const data in collection) {
            allDates.push(collection[data].date)
            allHours.push(collection[data].hour)
            allTemperatures.push(collection[data].temperature)
            allRh.push(collection[data].rh)
            allPM1.push(collection[data].pm1)
            allPM10.push(collection[data].pm10)
            allPM25.push(collection[data].pm25)
        }
        const dates = allDates.reverse().filter((el, i) => i < 120 ).reverse()
        const objDatesReduced = dates.reduce((acc, el) => {
            if(!acc[el]) acc[el] = el
            return acc
        }, {})
        const datesFiltered = []
        for(let date in objDatesReduced){
            datesFiltered.push(objDatesReduced[date])
        }
        const hours = allHours.reverse().filter((el, i) => i < 120 ).reverse()
        const temperatures = allTemperatures.reverse().filter((el, i) => i < 120 ).reverse()
        const rh = allRh.reverse().filter((el, i) => i < 120 ).reverse()
        const pm1 = allPM1.reverse().filter((el, i) => i < 120 ).reverse()
        const pm10 = allPM10.reverse().filter((el, i) => i < 120 ).reverse()
        const pm25 = allPM25.reverse().filter((el, i) => i < 120 ).reverse()
        const analytics = {
            'dates': datesFiltered,
            'hours': hours,
            'temperatures': temperatures,
            'rh': rh,
            'pm1': pm1,
            'pm10': pm10,
            'pm25': pm25
        }
        return analytics
    }

}


module.exports = CursorDB