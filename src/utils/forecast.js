const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/7defc4647b54aefbe37ab568b1cf8c94/'+latitude+','+longitude+''

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary
                    + "It is currently " +
                    + body.currently.temperature + 
                    " degrees out. There is " 
                    + body.currently.precipProbability + 
                    "% chance of rain")
        }
    })
}


module.exports = forecast