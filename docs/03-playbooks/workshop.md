# Workshop

## Purpose

A workshop is a hands-on session where every attendee leaves with something they made or can now do. Past chapter workshops: "Level Up Your Personal Brand: Professional Development Workshop" (Dec 5, 2025), "How to Vibe Code Like a Pro" (Mar 25, 2026), and the 40-minute AI Studio sprint in [workshop-modular-impact-sprint.md](workshop-modular-impact-sprint.md).

This playbook covers logistics and structure for any workshop. The content outline lives in [templates/workshop-outline.md](../../templates/workshop-outline.md).

## When

Any regular meeting slot (Thursdays, 2:30 to 3:30 PM, BLCIS A-210 Simulation Lab) or a separately booked slot when the workshop needs more than 50 minutes. Aim for at least one workshop a month during instruction.

## Owner

Workshop lead: the person who will actually teach it. A second organizer handles the room, check-in, and the clock so the lead only teaches.

## T-minus checklist

### T-3 weeks

- [ ] Open a workshop proposal issue (`.github/ISSUE_TEMPLATE/workshop-proposal.yml`) with topic, audience level, tool requirements, and a one-line outcome ("attendees leave with a deployed app").
- [ ] Decide the format: build-along (everyone follows on their own laptop), demo plus exercise, or a short talk plus lab time.
- [ ] Confirm the room and date with the advisor. If the room or time differs from the weekly slot, the advisor submits 25Live at least 2 weeks ahead ([room-booking.md](../02-operations/room-booking.md)).
- [ ] Run `scripts/new-event.sh` to create the event folder and fill in [templates/event-plan.md](../../templates/event-plan.md).

### T-2 weeks

- [ ] Publish the Bevy event ([bevy-event-publishing.md](bevy-event-publishing.md)). Put account setup steps in the description so people arrive ready (for example: "Bring a laptop and a Google account signed in to Google AI Studio").
- [ ] Announce in Discord and Instagram; ask faculty to mention it in class if the topic fits a course.
- [ ] Draft the outline from [templates/workshop-outline.md](../../templates/workshop-outline.md). Every 10-minute block should have one thing attendees do, not only something they watch.
- [ ] If food is planned, the advisor files the Food Authorization form with the Student Activities Event Form ([event-checklist.md](../02-operations/event-checklist.md)).

### T-1 week

- [ ] Dry run the whole workshop once, timed, on the network the room will actually use. Note every step that needs an account, a download, or a sign-in.
- [ ] Prepare a fallback for each dependency: a downloaded copy of slides, a finished example project, a phone hotspot.
- [ ] Reminder post with the prep steps.

### T-1 day

- [ ] Check RSVPs on Bevy. If registrations are far below room size, do one more push in Discord.
- [ ] Load the outline, slides, and any starter files onto the presenting laptop. Test the projector adapter.

## Day-of run sheet

| Time (from start) | What | Who |
|---|---|---|
| -0:15 | Room open, projector on, Bevy check-in ready, prep steps on screen for early arrivals | Second organizer |
| 0:00 | Start. What we are building, what you will have at the end, how to ask for help | Workshop lead |
| 0:03 | Everyone confirms they have the tool open. Pair anyone stuck with a neighbor and move on | Second organizer |
| 0:05 | Block 1: teach, then do | Workshop lead |
| 0:20 | Block 2 | Workshop lead |
| 0:35 | Block 3, or catch-up time if the room is behind | Workshop lead |
| 0:45 | Show and tell: two or three attendees show what they made | Workshop lead |
| 0:50 | Wrap: where to go next, one ask (RSVP the next event, join Discord) | Workshop lead |
| 0:52 | Check-in sweep on Bevy | Second organizer |

Timing rule from the sprint playbook: if you are behind, cut the last block and assign it as homework. Do not speed through it.

## After

- [ ] Export registered vs checked-in counts from Bevy (Events > this event > Attendees). Record counts only in the event folder.
- [ ] Fill in [templates/event-retro.md](../../templates/event-retro.md) within a week: what ran long, which step people got stuck on, what to change.
- [ ] If the workshop is worth repeating, turn the outline into its own playbook (see [README.md](README.md)) and link it from the table.
- [ ] If ASRCC funded any part of it, note the acknowledgment in the retro ([asrcc-funding.md](../02-operations/asrcc-funding.md)).
- [ ] Post any deployed links or slides in Discord.
