export function createUiButtons(id: string): void {
    const editorContainer: HTMLElement | null = document.getElementById(id);
    const buttonsContainer: HTMLDivElement = document.createElement("div");
    buttonsContainer.className = "buttons-container";
    const boldButton: HTMLButtonElement = document.createElement("button");
    boldButton.innerText = "B";
    buttonsContainer.appendChild(boldButton);
    const italicButton: HTMLButtonElement = document.createElement("button");
    italicButton.innerText = "I";
    buttonsContainer.appendChild(italicButton);
    editorContainer?.appendChild(buttonsContainer);
}