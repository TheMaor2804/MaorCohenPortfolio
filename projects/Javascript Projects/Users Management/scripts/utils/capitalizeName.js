function capitalizeName(name) {
    // Split the name into an array of words
    const words = name.split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => {
        const firstLetter = word[0].toUpperCase();
        const restOfWord = word.slice(1).toLowerCase();
        return firstLetter + restOfWord;
    });

    // Join the capitalized words back into a single string
    const capitalizedName = capitalizedWords.join(' ');

    return capitalizedName;
}
//export the function
export default capitalizeName;