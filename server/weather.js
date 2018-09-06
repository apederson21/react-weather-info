const   googleApiKey = process.env.googleApiKey,
        darkSkyApiKey = process.env.darkSkyApiKey,
        request = require('request');


const getLatLong = (userAddress) => {
    return new Promise((resolve, reject) => {
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(userAddress)}&key=${googleApiKey}`;
        
        request(url, {
            json: true
        }, (error, response, body) => {
            if (error) {
                return reject('Unable to connect to Google API servers');
            } else if (body.status === 'ZERO_RESULTS') {
                return reject(`Unable to find address: ${userAddress}`);
            }
            resolve(
                {
                    lat: body.results[0].geometry.location.lat,
                    lng: body.results[0].geometry.location.lng,
                    name: body.results[0].formatted_address
                }
            );
        });
    });
}

const getWeather = (weatherData) => {
    return new Promise((resolve, reject) => {
        request(`https://api.darksky.net/forecast/${darkSkyApiKey}/${weatherData.lat},${weatherData.lng}`, {
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                return resolve({
                    temp: body.currently.temperature,
                    name: weatherData.name,
                    feelsLike: body.currently.apparentTemperature,
                    icon: body.currently.icon,
                    wind: body.currently.windSpeed
                });
            }
            reject('Unable to fetch weather');
        });
    });
}

module.exports = {
    getLatLong: getLatLong,
    getWeather: getWeather
}
