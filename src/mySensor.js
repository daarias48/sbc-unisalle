const fetch = require('node-fetch')
class MySensor {
    constructor(api_key) {
        this.api_key = api_key
        this.password = ""
    }
    getUpdateDataModulair(url) {
        const auth = "Basic " + Buffer.from(this.api_key + ":" + this.password).toString("base64")
        const headers = {
            "Content-Type" : "application/x-www-form-urlencoded;charset-UTF-8",
            "Authorization" : auth
        }
        return fetch(url, {
            methods: 'GET',
            headers: headers,
        })
            .then((response) => response.json())    
            .then((data) => {
                data = data.data[0]
                return data
            })
    }

    getSensorInfoModulAir(url) {
        const auth = "Basic " + Buffer.from(this.api_key + ":" + this.password).toString("base64")
        const headers = {
            "Content-Type" : "application/x-www-form-urlencoded;charset-UTF-8",
            "Authorization" : auth
        }
        return fetch(url, {
            methods: 'GET',
            headers: headers,
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
    }

    getInfoClarity(url) {
        let headers = {
            'Accept-Encoding': 'gzip',
            'x-api-key': this.api_key
        }
        return fetch(url,{
            methods:'GET',
            headers: headers,
        })
            .then((response)=>{
                return response.json()
            }).then((resp) => {
                return resp[0]
            })
    }

    getDataClarity(url) {
        let headers = {
            'Accept-Encoding': 'gzip',
            'x-api-key': this.api_key
        }
        return fetch(url,{
            methods:'GET',
            headers: headers,
        })
            .then((response)=>{
                return response.json()
            }).then((resp) => {
                return resp[0]
            })
    }
}

module.exports = MySensor