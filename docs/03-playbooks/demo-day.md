# Playbook: Demo Day

## Purpose

End-of-semester event where every project team shows what they built, live, to the rest of the club and invited guests. It closes the semester arc (kickoff workshop, team formation, build sessions) and gives Solutions Challenge teams a second audience after submission. It is also the best recruiting material the club produces: recordings and photos (with consent) feed next semester's Club Rush.

## When

Last instructional week before finals. The first one was June 3, 2026, two days before finals week (see [semesters/2026-spring/calendar.md](../../semesters/2026-spring/calendar.md)).

Fall finals fall in mid December and spring finals in early June. The exact finals week, and any holiday in the week before it, is in that semester's `calendar.md` (finals, holidays, breaks); the Demo Day row there carries the target week and the date once set. Worked example: the Fall 2026 rows in [semesters/2026-fall/calendar.md](../../semesters/2026-fall/calendar.md).

Use the regular Wednesday 10:00 AM slot in BLCIS A-103 if there are five teams or fewer. Book a larger room and a longer block for more teams.

## Owner role

| Role | Does |
|---|---|
| Event lead (one organizer) | Dates, room, Bevy event, run of show, team sign-ups |
| MC (a second organizer) | Keeps time on stage, introduces teams |
| Tech runner | Projector, adapters, stream or recording, backup laptop |
| Advisor | Attends; required for on-campus club events |

## Format

| Teams | Slot per team | Total |
|---|---|---|
| Up to 5 | 6 minutes demo + 2 minutes questions | 60 minutes with open and close |
| 6 to 10 | 5 minutes demo + 1 minute questions | 90 minutes |
| More than 10 | Two tracks, or split across two weeks | [TBD] |

Demo means running software with real input. Slides are limited to one title card and one "what is next" card per team. Feedback is optional; if you use judges, publish the rubric to teams two weeks ahead and score on the four criteria the India edition of the Solution Challenge published in 2026 (Technical Merit, Topic Alignment, Creative Innovation, User Experience), unless that year's official rules give different ones (see [solutions-challenge.md](solutions-challenge.md)).

## T-minus checklist

- [ ] T-6 weeks: pick the date; check it against finals and holidays. Log the go/no-go in the [decision log](../01-governance/decision-log.md).
- [ ] T-6 weeks: advisor books the room in 25Live (two weeks minimum; six is safer for a large room). Include tables, chairs, and projector in the original request ([room-booking.md](../02-operations/room-booking.md)).
- [ ] T-6 weeks: Student Activities Event Form submitted; Food Authorization form if food is served; print the 25Live confirmation and file it with the form ([event-checklist.md](../02-operations/event-checklist.md)).
- [ ] T-5 weeks: publish on Bevy first ([bevy-event-publishing.md](bevy-event-publishing.md)). Title: "Demo Day (Spring 2027)" or similar. Turn on the virtual stream if remote members will watch; Bevy checks virtual attendees in automatically from 15 minutes before start.
- [ ] T-5 weeks: announce on Discord and Instagram and through faculty classroom announcements ([communications.md](../02-operations/communications.md)).
- [ ] T-4 weeks: open team sign-ups (Google Form in the shared drive). Collect project name, team size, technologies, and whether the team consents to being recorded and photographed.
- [ ] T-3 weeks: invite guests: faculty, the advisor's department, sibling clubs, any Google contact who has spoken to the club ([guest-speaker.md](guest-speaker.md)). Guests register on Bevy like everyone else.
- [ ] T-2 weeks: publish the run of show to teams. Each team gets a slot number and a hard time.
- [ ] T-1 week: tech check in the actual room. Every team's laptop on the projector. Record adapter needs.
- [ ] T-1 week: create the event folder with `scripts/new-event.sh` and fill in [plan.md](../../templates/event-plan.md) and the [run sheet](../../templates/event-run-sheet.md).
- [ ] T-2 days: confirm Bevy RSVP count; order food to the checked-in average, not the RSVP count.
- [ ] T-1 day: print the run of show, the ASRCC acknowledgement sign (required at funded events), and a feedback QR code.

## Day-of run sheet (60-minute version)

| Time | What | Who |
|---|---|---|
| -0:30 | Room open; projector, stream, and backup laptop tested; ASRCC sign up | Tech runner |
| -0:15 | Bevy check-in at the door; teams load their demos on the presenting machine or confirm their own adapter | Event lead |
| 0:00 | Welcome, format, time rules, thanks to ASRCC and the advisor | MC |
| 0:05 | Team 1 (6 minutes demo, 2 minutes questions) | Team 1 |
| 0:13 | Team 2 | Team 2 |
| 0:21 | Team 3 | Team 3 |
| 0:29 | Team 4 | Team 4 |
| 0:37 | Team 5 | Team 5 |
| 0:45 | Audience vote or judge remarks; recognize every team by project name | MC |
| 0:52 | Next semester preview: first meeting date, how to join on Bevy and Discord | Event lead |
| 0:55 | Photos (consenting teams only), room reset | Everyone |

For the 90-minute version, drop the slot to 5 + 1 minutes and add a 5-minute break after team 5.

## Rules for presenters

- Hard stop at time. The MC stands up at the one-minute mark.
- Run the software live. If it breaks, show the recording you made at the tech check.
- Say the problem and the user before you touch the keyboard.
- One person can present or the whole team can; the whole team stands up.

## After

- [ ] Export registered vs checked-in from Bevy (Chapter Dashboard > Events > Attendees); counts go in `semesters/<term>/retrospective.md`
- [ ] Fill in `retro.md` in the event folder within two weeks: what ran late, what broke, what guests said
- [ ] Add project names and repo links to `semesters/<term>/projects/README.md` (teams that consented only)
- [ ] Recording and photos to the club shared drive; nothing with a recognizable person goes in the repo without written consent ([privacy policy](../01-governance/privacy-and-public-repo-policy.md))
- [ ] Post a recap on Instagram and Discord within a week, tagging #GDGOnCampus
- [ ] Send guests a thank-you and the Bevy chapter link
- [ ] Receipts to the treasurer for reimbursement ([reimbursements.md](../02-operations/reimbursements.md))

## Budget shape

There is no dedicated Demo Day line in the FY 2026-27 ASRCC request. Demo Day can draw on the "Google Guest Speakers & Workshops" line ($2,000 for the year), whose sub-items are transportation 500, lodging 500, meals 600, marketing/swag 200, technology 100, supplies 100. Those figures are annual and shared with every workshop, so decide early what Demo Day gets.

| Item | Cost | Source |
|---|---|---|
| Food for attendees | [TBD]; size to the checked-in average | Workshops line, meals |
| Printed run of show, ASRCC sign, feedback QR | [TBD] | Workshops line, supplies |
| Adapters (USB-C to HDMI) if the club owns none | [TBD] | Workshops line, technology |
| Certificates or small prizes | [TBD] | Workshops line, marketing/swag |

ASRCC does not fund fundraisers or personnel and requires acknowledgement at funded events ([asrcc-funding.md](../02-operations/asrcc-funding.md)).

## Sources (last verified 2026-08-24)

- Bevy check-in and reports: https://help.bevy.com/hc/en-us/articles/1500001761601-Event-Registration-Management and https://help.bevy.com/hc/en-us/articles/4407283568279-Event-reports
- GDG Event Participation Terms (attendees consent to recording by attending): https://gdg.community.dev/participation-terms/
- RCCD 2026-2027 academic calendar (finals dates): https://www.rccd.edu/admin/ed_services/documents/academic_calendars/2026_2027_Academic_Calendar.pdf
- RCC Club Advisor's Guide (25Live two weeks ahead, Event Form, Food Authorization, advisor attendance): https://www.rcc.edu/assets/documents/life-at-rcc/asrcc/forms/Club%20Advisor%20Guide.pdf
