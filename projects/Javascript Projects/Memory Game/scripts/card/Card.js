export class Card {
    #number;
    #isFlipped;
    #isPaired;
    static #totalUniqueCards = 0;

    static set totalUniqueCards(number) {
        Card.#totalUniqueCards = number;
    }


    get number() {
        return this.#number;
    }
    get isFlipped() {
        return this.#isFlipped;
    }
    set isFlipped(bool) {
        this.#isFlipped = bool;
    }
    get isPaired() {
        return this.#isPaired;
    }
    set isPaired(bool) {
        this.#isPaired = bool;
    }

    constructor() {
        Card.#totalUniqueCards++;
        this.#number = Card.#totalUniqueCards;
        this.#isFlipped = false;
        this.#isPaired = false;
    }

    isEqual(card) {
        return this.number === card.number && card != this;
    }

    getCopy() {
        Card.#totalUniqueCards--;
        return new Card();
    }

}