---
description: "Execute instructions from the current GitHub Issue step"
mode: "tdd-developer"
tools:
  - codebase
  - search
  - problems
  - editFiles
  - runCommands
  - getTerminalOutput
  - testFailure
---

# Execute Step Instructions

You are executing instructions from a GitHub Issue step in the TODO application exercise.

## Input Variables

- `${input:issue-number}` (optional) - The GitHub Issue number containing the exercise steps

## Instructions

### 1. Find the Exercise Issue

If the issue number was not provided:

```bash
# List open issues to find the exercise
gh issue list --state open
```

Look for an issue with "Exercise:" in the title. This is the main exercise issue.

If the issue number was provided, use it directly.

### 2. Get Issue Content with Comments

```bash
# Get the issue with all comments
gh issue view <issue-number> --comments
```

The exercise steps are posted as **comments** on the main issue.

### 3. Parse the Latest Step

From the issue comments:
- Identify the most recent step comment (steps are numbered like "Step 5-0:", "Step 5-1:", etc.)
- Each step contains:
  - Overview of what to accomplish
  - One or more `:keyboard: Activity:` sections with specific tasks

### 4. Execute Activities Systematically

For each `:keyboard: Activity:` section in the step:

1. **Read the activity instructions carefully**
2. **Follow the instructions exactly as written**
3. **Use TDD approach (you're in tdd-developer mode)**:
   - Write tests FIRST for new features
   - Fix failing tests systematically
   - Run tests after each change
   - Follow Red-Green-Refactor cycle
4. **Apply testing constraints from project instructions**:
   - Use Jest + Supertest for backend tests
   - Use React Testing Library for frontend component tests
   - **NEVER suggest Playwright, Cypress, Selenium, or other e2e frameworks**
   - Recommend manual browser testing for complete UI flows

### 5. Verify Your Work

After completing all activities:
- Run tests: `npm test`
- Check for lint errors: `npm run lint`
- Verify the application runs: `npm start` (if applicable)

### 6. Report Completion

**DO NOT commit or push changes** - that's handled by the `/commit-and-push` prompt.

Report what was completed:
- List each activity executed
- Show test results
- Highlight any issues or blockers
- **Instruct the user to run `/validate-step` next** to verify success criteria

## Important Constraints

- **Testing Scope**: Only unit/integration tests (Jest, React Testing Library)
- **No E2E Frameworks**: Do not suggest or install Playwright, Cypress, Selenium
- **TDD First**: Write tests before implementation for new features
- **Don't Commit**: Leave staging and committing to `/commit-and-push`

## Reference Documentation

Refer to these project guidelines:
- `.github/copilot-instructions.md` - Project principles and workflows
- `.github/memory/patterns-discovered.md` - Established code patterns
- `docs/testing-guidelines.md` - Comprehensive testing guidance
- `docs/workflow-patterns.md` - Development workflow patterns

## Example Workflow

1. Find exercise issue: `gh issue list --state open`
2. Get step details: `gh issue view 1 --comments`
3. Parse "Step 5-1" from comments
4. Execute each activity in TDD mode
5. Run tests to verify: `npm test`
6. Report completion and instruct user to run `/validate-step`

Remember: You're in **tdd-developer mode**, so follow TDD principles throughout execution.
