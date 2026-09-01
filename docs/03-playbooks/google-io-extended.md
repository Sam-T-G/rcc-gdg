# Playbook: Google I/O Extended

## Purpose

Google I/O Extended is the community-led counterpart to Google I/O, Google's annual developer conference. GDG chapters host it. Formats on the official hub: watch parties, meetups, technical talks in local languages, and Q&A with Google Developer Experts. For RCC the simplest version is a keynote watch party in the week of I/O, followed by a recap meetup where members try one thing announced at the conference.

## When

The I/O Extended season runs May through August. Event listings on Bevy suggested 2026 chapter events ran from mid May to late August (not confirmed on an official season page). Google I/O itself usually falls in May, which is inside RCC's spring semester (spring classes end in early June; the exact date is in that semester's `calendar.md`). Summer is quiet on campus, so plan two touchpoints:

| Event | Window | Date |
|---|---|---|
| Watch party (keynote) | I/O week, May | [TBD: set once Google announces I/O 2027] |
| Recap meetup (hands-on) | one to three weeks after I/O, before spring finals (dates in the semester `calendar.md`) | [TBD] |
| Optional summer session | June to August, if enough members are around | [TBD] |

The Spring 2026 chapter calendar had "Google I/O and GDG Summit" on May 18, 2026 (see [semesters/2026-spring/calendar.md](../../semesters/2026-spring/calendar.md)).

Google I/O 2027 dates: [TBD]. Check https://io.google/ and the I/O Extended hub on Bevy when the season opens.

## Owner role

| Role | Does |
|---|---|
| Event lead (one organizer) | Dates, room, Bevy event, stream setup, recap agenda |
| Tech runner | Stream on the projector, audio, backup hotspot |
| Advisor | Attends; required for on-campus club events |

## Bevy conventions

- Put "Google I/O Extended" in the event title, the way other chapters do: "Google I/O Extended Riverside City College 2027".
- Publish on Bevy before anywhere else ([bevy-event-publishing.md](bevy-event-publishing.md)). The Bevy hub lists chapter events so people outside the club can find and RSVP.
- If you enable the virtual option, Bevy auto checks in anyone who joins from 15 minutes before start until the end.
- Attendees consent to recording under the GDG Event Participation Terms by attending. Photos of people still need written consent before they go anywhere public ([privacy policy](../01-governance/privacy-and-public-repo-policy.md)).

## T-minus checklist (watch party)

- [ ] T-6 weeks: confirm the I/O keynote date and Pacific time. Log the event go/no-go in the [decision log](../01-governance/decision-log.md).
- [ ] T-6 weeks: advisor books a room with a projector and good audio in 25Live, at least two weeks ahead ([room-booking.md](../02-operations/room-booking.md)). The keynote may run outside the Thursday 2:30 PM slot, so check the room's availability for the actual time. If the keynote is during class hours, a delayed replay later the same day is fine.
- [ ] T-5 weeks: Student Activities Event Form; Food Authorization form if serving food ([event-checklist.md](../02-operations/event-checklist.md)).
- [ ] T-4 weeks: publish on Bevy with "Google I/O Extended" in the title; then Discord, Instagram, classroom announcements ([communications.md](../02-operations/communications.md)).
- [ ] T-2 weeks: create the event folder with `scripts/new-event.sh`; fill in the [plan](../../templates/event-plan.md) and [run sheet](../../templates/event-run-sheet.md).
- [ ] T-1 week: test the stream on the room's network. Have a phone hotspot as backup. Test audio at room volume.
- [ ] T-1 week: prepare a one-page "bingo" or prediction sheet (products, words the keynote will say). Cheap, and it keeps a two-hour stream engaging.
- [ ] T-2 days: order food to the checked-in average from past events, not the RSVP count.
- [ ] T-1 day: print the ASRCC acknowledgement sign if anything is funded from the request.

## Day-of run sheet (watch party)

| Time | What | Who |
|---|---|---|
| -0:45 | Room open; stream tested on projector; audio check; hotspot ready | Tech runner |
| -0:20 | Bevy check-in at the door; bingo sheets handed out | Event lead |
| -0:05 | Welcome; what I/O is; how the club follows up with a recap meetup | Event lead |
| 0:00 | Keynote stream | Everyone |
| keynote end | 15-minute discussion: what mattered for students; vote on the recap topic | Event lead |
| +0:20 | Announce the recap date; Bevy link on screen; room reset | Event lead |

If the stream fails: switch to the hotspot; if that fails, run the recap discussion early using the I/O website's session list on a laptop.

## Recap meetup (60 minutes)

| Time | What |
|---|---|
| 0:00 | Check-in; 5-minute recap of the three announcements members voted on |
| 0:10 | Hands-on: everyone tries one new thing (a codelab, a new AI Studio feature, a new API) using the [workshop playbook](workshop.md) format |
| 0:50 | Show and tell; one sentence per person |
| 0:55 | Where to find recorded I/O sessions; how to join the Bevy chapter |

Pick the codelab from the official I/O session list after the keynote; do not commit to one in advance.

## After

- [ ] Export registered vs checked-in from Bevy for both events; counts go in `semesters/<term>/retrospective.md`
- [ ] Fill in `retro.md` in the event folder within two weeks
- [ ] Post a recap with #GDGOnCampus; tag the chapter page
- [ ] Receipts to the treasurer ([reimbursements.md](../02-operations/reimbursements.md))
- [ ] If this landed in summer, note in the fall handoff whether summer events are worth repeating

## Budget shape

No dedicated line in the FY 2026-27 ASRCC request. Food and printing come from the "Google Guest Speakers & Workshops" line ($2,000 for the year: transportation 500, lodging 500, meals 600, marketing/swag 200, technology 100, supplies 100), shared with every other workshop. The stream itself costs nothing.

| Item | Cost | Source |
|---|---|---|
| Food for a two-hour watch party | [TBD] | Workshops line, meals |
| Bingo sheets, ASRCC sign | [TBD] | Workshops line, supplies |
| Adapter or speaker if the room lacks audio | [TBD] | Workshops line, technology |

Acknowledge ASRCC at the event if anything came from the request ([asrcc-funding.md](../02-operations/asrcc-funding.md)).

## Sources (last verified 2026-08-24)

- I/O Extended hub on Bevy (formats, hosted by GDG chapters): https://gdg.community.dev/ioextended/
- Google Developers Blog, June 2023: season runs May through August: https://developers.googleblog.com/google-io-extended-watch-parties-upcoming-meetups/
- 2026 chapter events on Bevy appeared to run mid May to late August (from search listings of event pages, not loaded and not an official season page)
- GDG Event Participation Terms: https://gdg.community.dev/participation-terms/
