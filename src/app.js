const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templetes/views');
const partialPath = path.join(__dirname, '../templetes/partials');

//Setting hbs engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Soham"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "Soham"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: " This is some Helpful Text",
        title: 'Help',
        name: "Soham"
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide a address'
        });
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            res.send({
                forecastData: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
       return  res.send({
            error: 'You Must provide a search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: "Soham",
        errorMessage: "Help Article Not Found"
   });
 });

app.get('*', (req, res) => {
   res.render('404', {
        title: 'Help',
        name: "Soham",
        errorMessage: "Page Not Found"
   });
});

app.listen(port, () => {
    console.log("Server is up on port "+ port);
})
