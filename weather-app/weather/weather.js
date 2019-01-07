const request = require('request');

var getWeather = (lat, lng, callback) => {
    var _url = `https://api.darksky.net/forecast/34aae13d473a32773e73d8203110b7b4/${lat},${lng}`;
    request({
        url: _url,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                currentTemp: body.currently.temperature,
                feelsLike: body.currently.apparentTemperature,
                timeZone: body.timezone
            });
        } else {
            callback(`Error occured when concating forecast.io server : ${error}`);
        }
    });
}

module.exports.getWeather = getWeather;