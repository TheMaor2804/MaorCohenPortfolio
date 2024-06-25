//dropdown menu
const hamburger = document.querySelector('#hamburger');
const dropdown = document.querySelector('#navDropdown');
isMenuActive = false;

hamburger.addEventListener('click', () => {
    if (!isMenuActive) {
        dropdown.style.display = "flex";
        isMenuActive = !isMenuActive;
    } else {
        dropdown.style.display = "none";
        isMenuActive = !isMenuActive;
    }
});
//end