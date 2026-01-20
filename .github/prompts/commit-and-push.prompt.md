---
description: "Analyze changes, generate commit message, and push to feature branch"
tools:
  - runCommands
  - getTerminalOutput
---

# Commit and Push Changes

Analyze the current changes, generate a conventional commit message, and push to a feature branch.

## Input Variables

- `${input:branch-name}` (REQUIRED) - The name of the feature branch to commit and push to

## Instructions

### 1. Validate Branch Name

If no branch name was provided, **STOP and ask the user for the branch name**.

The branch name should follow project conventions:
- Feature branches: `feature/<descriptive-name>`
- Bug fixes: `fix/<issue-description>`

Examples: `feature/delete-todos`, `fix/toggle-bug`, `feature/edit-functionality`

### 2. Analyze Changes

```bash
# Show what files have changed
git status

# Show detailed changes
git diff
```

Review:
- What files were modified
- What functionality was added or changed
- What bugs were fixed

### 3. Generate Conventional Commit Message

Based on the changes, create a commit message following **conventional commit format** (see Git Workflow in project instructions):

**Format**: `<type>: <description>`

**Types**:
- `feat:` - New feature
- `fix:` - Bug fix
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `test:` - Test additions or fixes
- `refactor:` - Code refactoring
- `style:` - Formatting changes

**Examples**:
- `feat: add delete button to todo items`
- `fix: toggle endpoint now properly toggles completed status`
- `test: add integration tests for POST endpoint`
- `chore: fix ESLint errors in backend`

The message should be:
- Clear and descriptive
- Present tense ("add" not "added")
- Lowercase (except proper nouns)
- No period at the end

### 4. Create or Switch to Branch

```bash
# Check if branch exists
git branch --list ${input:branch-name}

# If branch doesn't exist, create it
git checkout -b ${input:branch-name}

# If branch exists, switch to it
git checkout ${input:branch-name}
```

**CRITICAL**: 
- **ONLY** use the user-provided branch name
- **NEVER** commit directly to `main` branch
- **NEVER** commit to any branch other than the one specified

### 5. Stage All Changes

```bash
# Stage all changes
git add .

# Verify what's staged
git status
```

### 6. Commit with Generated Message

```bash
# Commit with the conventional commit message
git commit -m "<type>: <description>"
```

### 7. Push to Remote Branch

```bash
# Push to the specified branch
git push origin ${input:branch-name}
```

If this is the first push to a new branch, git will set up tracking automatically.

### 8. Report Success

Inform the user:
- The commit message that was used
- The branch that was pushed to
- The next steps (e.g., create a PR, continue with next step)

## Safety Checks

- ✅ Verify branch name is provided
- ✅ Confirm not committing to `main`
- ✅ Show git status before and after
- ✅ Use the exact branch name provided by the user
- ✅ Generate descriptive commit message

## Example Workflow

**User provides**: `branch-name: feature/delete-todos`

1. Analyze changes: `git diff`
2. Determine changes implement delete functionality
3. Generate message: `feat: implement delete endpoint for todos`
4. Create/switch to branch: `git checkout -b feature/delete-todos`
5. Stage changes: `git add .`
6. Commit: `git commit -m "feat: implement delete endpoint for todos"`
7. Push: `git push origin feature/delete-todos`
8. Report: "✅ Committed and pushed to feature/delete-todos"

## Reference

See **Git Workflow** section in `.github/copilot-instructions.md` for:
- Conventional commit format details
- Branch naming conventions
- Commit workflow best practices
