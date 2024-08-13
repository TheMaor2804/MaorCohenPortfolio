const API_KEY = "e085f13d76158499d4b07ebef62fcbd6";

export const getCitiesData = async (cityName) => {
    const response = await
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`);
    const data = await response.json();

    const reStructuredData = changeCityStructure(data);

    return removeDuplicateCitiesByName(reStructuredData);
}
getCitiesData("yavne")

function cityDataToName(cityData) {
    let cityName = "";
    cityName += cityData.name;
    if (cityData.state) {
        cityName += ", " + cityData.state;
    }
    if (cityData.country) {
        cityName += ", " + cityData.country;
    }
    return cityName;
}

function changeCityStructure(citiesData) {
    return citiesData.map((cityData) => {
        cityData.name = cityDataToName(cityData);
        delete cityData.state;
        delete cityData.country;
        return cityData;
    })
}
function removeDuplicateCitiesByName(citiesData) {
    return citiesData.reduce((acc, curr) => {
        const existingObj = acc.find(item => item.name === curr.name);
        if (!existingObj) {
            acc.push(curr);
        }
        return acc;
    }, []);
}