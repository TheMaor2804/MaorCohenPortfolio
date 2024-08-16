export default class User {
    #name;
    #email;
    #password;
    #isAdmin;

    get name() {
        return this.#name;
    }
    set name(newName) {
        this.#name = newName;
    }
    get email() {
        return this.#email;
    }
    set email(newEmail) {
        this.#email = newEmail;
    }
    get password() {
        return this.#password;
    }
    set password(newPassword) {
        this.#password = newPassword;
    }
    get isAdmin() {
        return this.#isAdmin
    }
    set isAdmin(bool) {
        this.#isAdmin = bool;
    }

    constructor(name, email, password, isAdmin = false) {
        this.#name = name;
        this.#email = email;
        this.#password = password;
        this.#isAdmin = isAdmin;
    }
}