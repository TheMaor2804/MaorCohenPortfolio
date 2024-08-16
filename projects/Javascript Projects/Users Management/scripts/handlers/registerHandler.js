
import UsersManager from "../classes/usersManager.js";
import capitalizeName from "../utils/capitalizeName.js";
import { confirmPasswordValidation, emailValidation, nameValidation, passwordValidation } from "../utils/inputValidator.js";
import displayValidationErrors from "./displayValidationErrors.js";

const nameHolder = document.querySelector(".name-input-holder");
const name = document.getElementById("name");
const emailHolder = document.querySelector(".email-input-holder")
const email = document.getElementById("email");
const passwordHolder = document.querySelector(".password-input-holder")
const password = document.getElementById("password");
const confirmPasswordHolder = document.querySelector(".confirm-password-input-holder")
const confirmPassword = document.getElementById("confirmPassword");

const registerBtn = document.getElementById("registerBtn");

const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
const usersManager = new UsersManager(usersList);

localStorage.setItem("loggedUser", null);

const attemptRegister = (name, email, password) => {
    const foundUser = usersManager.findUser(email);
    if (!foundUser) {
        //change name to capitalize using capitalizeName.js function
        const capitalizedName = capitalizeName(name);
        usersManager.addUser(capitalizedName, email, password);
        window.location = "./loginPage.html";

    } else {
        displayValidationErrors(emailHolder, ["This email already exists!"])
    }
}


registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const nameErrors = nameValidation(name.value);
    const emailErrors = emailValidation(email.value);
    const passwordErrors = passwordValidation(password.value);
    const confirmPasswordErrors = confirmPasswordValidation(password.value, confirmPassword.value);
    if (
        displayValidationErrors(nameHolder, nameErrors) &&
        displayValidationErrors(emailHolder, emailErrors) &&
        displayValidationErrors(passwordHolder, passwordErrors) &&
        displayValidationErrors(confirmPasswordHolder, confirmPasswordErrors)
    ) {
        //"login inputs success")
        attemptRegister(name.value, email.value, password.value)

    }


})