import UsersManager from "../classes/usersManager.js";

const addAdminUser = (name, email, password) => {
    // Get usersList from local storage
    const usersList = JSON.parse(localStorage.getItem('usersList')) || [];

    // Create a new usersManager object and pass the usersList as an argument
    const userManager = new UsersManager(usersList);

    // Add a new user with isAdmin set to true
    userManager.addUser(name, email, password, true);


}
export default addAdminUser;    
