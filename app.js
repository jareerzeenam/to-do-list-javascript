// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
// filter
const filterOption = document.querySelector(".filter-todo");

//! Event Listners
document.addEventListener("DOMContentLoaded", getTodos);

todoButton.addEventListener("click", addTodo);
// Delete on click
todoList.addEventListener("click", deleteCheck);
// Filter
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
  // * stop the browser from refreshing the page on click
  event.preventDefault();
  //   console.log("Hello");

  // ! Create Todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // ! Create Todo li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  //  ! Append child
  todoDiv.appendChild(newTodo);

  // ! Add/Save Todo Local Storage
  saveLocalTodos(todoInput.value);

  //   ! CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  completedButton.classList.add("complete-btn");
  //  ! Append child
  todoDiv.appendChild(completedButton);

  //   ! CHECK TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  //  ! Append child
  todoDiv.appendChild(trashButton);

  // console.log("added");

  //   ! ******** APPEND TO THE MAIN LIST *******************
  todoList.appendChild(todoDiv);

  //   ! CLEAR TEXTBOX AFTER CLICKING ADD
  todoInput.value = "";
}

function deleteCheck(e) {
  //   console.log(e.target);
  const item = e.target;
  //   DELETE TODO
  if (item.classList[0] === "trash-btn") {
    // console.log("you clisked trash");
    // item.remove();
    const todo = item.parentElement;
    // todo.remove();
    // ! Add fall annimation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    // ! Add delay to the transition and then delete it
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //   ! CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// ! ******************** Filter **********************
function filterTodo(e) {
  const todos = todoList.childNodes;
  // console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// !!!!!!!!!!!!!!!!!!!!!!!!! Save To Local Storage  !!!!!!!!!!!!!!!!
function saveLocalTodos(todo) {
  // CHECK if i already have things in there
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ! GET TODOS
function getTodos() {
  // console.log("Hello");
  // CHECK if i already have things in there
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // ! Create Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // ! Create Todo li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    //  ! Append child
    todoDiv.appendChild(newTodo);

    //   ! CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    //  ! Append child
    todoDiv.appendChild(completedButton);

    //   ! CHECK TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    //  ! Append child
    todoDiv.appendChild(trashButton);

    // console.log("added");

    //   ! ******** APPEND TO THE MAIN LIST *******************
    todoList.appendChild(todoDiv);
  });
}

//  !!!!!!!!!!!!!!!!!!!!! REMOVE LOCAL TODOS !!!!!!!!!!!!!!!!!!!!!!!
function removeLocalTodos(todo) {
  // CHECK if i already have things in there
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;

  todos.splice(todos.indexOf(todoIndex), 1);

  localStorage.setItem("todos", JSON.stringify(todos));

  // get this index of the list yoi=u ned to delete
  // const todoIndex = todo
}

// ! Example Important

// const todos = ["Apple", "Orange", "Grape", "Straw Berry", "Ice Cream"];

// // console.log(todos.indexOf("Straw Berry"));

// const grapeIndex = todos.indexOf("Grape");

// todos.splice(grapeIndex, 1);

// console.log(todos);
