# AI LOG.

## 1. storage.ts (localStorage helpers)
- **Asked:** how to build the localStorage layer.
- **AI Gave:** `read` and `write` with try/catch, and an `ajo`: key prefix.
- **I Checked:** a console test with god and bad JSON. Bad JSON returned the fallback `[]` instead of crashing.
- **Learned:** `JSON.parse` can throw, and a prefix stops other app on localhost colliding with our keys.

## 2. client.ts (delay and failure switch)
- **Asked:** a 300 to 900 ms delay and a 1-in-10 failure.
- **AI Gave:** `simulate()`, which waits, then rolls the failure, then does the work.
- **I checked:** four timings (339, 901, 575, 779 ms) and the `always` mode.
- **Question I asked:** why 901 ms?  *Answer:* `setTimeout` is a minimum and the surrounding code adds a few ms.
- **Learned:** failing before the write means a rejected call never leaves half-saved data.

## 3. seed.ts and the first data functions
- **AI gave:** an example of seed members, `ge*tGroup`, `listMembers`.
- **I wrote:** the seed members.
- **I checked:** `console.table` showed six rows. The extra column is the table's own index.
- **Learned:** a file only runs when something imports it, which is why storage stayed empty until the store imported the data layer.

## 4. Writers and contract alignment
- **AI gave:** `craeteGroup`, `addMember`, `listPayments`, `recordPayment`, `resetData`.
- **I fixed myself:** the merge conflict in `contract.ts` (kept the `DataErrorCode` version),  I removed the duplicate `errors.ts`.
- **AI was wrong at first:** it guessed the six functions before seeing my contract, used `createGroup` instead of `saveGroup`, and used the code `INVALID` instead of `VALIDATION`. I corrected these against `contract.ts`.
- **I checked:** all five checkpoint lines matched, and the type check passed.

## 5. contract.md corrections
- Fixed seven mismatches with the code (typos, `saveGroup`, field names). Partner reviewed: yes.

## 6. Members store
- **AI gave:** `useMembersStore` with `load()` and `add()`.
- **I fixed myself:** two `createApp` calls in `main.ts` (made it one app with router and Pinia), and a store import that didn't match the file name.
- **I checked:** all seven console checks matched, including retry giving 6 rows and not 12.

## 7. Members page
- **AI gave:** the page in four pieces.
- **I fixed:** double numbering (`<ol>` plus `{{ m.position }}`). I switched to `<ul>`.
- **Still open:** full and empty states not showing. [update when fixed]


---

# Kevin's AI log (Surface)

## K1. Design tokens, components, layout shell and /kit page (PR #7)
- **Asked:** for assistance with the design tokens as CSS variables, five components (AppButton, AppInput, AppCard, AppModal, AppToast), a layout shell and a `/kit` page.
- **AI gave:** the token file, the components, `useToast`, `ToastHost`, `AppShell`, `KitView.vue` and a new `App.vue`.
- **I did:** put the files into my branch, imported the two style files in `main.ts`, added the `/kit` route to the router, and opened PR #7, which was merged.

## K2. Reading the data layer and planning the Members page
- **Asked:** AI to read `src/data` and tell me what David built and what the Members page needed.
- **AI gave:** a file-by-file summary, and a note that the code says `saveGroup` while `CONTRACT.md` says `createGroup`.
- **I did:** used David's store handoff table (`items`, `status`, `error`, `isEmpty`, `load()`, `adding`, `addError`, `add()`) to plan the page. The page imports only from `@/stores`, never from `@/data`.

## K3. Members page (PR #10) and Add member modal (PR #11)
- **Asked:** how to build the four states and then the Add member form.
- **AI gave:** a small test page first, then `MembersView.vue` with a skeleton, an error panel with Retry, an empty state and a list, and then the modal with validation, a success toast and an error toast.
- **I did:** built it in steps on two branches, ran it in the browser, and opened PR #10 and PR #11, which were merged. I reported that the four states worked as expected.
- **What went wrong:** when David's PR #9 changed the same file, I merged `main` into my branch and the merge kept both versions in one file, so `main` stopped building. The AI found it by running a type check and a build on `main`.
- **I fixed:** replaced the file with a single repaired version that keeps David's dev panel, and opened a PR for it (`fix/members-page-merge`).

## K4. Git help (Weeks 1 and 2)
- **Asked:** how to clone, branch, commit, push, open a PR, fix a rejected push, and recover after deleting a branch.
- **AI gave:** the commands and an explanation of each.
- **I did:** ran every command myself, deleted a branch by mistake and rebuilt the working agreement on a new branch.

## W1. Week 1 items that used AI
- **Working agreement:** the AI wrote the first draft (branch names, commit style, review turnaround, meetings). I rebuilt it on a new branch after deleting the first one.
- **README:** the AI drafted the structure and placed in it the contract, wireframes, working agreement and ADR text that I supplied.
- **Contract review:** the AI listed typos and mismatches in `CONTRACT.md` (`stratsOn`, `Sufrace`, `saveGroup` against `createGroup`).