const fetch = require('node-fetch')
const crypto = require('crypto')
const { url } = require('inspector')

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
        try {
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
        } catch (error) {
            console.log('Error', error);
        }
    }

    getDataNubo(url) {
        try {
            let headers = {
                "Content-Type": "application/json",
                'Api-key': this.api_key
            }
            return fetch(url, {
                methods:'GET',
                headers: headers,
            })
                .then((response)=> response.json())
                .then((resp) => resp[resp.length - 1])
        } catch (error) {
            console.log('Error:', error);
        }
    }

    getInfoNubo(url) {
        try {
            let headers = {
                "Content-Type": "application/json",
                'Api-key': this.api_key
            }
            return fetch(url, {
                methods:'GET',
                headers: headers,
            })
                .then((response)=> response.json())
                .then((resp) => resp[0])
        } catch (error) {
            console.log('Error:', error);
        }
    }

    getInfoEva(url) {
        try {
            let headers = {
                "Content-Type": "application/json",
                'Authorization': this.api_key
            }
            return fetch(url, {
                methods:'GET',
                headers: headers,
            })
                .then((response)=> response.json())
                .then((resp) => resp)
        } catch (error) {
            console.log('Error:', error);
        }
    }

    getDataEva(url) {
        try {
            let headers = {
                "Content-Type": "application/json",
                'Authorization': this.api_key
            }
            return fetch(url, {
                methods:'GET',
                headers: headers,
            })
                .then((response) => response.json())
                .then((resp) => resp[0])
        } catch (error) {
            console.log('Error:', error);
        }
    }
    getDataPurpleair(){
        try {
            let headers ={
                'Content-Type':'application/json'
            }
            return fetch(this.api_key,{
                methods:'GET',
                headers:headers,
            })
                .then((data) => data.json())
                .then(resp => resp.results[0])
        } catch (error) {
            console.log('Error',error);
        }
    }

    getDataAirlink() {
        let t = Math.floor(Date.now() / 1000);
        let station_id = 124147;
        let api_signature = "api-key" + this.api_key + "station-id" + station_id + "t" + t;
        let api_key_secret = "binv0mrymunydaysoirnp3zsk8997hgp";
        let hmac = crypto.createHmac('sha256', api_key_secret);
        let data = hmac.update(api_signature);
        //Creating the hmac in the required format
        let gen_hmac = data.digest('hex');

        const url ="https://api.weatherlink.com/v2/current/"+station_id+"?api-key="+this.api_key+"&t="+t+"&api-signature="+gen_hmac;
        const headers = {
            "Content-Type": "application/json",
        }

        return fetch(url, {
            methods: 'GET',
            headers,
        })
        .then(data => data.json())
        .then(res => res.sensors[0].data[0])
        .catch(err => console.log('Error', err))
    }
}

module.exports = MySensor