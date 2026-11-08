const input = document.getElementById("task");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodoNode(todo, index) {
  const li = document.createElement("li");


  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;

  textSpan.classList.toggle("completed", todo.completed);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!todo.completed;
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    textSpan.classList.toggle("completed", todo.completed);
    saveTodos();
  });

  textSpan.addEventListener("dblclick", () => {
    const newText = prompt("Edit todo", todo.text);
    if (newText === null || newText.trim() === "") {
      return;
    }
    todo.text = newText.trim();
    textSpan.textContent = todo.text;
    saveTodos();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("delete-btn");
  delBtn.addEventListener("click", () => {
    todos.splice(index, 1);
    saveTodos();
    render();
  });

  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(delBtn);

  return li;
}

function render() {
  taskList.innerHTML = "";

  todos.forEach((todo, index) => {
    const node = createTodoNode(todo, index);
    taskList.appendChild(node);
  });
}

function addTodo() {
  const text = input.value.trim();
  if (!text) {
    return;
  }

  todos.push({ text, completed: false });
  input.value = "";
  saveTodos();
  render();
}

addBtn.addEventListener("click", addTodo);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

render();