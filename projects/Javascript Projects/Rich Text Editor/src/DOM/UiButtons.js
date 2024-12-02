export function createUiButtons(id) {
    const editorContainer = document.getElementById(id);
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "buttons-container";
    const boldButton = document.createElement("button");
    boldButton.innerText = "B";
    buttonsContainer.appendChild(boldButton);
    const italicButton = document.createElement("button");
    italicButton.innerText = "I";
    buttonsContainer.appendChild(italicButton);
    editorContainer === null || editorContainer === void 0 ? void 0 : editorContainer.appendChild(buttonsContainer);
}
