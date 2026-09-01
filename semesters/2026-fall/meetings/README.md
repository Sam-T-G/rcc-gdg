# Meetings - Fall 2026

One file per meeting, named by date: `YYYY-MM-DD.md`. Regular slot: Thursdays, 2:30 to 3:30 PM, BLCIS A-210 Simulation Lab.

Instruction Thursdays this semester: August 27 through December 10, minus November 26 (no-class week) and December 17 (finals). August 27 passed before this plan existed, which leaves 14 meetings, September 3 through December 10. Each one has a facilitator script in [sessions/](../sessions/README.md); this folder holds the notes written afterwards.

## Create a file

From the repo root:

```sh
scripts/new-meeting.sh 2026-fall YYYY-MM-DD
```

It copies [templates/meeting-notes.md](../../../templates/meeting-notes.md) into this folder and refuses to overwrite an existing file. Commit the notes within 48 hours of the meeting.

## What goes in the notes

- Attendance as a count, never a list of names.
- Decisions. Anything binding also gets a [decision-log](../../../docs/01-governance/decision-log.md) entry.
- Action items with an owner (role) and a date.
- Links to event folders or project folders touched.

## What stays out

Names of members, contact details, anything a member said that they would not want public. This repo is public. See [privacy-and-public-repo-policy.md](../../../docs/01-governance/privacy-and-public-repo-policy.md).

Meeting playbook: [weekly-meeting.md](../../../docs/03-playbooks/weekly-meeting.md).
