import { createUiButtons } from "./UiButtons.js";

export default function createEditor(id: string): string {
    const editorContainer: HTMLElement | null = document.getElementById(id);
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
    const editor: HTMLDivElement = document.createElement("div");
    return "";
}