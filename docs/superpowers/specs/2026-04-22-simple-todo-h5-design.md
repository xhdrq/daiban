# Simple Todo H5 Design

## Goal
Build a minimal H5 todo page that can be opened directly in a browser and deployed to GitHub Pages with no backend.

## Scope
- Single-page todo app
- Clean, minimal visual style
- Mobile-friendly layout
- Persist data in `localStorage`
- Deploy as a static site on GitHub Pages

## User Experience
The page shows a centered card with a title, a short description, an input for new tasks, a button to add the task, filter tabs, the todo list, and a remaining task counter.

Users can:
- Add a todo item
- Mark a todo item as completed or active
- Delete a todo item
- Filter by all, active, and completed
- Refresh the page without losing data

## Architecture
This project will use plain `HTML`, `CSS`, and `JavaScript` with no framework and no build step. The site will be composed of a small set of static files:

- `index.html` for structure
- `styles.css` for layout and visual styling
- `script.js` for state management, rendering, filtering, and `localStorage`
- `README.md` for local usage and GitHub Pages deployment instructions

## Data Model
Each todo item will be stored in memory and in `localStorage` with this shape:

```js
{
  id: "unique-id",
  text: "Buy milk",
  completed: false
}
```

## State and Data Flow
On page load, the app reads todos from `localStorage`, falls back to an empty list if there is no saved data, and renders the list.

When the user adds, toggles, deletes, or filters items:
- update the in-memory list
- save the list to `localStorage`
- re-render the visible list and remaining counter

The selected filter state can stay in memory only because it does not need to survive a page refresh.

## Error Handling
- Ignore empty or whitespace-only input when adding a task
- Guard against invalid `localStorage` content by falling back to an empty list
- Keep interactions client-side only, with no network dependency

## Testing and Verification
Verification will be lightweight and appropriate for a static H5 project:
- Open the page locally in a browser
- Add multiple items
- Toggle completion state
- Delete an item
- Switch between filters
- Refresh the page and confirm data persists
- Confirm the layout is usable on narrow mobile-sized screens

## Non-Goals
- User accounts
- Cloud sync
- Drag-and-drop sorting
- Editing existing todo text
- Backend services
