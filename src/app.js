const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');


const port = process.env.PORT || 3000;
const app = express();

//Express paths for Express config
const publicDir = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//setup hbs and views locations
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDir));


app.get('',(req,res)=>{
    res.render('index',{
        title : "Weather",
        name : "Ravdeep Singh"
    })
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title : "About Me",
        name : "Ravdeep SIngh"
    })
});

app.get('/help',(req,res)=> {
    res.render('help',{
        title : "Help",
        help : "What kind of help you want"
    })
})

app.get("/weather", (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "Please provide City name"
        })
    }
    geocode(req.query.address, (error,{latitude, longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forcast(latitude,longitude,(error,forcastData)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forcast : '50',
    //     location: 'Ludhiana',
    //     address: req.query.address
    // })
});

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title : "404",
        name : 'Ravdeep Singh',
        errorMessage : 'Help article not found.'
        
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title : "404",
        name : 'Ravdeep Singh',
        errorMessage : 'Page not found!'
        
        
    })
})
app.listen(port,()=>{
    console.log("server running!")
});