# Fall 2026

Working checklist for the Fall 2026 officer team of GDG on Campus @ RCC. Folder: `semesters/2026-fall/`. The rules behind this checklist are in [semester-lifecycle.md](../../docs/01-governance/semester-lifecycle.md).

Fall 2026 is the first semester run from this repo. Classes begin 2026-08-24 and end 2026-12-18 (RCCD 2026-2027 academic calendar). The previous semester's record is [2026-spring](../2026-spring/README.md); its retrospective and handoff are still skeletons, so ask a founding organizer before assuming anything about what worked.

Tick boxes in this file as you go and commit it as-is. A half-finished checklist in the repo beats a finished one in someone's head.

## Files in this folder

| File | What it holds | Fill in by |
|---|---|---|
| [goals.md](goals.md) | 3 to 5 goals with a number attached to each | week 2 |
| [calendar.md](calendar.md) | every dated thing this semester, deadlines first | week 2, then kept current |
| [budget.md](budget.md) | ASRCC allocation, trust balance, spending, reimbursements | week 2, then after every spend |
| [roster.md](roster.md) | counts and which roles are filled (never names without consent) | week 2 and last week |
| [sessions/](sessions/README.md) | the facilitator script for every meeting this term, written in advance | done: all 14 written 2026-08-31 |
| [meetings/](meetings/README.md) | one notes file per meeting, written afterwards | within 48 hours of each meeting |
| [events/](events/README.md) | one folder per event: plan, run sheet, retro | when an event gets a yes |
| [projects/](projects/README.md) | member projects running this semester | as they start |
| [retrospective.md](retrospective.md) | what happened, what to change | last 2 weeks |
| [handoff.md](handoff.md) | access transfers and open threads for the next team | last 2 weeks |

## Open (weeks 0 to 2)

- [ ] Read last semester's [retrospective.md](../2026-spring/retrospective.md) and [handoff.md](../2026-spring/handoff.md). Copy open threads into `goals.md` or `calendar.md`. (Already copied into `goals.md`; confirm nothing is missing.)
- [ ] Renew the club with Student Activities for this semester. Record the due date and the submitted date in `calendar.md`. See [club-recognition-and-icc.md](../../docs/02-operations/club-recognition-and-icc.md).
- [x] Confirm the weekly slot. It moved from the Spring 2026 Wednesday 10:00 AM slot to **Thursdays, 2:30 to 3:30 PM, BLCIS A-210 Simulation Lab**; the repo was corrected on 2026-08-31 to match the chapter calendar.
- [ ] Ask the advisor to book A-210 for the Thursday slot for the whole term. Students cannot submit 25Live requests. See [room-booking.md](../../docs/02-operations/room-booking.md).
- [ ] Confirm the A-210 handoff with ACM, who hold the same room until 2:30. Zero-minute turnover.
- [ ] Confirm the Club Rush date, time, and table location with Student Activities. It is the week of 2026-09-08 and the 2026-09-10 session is built around it.
- [ ] Confirm who holds each role in `roster.md`. Every role listed there has a person, or the row says `open`.
- [ ] Check [MAINTAINERS.md](../../MAINTAINERS.md) lists two repo admins plus the advisor. Fix it in this PR if not.
- [ ] Confirm or rewrite the draft goals in `goals.md`. They were drafted from the FY 2026-27 funding request and the workshop playbook, not by the team.
- [ ] Fill `calendar.md`: replace every `[TBD]` date you know, mark rows that do not apply this term as `n/a`, add Club Rush, elections, and finals.
- [ ] Fill `budget.md`: allocation status (the FY 2026-27 notice was due by July 1), trust balance, planned line items. See [asrcc-funding.md](../../docs/02-operations/asrcc-funding.md).
- [ ] Post the first announcement on Discord and Instagram. Start from [announcement.md](../../templates/announcement.md). Links live in [links.md](../../docs/04-brand/links.md).
- [ ] Hold the first meeting (2026-09-03, [The Cold Open](sessions/2026-09-03-the-cold-open.md)) and commit the notes.
- [ ] Fill the Person column in the [seat table](sessions/README.md#facilitator-rotation). Cards name seats (`LEAD`, `FAC-A`..`FAC-D`, `NOTE`, `FLOAT-1`, `FLOAT-2`, `TIME`), so this one table is the only place names go. `LEAD` is filled; the rest are `[TBD]`. Fewer officers than seats is fine, the table says how to collapse them.
- [ ] Confirm A-210 wi-fi works, before 2026-10-08 and again before 2026-11-05. Both sessions die without it.
- [x] Set this semester to `active` in [semesters/README.md](../README.md). (Classes began 2026-08-24.)

## Run (every week)

- [ ] Before the meeting: read the week's card in [sessions/](sessions/README.md) and [meeting-algorithm.md](../../docs/03-playbooks/meeting-algorithm.md).
- [ ] After the meeting: `scripts/new-meeting.sh 2026-fall YYYY-MM-DD`, fill in attendance count, receipt count, decisions, action items, commit within 48 hours.
- [ ] If a phase ran long or a rep failed, edit the session card. The card is the maintained copy.
- [ ] Any binding decision (money, policy, event go/no-go, template change) gets an entry in the [decision log](../../docs/01-governance/decision-log.md) the same week.
- [ ] Event gets a yes: `scripts/new-event.sh 2026-fall YYYY-MM-DD slug`, fill `plan.md`, confirm the calendar row the script added. Walk through [event-checklist.md](../../docs/02-operations/event-checklist.md).
- [ ] Event done: fill `retro.md` within a week, update `budget.md` with what was actually spent.
- [ ] Money moved: add a row to `budget.md`, hand the receipt to the treasurer, follow [reimbursements.md](../../docs/02-operations/reimbursements.md).
- [ ] Look at `calendar.md` for anything due in the next 4 weeks.
- [ ] Run `scripts/check.sh` before opening a PR.

## Close (last 2 weeks)

- [ ] Update the end-of-semester column in `roster.md`.
- [ ] Reconcile `budget.md`: every planned row has a spent amount or `0`, every reimbursement has a status.
- [ ] Write `retrospective.md`. Numbers first, then what to change.
- [ ] Hold elections if they are due. Log the result in the decision log. Update `MAINTAINERS.md` and `roster.md`. See [elections.md](../../docs/00-charter/elections.md).
- [ ] Write `handoff.md`. Transfer every account listed there and tick the row when the new holder has logged in.
- [ ] Run `scripts/check.sh --strict`. Every template fill marker (the HTML comments the templates carry) left in this folder is either filled in or replaced with `[TBD]`.
- [ ] Create next semester's folder: `scripts/new-semester.sh 2027-spring`.
- [ ] Set this semester to `closed` and the next one to `planning` in [semesters/README.md](../README.md).
- [ ] Open one PR titled `close 2026-fall`. Outgoing team opens it, incoming team reviews and merges. See [handoff-procedure.md](../../docs/01-governance/handoff-procedure.md).

A semester is not done until `retrospective.md` and `handoff.md` are filled in and the next folder exists.
