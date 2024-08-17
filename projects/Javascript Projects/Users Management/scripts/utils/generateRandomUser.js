export default function generateRandomUser() {
    const name = generateRandomName();
    const email = generateRandomEmail();
    const password = generateRandomPassword();
    return { name, email, password };
}


function generateRandomName() {
    const names = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Daniel', 'Olivia', 'Matthew', 'Sophia'];
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomName = names[randomIndex];
    return randomName;
}

function generateRandomEmail() {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const randomIndex = Math.floor(Math.random() * domains.length);
    const randomDomain = domains[randomIndex];
    const randomName = generateRandomName().toLowerCase();
    const randomEmail = `${randomName}@${randomDomain}`;
    return randomEmail;
}

function generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomPassword = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomPassword += characters[randomIndex];
    }
    return randomPassword;
}