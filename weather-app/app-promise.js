const yargs = require('yargs')
const axios = require('axios')
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
const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=AENjGKZAOMmhEK2G5RaZcOwjvxu87kdL&location=${encodedAddress}`;
axios.get(geocodeUrl)
    .then((response) => {
        const lat = response.data.results[0].locations[0].latLng.lat;
        const lng = response.data.results[0].locations[0].latLng.lng;
        const street = response.data.results[0].locations[0].street;
        const address = street + ' ' + response.data.results[0].locations[0].adminArea5 + ' ' + response.data.results[0].locations[0].adminArea3 + ' ' + response.data.results[0].locations[0].adminArea1 + ' ' + response.data.results[0].locations[0].postalCode;
        const weatherUrl = `https://api.darksky.net/forecast/34aae13d473a32773e73d8203110b7b4/${lat},${lng}`;
        console.log(`Please wait .....\nRetriving current temp for ${address}`);
        return axios.get(weatherUrl);
    }).then((response) => {
        const currentTemp = response.data.currently.temperature;
        const feelsLike = response.data.currently.apparentTemperature;
        const timeZone = response.data.timezone;
        console.log(`Current Temp     :  ${currentTemp}'F & Feels like  ${feelsLike}'F`);
        console.log(`Timezone         : ${timeZone}`);
    })
    .catch((errorMessage) => {
        if (errorMessage.code === 'ENOTFOUND') {
            console.log('unable to connect to the server.')
        } else {
            console.log(errorMessage.message)
        }
    })

//const weatherUrl = `https://api.darksky.net/forecast/34aae13d473a32773e73d8203110b7b4/${lat},${lng}`
//Current Temp  :  49.7'F & Feels like 47.3'F
//Time zone: America / Los_Angeles


// forecast.io (darksky.com)
//34aae13d473a32773e73d8203110b7b4
//https://api.darksky.net/forecast/34aae13d473a32773e73d8203110b7b4/37.773336,-121.551523