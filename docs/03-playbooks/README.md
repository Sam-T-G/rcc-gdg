# Playbooks

A playbook is a runbook for one kind of event: who owns it, what to do at T-minus dates, the day-of run sheet, and what to do after. They hold no dates or names. Dated copies of each run (plan, run sheet, retro) live under `semesters/<YYYY-term>/events/`; create them with [scripts/new-event.sh](../../scripts/new-event.sh).

Every event, whatever the playbook, goes through [bevy-event-publishing.md](bevy-event-publishing.md) first and the campus paperwork in [docs/02-operations/event-checklist.md](../02-operations/event-checklist.md).

## Index

| Playbook | Use it when | Owner role | Lead time |
|---|---|---|---|
| [weekly-meeting.md](weekly-meeting.md) | Every regular meeting (Wednesdays, 10:00 AM, BLCIS A-103) | Lead organizer, rotating facilitator | 1 week |
| [bevy-event-publishing.md](bevy-event-publishing.md) | Any event, before it is announced anywhere | Whoever leads the event | Same day |
| [workshop.md](workshop.md) | A hands-on session with a tool or topic (past examples: "How to Vibe Code Like a Pro", "Level Up Your Personal Brand") | Workshop lead | 3 weeks |
| [workshop-modular-impact-sprint.md](workshop-modular-impact-sprint.md) | The 40-minute Google AI Studio build session; the Solutions Challenge kickoff | Workshop lead | 3 weeks |
| [club-rush.md](club-rush.md) | The campus club fair at the start of each semester | Outreach lead | 4 weeks |
| [guest-speaker.md](guest-speaker.md) | A Googler, alum, or industry guest presents on campus | Event lead | 6 weeks |
| [solutions-challenge.md](solutions-challenge.md) | The spring Google Solutions Challenge season, kickoff to submission | Program lead | Season (Feb to Apr) |
| [demo-day.md](demo-day.md) | End-of-semester project presentations | Program lead | 4 weeks |
| [google-io-extended.md](google-io-extended.md) | Watch party or meetup during the I/O Extended season (May to August) | Event lead | 3 weeks |
| [devfest.md](devfest.md) | The chapter's DevFest event (season October to December) | Event lead | 8 weeks |
| [silicon-valley-trip.md](silicon-valley-trip.md) | The Googleplex, Stanford, and SJSU trip from the ASRCC request | Trip lead, advisor | 12 weeks |

Owner roles are defined in [docs/00-charter/officer-roles.md](../00-charter/officer-roles.md). If a role is vacant, the lead organizer owns the playbook until someone takes it.

## How to use a playbook

1. Read the whole thing once, then work the T-minus checklist top to bottom.
2. Run `scripts/new-event.sh` to create the dated event folder. Copy the run sheet into it and edit the copy, not the playbook.
3. After the event, fill in the retro. If something in the playbook was wrong, fix the playbook in the same PR.

## Adding a playbook

Use the same section order as the others: Purpose, When, Owner, T-minus checklist, Day-of run sheet, After. Add a "What went wrong before" section only when a real retro in `semesters/` backs it, and link that retro. Add a row to the table above and open a PR (see [CONTRIBUTING.md](../../CONTRIBUTING.md)).
