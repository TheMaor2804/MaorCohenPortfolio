import { Card } from "./classes/Card.js";

const menu = document.getElementById("menu");
const cardsDiv = document.getElementById("cardsDiv")

let selectedCard;
let cardsArr;
let prevInnerWidth = window.innerWidth;

window.addEventListener("resize", () => {
    if (prevInnerWidth < 800 && window.innerWidth > 800) {
        alert("Switching to desktop mode");
        switchToMenu();
        prevInnerWidth = window.innerWidth;
    }
    else if (prevInnerWidth > 800 && window.innerWidth < 800) {
        alert("Switching to mobile mode");
        switchToMenu();
        prevInnerWidth = window.innerWidth;
    }

})
export const startGame = (difficulty) => {
    cardsArr = [];
    Card.totalUniqueCards(0);

    let difficulties = [12, 20, 32];
    if (window.innerWidth < 800) {
        difficulties = [8, 12, 16]
    }

    const numberOfCards = difficulties[difficulty];

    do {
        let card = new Card();
        cardsArr.push(card);
        cardsArr.push(card.getCopy());
    }
    while (cardsArr.length < numberOfCards)
    shuffleArray(cardsArr);

    cardsDiv.style.gridTemplateColumns = `repeat(${numberOfCards / 4}, 1fr)`;
    cardsDiv.style.gridTemplateRows = `repeat(4, 1fr)`;
    menu.style.display = "none";
    cardsDiv.style.display = "grid";
    drawScreen();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const handleCardClick = (card) => {
    if (selectedCard) {
        if (card === selectedCard) {
            return;
        }
        if (!card.isFlipped) {
            card.isFlipped = true;
            drawScreen();
            if (card.isEqual(selectedCard)) {
                selectedCard.isPaired = true;
                card.isPaired = true;
                selectedCard = null;
                for (let i = 0; i < cardsArr.length; i++) {
                    if (!cardsArr[i].isPaired) {
                        setTimeout(drawScreen, 500);
                        return;
                    }
                }
                winScreen();
                return;
            } else {
                selectedCard.isFlipped = false;
                card.isFlipped = false;
                selectedCard = null;
            }
        }
    } else {
        card.isFlipped = true;
        selectedCard = card;
        drawScreen();
        return;
    }
    setTimeout(drawScreen, 500);
}

const drawScreen = () => {
    cardsDiv.innerHTML = "";
    cardsArr.forEach((card) => {
        let newCard = document.createElement("div");
        newCard.className = "card";
        if (card.isPaired) {
            newCard.className += " paired-card";
            cardsDiv.appendChild(newCard);
            return;
        }
        if (card.isFlipped) {
            newCard.style.backgroundImage = `url(images/cards/card${card.number}.jpg)`;
        } else {
            newCard.innerHTML = "";
        }
        newCard.addEventListener("click", () => {
            handleCardClick(card);
        })
        cardsDiv.appendChild(newCard);
    });
}

const winScreen = () => {
    cardsDiv.innerHTML = "";
    cardsDiv.innerHTML = "<h1>Congrats you win!</h1>"
    setTimeout(switchToMenu, 2000);
}

const switchToMenu = () => {
    cardsDiv.style.display = "none";
    menu.style.display = "block";
}