const getCountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data;
};

const countriesFull = await getCountries();
let countries = [...countriesFull];

const regionList = ["Africa", "Asia", "Europe", "Americas", "Oceania", "Antarctic"];

const search = (text) => {
    countries = countriesFull.filter((country) => {
        let name = country.name.common.toLowerCase()
        return name.includes(text.toLowerCase());
    })
}

const searchFilterPopulation = (number) => {
    countries = countries.filter((country) => country.population <= number);
}

const searchFilterRegion = (regions) => {
    const arr = [];
    regions.forEach(region => { arr.push(region.firstElementChild.checked) });
    countries = countries.filter((country) => {
        let bool;
        regionList.forEach((region, i) => {
            if (arr[i] && country.region === region) {
                bool = true;
            }
        })
        return bool;
    })
}

const reset = () => {
    countries = [...countriesFull];
}

export { getCountries, countries, search, reset, searchFilterPopulation, searchFilterRegion };