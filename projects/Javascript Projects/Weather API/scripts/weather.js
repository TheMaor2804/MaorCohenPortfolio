const API_KEY = "e085f13d76158499d4b07ebef62fcbd6";


export const getCityWeatherGeo = async (lon, lat) => {
    try {
        const weeklyCast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const dailyCast = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`);


        let dailyData = await dailyCast.json();
        let weeklyData = await weeklyCast.json();


        return [dailyData, weeklyData];
    } catch (e) {
        console.log(e);
    }
}

export const getCityUVGeo = async (coord, dt) => {
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", "openuv-1447itrlzjoryzv-io");
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const date = new Date(dt * 1000);
    const formatDT = date.toISOString();

    const lon = coord.lon;
    const lat = coord.lat;
    try {
        const dailyUV = await fetch(
            `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}&dt=${formatDT}`,
            requestOptions
        );
        let uvData = await dailyUV.json();
        return uvData;
    } catch (e) {
        console.log(e);
    }
}

export const getAllDataGeo = async (lon, lat) => {
    let weatherData = await getCityWeatherGeo(lon, lat);

    let uvData = await getCityUVGeo(
        weatherData[0].coord, weatherData[0].dt
    );

    return [...weatherData, uvData];
}

