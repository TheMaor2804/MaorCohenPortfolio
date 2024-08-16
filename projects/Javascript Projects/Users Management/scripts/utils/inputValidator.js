const emailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? [] : ["Please enter a valid email address."];
}
const nameValidation = (name) => {
    if (name.length >= 2) {
        const nameRegex = /^[a-zA-Z\s]+$/;
        return nameRegex.test(name) ? [] : ["Name can contain only English letters and spaces"];
    } else return ["Name must be longer than 1 letter"];

}
const passwordValidation = (password) => {
    if (password.length >= 8 && password.length <= 20) {
        let errorsList = [];
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)(?=\S+$).+$/;
        if (!passwordRegex.test(password)) {
            errorsList.push("Password Missing:");
            if (!/(?=.*[a-z])/g.test(password))
                errorsList.push("At least one lowercase letter");
            if (!/(?=.*[A-Z])/g.test(password))
                errorsList.push("At least one uppercase letter");
            if (!/(?=.*[!@#$%^&*])/g.test(password))
                errorsList.push("At least one special character(!@#$ %^&*)");
            if (!/(?=.*\d)/g.test(password))
                errorsList.push("At least one number");
            if (/\s/.test(password))
                errorsList.push("No spaces");
        }
        return errorsList;
    } else return ["Password must be 8-20 characters long."]
}
const confirmPasswordValidation = (password, confirmPassword) => {
    return password === confirmPassword ? [] : ["Passwords do not match!"];
}

export { emailValidation, nameValidation, passwordValidation, confirmPasswordValidation }