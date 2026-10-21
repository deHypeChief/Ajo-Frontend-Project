# WORKING AGREEMENT.
**PROJECT** Ajo Circle
**Partner A (Engine):** <David C>
**Partner B (Surface):** <Kevin O>

## 1. Branches
- Nobody pushes to `main`. Every change goes through a pull request.
- Names: `feat/<area>-<short-name>`, Example: `feat/engine-money`.

## Commit style.
format: `type: short description`

| Type | Use for |
|---|---|
| `feat` | a new feature |
| `fix` | a bug fix |
| `docs` | documentation |
| `test` | tests |
| `refactor` | code changes with no behaviour change |
| `chore` | tooling, config, dependencies |
- Small, frequent commits.
- Never commit `node_modules`, `.env` or build output.

## 3. Pull requests and reviews

- Every PR needs the other partner's approval before it merges.
- The reviewer leaves at least two substantive comments. "Looks good" on its own does not count.
- The PR description says what changed, why, and how to check it.
- Review turnaround: within **24 hours**. If you can't, say so in the PR.
- The author merges after approval. Use squash merge only if the PR shows who did what.
- A change to `docs/CONTRACT.md` needs both partners to agree. A breaking change says so in the PR title.

## 4. Code ownership

| | Partner A (Engine) | Partner B (Surface) |
|---|---|---|
| Owns | `src/data`, `src/stores`, `src/utils`, `src/types` | `src/components`, `src/views`, styles |
| Rule | Components never import from `src/data`. They use the stores only. | |

Roles swap in Week 5.

## 5. Meetings

- Two pair sessions per week, 45 minutes each. One drives, one navigates, and we swap halfway.
  - Session 1: <day>, <time>
  - Session 2: <day>, <time>
- Where: < In person>
- After each session, log decisions and open questions in `docs/PAIR-LOG.md`.


## 6. Communication

- Main channel: <WhatsApp >
- Reply within <24> hours on weekdays.

## 7. Logs

- `docs/AI-LOG.md`: every AI-assisted chunk gets an entry (prompt, what we kept, what we changed, what was wrong).
- `docs/PAIR-LOG.md`: every pair session.
- `docs/adr/`: one decision record per milestone.
- Each milestone, each partner files one reproducible bug against the other's work.

## 8. Contract
-Changing `docs/CONTRACT.md` or `src/types/` needs both partners to agree.
-A breaking change says so in the pull request title.