const weatherImage = document.querySelector('.weather-image');
const form = document.querySelector('.search-form');
const city = document.querySelector('.city');
const weather = document.querySelector('.weather');
const degrees = document.querySelector('.degrees');
const unit = document.querySelector('.unit');
const convert = document.querySelector('.convert');
const weatherTestAPI = 'https://api.openweathermap.org/data/2.5/weather?q=Paterson&APPID=1511a1f6b4e195d7fa3f41e35ff51c3b';
const giphyTestAPI = 'https://api.giphy.com/v1/gifs/translate?api_key=LYaIk6sC2kVe2RaAt7kJDWkx6MvfOK3v&s=Tacos';
let currentUnit = 'Fahrenheit';
let currentTemp;

// <===== FUNCTIONS =====>

const testAPI = (API) => {
    fetch(API)
        .then(response => response.json())
        .then(response => console.log(response));
};

const toCelcius = (degrees) => {
    return parseInt(degrees - 273.15);
};

const toFahrenheit = (degrees) => {
    return parseInt((degrees - 273.15) * 9 / 5 + 32);
};

// <===== END OF FUNCTIONS =====>

// <=========== OLD PROMISE PRACTICE CODE ================>

// const grabWeatherData = (location) => {
//     return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=1511a1f6b4e195d7fa3f41e35ff51c3b`);
// };

// const grabGiphyData = (phrase) => {
//     return fetch(`https://api.giphy.com/v1/gifs/translate?api_key=LYaIk6sC2kVe2RaAt7kJDWkx6MvfOK3v&s=${phrase}`)
// };

// const fetchWeather = (location) => {
//     grabWeatherData(location)
//         .then(response => response.json())
//         .then(response => {
//             let weatherSearchQuery = response.weather[0].description + ' weather';
//             grabGiphyData(weatherSearchQuery)
//                 .then(response => response.json())
//                 .then(response => weatherImage.src = response.data.images.original.url);
//             city.textContent = response.name;
//             weather.textContent = response.weather[0].description;
//             weather.textContent = weather.textContent[0].toUpperCase() + weather.textContent.substring(1);
//             currentTemp = response.main.temp;
//             // USE TERNARY OPERATORS!!!!!!! IT MAKES CODE SO MUCH MORE READABLE
//             degrees.textContent = currentUnit === 'Fahrenheit' ? toFahrenheit(currentTemp) : toCelcius(currentTemp);
//             unit.textContent = currentUnit;
//         })
//         .catch(error => console.log("Something went wrong -> " + error));
// };

// <=========== END OF OLD PROMISE PRACTICE CODE ================>

// <=========== NEW ASYNC PRACTICE CODE ================>

async function grabWeatherData(location) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=1511a1f6b4e195d7fa3f41e35ff51c3b`)
};

async function grabGiphyData(phrase) {
    return fetch(`https://api.giphy.com/v1/gifs/translate?api_key=LYaIk6sC2kVe2RaAt7kJDWkx6MvfOK3v&s=${phrase}`);
};

async function fetchWeather(location) {
    const weatherResponse = await grabWeatherData(location);
    const parsedWeatherData = await weatherResponse.json();
    const weatherSearchQuery = parsedWeatherData.weather[0].description + ' weather';
    currentTemp = parsedWeatherData.main.temp;

    const giphyResponse = await grabGiphyData(weatherSearchQuery);
    const parsedGiphyData = await giphyResponse.json();
    weatherImage.src = parsedGiphyData.data.images.original.url;

    city.textContent = parsedWeatherData.name;
    weather.textContent = parsedWeatherData.weather[0].description[0].toUpperCase() + parsedWeatherData.weather[0].description.substring(1);
    degrees.textContent = currentUnit === 'Fahrenheit' ? toFahrenheit(currentTemp) : toCelcius(currentTemp);
    unit.textContent = currentUnit;
};

// <=========== END OF NEW ASYNC PRACTICE CODE ================>


// START OF CODE
// Initial Weather

fetchWeather('Cherry Hill');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    fetchWeather(form.elements['location'].value);
    form.reset();
});

convert.addEventListener('click', function () {
    if (currentUnit === 'Fahrenheit') {
        currentUnit = 'Celcius';
        degrees.textContent = toCelcius(currentTemp)
        unit.textContent = currentUnit;
    } else {
        currentUnit = 'Fahrenheit';
        degrees.textContent = toFahrenheit(currentTemp)
        unit.textContent = currentUnit;
    }
});
