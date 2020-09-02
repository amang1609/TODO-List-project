const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-items");
const filterTodo = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getTodos);


todoButton.addEventListener("click", function (e) {
    //Prevent natural behaviour
    e.preventDefault();

    //create a div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("items");

    //create a li
    const todoTask = document.createElement("li");
    todoTask.innerText = todoInput.value;

    //Save to local - do this last
    //Save to local
    saveLocalTodos(todoInput.value);
    todoTask.classList.add("todo-item");
    todoDiv.appendChild(todoTask);
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
   
    todoDiv.appendChild(completeButton);
    todoDiv.appendChild(deleteButton);

    // append div inside ul
    todoList.appendChild(todoDiv);
});

todoList.addEventListener("click", function (e) {
    const item = e.target;

    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("delete");

        removeLocalTodos(todo);
        todo.addEventListener('transitionend', e => {
            todo.remove();
        });
    }
});


filterTodo.addEventListener("click", function (e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;

            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
});


function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        //Create todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("items");
        //Create list
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        todoInput.value = "";
        //Create Completed Button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Create trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //attach final Todo
        todoList.appendChild(todoDiv);
    });
}