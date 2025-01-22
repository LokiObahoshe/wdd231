// The Hamburger
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

// The Modified Dates
const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = lastModified;

// Weather

// Const's for Current Weather
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#desc');
const maxTemp = document.querySelector('#max-temp');
const minTemp = document.querySelector('#min-temp');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');

// Const's for Weather Forecast
const day1Temp = document.querySelector('#day1-temp');
const day2Temp = document.querySelector('#day2-temp');
const day3Temp = document.querySelector('#day3-temp');

// Const's for Weather Forecast's Weekdays
const day1Weekday = document.querySelector('#day1-weekday');
const day2Weekday = document.querySelector('#day2-weekday');
const day3Weekday = document.querySelector('#day3-weekday');

const longitude = "16.76"
const latitude = "-3.00"
const apiKey = "2271c043bc3412f35086a93ea1745b8f"

const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;



async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            //Data for Weather:
            console.log(data);

            //Unix time for Sunrise:
            //console.log(`${data.sys.sunrise}`);

            //Unix time for Sunset:
            //console.log(`${data.sys.sunset}`);

            displayResults(data);
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// This function converts the Unix time of
// sunrise and sunset into hours and minutes in UTC
function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${period}`;
}

function displayResults(data) {
    const currentData = data.list[0];
    currentTemp.innerHTML = `${parseInt(currentData.main.temp)}&deg;F`;
    maxTemp.innerHTML = `${parseInt(currentData.main.temp_max)}&deg;F`;
    minTemp.innerHTML = `${parseInt(currentData.main.temp_min)}&deg;F`;
    humidity.innerHTML = `${parseInt(currentData.main.humidity)}%`;
    sunrise.innerHTML = formatTime(data.city.sunrise);
    sunset.innerHTML = formatTime(data.city.sunset);
    const iconsrc = `https://openweathermap.org/img/w/${currentData.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', currentData.weather[0].description);
    captionDesc.textContent = `${currentData.weather[0].description}`;
}

// Function to give exact day of the week
// ex: Tuesday, Wednesday, Thursday
function getDayOfWeek(timestamp) {
    const date = new Date(timestamp * 1000);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getUTCDay()];
}


// This function displays the forecast for the next 3 days
function displayForecast(data) {
    const forecastDays = [1, 2, 3];
    let currentDay = new Date().getDate();

    forecastDays.forEach((dayOffset, index) => {
        const targetDay = new Date();
        targetDay.setDate(currentDay + dayOffset);

        const forecastData = data.list.find(forecast => {
            const forecastDate = new Date(forecast.dt * 1000);
            return forecastDate.getDate() === targetDay.getDate();
        });

        if (forecastData) {
            const temp = parseInt(forecastData.main.temp);
            const weekday = getDayOfWeek(forecastData.dt);

            const tempElement = [day1Temp, day2Temp, day3Temp][index];
            const weekdayElement = [day1Weekday, day2Weekday, day3Weekday][index];

            tempElement.innerHTML = `${temp}&deg;F`;
            weekdayElement.innerHTML = `${weekday}:`;
        }
    });
}

apiFetch();