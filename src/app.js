const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const request = require('request');

const app = express();

// define paths for express config
const pubdirpath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

// set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// set up static directory to set up
app.use(express.static(pubdirpath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Created by: Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Created by: Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpmsg: "This is the help page!",
        title: 'Help',
        name: 'Created by: Andrew Mead'
    })
})

// this methods helps to get the url and routes.

//app.com
//app.com/help
//app.com/about

// app.get('/help', (req, res) => {
//     res.send({
//             Name: 'Andrew',
//             Age: 27
//     })
// })
// const helppath = path.join(__filename, '../public/help.html')
// app.use(express.static(helppath))

// app.get('/About', (req, res) => {
//     res.send('<h1>About Me</h1>')
// })
// const aboutpath = path.join(__filename, '../public/about.html')
// app.use(express.static(aboutpath))

app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        });
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({ error })
            } else {
                res.send({
                    forecast: forecastData,
                    location, 
                    address: req.query.address
                })
            }


        })
    })

    // res.send([{
    //     forecast: 50,
    //     location: "Philadelphia",
    //     address: req.query.address
    // }]);
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }


    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
        res.render('404', {
            title: '404 Help',
            name: 'Andrew Mead',
            errormessage: 'Help article not found'
        })
    })

app.get('*', (req, res) => {
        res.render('404', {
            title: '404',
            name: 'Andrew Mead',
            errormessage: 'Page not found'
        })
    })

app.listen(3001, () => {
    console.log('Server is up on port 3001')
})
