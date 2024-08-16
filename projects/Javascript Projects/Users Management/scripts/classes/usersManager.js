import User from "./user.js";

export default class UsersManager {
    #usersList;
    get usersList() {
        return [...this.#usersList];
    }

    constructor(usersList = []) {
        usersList.forEach(user => {
            user = new User(user.name, user.email, user.password, user.isAdmin);
        })
        this.#usersList = usersList;
    }
    findUser(email) {
        for (let i = 0; i < this.#usersList.length; i++) {
            if (this.usersList[i].email === email) {
                return this.usersList[i];
            }
        }
        return null;
    }

    addUser(name, email, password, isAdmin = false) {
        this.#usersList.push(new User(name, email, password, isAdmin));
        this.saveUsersList();
    }

    removeUser(email) {
        const newList = this.#usersList.filter(user => user.email != email);
        this.#usersList = [...newList];
        this.saveUsersList();
    }
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let emailExist = false;
        if (emailRegex.test(email)) {
            this.#usersList.forEach(user => emailExist = user.email === password)
        }
        return emailRegex.test(email) && !emailExist;
    }

    saveUsersList() {
        const saveList = [];
        this.#usersList.forEach(user => {
            saveList.push({
                name: user.name,
                email: user.email,
                password: user.password,
                isAdmin: user.isAdmin,
            })
        })
        localStorage.setItem("usersList", JSON.stringify(saveList));
    }
    saveLoggedUser(user) {
        const userData = {
            name: user.name,
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin,
        }
        localStorage.setItem("loggedUser", JSON.stringify(userData));
    }
}