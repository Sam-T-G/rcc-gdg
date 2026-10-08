# Weekly meeting

## Purpose

The weekly meeting is the club's heartbeat. It is where members hear what is coming, practise something together, and where attendance gets counted. A meeting that runs on time with one clear activity beats a long one with a full agenda.

This file is the logistics: room, announcement, check-in, notes. **How the hour itself is built is [meeting-algorithm.md](meeting-algorithm.md)**: the fixed phases, the five laws, the arc pacing, and the critique protocol. Read that once before facilitating. Each term's sessions instantiate it in `semesters/<term>/sessions/` (for Fall 2026, [sessions/](../../semesters/2026-fall/sessions/README.md)).

## When

Thursdays, 2:30 to 3:30 PM, BLCIS A-210 Simulation Lab. A full 60 minutes; the block in [meeting-algorithm.md](meeting-algorithm.md) uses all of it. Skip weeks with no classes; holidays, breaks, and finals are in the semester `calendar.md` (for Fall 2026, [semesters/2026-fall/calendar.md](../../semesters/2026-fall/calendar.md)).

ACM has the same room until 2:30, so setup starts at 2:25 and the first two minutes are furniture. Confirm the handoff with ACM officers each term.

## Owner

Lead organizer sets the agenda. A rotating facilitator runs the room. The secretary (or whoever volunteers) takes notes and does Bevy check-in.

## T-minus checklist

### T-7 days

- [ ] Pick the session card for this week from `semesters/<term>/sessions/`. If the term has no card for it, write one before the meeting rather than improvising; the format is in [meeting-algorithm.md](meeting-algorithm.md).
- [ ] Confirm the room is still booked for the semester with the advisor. Students cannot submit 25Live requests; see [room-booking.md](../02-operations/room-booking.md).
- [ ] If the meeting is a workshop or has a guest, use that playbook instead: [workshop.md](workshop.md) or [guest-speaker.md](guest-speaker.md).

### T-3 days

- [ ] Create the Bevy event if this meeting is one the club wants counted (see [bevy-event-publishing.md](bevy-event-publishing.md)). Recurring meetings still need an event each week for check-in to work.
- [ ] Post the meeting in Discord and, if there is a flyer, on Instagram. Use [templates/announcement.md](../../templates/announcement.md).
- [ ] Run `scripts/new-meeting.sh` to create `semesters/<term>/meetings/YYYY-MM-DD.md` from [templates/meeting-notes.md](../../templates/meeting-notes.md). Fill in the agenda.

### T-1 day

- [ ] Facilitator confirms they have slides or the activity ready and has tested the projector connection type (HDMI, USB-C, adapter).
- [ ] Note-taker confirms they can open the Bevy dashboard or the Organizer App and see the event.

## Day-of run sheet

| Time | What | Who |
|---|---|---|
| 2:25 | Room handed over from ACM. Furniture, projector on, arrival prompt up, Bevy check-in open on a laptop or phone | Facilitator, note-taker |
| 2:30 | Open. Dates and asks only, hard stop at 2:35. Start on time even with three people | Lead organizer |
| 2:35 | Warm rep. Pairs, everyone speaks | Facilitator |
| 2:42 | The Rep. The week's skill, practised | Facilitator |
| 3:00 | Live fire. Two or three volunteers in front of the room, on a timer | Facilitator |
| 3:12 | Debrief, then name the rung | Facilitator |
| 3:22 | The Ask: one action due before next Thursday | Facilitator |
| 3:27 | Check-in sweep: anyone not yet checked in on Bevy gets checked in now. Room reset, out | Note-taker |

Phase contents come from the week's session card. The clock does not move; only the content does. Full rationale, the five laws, and the failure modes are in [meeting-algorithm.md](meeting-algorithm.md).

Check-in on Bevy is manual for in-person events: toggle the checkbox in the registration table, use the "Check-in attendees" page, or swipe right on the name in the Organizer App. Bevy stores only the last check-in time. Details in [attendance-tracking.md](../02-operations/attendance-tracking.md).

## After

- [ ] Finish the meeting notes the same day: decisions, action items with an owner role and a date, attendance count (a number, not names), and the receipt count if the session had one.
- [ ] If a phase ran long or a rep failed, edit the session card. The card is the maintained copy, not your notes.
- [ ] Any binding decision made in the meeting gets a one-paragraph entry in [decision-log.md](../01-governance/decision-log.md).
- [ ] Post action items in Discord.
- [ ] Open a PR with the notes. One meeting per PR is fine; a week's worth batched is also fine.

## Notes on cadence

Google describes the organizer role as hosting events "typically on a monthly basis." Weekly meetings do not need to be Bevy events, but at least one event per month of instruction should be published on Bevy so registrations and check-ins show up in chapter analytics.
