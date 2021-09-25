const admin = require('./database')
const db = admin.database()

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
        allHours.reverse()
        allTemperatures.reverse()
        allDates.reverse()
        allRh.reverse()
        allNo2.reverse()
        allPm25Mass.reverse()
        allPm25Num.reverse()
        allPm1Mass.reverse() 
        allPm1Num.reverse()
        allPm10Mass.reverse()
        allPm10Num.reverse()

        const hours = []
        const dates = []
        const temperatures = []
        const rh = []
        const no2 = []
        const pm25mass = []
        const pm25num = []
        const pm1mass = []
        const pm1num = []
        const pm10mass = []
        const pm10num = []

        for(let i = 0; i < 50; i++) {
            hours.push(allHours[i])
            temperatures.push(allTemperatures[i])
            dates.push(allDates[i])
            rh.push(allRh[i])
            no2.push(allNo2[i])
            pm25mass.push(allPm25Mass[i])
            pm25num.push(allPm25Num[i])
            pm1mass.push(allPm1Mass[i])
            pm1num.push(allPm1Num[i])
            pm10mass.push(allPm10Mass[i])
            pm10num.push(allPm10Num[i])
        }
        dates.reverse()
        temperatures.reverse()
        hours.reverse()
        rh.reverse()
        no2.reverse()
        pm25mass.reverse()
        pm25num.reverse() 
        pm1mass.reverse()
        pm1num.reverse() 
        pm10mass.reverse()
        pm10num.reverse() 

        const analytics = {
            'dates': dates,
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
        const reduced = (arr) => arr.map((el, i) => el != arr[i +1] ? el : 0).filter((el) => el != 0)
        const dates = reduced(allDates)
        const hours = reduced(allHours)
        const temperatures = allTemperatures
        const rh = allRh
        const pm1 = allPM1
        const pm10 = allPM10
        const pm25 = allPM25
        
        const analytics = {
            'dates': dates,
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