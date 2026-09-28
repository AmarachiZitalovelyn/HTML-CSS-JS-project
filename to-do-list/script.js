const taskInput = document.getElementById("task-input");
const form = document.querySelector(".todo-input");
const taskList = document.getElementById("task-list");

let tasks =[];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function(task, index) {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";

        taskContent.appendChild(checkbox);
        taskContent.appendChild(span);

        li.appendChild(taskContent);
        li.appendChild(deleteButton);

        taskList.appendChild(li);

        checkbox.addEventListener("change", function() {
            task.completed = checkbox.checked;
            renderTasks();
        });

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            renderTasks();
        });
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    taskInput.value = "";

    renderTasks();

    taskInput.focus();
});
  
