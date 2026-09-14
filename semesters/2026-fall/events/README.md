# Events - Fall 2026

One folder per event, named `YYYY-MM-DD-slug` (for example `2027-03-10-club-rush`). Each folder has three files:

| File | Written | Purpose |
|---|---|---|
| `plan.md` | before | what, when, where, who, budget line, room booking, announcement |
| `run-sheet.md` | day before | minute-by-minute for the day, who does what, what to bring |
| `retro.md` | within a week after | attendance, cost, what to change |

## Planned this semester

From [goals.md](../goals.md). No folder exists until an event has a go decision; create it with the script below and the calendar row appears on its own.

| Target window | Event | Playbook | Folder |
|---|---|---|---|
| 2026-09-15 and 2026-09-16 | Club Rush (time and table location [TBD] with Student Activities; the table QR code points at the [landing page](../landing-page/README.md)) | [club-rush.md](../../../docs/03-playbooks/club-rush.md) | not yet |
| [TBD] | Guest speaker or workshop in BLCIS (50+ target) | [guest-speaker.md](../../../docs/03-playbooks/guest-speaker.md), [workshop.md](../../../docs/03-playbooks/workshop.md) | not yet |
| [TBD] | Modular Impact Sprint dry run | [workshop-modular-impact-sprint.md](../../../docs/03-playbooks/workshop-modular-impact-sprint.md) | not yet |
| Oct 1 to Dec 31 | DevFest 2026 (hosted or attended) | [devfest.md](../../../docs/03-playbooks/devfest.md) | not yet |
| 2026-12-10 | Demo Day (the last weekly meeting, run as a public event) | [demo-day.md](../../../docs/03-playbooks/demo-day.md), [session card](../sessions/2026-12-10-demo-day.md) | not yet |

## Events and the weekly meeting are different things

The weekly Thursday meeting is deliberately non-technical and aimed at every major: see [sessions/](../sessions/README.md) and [meeting-algorithm.md](../../../docs/03-playbooks/meeting-algorithm.md). Anything technical this term runs as a separate published event in this folder, announced from the meeting as the next rung.

That is a decision, not an accident. The Modular Impact Sprint and DevFest are the club's on-ramp for people who want to build; keeping them out of the weekly slot is what lets a nursing or business student attend fourteen meetings without ever being the least equipped person in the room. Log any change to that in the [decision log](../../../docs/01-governance/decision-log.md).

Demo Day on 2026-12-10 is the one overlap: it is both the last weekly meeting and a published Bevy event with guests. It has a session card and an event folder.

## Create a folder

From the repo root:

```sh
scripts/new-event.sh 2026-fall YYYY-MM-DD slug
```

It copies [event-plan.md](../../../templates/event-plan.md), [event-run-sheet.md](../../../templates/event-run-sheet.md), and [event-retro.md](../../../templates/event-retro.md) from `templates/`, adds a row to [calendar.md](../calendar.md), and refuses to overwrite an existing folder. Slugs are lowercase words joined by hyphens.

## Before the event

Walk the [event checklist](../../../docs/02-operations/event-checklist.md). The advisor books the room ([room-booking.md](../../../docs/02-operations/room-booking.md)). If ASRCC money is involved, the plan names the budget line and the event acknowledges ASRCC. Publish on Bevy before announcing anywhere else ([bevy-event-publishing.md](../../../docs/03-playbooks/bevy-event-publishing.md)).

## Playbooks

Repeatable event types have a playbook in [docs/03-playbooks/](../../../docs/03-playbooks/README.md). Start from the playbook, then fill `plan.md` with this semester's specifics.

## Photos and media

Photos of people need written consent before they go anywhere public. Large files go in the club's shared drive and get linked from `retro.md`; nothing over 1 MB is committed here.
