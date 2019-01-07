const request = require('request');

const geocodeAddress = (address, callback) => {
    if (address) {
        const encodedAddress = encodeURIComponent(address);
        const _url = `http://www.mapquestapi.com/geocoding/v1/address?key=AENjGKZAOMmhEK2G5RaZcOwjvxu87kdL&location=${encodedAddress}`

        request({
            url: _url,
            json: true
        }, (error, response, body) => {
            if (error) {
                callback('Could not connect the Mapquest server');
            }
            else if (response.statusCode == 200) {
                callback(undefined, {
                    Address: body.results[0].locations[0].street + ' ' + body.results[0].locations[0].adminArea5 + ' ' + body.results[0].locations[0].adminArea3 + ' ' + body.results[0].locations[0].adminArea1 + ' ' + body.results[0].locations[0].postalCode,
                    Latitude: body.results[0].locations[0].latLng.lat,
                    longitude: body.results[0].locations[0].latLng.lng
                })
            }
        })
    } else {
        console.log('Address was not send as part of the request')
    }
}

module.exports.geocodeAddress = geocodeAddress;