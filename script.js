const form = document.querySelector('form')
const input = document.querySelector('input')
const btn = document.querySelector('button')
const result = document.querySelector('.result')
const hidden = document.querySelectorAll('.hide')
const locationLink = document.querySelector('.wrap > a')

// name and coord
const cityName = document.querySelector('.place-name')
const graphic = document.querySelector('.graphic')
const lon = document.querySelector('.lon')
const lat = document.querySelector('.lat')

const temperature = document.querySelector('.temp')

// temperature
const currentTemp = document.querySelector('.current-temp')
const feelsLike = document.querySelector('.feels-like')
const humidity = document.querySelector('.humidity')
const maxTemp = document.querySelector('.temp-max')
const minTemp = document.querySelector('.temp-min')
const windSpeed = document.querySelector('.wind-speed')

// sunrise sunset
const sunrise = document.querySelector('.sunrise > p')
const sunset = document.querySelector('.sunset > p')


const api = {
    key: process.evn.KEY,
    base_url: 'https://api.openweathermap.org/data/2.5/'
}

const unixToLocal = (time) => {
    const date = new Date(time*1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var formattedTime = hours + ':' + minutes + ':' + seconds;
    return formattedTime
}


form.addEventListener('submit', async e => {
    hidden.forEach(e => {
        e.classList.remove('show')
    })
    e.preventDefault();
    const inputValue = input.value
    try {
        const res = await fetch(`${api.base_url}weather?q=${inputValue}&units=metric&APPID=${api.key}`)
        const data = await res.json()
        console.log(data)
        if (data.cod === 200) {
            hidden.forEach(e => {
                e.classList.add('show')
            })

            locationLink.setAttribute('href', `https://www.google.com/maps?q=${data.coord.lat},${data.coord.lon}`)
            graphic.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
            cityName.innerText = ` ${data.name}, ${data.sys.country}`
            lon.innerText = `Longitude: ${data.coord.lon}`
            lat.innerText = `Latitude: ${data.coord.lat}`
            currentTemp.innerText = `${data.main.temp} ℃`
            feelsLike.innerText = `${data.main.feels_like} ℃`
            humidity.innerText = `${data.main.humidity}`
            maxTemp.innerText = `${data.main.temp_max} ℃`
            minTemp.innerText = `${data.main.temp_min} ℃`
            windSpeed.innerText = `${data.wind.speed}km/h`

            const unixTimeSunrise = unixToLocal(data.sys.sunrise);
            const unixTimeSunset = unixToLocal(data.sys.sunset);

            sunrise.innerText = unixTimeSunrise
            sunset.innerText = unixTimeSunset
        } else {
            cityName.innerText = data.message
        }
        // temperature.innerText = `${data.name}`
    } catch (err) {
        throw (err)
    }

})
