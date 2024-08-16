import UsersManager from "../classes/usersManager.js";
import { logout } from "./logoutHandler.js";

if (!JSON.parse(localStorage.getItem('loggedUser'))) {
    window.location.href = './loginPage.html';
} else {

    if (JSON.parse(localStorage.getItem('loggedUser')).isAdmin === false) {
        window.location.href = './index.html';
    }

    const logoutButton = document.querySelector('.logout-button');
    const homepageButton = document.querySelector('.homepage-button');

    logoutButton.addEventListener('click', logout);

    homepageButton.addEventListener('click', () => {
        window.location.href = './index.html';
    });

    const storedList = JSON.parse(localStorage.getItem('usersList')) || [];

    const userManager = new UsersManager(storedList);

    // Retrieve user list from the usersManager object
    const userList = userManager.usersList;

    // Display users in the table
    const userTableBody = document.getElementById('userTableBody');
    userList.forEach(user => {

        if (user.email === JSON.parse(localStorage.getItem('loggedUser')).email) {
            return;
        }

        const deleteButtonCell = document.createElement('td');
        const deleteButton = document.createElement('button');

        deleteButton.addEventListener('click', () => {
            userManager.removeUser(user.email);
            location.reload();
        });
        deleteButtonCell.appendChild(deleteButton);



        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const roleCell = document.createElement('td');

        row.classList.add('body-row');
        nameCell.classList.add('user-data');
        emailCell.classList.add('user-data');
        roleCell.classList.add('user-data');
        deleteButtonCell.classList.add('user-data');
        deleteButton.classList.add('delete-button');


        nameCell.textContent = user.name;
        emailCell.textContent = user.email;
        roleCell.textContent = user.isAdmin ? 'Admin' : 'User';
        deleteButton.textContent = 'Delete';

        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(roleCell);
        row.appendChild(deleteButtonCell);

        userTableBody.appendChild(row);
    });
}