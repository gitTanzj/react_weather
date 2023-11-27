import express from 'express'
const app = express()
import fetch from 'node-fetch'

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','*');
    res.header('Access-Control-Allow-Headers', '*')
    console.log(req.method, req.url)
    next();
  });

const key = '77fefff6fbdbd270c709438fbdfa6295'

const getWeatherDataPromise = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp) - 273.15)
            let result = {
                description : description,
                city : city,
                temp : temp,
                error : null
            }
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
    })
}

app.get('/', (req, res) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=Tartu&appid=${key}`
    getWeatherDataPromise(url)
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        console.log(error)
    })
}) 

app.post('/', (req, res) => {
    console.log(req.body)
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityname}&appid=${key}`
    getWeatherDataPromise(url)
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        console.log(error)
    })
})
// app.all('/', (req,res) => {
//     let city
//     if(req.method == 'POST'){
//         city = req.body.cityname
//     }
//     else if(req.method == 'GET'){
//         city = 'Tartu'
//     }
//     let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
//     getWeatherDataPromise(url)
//     .then(data => {
//         res.send(data)
//     })
//     .catch(error => {
//         console.log(error)
//     })
// })
app.listen(4000, () => {
    console.log("App listening on port 4000")
})