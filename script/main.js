//dropdown menu
const hamburger = document.querySelector('#hamburger');
const dropdown = document.querySelector('#navDropdown');
const navAnchors = document.getElementById('navDropdown').querySelector('ul');

let isMenuActive = false;


function toggleDropdown() {
    if (!isMenuActive) {
        dropdown.style.display = "flex";
        isMenuActive = !isMenuActive;
    } else {
        dropdown.style.display = "none";
        isMenuActive = !isMenuActive;
    }
}

if (navAnchors) {
    navAnchors.querySelectorAll('li a').forEach(a => {
        a.addEventListener('click', toggleDropdown)
    });
}

if (hamburger) { hamburger.addEventListener('click', toggleDropdown); }
//end

//cv download button
document.getElementById('cvDownload').addEventListener('click', (event) => {
    event.preventDefault();
    let downloadLink = event.target.getAttribute('href');
    if (!downloadLink || downloadLink === '#') {
        alert('No Download Available Yet!');
    } else {
        console.log(downloadLink);

        window.location.href = downloadLink;
    }
});
//end
