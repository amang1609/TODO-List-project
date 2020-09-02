const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-items")

todoButton.addEventListener("click", function (e) {
    //Prevent natural behaviour
    e.preventDefault();

    //create a div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("items");

    //create a li
    const todoTask = document.createElement("li");
    todoTask.classList.add("todo-item");
    todoTask.innerText = todoInput.value;
    todoInput.value = "";

    //create a check button
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.innerHTML = `<i class="fas fa-check"></i`;

    //create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("trash-btn");
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;

    //append li and buttons inside div
    todoDiv.appendChild(todoTask);
    todoDiv.appendChild(completeButton);
    todoDiv.appendChild(deleteButton);

    // append div inside ul
    todoList.appendChild(todoDiv);
});

todoList.addEventListener("click", function(e) {
    const item = e.target;

    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        console.log(todo);
    }

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("delete");
        console.log(todo);

        todo.addEventListener('transitionend', e => {
            todo.remove();
        });
    }
});

