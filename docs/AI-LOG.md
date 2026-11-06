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
- Fixed seven mismatches with the code (typos, `saveGroup`, field names). Partner reviewed: [yes/no].

## 6. Members store
- **AI gave:** `useMembersStore` with `load()` and `add()`.
- **I fixed myself:** two `createApp` calls in `main.ts` (made it one app with router and Pinia), and a store import that didn't match the file name.
- **I checked:** all seven console checks matched, including retry giving 6 rows and not 12.

## 7. Members page
- **AI gave:** the page in four pieces.
- **I fixed:** double numbering (`<ol>` plus `{{ m.position }}`). I switched to `<ul>`.
- **Still open:** full and empty states not showing. [update when fixed]