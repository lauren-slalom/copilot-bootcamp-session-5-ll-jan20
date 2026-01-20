---
description: "Global instructions for the TODO application workspace"
---

# TODO Application - Copilot Instructions

## Project Context

This is a full-stack TODO application with:
- **Frontend**: React application for task management UI
- **Backend**: Express.js REST API for TODO operations
- **Development Approach**: Iterative, feedback-driven development
- **Current Phase**: Backend stabilization and frontend feature completion

## Documentation References

Consult these documents to understand the project:
- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and project structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

## Development Principles

Follow these core principles when working on this project:

1. **Test-Driven Development**: Use the Red-Green-Refactor cycle
   - Write tests FIRST
   - Watch them fail (Red)
   - Implement minimal code to pass (Green)
   - Refactor for quality (Refactor)

2. **Incremental Changes**: Make small, testable modifications
   - One feature or fix at a time
   - Verify each change before moving forward

3. **Systematic Debugging**: Use test failures as guides
   - Read test output carefully
   - Form hypotheses based on evidence
   - Test one change at a time

4. **Validation Before Commit**: Ensure quality gates pass
   - All tests must pass
   - No lint errors
   - Code follows project conventions

## Testing Scope

This project uses **unit tests and integration tests ONLY**:

### Testing Tools
- **Backend**: Jest + Supertest for API testing
- **Frontend**: React Testing Library for component unit/integration tests
- **UI Verification**: Manual browser testing for full UI flows

### Important Testing Constraints
- **DO NOT** suggest or implement e2e test frameworks (Playwright, Cypress, Selenium)
- **DO NOT** suggest browser automation tools
- **Reason**: Keep the lab focused on unit/integration tests without e2e complexity

### Testing Approach by Context

**Backend API Changes**:
- Write Jest tests FIRST, then implement (RED-GREEN-REFACTOR)
- Use Supertest for HTTP endpoint testing
- Test business logic with unit tests

**Frontend Component Features**:
- Write React Testing Library tests FIRST for component behavior, then implement (RED-GREEN-REFACTOR)
- Test user interactions and component state
- Follow with manual browser testing for full UI flows

**This is true TDD**: Test first, then code to pass the test.

## Workflow Patterns

Follow these structured workflows:

### 1. TDD Workflow
1. Write or fix tests based on requirements
2. Run tests and observe failures (Red)
3. Implement minimal code to pass tests (Green)
4. Refactor for quality while keeping tests green
5. Verify all tests pass before committing

### 2. Code Quality Workflow
1. Run linter to identify issues
2. Categorize issues by type/severity
3. Fix issues systematically (highest impact first)
4. Re-validate with linter
5. Ensure no new issues introduced

### 3. Integration Workflow
1. Identify the issue through testing or observation
2. Debug systematically using logs and test output
3. Write/update tests to cover the issue
4. Implement the fix
5. Verify end-to-end functionality

## Chat Mode Usage

Use specialized chat modes for specific workflows:

### `tdd-developer` Mode
Use for:
- Writing new tests
- Implementing features with TDD approach
- Red-Green-Refactor cycles
- Test debugging and fixing

### `code-reviewer` Mode
Use for:
- Addressing lint errors
- Code quality improvements
- Refactoring suggestions
- Standards compliance

## Memory System

- **Persistent Memory**: This file (.github/copilot-instructions.md) contains foundational principles and workflows
- **Working Memory**: .github/memory/ directory contains discoveries and patterns
- During active development, take notes in .github/memory/scratch/working-notes.md (not committed)
- At end of session, summarize key findings into .github/memory/session-notes.md (committed)
- Document recurring code patterns in .github/memory/patterns-discovered.md (committed)
- Reference these files when providing context-aware suggestions

For detailed guidance on using the memory system, see [.github/memory/README.md](memory/README.md).

## Workflow Utilities

### GitHub CLI Commands

Use these commands for workflow automation (available to all modes):

**List Issues**:
```bash
gh issue list --state open
```

**View Issue Details**:
```bash
gh issue view <issue-number>
```

**View Issue with Comments**:
```bash
gh issue view <issue-number> --comments
```

**Exercise Navigation**:
- The main exercise issue will have "Exercise:" in the title
- Exercise steps are posted as comments on the main issue
- Use these commands when `/execute-step` or `/validate-step` prompts are invoked

## Git Workflow

### Conventional Commits

Use conventional commit format for all commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `test:` - Test additions or fixes
- `refactor:` - Code refactoring
- `style:` - Formatting changes

**Example**: `feat: add delete button to todo items`

### Branch Strategy

- **Feature branches**: `feature/<descriptive-name>`
- **Bug fixes**: `fix/<issue-description>`
- **Main branch**: Protected, requires passing tests

### Commit Workflow

1. Stage all changes: `git add .`
2. Commit with conventional format: `git commit -m "type: description"`
3. Push to correct branch: `git push origin <branch-name>`
4. Ensure tests pass before pushing

---

*These instructions ensure consistent, high-quality development across the TODO application workspace.*
