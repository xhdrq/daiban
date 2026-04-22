import {
  addTodo,
  deleteTodo,
  getFilteredTodos,
  getRemainingCount,
  loadTodos,
  saveTodos,
  toggleTodo,
} from "./todo-core.js";

const STORAGE_KEY = "easyweb-todos";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const status = document.querySelector("#todo-status");
const emptyState = document.querySelector("#empty-state");
const filterButtons = document.querySelectorAll("[data-filter]");

let todos = loadTodos(window.localStorage, STORAGE_KEY);
let currentFilter = "all";

function createId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function render() {
  const visibleTodos = getFilteredTodos(todos, currentFilter);

  list.innerHTML = "";

  visibleTodos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = `todo-item${todo.completed ? " is-completed" : ""}`;

    const toggle = document.createElement("input");
    toggle.className = "todo-toggle";
    toggle.type = "checkbox";
    toggle.checked = todo.completed;
    toggle.setAttribute("aria-label", `标记 ${todo.text} 为已完成`);
    toggle.addEventListener("change", () => {
      todos = toggleTodo(todos, todo.id);
      persistAndRender();
    });

    const text = document.createElement("p");
    text.className = "todo-text";
    text.textContent = todo.text;

    const remove = document.createElement("button");
    remove.className = "delete-button";
    remove.type = "button";
    remove.textContent = "删除";
    remove.setAttribute("aria-label", `删除 ${todo.text}`);
    remove.addEventListener("click", () => {
      todos = deleteTodo(todos, todo.id);
      persistAndRender();
    });

    item.append(toggle, text, remove);
    list.append(item);
  });

  const remaining = getRemainingCount(todos);
  status.textContent = `${remaining} 项待完成`;
  emptyState.hidden = visibleTodos.length > 0;

  filterButtons.forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.filter === currentFilter
    );
  });
}

function persistAndRender() {
  saveTodos(window.localStorage, STORAGE_KEY, todos);
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nextTodos = addTodo(todos, input.value, createId);

  if (nextTodos === todos) {
    return;
  }

  todos = nextTodos;
  input.value = "";
  persistAndRender();
  input.focus();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter ?? "all";
    render();
  });
});

render();
