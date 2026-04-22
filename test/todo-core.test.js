import test from "node:test";
import assert from "node:assert/strict";

import {
  addTodo,
  deleteTodo,
  getFilteredTodos,
  getRemainingCount,
  loadTodos,
  toggleTodo,
} from "../todo-core.js";

test("addTodo trims text and prepends a new active item", () => {
  const todos = [{ id: "1", text: "Existing", completed: false }];

  const nextTodos = addTodo(todos, "  Buy milk  ", () => "2");

  assert.deepEqual(nextTodos, [
    { id: "2", text: "Buy milk", completed: false },
    { id: "1", text: "Existing", completed: false },
  ]);
});

test("addTodo ignores empty input", () => {
  const todos = [{ id: "1", text: "Existing", completed: false }];

  const nextTodos = addTodo(todos, "   ", () => "2");

  assert.equal(nextTodos, todos);
});

test("toggleTodo flips completion state for the matching item", () => {
  const todos = [
    { id: "1", text: "A", completed: false },
    { id: "2", text: "B", completed: true },
  ];

  const nextTodos = toggleTodo(todos, "1");

  assert.deepEqual(nextTodos, [
    { id: "1", text: "A", completed: true },
    { id: "2", text: "B", completed: true },
  ]);
});

test("deleteTodo removes only the matching item", () => {
  const todos = [
    { id: "1", text: "A", completed: false },
    { id: "2", text: "B", completed: true },
  ];

  const nextTodos = deleteTodo(todos, "1");

  assert.deepEqual(nextTodos, [{ id: "2", text: "B", completed: true }]);
});

test("getFilteredTodos returns active and completed subsets", () => {
  const todos = [
    { id: "1", text: "A", completed: false },
    { id: "2", text: "B", completed: true },
  ];

  assert.deepEqual(getFilteredTodos(todos, "active"), [
    { id: "1", text: "A", completed: false },
  ]);
  assert.deepEqual(getFilteredTodos(todos, "completed"), [
    { id: "2", text: "B", completed: true },
  ]);
});

test("getRemainingCount counts unfinished items", () => {
  const todos = [
    { id: "1", text: "A", completed: false },
    { id: "2", text: "B", completed: true },
    { id: "3", text: "C", completed: false },
  ];

  assert.equal(getRemainingCount(todos), 2);
});

test("loadTodos falls back to an empty list for invalid data", () => {
  const storage = {
    getItem() {
      return "not-json";
    },
  };

  assert.deepEqual(loadTodos(storage, "todos"), []);
});

test("loadTodos returns sanitized todos from storage", () => {
  const storage = {
    getItem() {
      return JSON.stringify([
        { id: "1", text: "Keep", completed: false },
        { id: 2, text: "Drop", completed: false },
      ]);
    },
  };

  assert.deepEqual(loadTodos(storage, "todos"), [
    { id: "1", text: "Keep", completed: false },
  ]);
});
