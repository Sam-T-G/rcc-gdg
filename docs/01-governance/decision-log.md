# Decision log

One row per binding decision: budget, policy, event go/no-go, template change, or anything else the club would want to remember the reason for. This is rule 5 in [maintenance-rules.md](maintenance-rules.md).

## How to add an entry

1. Propose the decision in the meeting or in an issue (use the `Decision` issue template).
2. When it is decided, add a row to the table below in the same PR that implements it (or in its own PR if nothing else changes).
3. Keep the row to one paragraph. Say what was decided and why, in a sentence or three. If it needs more, fill [templates/decision-record.md](../../templates/decision-record.md), commit it in the semester folder where the decision was made with the date in the filename, and link it from the row.
4. The "Who" column is the deciding body or role (officer meeting, treasurer, general membership vote). Use a person's name only if they have consented to appear in the repo (see [privacy-and-public-repo-policy.md](privacy-and-public-repo-policy.md)).
5. The "Link" column points at the evidence: the PR, the issue, the meeting note under `semesters/<YYYY-term>/meetings/`, or the decision record.

Newest entries at the top. Do not edit or delete old rows; if a decision is reversed, add a new row that says so and links back.

## Log

| Date | Decision | Who | Link |
| --- | --- | --- | --- |
| 2026-08-24 | Template change: `semesters/_template/events/README.md` now says to publish on Bevy before announcing anywhere else, matching [bevy-event-publishing.md](../03-playbooks/bevy-event-publishing.md). The Fall 2026 copy already carried the sentence; the Spring 2026 copy was updated to match. | Sam Gerungan | [semesters/_template/events/README.md](../../semesters/_template/events/README.md) |
| 2026-08-24 | The repo has one admin (@Sam-T-G), which violates rule 7. Interim plan: the owner adds the second student organizer as a write collaborator and fills the Repo admin 2 row in [MAINTAINERS.md](../../MAINTAINERS.md) as soon as that organizer's consent to be named is on file, and in any case before the Fall 2026 close PR opens (target 2026-12-04 in [calendar.md](../../semesters/2026-fall/calendar.md)). Until then the advisor is the fallback contact once listed. | Sam Gerungan | [MAINTAINERS.md](../../MAINTAINERS.md) |
| 2026-08-24 | Repository created and its structure adopted: evergreen material in `docs/`, one folder per semester under `semesters/`, templates and scripts for creating semester, event, and meeting files, and the ten maintenance rules in [maintenance-rules.md](maintenance-rules.md). The repo is public under CC BY 4.0 for content. | Sam Gerungan | <https://github.com/Sam-T-G/rcc-gdg> |
