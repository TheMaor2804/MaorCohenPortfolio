
import { getCitiesData } from "./geocoding.js";
import { getAllDataGeo, getCityWeatherGeo } from "./weather.js";

export const build = async () => {

    const display1 = document.querySelector(".display1");
    const display1P = display1.firstElementChild;
    const display3 = document.querySelector('.display3');
    const display3P = display3.firstElementChild;
    const searchInput = document.querySelector('.search-input');
    const suggestions = document.querySelector('.suggestions');
    const countryName = document.getElementById('countryName');
    const cityName = document.getElementById('cityName');
    const infoDegrees = document.getElementById("infoDegrees");
    const infoWeather = document.getElementById("infoWeather");
    const realFeel = document.getElementById("realFeel");
    const wind = document.getElementById("wind");
    const conditionsRainChance = document.getElementById("conditionsRainChance");
    const uvIndex = document.getElementById("uvIndex");

    window.addEventListener("click", (e) => {
        if (
            window.getComputedStyle(suggestions).display === "block" &&
            e.target != suggestions &&
            e.target != searchInput &&
            e.target.parentElement != suggestions
        ) {
            suggestions.style.display = "none";
        } else if (e.target == searchInput) {
            suggestions.style.display = "block";
        }
    })

    const searchBar = async () => {
        searchInput.addEventListener('input', async (e) => {

            const inputValue = e.target.value.toLowerCase();
            if (inputValue === '') {
                suggestions.innerHTML = "";
                suggestions.removeEventListener('click', suggestionClickEvent);
                suggestions.style.display = "none";
                return;
            }

            const citiesData = await getCitiesData(inputValue);

            suggestions.innerHTML = '';
            citiesData.forEach((data) => {
                const listItem = document.createElement('li');
                listItem.textContent = data.name;
                suggestions.appendChild(listItem);
                const city = data;

                listItem.addEventListener(("click"), (e) => {
                    suggestionClickEvent(e, city);
                })
            })


            suggestions.style.display = "block";
        });

        async function suggestionClickEvent(event, city) {
            const selectedSuggestion = event.target.textContent;
            searchInput.value = selectedSuggestion;
            suggestions.innerHTML = '';
            modifyDom(city);

            searchInput.value = '';
        }

    }

    const createHourDiv = (hour, img, alt, degrees) => {
        let div = document.createElement("div");
        div.className = "hourly-forecast";
        let hourP = document.createElement("p");
        let imgWeather = document.createElement("img");
        let degreesH4 = document.createElement("h4");

        hourP.textContent = hour;
        imgWeather.src = `https://openweathermap.org/img/wn/${img}.png`;
        imgWeather.alt = alt;
        degreesH4.textContent = degrees + "°";

        div.appendChild(hourP);
        div.appendChild(imgWeather);
        div.appendChild(degreesH4);

        return div;
    }

    const create5DayDiv = (day, img, alt, desc, min, max) => {
        const div = document.createElement('div');
        div.className = "daily-forecast";
        const currentDay = document.createElement('p');
        const imgWeatherDiv = document.createElement('div');
        imgWeatherDiv.className = "imgTitle";
        const imgWeather = document.createElement('img');
        const description = document.createElement('h5');
        const minMax = document.createElement('p');

        currentDay.textContent = day;
        imgWeather.src = `https://openweathermap.org/img/wn/${img}.png`;
        imgWeather.alt = alt;
        description.textContent = desc;
        minMax.textContent = `${max}°/${min}°`

        div.appendChild(currentDay)
        imgWeatherDiv.appendChild(imgWeather)
        imgWeatherDiv.appendChild(description)
        div.appendChild(imgWeatherDiv)
        div.appendChild(minMax)

        return div;
    }

    const modifyDom = async (city) => {

        const cityData = await getAllDataGeo(city.lon, city.lat);

        const dailyData = cityData[0];
        const weeklyData = cityData[1];
        const weeklyList = weeklyData.list;
        const uvData = cityData[2];
        uvIndex.textContent = uvData.result.uv;
        display1.innerHTML = '';
        display1.appendChild(display1P);

        display3.innerHTML = '';
        display3.appendChild(display3P);

        const cityNameArr = city.name.split(", ");

        countryName.textContent = cityNameArr[cityNameArr.length - 1];
        cityName.textContent = cityNameArr[0];

        infoDegrees.textContent = dailyData.main.temp + "°";

        infoWeather.src = `https://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png`;
        infoWeather.alt = dailyData.weather[0].description;

        realFeel.textContent = dailyData.main.feels_like + "°";

        wind.textContent = dailyData.wind.speed + " Meter/s";

        conditionsRainChance.textContent = Math.round(weeklyList[0].pop * 100) + "%";



        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const dateToDay = (dt) => {
            const date = new Date(dt * 1000);
            return daysOfWeek[date.getDay()];
        }

        const dateToHour = (dt) => {
            const date = new Date(dt * 1000);
            const hour = date.getHours();
            return hour;
        }

        //24 Hour forecast
        for (let i = 0; i < 8; i++) {
            const data = weeklyList[i];
            const hour = dateToHour(data.dt) + ":00";
            const img = data.weather[0].icon;
            const alt = data.weather[0].description;
            const degrees = data.main.temp;

            display1.appendChild(createHourDiv(hour, img, alt, degrees));
        }


        //5 day forecast

        let tempRangePerDate = {};
        weeklyList.forEach(date => {
            if (dateToDay(date.dt) != dateToDay(dailyData.dt))
                tempRangePerDate[dateToDay(date.dt)] = []
        })
        let finalRangeTempPerDay = {}
        Object.keys(tempRangePerDate).forEach((day) => {
            weeklyList.forEach(date => {
                if (day === dateToDay(date.dt)) {
                    tempRangePerDate[day].push({ max: date.main.temp_max, min: date.main.temp_min })
                    finalRangeTempPerDay[day] = { max: 0, min: 0 }
                }
            })
        })

        Object.keys(tempRangePerDate).forEach((day) => {
            finalRangeTempPerDay[day].max = Math.max(...tempRangePerDate[day].map(temp => temp.max))
            finalRangeTempPerDay[day].min = Math.min(...tempRangePerDate[day].map(temp => temp.min))
        })


        weeklyList.forEach(date => {
            if (dateToHour(date.dt) == 12 &&
                dateToDay(date.dt) != dateToDay(dailyData.dt)) {
                const day = dateToDay(date.dt);
                const img = date.weather[0].icon;
                const alt = date.weather[0].alt;
                const desc = date.weather[0].main;
                const min = finalRangeTempPerDay[dateToDay(date.dt)].min;
                const max = finalRangeTempPerDay[dateToDay(date.dt)].max;

                display3.appendChild(
                    create5DayDiv(day, img, alt, desc, min, max)
                );
            }
        })
    }



    searchBar();
    searchInput.value = '';
    const telAviv = await getCitiesData("Tel Aviv");


    modifyDom(telAviv[0]);
}

