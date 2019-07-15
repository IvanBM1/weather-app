import { hostOpenWeather, keyOpenWeather} from '../Config'

export default {
    weather,
    forecast
}

function weather(city) {
    
    const url = `${hostOpenWeather}/weather?q=${city}&units=metric&appid=${keyOpenWeather}`

    return fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            if(resp.cod !== 200) throw resp.message
            return {
                id: resp.id,
                dt: resp.dt,
                city: resp.name,
                country: resp.sys.country,
                main: resp.weather[0].main,
                description: resp.weather[0].description,
                temperature: parseInt(resp.main.temp),
                temperatureMin: resp.main.temp_min,
                temperatureMax: resp.main.temp_max,
                windSpeed: resp.wind.speed,
                windDeg: resp.wind.deg,
                icon: resp.weather[0].icon,
                position: {
                    lat: resp.coord.lat,
                    lng: resp.coord.lon
                }
            }
        })
}

function forecast(city, country) {
    const url = `${hostOpenWeather}/forecast?q=${city},${country}&appid=${keyOpenWeather}`

    return fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            if(resp.cod !== "200") throw resp.message
            return resp.list
        })
}