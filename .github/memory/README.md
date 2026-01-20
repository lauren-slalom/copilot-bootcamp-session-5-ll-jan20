# Working Memory System

## Purpose

This memory system tracks patterns, decisions, and lessons learned during development. It helps AI assistants (and developers) provide context-aware suggestions based on accumulated project knowledge.

## Memory Types

### Persistent Memory
**Location**: `.github/copilot-instructions.md`
- Foundational principles and workflows
- Core development standards
- Testing guidelines
- Committed to git
- Changes infrequently

### Working Memory
**Location**: `.github/memory/`
- Development discoveries and patterns
- Session-specific findings
- Accumulated learnings
- Most files committed to git (except scratch/)

## Directory Structure

```
.github/memory/
├── README.md                    (this file - explains the system)
├── session-notes.md             (historical summaries of completed sessions)
├── patterns-discovered.md       (accumulated code patterns and solutions)
└── scratch/
    ├── .gitignore              (ignores all files in scratch/)
    └── working-notes.md        (active session work - NOT committed)
```

## File Purposes

### session-notes.md
**Purpose**: Historical record of completed development sessions

**When to update**: At the END of a development session

**Content**: Summaries of what was accomplished, key findings, and decisions made

**Committed to git**: ✅ Yes - provides historical context

**Use during**:
- Planning new features (what did we learn last time?)
- Debugging issues (did we encounter this before?)
- Code reviews (what were past design decisions?)

### patterns-discovered.md
**Purpose**: Document recurring code patterns and solutions

**When to update**: When you discover a new pattern or anti-pattern

**Content**: 
- Pattern name
- Context and problem it solves
- Solution approach
- Code examples
- Related files

**Committed to git**: ✅ Yes - accumulates project knowledge

**Use during**:
- TDD cycles (what patterns should I follow?)
- Implementing new features (is there an established pattern?)
- Code reviews (does this match our patterns?)

### scratch/working-notes.md
**Purpose**: Active session scratchpad for current work

**When to update**: Throughout your development session

**Content**:
- Current task details
- Approach being tried
- Key findings as you work
- Decisions made
- Blockers encountered
- Next steps

**Committed to git**: ❌ No - ephemeral working notes

**Use during**:
- Active TDD cycles (track red-green-refactor progress)
- Debugging sessions (document hypotheses and findings)
- Exploratory coding (capture thoughts and decisions)

**At end of session**: Summarize key findings into `session-notes.md` and `patterns-discovered.md`

## Workflow Integration

### During TDD Workflow

1. **Start session**: Open `scratch/working-notes.md` and note your current task
2. **Red phase**: Document which test you're working on and expected behavior
3. **Green phase**: Note implementation approach and any discoveries
4. **Refactor phase**: Document patterns observed or created
5. **End of cycle**: Update findings section with key learnings

### During Linting/Code Quality Workflow

1. **Document errors**: List the types of errors found in working notes
2. **Track fixes**: Note systematic approach to fixing issues
3. **Capture patterns**: If you discover common mistake patterns, note in working notes
4. **End of workflow**: Add any recurring patterns to `patterns-discovered.md`

### During Debugging Workflow

1. **Document hypothesis**: Write your theory about the bug in working notes
2. **Track experiments**: Note what you tried and results
3. **Capture solution**: Document the fix approach
4. **End of workflow**: If the bug reveals a pattern, add to `patterns-discovered.md`

### At End of Development Session

1. **Review** `scratch/working-notes.md`
2. **Extract** key findings, decisions, and patterns
3. **Update** `session-notes.md` with session summary
4. **Update** `patterns-discovered.md` with any new patterns
5. **Clear** or archive working notes for next session

## How AI Uses These Files

When you ask Copilot for help, it can reference these memory files to:

1. **Provide context-aware suggestions**: "Based on the pattern in `patterns-discovered.md`, you should..."
2. **Avoid repeated mistakes**: "In session 3, you discovered that... so avoid..."
3. **Follow established patterns**: "This project uses X pattern for Y scenario"
4. **Recall past decisions**: "You decided to use approach A instead of B because..."
5. **Build on previous work**: "In the last session, you implemented... let's extend it"

## Best Practices

### ✅ DO

- Keep working notes informal and conversational
- Update working notes frequently during active development
- Summarize learnings at end of session
- Document patterns when you see them repeated 2+ times
- Include code examples in patterns
- Link to related files and line numbers
- Use clear, descriptive pattern names

### ❌ DON'T

- Don't commit scratch/ files to git
- Don't copy entire code blocks (link to files instead)
- Don't document every single decision (focus on important ones)
- Don't leave working notes unsummarized for weeks
- Don't mix active notes with historical summaries

## Example Workflow

**Scenario**: Implementing DELETE endpoint with TDD

1. **Start**: Update `scratch/working-notes.md`
   ```
   Current Task: Implement DELETE /api/todos/:id endpoint
   Approach: TDD - write test first, then implement
   ```

2. **During work**: Add findings
   ```
   Key Findings:
   - Test expects 204 status code (not 200)
   - Array.splice() modifies array in-place
   - Need to handle invalid ID case
   ```

3. **End of task**: Update `session-notes.md`
   ```
   ## Session: DELETE Endpoint Implementation (Jan 20, 2026)
   Accomplished: Implemented DELETE endpoint with full test coverage
   Key Findings: 204 is proper status for successful deletion with no content
   ```

4. **If pattern emerges**: Update `patterns-discovered.md`
   ```
   Pattern: Array Mutation for In-Memory Storage
   Solution: Use Array.splice() to remove items from todos array
   ```

## Getting Started

1. **Create your first working note**: Open `scratch/working-notes.md` and describe your current task
2. **Work on your task**: Update working notes as you discover things
3. **End your session**: Summarize key findings into `session-notes.md`
4. **Continue building**: Each session adds to the project's knowledge base

---

*This memory system helps maintain continuity across development sessions and enables AI to provide increasingly context-aware assistance.*
