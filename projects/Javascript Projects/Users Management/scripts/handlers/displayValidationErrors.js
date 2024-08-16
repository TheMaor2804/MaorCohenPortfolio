export default (displayField, errorList) => {
    const input = displayField.firstElementChild;
    displayField.innerHTML = "";

    displayField.appendChild(input);
    if (errorList.length > 0) {
        errorList.forEach(error => {
            const e = document.createElement("p");
            e.className = "error-message";
            e.textContent = error;
            displayField.appendChild(e);
        });
        input.focus();
        return false;
    }
    return true;
}