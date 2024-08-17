import { countries, search, reset, searchFilterPopulation, searchFilterRegion } from "./countries.js";
import { getLikeStatus, setLikeStatus } from "./storage.js";
import { initSlider, resetSlider } from "./slider.js";

const slider = document.querySelector('.slider');
const sliderHandle = document.querySelector('.slider-handle');
const sliderValue = document.getElementById('slider-value');

initSlider(slider, sliderHandle, sliderValue);

const searchInput = document.querySelector("#searchBar");

const filterBtn = document.getElementById("filterBtn");
const filter = document.querySelector(".filter");

const populationFilter = document.querySelector("#population");
const currenciesFilter = document.querySelector("#currencies");
const regionFilter = document.querySelector("#region");
const languagesFilter = document.querySelector("#languages");
const capitalFilter = document.querySelector("#capital");

const regionsOptions = document.querySelector(".regions-options");
const regions = document.querySelectorAll(".region-item");

const applyBtn = document.querySelector("#applyBtn");

const cardsDiv = document.getElementById("cards");

let isDesktop = window.innerWidth > 770;


window.addEventListener('resize', () => {
    let tempIsDesktop = window.innerWidth > 770;
    if (tempIsDesktop !== isDesktop) {
        toggleFilter(tempIsDesktop);
    }

})


filterBtn.addEventListener('click', () => {
    if (isDesktop && window.getComputedStyle(filter).display === "none") {
        filter.style.display = "flex";
        cardsDiv.style.marginTop = "50px";
    } else {
        filter.style.display = "none"
        cardsDiv.style.marginTop = "20px";
    }
})

document.querySelectorAll("input").forEach((input) => {
    if (input.type === "checkbox") {
        input.checked = true;
    }
    if (input.type === "text") {
        input.value = '';
    }
})


populationFilter.addEventListener("change", (e) => {
    if (e.target.checked) {
        slider.style.display = "block";
    } else {
        slider.style.display = "none";
    }
});

regionFilter.addEventListener("change", (e) => {
    if (e.target.checked) {
        regionsOptions.style.display = "block";
    } else {
        regionsOptions.style.display = "none";
        regions.forEach(region => {
            region.firstElementChild.checked = true;
        });
    }
})


searchInput.addEventListener("input", (event) => {
    displayCards(event.target);
});

applyBtn.addEventListener("click", () => {
    if (!populationFilter.checked) {
        resetSlider(slider, sliderHandle, sliderValue);
    }
    displayCards(searchInput);
})

const displayCards = (input) => {
    reset();
    cardsDiv.innerHTML = "";
    search(input.value.trim())
    createCardList();
}

const toggleFilter = (bool) => {
    console.log(bool);

    isDesktop = bool;
    if (!isDesktop) {
        filter.style.display = "none";
        filterBtn.style.display = "none";
        resetSlider(slider, sliderHandle, sliderValue);
        document.querySelectorAll("input").forEach((input) => {
            if (input.type === "checkbox") {
                input.checked = true;
            }
        })
        displayCards(searchInput);
    } else {
        filterBtn.style.display = "block";
    }
}


export const createCard = (country) => {

    const card = document.createElement("div");
    card.className = "card";

    const cardImg = document.createElement("img");
    cardImg.className = "card-img-top";
    cardImg.src = country.flags.png;
    card.appendChild(cardImg);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = country.name.common;
    cardBody.appendChild(cardTitle);

    if (populationFilter.checked) {
        const population = document.createElement("p");
        population.className = "card-text";
        if (country.population) {
            population.textContent = `Population: ${country.population.toLocaleString()}`;
        }
        else {
            population.textContent = "Population: No Population";
        }
        cardBody.appendChild(population);
    }

    if (currenciesFilter.checked) {
        const currencies = document.createElement("p");
        currencies.className = "card-text";
        if (country.currencies) {
            const theCurrenciesArray = Object.keys(country.currencies).join(", ");
            currencies.textContent = `Currencies: ${theCurrenciesArray}`
        } else {
            currencies.textContent = "Currencies: No Currencies";
        }
        cardBody.appendChild(currencies);
    }
    if (regionFilter.checked) {
        const region = document.createElement("p");
        region.className = "card-text";
        if (country.region) {
            region.textContent = `Region: ${country.region}`
        }
        else {
            region.textContent = "Region: No Region"
        }

        cardBody.appendChild(region);
    }
    if (languagesFilter.checked) {
        const languages = document.createElement("p");
        languages.className = "card-text";
        if (country.languages) {
            const theLanguagesArray = Object.values(country.languages).join(", ");
            languages.textContent = `Languages: ${theLanguagesArray}`
        } else {
            languages.textContent = "Languages: No Languages";
        }

        cardBody.appendChild(languages);
    }
    if (capitalFilter.checked) {
        const capital = document.createElement("p");
        capital.className = "card-text";
        if (country.capital) {
            capital.textContent = `Capital: ${country.capital[0]}`
        } else {
            capital.textContent = "Capital: No Capital";
        }
        cardBody.appendChild(capital);
    }


    const cardFooter = document.createElement("div");
    cardFooter.className = "card-footer";


    const heartContainer = document.createElement("div");
    heartContainer.className = "heart-container";
    const heart = document.createElement("span");
    heart.textContent = "favorite";
    const baseClass = "material-symbols-outlined unselectable "
    let status = getLikeStatus(country.name.common);
    heart.className = baseClass + (status ? " red-heart" : " black-heart");
    if (status) {
        heart.style.fontVariationSettings = `"FILL" 1`;
    } else {
        heart.style.fontVariationSettings = `"FILL" 0`;
    }
    heart.addEventListener('click', () => {
        setLikeStatus(country.name.common);
        if (heart.className.includes("red-heart")) {
            heart.className = baseClass + "black-heart";
            heart.style.fontVariationSettings = `"FILL" 0`;
        } else {
            heart.className = baseClass + "red-heart";
            heart.style.fontVariationSettings = `"FILL" 1`;
        }
    });
    heartContainer.appendChild(heart);




    cardFooter.appendChild(heartContainer);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    cardsDiv.appendChild(card);
};

export const createCardList = () => {
    searchFilterPopulation(sliderValue.textContent.replace(/,/g, ""));
    searchFilterRegion(regions);
    for (const country of countries) {
        createCard(country);
    }
}

toggleFilter(isDesktop);
