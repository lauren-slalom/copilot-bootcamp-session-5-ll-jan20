---
description: "Validate that all success criteria for the current step are met"
mode: "code-reviewer"
tools:
  - codebase
  - problems
  - runCommands
  - getTerminalOutput
---

# Validate Step Success Criteria

Validate that all success criteria for a specific exercise step have been met.

## Input Variables

- `${input:step-number}` (REQUIRED) - The step number to validate (e.g., "5-0", "5-1", "5-2")

## Instructions

### 1. Validate Input

If no step number was provided, **STOP and ask the user for the step number**.

Step numbers follow the format: `5-0`, `5-1`, `5-2`, etc.

### 2. Find the Main Exercise Issue

```bash
# List open issues to find the exercise
gh issue list --state open
```

Look for an issue with "Exercise:" in the title. Note the issue number.

### 3. Get Issue with Comments

```bash
# Get the full issue content including all comments
gh issue view <issue-number> --comments
```

Exercise steps are posted as **comments** on the main issue.

### 4. Find the Specific Step

Search through the issue comments to find:

```
# Step ${input:step-number}:
```

For example, if validating step `5-1`, search for `# Step 5-1:`

### 5. Extract Success Criteria

Within that step comment, locate the **Success Criteria** section. It will contain a checklist of items to validate.

Example format:
```markdown
## Success Criteria

- [ ] All backend tests pass
- [ ] POST endpoint creates todos with unique IDs
- [ ] No ESLint errors in backend code
```

### 6. Validate Each Criterion

For each criterion in the list:

#### Test Passing Criteria
```bash
# Run all tests
npm test

# Run specific package tests
npm test --workspace=packages/backend
npm test --workspace=packages/frontend
```

Check that:
- All tests pass (no failures)
- Test output matches expectations

#### Lint/Code Quality Criteria
```bash
# Run linter
npm run lint

# Run for specific package
npm run lint --workspace=packages/backend
npm run lint --workspace=packages/frontend
```

Check that:
- No ESLint errors
- No warnings (unless specified as acceptable)

#### Functionality Criteria

For functional requirements:
- Check relevant files exist and contain expected code
- Verify endpoints are implemented
- Confirm features work as described

#### Application Running Criteria

If required:
```bash
# Start the application
npm start
```

Check that:
- Application starts without errors
- Expected functionality is available

### 7. Generate Validation Report

Create a structured report:

```markdown
## Step ${input:step-number} Validation Report

### ✅ Passing Criteria
- [List criteria that are met]

### ❌ Failing Criteria  
- [List criteria that are NOT met]

### 🔍 Details
[For each failing criterion, provide:]
- What's missing or incorrect
- Specific file/line references
- Suggested actions to fix
```

### 8. Provide Next Steps

If **all criteria pass**:
- Congratulate the user
- Suggest running `/commit-and-push` if not already committed
- Indicate readiness to move to next step

If **some criteria fail**:
- Provide specific guidance for each failing item
- Suggest which files to review/modify
- Recommend running `/execute-step` again if major issues found
- Offer to help fix specific issues

## Validation Examples

### Example 1: Check Test Status

```bash
npm test
```

Expected output should show:
```
PASS packages/backend/__tests__/app.test.js
  ✓ should return empty array initially
  ✓ should create new todo

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
```

### Example 2: Check Lint Status

```bash
npm run lint
```

Expected output:
```
> lint
> npm run lint --workspaces

No ESLint errors found.
```

### Example 3: Check File Implementation

For criterion: "POST endpoint creates todos with unique IDs"

Check `packages/backend/src/app.js`:
- POST route exists
- ID generation logic present
- Response includes id field

## Important Notes

- You're in **code-reviewer mode** - focus on quality validation, not implementation
- Use the **problems** tool to get VS Code's view of errors/warnings
- Be specific about what's wrong and how to fix it
- Reference line numbers and file paths when providing feedback
- Explain WHY each criterion matters

## Reference

See `.github/copilot-instructions.md` for:
- Workflow Utilities (gh CLI commands)
- Testing Scope constraints
- Development Principles

## Example Workflow

1. User runs: `/validate-step step-number:5-1`
2. Find exercise issue: `gh issue list --state open`
3. Get issue details: `gh issue view 1 --comments`
4. Locate "# Step 5-1:" in comments
5. Extract Success Criteria checklist
6. Run tests: `npm test`
7. Run linter: `npm run lint`
8. Check code implementation
9. Generate validation report
10. Guide user on next steps
