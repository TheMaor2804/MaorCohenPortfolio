import { logout } from "./handlers/logoutHandler.js";

// Check if loggedUser in localStorage is null
if (JSON.parse(localStorage.getItem('loggedUser')) === null) {
    // Redirect to login page
    window.location.href = './loginPage.html';
} else {

    // Get the logout button
    const logoutBtn = document.getElementById('logoutBtn');

    // Add click event to logout button
    logoutBtn.addEventListener('click', logout);

    // Get the logged user from localStorage
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    if (loggedUser.isAdmin) {
        // Get the .wrapper div
        const wrapperDiv = document.querySelector('.wrapper');

        // Create the admin dashboard button
        const adminButton = document.createElement('button');
        adminButton.textContent = 'Admin Dashboard';
        adminButton.classList.add('admin-button');

        // Add click event to the admin button
        adminButton.addEventListener('click', () => {
            // Redirect to admin.html
            window.location.href = './admin.html';
        });

        // Append the button to the .wrapper div
        wrapperDiv.insertBefore(adminButton, wrapperDiv.firstChild);

    }


    // Get the elements to display the user information
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    name.textContent = loggedUser.name;
    email.textContent = loggedUser.email;
    password.textContent = loggedUser.password;
}