const request = require('request');

const forcast = (latitude,longitude, callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=329d2adc9e641afaa34af3e13ddd6af5&query="+ latitude + ','+ longitude;
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback("Unable to connect to weather service");
        } else if(body.error){
            callback("unable to find the location")
        } else{
            callback(undefined, {
                temperature : 'It is currently ' + body.current.temperature + ' degrees out. It feel likes ' + body.current.feelslike + ' degree' 
            })
        }
    })
}


module.exports = forcast;
// const https = require('https');
// const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/ludhiana.json?access_token=pk.eyJ1IjoicmF2ZGVlcDE1IiwiYSI6ImNseGE0enUzeTBhcWYyaXIyazk0ZTlkcHAifQ.oula7WQJ276lhgDuAmeeEQ&limit=1"

// const request = https.request(url,(response)=>{
//     let data = ''
//     response.on('data',(chunk)=>{
//         data = data + chunk.toString();
//     })
//     response.on('end',()=>{
//         const body = JSON.parse(data);
//         console.log(body)
//     })
// })
// request.end()