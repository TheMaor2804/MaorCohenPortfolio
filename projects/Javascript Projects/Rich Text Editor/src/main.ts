import createEditor from "./DOM/domManipulator.js";

let error: string = createEditor("editor");

if (error !== "") {
    console.log(error);
} else {
    console.log("Editor created successfully");
}
