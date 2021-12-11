const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()

//defining paths for express confing
const public = path.join(__dirname + "/../public")
const viewsPath = path.join(__dirname +'/../templates/views')
const partialsPath = path.join(__dirname + '/../templates/partials')

// setup handlebars engine and views config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



//setup static directory to serve
app.use(express.static(public))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Bleak'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name:'Bleak'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help Page',
        content: 'this help page is up',
        name:'Bleak'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'you must provide an adress'
        })
    }


    geocode(req.query.address, (error, {latitude, longitutde, location} = {}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitutde, (error, data) =>{
            if(error){
                return res.send({error})
            }

            return res.send({
                forecast: data,
                location,
                address: req.query.address 
            })
        })
    })

})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'you must provie a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404',{
        title:'help article not found',
        name:'Bleak'
    })
})

app.get('*', (req, res) =>{
    res.render('404',{
        title: '404 page not found',
        name:'Bleak'
    })
})

app.listen(3000, () => {
    console.log("server is up")
})
