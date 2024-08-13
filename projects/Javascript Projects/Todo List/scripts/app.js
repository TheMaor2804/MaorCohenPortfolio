import { build } from "./domBuilder.js";
import TaskManager from "./Objects/taskManager.js";

const input = document.querySelector(".text-input");
input.value = "";
const addBtn = document.querySelector(".add-button");

const storageTasks = JSON.parse(localStorage.getItem("savedTasks")) || [];

const myManager = new TaskManager(storageTasks);

addBtn.addEventListener("click", () => {
    if (input.value != "") {
        myManager.addTask(input.value);
        build(myManager);
        input.value = "";
    }
})



build(myManager);




















