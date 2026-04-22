function sanitizeTodo(todo) {
  if (
    !todo ||
    typeof todo.id !== "string" ||
    typeof todo.text !== "string" ||
    typeof todo.completed !== "boolean"
  ) {
    return null;
  }

  const text = todo.text.trim();

  if (!text) {
    return null;
  }

  return {
    id: todo.id,
    text,
    completed: todo.completed,
  };
}

export function loadTodos(storage, storageKey) {
  try {
    const raw = storage.getItem(storageKey);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map(sanitizeTodo).filter(Boolean);
  } catch {
    return [];
  }
}

export function saveTodos(storage, storageKey, todos) {
  storage.setItem(storageKey, JSON.stringify(todos));
}

export function addTodo(todos, text, createId) {
  const trimmedText = text.trim();

  if (!trimmedText) {
    return todos;
  }

  return [
    {
      id: createId(),
      text: trimmedText,
      completed: false,
    },
    ...todos,
  ];
}

export function toggleTodo(todos, id) {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
}

export function deleteTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}

export function getFilteredTodos(todos, filter) {
  if (filter === "active") {
    return todos.filter((todo) => !todo.completed);
  }

  if (filter === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

export function getRemainingCount(todos) {
  return todos.filter((todo) => !todo.completed).length;
}
