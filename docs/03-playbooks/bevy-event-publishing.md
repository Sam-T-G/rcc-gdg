# Bevy event publishing

## Purpose

Bevy (gdg.community.dev) is the chapter's system of record. RSVPs, check-ins, attendance analytics, member badges, live streams, recordings, and the recording consent in the GDG Participation Terms all flow from a Bevy event. Publish on Bevy first; announce everywhere else second.

Chapter page: https://gdg.community.dev/gdg-on-campus-riverside-city-college-riverside-united-states/

## When

Before any event is announced in Discord, on Instagram, or in a classroom. Same day as the decision to run it. Weekly meetings can be Bevy events too; at least one event per month of instruction should be.

## Owner

Whoever leads the event creates it. Any organizer with dashboard access can publish; the lead organizer keeps the list of who has access in [MAINTAINERS.md](../../MAINTAINERS.md).

## Before you start: what you need

| Item | Where it comes from |
|---|---|
| Title | See naming below |
| Date, start time, end time | The event plan |
| Venue | Room name and building (weekly slot is BLCIS A-103); the campus address on past events is 4800 Magnolia Avenue, Riverside 92506 |
| Description | Two or three sentences plus the standard footer below |
| Format | In person, virtual, or hybrid. Virtual and hybrid events give attendees a stream and a recording |
| Cover image | A brand-compliant image from [`assets/`](../../assets/) or the GDG on Campus template deck ([brand.md](../04-brand/brand.md)) |
| Ticket | Free RSVP. Set a capacity equal to the room limit |

## Naming

- Plain events: what it is, in a few words. "How to Vibe Code Like a Pro", "Demo Day".
- Google program events use Google's program name in the title so they show up in program listings: "Google I/O Extended", "DevFest", "Build with AI", "Solution Challenge". Example: "DevFest Riverside City College 2026".
- Do not put "Google" in front of the chapter name. The chapter is "GDG on Campus Riverside City College" (naming rules in [brand.md](../04-brand/brand.md)).

## Standard description footer

Paste at the end of every description:

> GDG on Campus Riverside City College is an independent group; our activities and the opinions expressed here should in no way be linked to Google, the corporation. By RSVPing you agree to the GDG Event Participation Terms (https://gdg.community.dev/participation-terms/), which include consent to being recorded. Questions: ask an organizer in Discord.

If ASRCC funded the event, add: "Funded in part by ASRCC."

## Checklist: publishing

- [ ] Log in to the chapter dashboard with your organizer account.
- [ ] Create the event. Title, date, time, venue, format, description with footer, cover image, free ticket with capacity.
- [ ] If check-in by QR code is wanted, confirm QR codes in ticket emails are turned on. That is an admin-level setting; if you cannot find it, plan on name check-in instead.
- [ ] Preview the event page on a phone. Check the time zone reads Pacific.
- [ ] Publish. Copy the event URL.
- [ ] Only now post to Discord and Instagram with the Bevy link as the RSVP button ([communications.md](../02-operations/communications.md)).
- [ ] Add the event to the semester `calendar.md` with the Bevy URL.

## Checklist: day of

- [ ] Open check-in before the doors open. Three ways: the checkbox in the registration table, the "Check-in attendees" page from the profile menu, or the Bevy Organizer App (swipe right on a name, or scan the ticket QR).
- [ ] Add walk-ins on the spot. The Organizer App can add an attendee manually.
- [ ] Virtual attendees check in automatically when they join between 15 minutes before start and the end.
- [ ] Do a final sweep before people leave. Bevy keeps only the last check-in time, so a second check-in does no harm.

Full attendance procedure: [attendance-tracking.md](../02-operations/attendance-tracking.md).

## Checklist: after

- [ ] Within a week, export the attendee list (Chapter Dashboard > Events > the event > Attendees tab, CSV or PDF). Record two numbers in the event folder: registered and checked in. Counts only; the CSV holds names and emails and never goes in the repo.
- [ ] Event Analytics (registrations by day, attendance by hour, registered-but-did-not-attend) refreshes every 2 hours, so check it the next day, not the same hour. The dashboard defaults to a 30-day window; widen it for older events.
- [ ] Optional: send a chapter newsletter segmented to "Attendees who checked in" (thanks plus next event) or "did not check in" (recording link).
- [ ] If the event was recorded, post the link in Discord.

## Quirks worth knowing

- Ad blockers can break the analytics page by blocking `/api/analytics`. Turn the blocker off for gdg.community.dev.
- Recurring weekly meetings still need one Bevy event each week; there is no recurring-event shortcut in this playbook.
- Bevy shares RSVP data with organizers for event administration only. Treat exports like any other personal data: never commit them, delete local copies after counting.

## Bevy help articles

These open in a browser. The repo link checker cannot fetch help.bevy.com (it returns 403 to bots). If a link check reports these as broken, exclude the host in `lychee.toml` rather than removing the links, and verify them by hand.

| Topic | URL |
|---|---|
| Event Registration Management (check-in methods) | https://help.bevy.com/hc/en-us/articles/1500001761601-Event-Registration-Management |
| Bevy Organizer App | https://help.bevy.com/hc/en-us/articles/360060373794-How-to-use-the-Bevy-Organizer-App |
| Event reports (attendee export) | https://help.bevy.com/hc/en-us/articles/4407283568279-Event-reports |
| Event Analytics | https://help.bevy.com/hc/en-us/articles/16741852181143-Event-Analytics |
| Send a chapter newsletter | https://help.bevy.com/hc/en-us/articles/1500001775802-Send-a-chapter-newsletter |
| GDG Event Participation Terms | https://gdg.community.dev/participation-terms/ |
