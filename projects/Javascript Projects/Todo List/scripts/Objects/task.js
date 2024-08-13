export default class Task {
    #description;
    #id;
    #creationDate;
    #isComplete;

    get description() {
        return this.#description;
    }
    set description(newDescription) {
        this.#description = newDescription;
    }
    get id() {
        return this.#id;
    }
    get creationDate() {
        return this.#creationDate;
    }
    get isComplete() {
        return this.#isComplete;
    }
    set isComplete(bool) {
        this.#isComplete = bool;
    }
    constructor(description, id, creationDate = new Date().toLocaleDateString(), isComplete = false) {
        this.description = description;
        this.#id = id;
        this.#creationDate = creationDate;
        this.isComplete = isComplete;
    }
    getData() {
        return { ...this };
    }
}