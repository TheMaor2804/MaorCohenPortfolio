function setLikeStatus(countryName) {
    let likeData = JSON.parse(localStorage.getItem('likeStatus')) || {};
    likeData[countryName] = likeData[countryName] ? false : true;
    localStorage.setItem("likeStatus", JSON.stringify(likeData));
}

function getLikeStatus(countryName) {
    let likeData = JSON.parse(localStorage.getItem('likeStatus')) || {};
    return Boolean(likeData[countryName]);
}

export { setLikeStatus, getLikeStatus };