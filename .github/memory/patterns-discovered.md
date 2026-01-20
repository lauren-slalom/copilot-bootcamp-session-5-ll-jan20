# Patterns Discovered

## Purpose

Document recurring code patterns, solutions, and anti-patterns discovered during development. Use this as a reference for consistent implementation approaches.

## Pattern Template

```markdown
## Pattern Name

**Context**: When and where this pattern applies

**Problem**: What problem does this pattern solve?

**Solution**: How to implement the pattern

**Example**:
```javascript
// Code example showing the pattern in action
```

**Related Files**: 
- [file.js](../packages/backend/src/file.js#L10-L20)

**Notes**: Additional considerations or variations
```

---

## Example Pattern

## Service Initialization with Empty Collections

**Context**: When initializing in-memory data structures for REST API services

**Problem**: 
- Uninitialized variables (undefined) cause runtime errors when attempting array operations
- NULL values require constant null checks throughout the codebase
- First access patterns are error-prone without proper initialization

**Solution**: 
Initialize data structures as empty collections at the top of the module:

```javascript
// ✅ GOOD: Initialize as empty array
let todos = [];
let nextId = 1;

// ❌ BAD: Uninitialized or null
let todos;  // undefined
let todos = null;  // requires null checks
```

**Benefits**:
- Immediate array operations without null checks: `todos.length`, `todos.filter()`, etc.
- Predictable behavior on first API call
- Cleaner code without defensive null checking

**Example**:

```javascript
// packages/backend/src/app.js
let todos = [];
let nextId = 1;

app.get('/api/todos', (req, res) => {
  // Works immediately, even when empty
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const todo = {
    id: nextId++,  // Safe to use immediately
    title: req.body.title,
    completed: false,
    createdAt: new Date().toISOString()
  };
  todos.push(todo);  // No null check needed
  res.status(201).json(todo);
});
```

**Related Files**: 
- [packages/backend/src/app.js](../packages/backend/src/app.js)

**Notes**: 
- This pattern applies to in-memory storage only
- For production apps, database initialization would be different
- Counter initialization ensures IDs start at 1 and increment predictably

---

## [Your Next Pattern]

**Context**: 

**Problem**: 

**Solution**: 

**Example**:
```javascript
// Your code example
```

**Related Files**: 
- 

**Notes**: 
