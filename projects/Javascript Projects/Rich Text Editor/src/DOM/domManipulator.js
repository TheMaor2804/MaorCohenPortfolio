import { createUiButtons } from "./UiButtons.js";
export default function createEditor(id) {
    const editorContainer = document.getElementById(id);
    // Check if editorContainer exists
    if (!editorContainer) {
        return "Editor container not found";
    }
    // Check if editorContainer is div element
    if (editorContainer.tagName !== "DIV") {
        return "Editor container must be a div element";
    }
    //Create UI buttons
    createUiButtons(id);
    // Create editor element
    const editor = document.createElement("div");
    return "";
}
