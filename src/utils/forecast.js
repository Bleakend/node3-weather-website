const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=883622718881067cbb73e85a7a220e8f&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('unable to connect to the location service', undefined)
        }else if(body.error){
            callback('wrong input please check!')
        }else{
            const temp = body.current.temperature
            const chanceOfRain = body.current.precip         
            const description = body.current.weather_descriptions
            data = (description + '. it is currently ' + temp + ' degrees. there is a ' + chanceOfRain + '% chance of rain')
            callback(undefined, data)
        }
    })
}

module.exports = forecast