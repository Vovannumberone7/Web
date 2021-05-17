let cityData;
const yandexAPIUrlStart = "https://static-maps.yandex.ru/1.x/?l=map&"

const openWeatherAPI = {
    startUrl: "https://api.openweathermap.org/data/2.5/weather?",
    amp: "&",
    q: "q=",
    lon: "lon=",
    lat: "lat=",
    appId: "appid=a5b450affc873b47bf7200ee952ccd96",
    lang: "lang=ru"
}

const weatherIconUrl = {
    start: "https://openweathermap.org/img/wn/",
    ending: "@2x.png"
}

const id = {
    searchInput: "search",
    mapImg: "map_img",
    dateTime: "date_time",
    cityRegion: "city_region",
    weatherIcon: "weather_icon",
    temp: "temperature",
    feelsLike: "feels_like",
    main: "weather_main",
    wind: "wind"
}

/**
 * search button was pressed | search weather for the city
 * @returns {Promise<void>}
 */
async function search() {
    const search = parseValue()

    if (search !== undefined) {
        if (search.type === "city") {
            await getWeatherFor(search.cityName)
        } else {
            await getWeatherBy(search.lon, search.lat)
        }
        if (responseCode() === 200) {
            document.getElementById(id.mapImg).setAttribute("src", cityImageUrl())
            document.getElementById(id.dateTime).innerText = dateTime()
            document.getElementById(id.cityRegion).innerText = cityRegion()
            document.getElementById(id.weatherIcon).setAttribute("src", fullWeatherIconUrl())
            document.getElementById(id.temp).innerText = temperature()
            document.getElementById(id.feelsLike).innerText = feelsLike();
            document.getElementById(id.main).innerText = main()
            document.getElementById(id.wind).innerText = wind()
        }
    }
}

/**
 * parse search input value
 * @returns {{cityName: string, type: string}|{lon: string, type: string, lat: string}|undefined|*}
 */
function parseValue() {
    const value = document.getElementById(id.searchInput).value.trim()
    if (value === "" || value === undefined) {
        return undefined
    }
    if (value.match(/(\s*-?\d+(.\d+)*){2}/) != null) {
        const coords = value.split(' ')
        return {type: "coords", lon: coords[0], lat: coords[coords.length - 1]}
    }
    if (value.match(/(\s*\D+\s*)+/) != null) {
        return {type: "city", cityName: value}
    }
    return incorrectSearch()
}

/**
 * alert if search is incorrect
 * @returns {undefined}
 */
function incorrectSearch() {
    alert("Некорректные условия поиска")
    return undefined
}

/**
 * check and return a code from response
 * @returns {number}
 */
function responseCode() {
    if (cityData.cod === 200) {
        console.log("City was found")
    } else {
        console.log(cityData.message)
        alert(cityData.message)
    }
    return cityData.cod
}

/**
 * get wind info as string
 * @return {string}
 */
function wind() {
    return "Ветер " + cityData.wind.speed.toFixed(1) + "м/с"
}

/**
 * get main info about the weather as string
 * @returns {string}
 */
function main() {
    const desc = cityData.weather[0].description.firstLetterToUpperCase()
    const cloudiness = cityData.clouds.all === 0 ? "безоблачно" : "облачность " + cityData.clouds.all + "%"
    return desc + ", " + cloudiness
}

/**
 * get feels like temp as string
 * @returns {string}
 */
function feelsLike() {
    return "Ощущается как " + (cityData.main.feels_like - 273.15).toFixed(1).toString() + "°С"
}

/**
 * get temp as string
 * @returns {string}
 */
function temperature() {
    return (cityData.main.temp - +273.15).toFixed(1).toString() + "°С"
}

/**
 * get city and region as string
 * @returns {string}
 */
function cityRegion() {
    return cityData.name + ", " + cityData.sys.country
}

/**
 * get date and time as string
 * @returns {string}
 */
function dateTime() {
    const date = new Date(cityData.dt * 1000)
    const hours = zeroStartFormat(date.getHours())
    const mins = zeroStartFormat(date.getMinutes())
    const day = zeroStartFormat(date.getDate())
    const month = zeroStartFormat(date.getMonth())
    return hours + ":" + mins + ", " + day + "." + (Number(month) + 1) + "." + date.getFullYear()
}

function zeroStartFormat(value) {
    return value < 10 ? "0" + value : value.toString()
}

/**
 * full url for weather icon as string
 * @returns {string}
 */
function fullWeatherIconUrl() {
    return weatherIconUrl.start + cityData.weather[0].icon + weatherIconUrl.ending
}

/**
 * send request and configure weather data object for city by lon and lat
 * @param lon lon
 * @param lat lat
 * @returns {Promise<void>}
 */
async function getWeatherBy(lon, lat) {
    const url = openWeatherAPI.startUrl + openWeatherAPI.lat + lat + openWeatherAPI.amp + openWeatherAPI.lon + lon +
        openWeatherAPI.amp + openWeatherAPI.appId + openWeatherAPI.amp + openWeatherAPI.lang
    await fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            cityData = data
        })
}

/**
 * send request and configure weather data object for city by city name
 * @param city cityName
 * @returns {Promise<void>}
 */
async function getWeatherFor(city) {
    const url = openWeatherAPI.startUrl + openWeatherAPI.q + city + openWeatherAPI.amp + openWeatherAPI.appId +
        openWeatherAPI.amp + openWeatherAPI.lang
    await fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            cityData = data
        })
}

/**
 * get string with first letter in upped case
 * @returns {string}
 */
String.prototype.firstLetterToUpperCase = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/**
 * get url for image if city from cityData as string
 * @returns {string} url
 */
function cityImageUrl() {
    const ll = "&ll=" + cityData.coord.lon + "," + cityData.coord.lat
    const z = "&z=10"
    const size = "&size=450,450"
    return yandexAPIUrlStart + ll + z + size
}