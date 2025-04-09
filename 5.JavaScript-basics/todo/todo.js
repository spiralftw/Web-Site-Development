let textInput = document.getElementById("type-input");
let todoList = document.getElementById("todo");
let form = document.getElementById("form");

function addListItem(text) {
  let listItem = document.createElement("li");
  listItem.textContent = text;
  todoList.appendChild(listItem);
}

function submitHandler(e) {
  e.preventDefault();
  let text = textInput.value.trim();
  if (text) {
    addListItem(text);
    textInput.value = "";
  }
}

function listClickHandler(e) {
  if (e.target.tagName === "LI") {
    if (e.target.classList.contains("done")) {
      e.target.remove();
    } else {
      e.target.classList.add("done");
    }
  }
}

form.addEventListener("submit", submitHandler);
todoList.addEventListener("click", listClickHandler);
