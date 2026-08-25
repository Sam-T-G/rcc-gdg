# Meetings - Fall 2026

One file per meeting, named by date: `YYYY-MM-DD.md`. Regular slot: Wednesdays, 10:00 AM, BLCIS A-103.

Instruction Wednesdays this semester: August 26 through December 9, except November 11 (holiday) and November 25 (no-class week). That is 14 possible meetings. The first meeting date the team picks goes in [calendar.md](../calendar.md).

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
