const yargs = require('yargs')
const geeCode = require('./geocode/geocode');
const Weather = require('./weather/weather');
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather',
            string: true
        }
    })
    .help().alias('help', 'h')
    .argv;

geeCode.geocodeAddress(argv.address, (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        //console.log(JSON.stringify(result, undefined, 2));
        console.log(`Please wait ...  \nRequesting current Temperatures of ${result.Address}`);
        //console.log(`Latitude             : ${result.Latitude}`);
        //console.log(`longitude            : ${result.longitude}`)
        Weather.getWeather(result.Latitude, result.longitude, (errorMessage, weatherResult) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`Current Temp         :  ${weatherResult.currentTemp}'F & Feels like  ${weatherResult.feelsLike}'F`);
                console.log(`Belongs to timezone  : ${weatherResult.timeZone}`);
            }
        });
    }
});



//Current Temp  :  49.7'F & Feels like 47.3'F
//Time zone: America / Los_Angeles


// forecast.io (darksky.com)
//34aae13d473a32773e73d8203110b7b4
//https://api.darksky.net/forecast/34aae13d473a32773e73d8203110b7b4/37.773336,-121.551523