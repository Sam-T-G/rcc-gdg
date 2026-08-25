# Events - Spring 2026

One folder per event, named `YYYY-MM-DD-slug` (for example `2027-03-10-club-rush`). Each folder has three files:

| File | Written | Purpose |
|---|---|---|
| `plan.md` | before | what, when, where, who, budget line, room booking, announcement |
| `run-sheet.md` | day before | minute-by-minute for the day, who does what, what to bring |
| `retro.md` | within a week after | attendance, cost, what to change |

## This semester's events

Five events from the chapter calendar. The folders were created after the semester from the calendar, so plans are reconstructions and retros are skeletons. Anything not on the calendar is `[TBD]`.

| Date | Folder | Playbook | Retro filled |
|---|---|---|---|
| 2026-03-10 | [club-rush](2026-03-10-club-rush/plan.md) | [club-rush.md](../../../docs/03-playbooks/club-rush.md) | no |
| 2026-03-25 | [vibe-code-workshop](2026-03-25-vibe-code-workshop/plan.md) ("How to Vibe Code Like a Pro") | [workshop.md](../../../docs/03-playbooks/workshop.md) | no |
| 2026-04-01 | [team-creation-day](2026-04-01-team-creation-day/plan.md) ("Tech Startups and Solving Problems: Team Creation Day") | [solutions-challenge.md](../../../docs/03-playbooks/solutions-challenge.md) | no |
| 2026-04-22 | [million-dollar-pitch](2026-04-22-million-dollar-pitch/plan.md) | [TBD: no pitch playbook yet; write one from the retro] | no |
| 2026-06-03 | [demo-day](2026-06-03-demo-day/plan.md) | [demo-day.md](../../../docs/03-playbooks/demo-day.md) | no |

## Create a folder

From the repo root:

```sh
scripts/new-event.sh 2026-spring YYYY-MM-DD slug
```

It copies [event-plan.md](../../../templates/event-plan.md), [event-run-sheet.md](../../../templates/event-run-sheet.md), and [event-retro.md](../../../templates/event-retro.md) from `templates/`, adds a row to [calendar.md](../calendar.md), and refuses to overwrite an existing folder. Slugs are lowercase words joined by hyphens.

## Before the event

Walk the [event checklist](../../../docs/02-operations/event-checklist.md). The advisor books the room ([room-booking.md](../../../docs/02-operations/room-booking.md)). If ASRCC money is involved, the plan names the budget line and the event acknowledges ASRCC. Publish on Bevy before announcing anywhere else ([bevy-event-publishing.md](../../../docs/03-playbooks/bevy-event-publishing.md)).

## Playbooks

Repeatable event types have a playbook in [docs/03-playbooks/](../../../docs/03-playbooks/README.md). Start from the playbook, then fill `plan.md` with this semester's specifics.

## Photos and media

Photos of people need written consent before they go anywhere public. Large files go in the club's shared drive and get linked from `retro.md`; nothing over 1 MB is committed here.
