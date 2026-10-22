# Working Agreement

**Partners:** David (Engine) and Kevin (Surface)
**Repo:** Ajo-Frontend-Project
**Default branch:** `feat/engine-scaffold` (used in place of `main` until the instructor renames it)

We can change this agreement, but only if both of us agree.

## 1. Branch names
- Nobody pushes directly to the default branch. Every change goes on its own branch and through a pull request.
- Format: `<type>/<short-topic>`, in lowercase with hyphens.
- Types match our commit types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`.
- Examples: `feat/engine-types`, `feat/surface-wireframes`, `docs/adr-001`.
- One topic per branch. Delete the branch after it is merged.

## 2. Commit style
Start each message with a type, a colon, and a short description in the present tense.

| Type | Use it for |
|------|-----------|
| `feat:` | a new feature or screen |
| `fix:` | a bug fix |
| `docs:` | documentation, wireframes, logs |
| `chore:` | setup, tooling, config |
| `refactor:` | restructuring code without changing behavior |
| `test:` | adding or changing tests |

Example: `docs: add wireframes for five screens`

- One idea per commit. No messages like "update" or "changes".
- Never commit `node_modules`.

## 3. Pull requests and review turnaround
- Every change merges through a pull request that the other partner approves. Nobody approves or merges their own PR.
- Reviewers leave at least two specific comments. A bare "LGTM" doesn't count.
- **Review turnaround: within 24 hours** of the PR being opened.
- If there's no review after 24 hours, the author messages the partner. If there's still none after 48 hours, we tell the instructor.
- A PR that changes `docs/CONTRACT.md` needs both of us to agree. A breaking change says so in the PR title.
- Keep PRs small enough to review in about 15 minutes.

## 4. Meetings
- Two pair sessions a week, 45 minutes each. One drives, one navigates, and we swap halfway.
- Session 1: <day, time, call or in person>
- Session 2: <day, time, call or in person>
- After each session, we add an entry to `docs/PAIR-LOG.md`.

## 5. Logs
- Every chunk of AI-assisted code or writing goes in `docs/AI-LOG.md`, including what was wrong with it.
- Each milestone, we each file one reproducible bug against the other's work.
- Each milestone, we write one short decision record in `docs/adr/`.

## 6. If one of us is stuck or unavailable
We message first, then call. If we're still blocked after 48 hours, we ask the instructor.