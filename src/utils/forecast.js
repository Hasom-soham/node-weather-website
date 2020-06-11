const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=843290553af5108c9af7f8c3d03ca16c&query=' + latitude +','+ longitude +'&units=f';
    request({ url, json: true }, (error, { body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find the location', undefined);
        } else {
            currentTempCel = Math.round((5/9) * (body.current.temperature-32));
            feelsTempCel = Math.round((5/9) * (body.current.feelslike-32));
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress Farenheit (${currentTempCel} Celcius ). It feels like ${body.current.feelslike} degrees Farenheit (${feelsTempCel} Celcius).`);
        }
    });
};

module.exports = forecast;