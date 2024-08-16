export const logout = () => {
    localStorage.setItem("loggedUser", null);

    // Redirect to loginPage.html
    window.location.href = 'loginPage.html';
}

