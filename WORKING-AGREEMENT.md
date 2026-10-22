# Working Agreement

**Partners:** David (Engine) and Kevin (Surface)
**Repo:** Ajo-Frontend-Project
**Default branch:** `feat/engine-scaffold` (we use this in place of `main` until the instructor renames it)

This is how we agree to work together. We can change it, but only if both of us agree.

## 1. Branch names
- Nobody pushes directly to the default branch. Every change goes on its own branch and through a pull request.
- Engine work: `engine/<short-topic>`, for example `engine/contract-draft`
- Surface work: `surface/<short-topic>`, for example `surface/wireframes`
- Shared work (README, docs for both of us): `docs/<short-topic>`
- Use lowercase and hyphens. Keep one topic per branch, and delete the branch after it is merged.

## 2. Commit style
Start each commit message with a type, a colon, and a short description in the present tense:

| Type | Use it for |
|------|-----------|
| `feat:` | a new feature or screen |
| `fix:` | a bug fix |
| `docs:` | documentation, wireframes, logs |
| `chore:` | setup, tooling, config |
| `refactor:` | restructuring code without changing behavior |
| `test:` | adding or changing tests |

Example: `docs: add wireframes for five screens`

- Make small commits. One idea per commit.
- No commit messages like "update" or "changes".
- Never commit `node_modules`.

## 3. Pull requests and review turnaround
- Every change merges through a pull request, and the other partner must approve it before it merges.
- Nobody approves or merges their own PR.
- Reviewers leave at least two specific comments (a question, a suggestion, or something missing). A bare "LGTM" doesn't count.
- **Review turnaround: within 24 hours** of the PR being opened.
- If a PR has had no review after 24 hours, the author messages the partner. If there is still no response after 48 hours, we tell the instructor.
- A PR that changes `docs/CONTRACT.md` needs both of us to agree, and a breaking change (renaming or removing a field or function) says so in the PR title.
- Keep PRs small enough to review in about 15 minutes.

## 4. Meetings
- Two pair sessions a week, 45 minutes each. One drives, one navigates, and we swap halfway.
- Session 1: <day, time, call or in person>
- Session 2: <day, time, call or in person>
- After each session, we add an entry to `docs/PAIR-LOG.md`.

## 5. Logs
- Every chunk of AI-assisted code or writing gets an entry in `docs/AI-LOG.md`, including what was wrong with it.
- Each milestone, we each file one reproducible bug against the other's work.
- Each milestone, we write one short decision record in `docs/adr/`.

## 6. If one of us is stuck or unavailable
We message first, then call. If we are still blocked after 48 hours, we ask the instructor.