import UsersManager from "../classes/usersManager.js";
import addAdminUser from "../utils/createAdminUser.js";
import displayValidationErrors from "./displayValidationErrors.js";

const emailHolder = document.querySelector(".email-input-holder")
const email = document.getElementById("email");
const passwordHolder = document.querySelector(".password-input-holder")
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
const usersManager = new UsersManager(usersList);

if (usersManager.findUser("admin") === null) {
    addAdminUser("Admin", "admin", "admin");
}

localStorage.setItem("loggedUser", null);

const attemptLogin = (email, password) => {
    const foundUser = usersManager.findUser(email);

    if (foundUser) {
        if (foundUser.password === password) {
            //login success update user
            usersManager.saveLoggedUser(foundUser);
            if (foundUser.isAdmin) {
                window.location = "./admin.html";
            } else {
                window.location = "./index.html";
            }
        } else {
            //incorrect password
            displayValidationErrors(passwordHolder, ["Incorrect Password"])
        }
    } else {
        //email does not exist
        displayValidationErrors(emailHolder, ["Email does not exist"]);
    }
}


loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const emailValid = email.value !== "";
    const passwordValid = password.value !== "";

    displayValidationErrors(emailHolder,
        emailValid ? [] : ["Please Enter Email"])
    displayValidationErrors(passwordHolder,
        passwordValid ? [] : ["Please Enter Password"])
    if (emailValid && passwordValid) {
        attemptLogin(email.value, password.value);
    }


})

