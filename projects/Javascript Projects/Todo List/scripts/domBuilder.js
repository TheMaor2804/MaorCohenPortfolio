
const editTask = (descriptionCell, editButtonCell, manager, id) => {
    const input = document.createElement("input");
    input.type = "text";

    input.value = descriptionCell.textContent;

    const saveBtn = document.createElement("button");
    saveBtn.className = "table-btn";
    saveBtn.textContent = "Save";

    saveBtn.addEventListener("click", () => {
        if (input.value != "") {
            manager.modifyDescription(input.value, id);
            build(manager);
        }
    })

    descriptionCell.innerHTML = "";
    descriptionCell.appendChild(input);
    editButtonCell.innerHTML = "";
    editButtonCell.appendChild(saveBtn);
}

const deleteTask = (manager, id) => {
    manager.removeTask(id);
    build(manager);
}

const toggleTask = (manager, id) => {
    manager.toggleComplete(id);
    build(manager);
}

export const build = (manager) => {
    const list = manager.taskList
    const tableBody = document.querySelector(".table-body");
    tableBody.innerHTML = "";

    list.forEach(task => {
        const row = document.createElement('tr');
        const checkmarkCell = document.createElement('td');
        const checkmark = document.createElement("input");
        checkmark.type = "checkbox";
        checkmark.checked = task.isComplete;
        const descriptionCell = document.createElement('td');
        const creationDateCell = document.createElement('td');
        const editButtonCell = document.createElement('td');
        const deleteButtonCell = document.createElement('td');
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        checkmark.addEventListener("click", () => {
            toggleTask(manager, task.id);
        })
        if (!task.isComplete) {
            editButton.addEventListener("click", () => {
                editTask(descriptionCell, editButtonCell, manager, task.id);
            })
        }
        deleteButton.addEventListener("click", () => {
            deleteTask(manager, task.id);
        })


        row.className = task.isComplete ? "body-row-complete" : "body-row";
        checkmarkCell.className = "table-data";
        checkmark.className = "table-checkbox";
        descriptionCell.className = "table-data";
        creationDateCell.className = "table-data";
        editButtonCell.className = "table-data";
        deleteButtonCell.className = "table-data";
        editButton.className = "table-btn";
        deleteButton.className = "table-btn";



        checkmark.checked = task.isComplete;
        descriptionCell.textContent = task.description;
        creationDateCell.textContent = task.creationDate;
        editButton.textContent = "Edit";
        deleteButton.textContent = "Delete";


        checkmarkCell.appendChild(checkmark);
        row.appendChild(checkmarkCell);
        row.appendChild(descriptionCell);
        row.appendChild(creationDateCell);
        editButtonCell.appendChild(editButton);
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(editButtonCell);
        row.appendChild(deleteButtonCell);
        tableBody.appendChild(row);
    });


}