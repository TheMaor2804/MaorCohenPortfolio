import Task from "./task.js";

export default class TaskManager {
    #taskList;

    get taskList() {
        return this.#taskList;
    }

    constructor(taskList = []) {
        taskList.forEach((task) => task = new Task(task.description, task.id, task.creationDate, task.isComplete));
        this.#taskList = taskList;
    }

    resetList() {
        this.#taskList = [];
        this.saveTaskList();
    }

    addTask(description) {
        const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
        this.#taskList.push(new Task(description, uniqueId));
        this.saveTaskList();
    }

    removeTask(id) {
        this.#taskList = this.#taskList.filter((task) => task.id != id);
        this.saveTaskList();
    }

    removeCompleted() {
        this.#taskList = this.#taskList.filter((task) => !task.isComplete);
        this.saveTaskList();
    }

    modifyDescription(description, id) {
        this.#taskList.map((task) => {
            if (task.id === id) {
                task.description = description;
            }
        })
        this.saveTaskList();
    }

    toggleComplete(id) {
        this.#taskList.map((task) => {
            if (task.id === id) {
                task.isComplete = !task.isComplete;
            }
        })
        this.saveTaskList();
    }

    saveTaskList() {
        const saveList = [];
        this.taskList.forEach((task) => {
            saveList.push({
                description: task.description,
                id: task.id,
                creationDate: task.creationDate,
                isComplete: task.isComplete
            });
        });

        localStorage.setItem("savedTasks", JSON.stringify(saveList));
    }
}