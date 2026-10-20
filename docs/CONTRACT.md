# Contract (needs Kevin's review)

Both partners own this file. Changing a type or a function needs both partners to agree.
Code Source of truth: ``src/types/index.ts` and `src/data/contract.ts`.

## Rules
- Money is `Kobo`: whole numbers only. ₦1,500.50 is `150050`.
- The Surface never imports from `src/data`. It uses the stores only.
- Every data function returns a Promise and can reject.

## Types

| Type | Field | Type | Written by | read by | Notes |
|---|---|---|---|---|---|
| Member | id | string | data layer | everyone | Assigned by `addMember` |
| Member | name | string | Surface | everyone | Typed in the form |
| Member | phone | string | Surface | Members page | Typed in the form; format validated in M3 |
| Member | position | number | data layer | engine, Members page | 1-based payout slot, unique within the group |
| Group | id | string | data layer | everyone | Assigned by `saveGroup` |
| Group | name | string | Surface | Dashboard, Settings | Typed in the setup wizard |
| Group | amount | kobo | surface | engine, Dashboard | Contribution per member per cycle |
| Group | stratsOn | string | Surface | engine | ISO date `YYYY-MM-DD`; due date of cycle 1  |
| Group | every | Frequency | surface | engine | `'week'`, `'fortnight'` or `'month'` |
| Cycle | n | number | engine | everyone |  1-based cycle number  |
| Cycle | recipientId | string | engine | Cycle page, Payout | The `Member.id` who collects this cycle  |
| Cycle | CycleStaus | Type | engine | Cycle page, Dashboard | See ADR 001: nothing in the six functions writes it yet  |
| Payment| id | string | Sufrace | ledger | Assigned by `recordPayment` |
| Payment| cycle | number | Surface | ledger,engine | The `Cycle.n` this payment belongs to |
| Payment| memberId | string | Surface | ledger,engine | The `Member.id` who paid |
| Payment| paid | Kobo | Surface | engine,ledger | Kobo actually paid. |
| Payment| paidAt | string | data layer | ledger | ISO timestamp is recorded |

## The six data functions
| Function | Returns | Reads / writes |
|---|---|---|
| `getGroup()` | `Group \| null` | reads group |
| `createGroup(group)` | `Group` | writes group |
| `listMembers()` | `Member[]` | reads members |
| `addMember(input)` | `Member` | writes members |
| `listPayments(cycle?)` | `Payment[]` | reads payments |
| `recordPayment(input)` | `Payment` | writes payments |