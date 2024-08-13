import { startGame } from "./createGame.js";

const easyBtn = document.getElementById("easyBtn");
const mediumBtn = document.getElementById("mediumBtn");
const hardBtn = document.getElementById("hardBtn");


easyBtn.addEventListener("click", () => {
    startGame(0);
})
mediumBtn.addEventListener("click", () => {
    startGame(1);
})
hardBtn.addEventListener("click", () => {
    startGame(2);
})