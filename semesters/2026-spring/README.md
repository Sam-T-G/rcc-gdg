# Spring 2026

Working checklist for the Spring 2026 officer team of GDG on Campus @ RCC. Folder: `semesters/2026-spring/`. The rules behind this checklist are in [semester-lifecycle.md](../../docs/01-governance/semester-lifecycle.md).

Spring 2026 was the founding semester. This repo was created in August 2026, after the semester ended, so this folder was filled in after the fact from the chapter calendar and the FY 2026-27 ASRCC funding request. Boxes below are ticked only where a record confirms the step. Everything else is `[TBD]` until someone who was there fills it in.

Tick boxes in this file as you go and commit it as-is. A half-finished checklist in the repo beats a finished one in someone's head.

## Files in this folder

| File | What it holds | Fill in by |
|---|---|---|
| [goals.md](goals.md) | 3 to 5 goals with a number attached to each | week 2 |
| [calendar.md](calendar.md) | every dated thing this semester, deadlines first | week 2, then kept current |
| [budget.md](budget.md) | ASRCC allocation, trust balance, spending, reimbursements | week 2, then after every spend |
| [roster.md](roster.md) | counts and which roles are filled (never names without consent) | week 2 and last week |
| [meetings/](meetings/README.md) | one file per meeting | within 48 hours of each meeting |
| [events/](events/README.md) | one folder per event: plan, run sheet, retro | when an event gets a yes |
| [projects/](projects/README.md) | member projects running this semester | as they start |
| [retrospective.md](retrospective.md) | what happened, what to change | last 2 weeks |
| [handoff.md](handoff.md) | access transfers and open threads for the next team | last 2 weeks |

## Open (weeks 0 to 2)

- [ ] Read last semester's `retrospective.md` and `handoff.md`. Copy open threads into `goals.md` or `calendar.md`. (First semester: nothing to read.)
- [ ] Renew the club with Student Activities for this semester. Record the due date and the submitted date in `calendar.md`. See [club-recognition-and-icc.md](../../docs/02-operations/club-recognition-and-icc.md). Charter status and dates: [TBD].
- [ ] Confirm the weekly slot (Wednesdays, 10:00 AM, BLCIS A-103) and ask the advisor to book the room. See [room-booking.md](../../docs/02-operations/room-booking.md).
- [ ] Confirm who holds each role in `roster.md`. Every role listed there has a person, or the row says `open`.
- [ ] Check [MAINTAINERS.md](../../MAINTAINERS.md) lists two repo admins plus the advisor. Fix it in this PR if not.
- [ ] Write `goals.md`. (Not written in this format at the time; see the note in that file.)
- [x] Fill `calendar.md`: every dated item from the chapter calendar is in the table.
- [ ] Fill `budget.md`: allocation status, trust balance, planned line items. See [asrcc-funding.md](../../docs/02-operations/asrcc-funding.md). Trust balance and per-event costs: [TBD].
- [ ] Post the first announcement on Discord and Instagram. Start from [announcement.md](../../templates/announcement.md). Links live in [links.md](../../docs/04-brand/links.md).
- [ ] Hold the first meeting and commit the notes. (First GDG Meeting was on the calendar for 2026-03-18; no notes exist in this repo.)
- [ ] Set this semester to `active` in [semesters/README.md](../README.md).

## Run (every week)

- [ ] After the meeting: `scripts/new-meeting.sh 2026-spring YYYY-MM-DD`, fill in attendance count, decisions, action items, commit within 48 hours.
- [ ] Any binding decision (money, policy, event go/no-go, template change) gets an entry in the [decision log](../../docs/01-governance/decision-log.md) the same week.
- [x] Event gets a yes: `scripts/new-event.sh 2026-spring YYYY-MM-DD slug`, fill `plan.md`, confirm the calendar row the script added. Walk through [event-checklist.md](../../docs/02-operations/event-checklist.md). (Five event folders exist; plans were reconstructed, not written ahead of time.)
- [ ] Event done: fill `retro.md` within a week, update `budget.md` with what was actually spent. (All five retros are skeletons.)
- [ ] Money moved: add a row to `budget.md`, hand the receipt to the treasurer, follow [reimbursements.md](../../docs/02-operations/reimbursements.md).
- [ ] Look at `calendar.md` for anything due in the next 4 weeks.
- [ ] Run `scripts/check.sh` before opening a PR.

## Close (last 2 weeks)

- [ ] Update the end-of-semester column in `roster.md`.
- [ ] Reconcile `budget.md`: every planned row has a spent amount or `0`, every reimbursement has a status.
- [ ] Write `retrospective.md`. Numbers first, then what to change.
- [ ] Hold elections if they are due. Log the result in the decision log. Update `MAINTAINERS.md` and `roster.md`. See [elections.md](../../docs/00-charter/elections.md). Election date and result: [TBD].
- [ ] Write `handoff.md`. Transfer every account listed there and tick the row when the new holder has logged in.
- [ ] Run `scripts/check.sh --strict`. Every template fill marker (the HTML comments the templates carry) left in this folder is either filled in or replaced with `[TBD]`.
- [x] Create next semester's folder: `semesters/2026-fall/` exists.
- [ ] Set this semester to `closed` and the next one to `planning` in [semesters/README.md](../README.md).
- [ ] Open one PR titled `close 2026-spring`. Outgoing team opens it, incoming team reviews and merges. See [handoff-procedure.md](../../docs/01-governance/handoff-procedure.md).

A semester is not done until `retrospective.md` and `handoff.md` are filled in and the next folder exists. For Spring 2026 that means a founding officer fills the `[TBD]` fields in those two files; until then this folder is a partial record.
