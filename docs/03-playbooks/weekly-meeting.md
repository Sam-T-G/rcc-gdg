# Weekly meeting

## Purpose

The weekly meeting is the club's heartbeat. It is where members hear what is coming, work on something together, and where attendance gets counted. A meeting that runs on time with one clear activity beats a long one with a full agenda.

## When

Wednesdays, 10:00 AM, BLCIS A-103. Plan for 50 minutes unless the semester calendar says otherwise. Skip weeks with no classes; holidays, breaks, and finals are in the semester `calendar.md` (for Fall 2026, [semesters/2026-fall/calendar.md](../../semesters/2026-fall/calendar.md)).

## Owner

Lead organizer sets the agenda. A rotating facilitator runs the room. The secretary (or whoever volunteers) takes notes and does Bevy check-in.

## T-minus checklist

### T-7 days

- [ ] Pick one activity for the meeting (a short talk, a build-along, a planning session, or a guest). One is enough.
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
| 9:50 | Open the room, projector on, Bevy check-in page open on a laptop or phone | Facilitator, note-taker |
| 10:00 | Start on time even with three people. Welcome, one-sentence purpose of today | Facilitator |
| 10:03 | Announcements: upcoming events with dates, what needs volunteers, anything ASRCC or ICC related | Lead organizer |
| 10:08 | New people introduce themselves (name, what they want to build or learn) | Facilitator |
| 10:12 | The activity | Whoever is leading it |
| 10:42 | Wrap: what happens next week, one ask (join Discord, RSVP on Bevy, sign up for something) | Facilitator |
| 10:45 | Check-in sweep: anyone not yet checked in on Bevy gets checked in now | Note-taker |
| 10:50 | Room reset, out | Everyone |

Check-in on Bevy is manual for in-person events: toggle the checkbox in the registration table, use the "Check-in attendees" page, or swipe right on the name in the Organizer App. Bevy stores only the last check-in time. Details in [attendance-tracking.md](../02-operations/attendance-tracking.md).

## After

- [ ] Finish the meeting notes the same day: decisions, action items with an owner role and a date, attendance count (a number, not names).
- [ ] Any binding decision made in the meeting gets a one-paragraph entry in [decision-log.md](../01-governance/decision-log.md).
- [ ] Post action items in Discord.
- [ ] Open a PR with the notes. One meeting per PR is fine; a week's worth batched is also fine.

## Notes on cadence

Google describes the organizer role as hosting events "typically on a monthly basis." Weekly meetings do not need to be Bevy events, but at least one event per month of instruction should be published on Bevy so registrations and check-ins show up in chapter analytics.
