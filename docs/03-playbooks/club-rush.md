# Club Rush

## Purpose

Club Rush is the campus club fair at the start of each semester. It is the single biggest source of new members, so the goal is simple: get every interested person into Discord and onto the Bevy chapter page before they walk away.

## When

Once per semester, near the start of instruction. RCC publishes the date through Student Activities; the chapter's Spring 2026 Club Rush was Mar 10, 2026. Fall 2026 date: [TBD]. RCC's Club Rush page (https://www.rcc.edu/life-at-rcc/events/club-rush.html) has historically placed it on Terracina Drive next to the Quad, but confirm the location each semester.

The club must be chartered and in good standing to table. Recharter paperwork goes to Student Activities within the first six weeks of the semester ([club-recognition-and-icc.md](../02-operations/club-recognition-and-icc.md)).

## Owner

Outreach lead. Every organizer takes at least one tabling shift.

## T-minus checklist

### T-4 weeks

- [ ] Confirm the Club Rush date and any table signup process with Student Activities (studentactivities@rcc.edu) or through the ICC representative.
- [ ] Confirm recharter status: club packet and roster submitted, constitution on file.
- [ ] Run `scripts/new-event.sh` for the event folder. Fill in the plan.

### T-2 weeks

- [ ] Materials list: tablecloth or banner, printed chapter logo (assets in [`assets/`](../../assets/); naming rules in [brand.md](../04-brand/brand.md)), a QR code to Discord, a QR code to the Bevy chapter page (https://gdg.community.dev/gdg-on-campus-riverside-city-college-riverside-united-states/), a sign with the meeting time and room (Wednesdays, 10:00 AM, BLCIS A-103).
- [ ] Decide the hook: something a passerby can do in under a minute at the table (a demo on a laptop, a quick poll, a sticker). Keep it to one.
- [ ] Publish the first meeting of the semester on Bevy so the QR code lands on a real event with an RSVP button ([bevy-event-publishing.md](bevy-event-publishing.md)).
- [ ] Shift schedule: two people per shift minimum, no gaps.
- [ ] If giving away anything with a Google mark on it, check [brand.md](../04-brand/brand.md) first; Google's brand rules restrict Google marks on merchandise.

### T-1 week

- [ ] Print everything. Test both QR codes on two phones.
- [ ] Post the tabling schedule in Discord and confirm each shift.
- [ ] Prepare the 20-second pitch and make sure every tabler can say it: what the club does, when it meets, what is coming up first.

### T-1 day

- [ ] Pack a box: materials, tape, pens, a sign-up fallback (paper sheet asking only for first name and RCC email, kept by the outreach lead and not committed anywhere).
- [ ] Charge the demo laptop.

## Day-of run sheet

| Time | What | Who |
|---|---|---|
| Setup (30 min before) | Find the table, set up banner, QR codes facing the walkway, demo running | First shift |
| Shift 1 | Stand in front of the table, not behind it. Ask "what do you want to build?" before pitching | Two tablers |
| Shift change | Handoff: how many sign-ups, what questions came up, what is running low | Outgoing and incoming shift |
| Shift 2 to N | Same | Two tablers |
| Last 15 min | Remind everyone at the table of the first meeting date. Pack up. Leave the spot clean | Last shift |

Pitch points, in order: meet Wednesdays at 10:00 AM in BLCIS A-103; join Discord now (point at the QR); the first event is on Bevy (point at the other QR). Do not ask for phone numbers.

## After

- [ ] Same day: welcome post in Discord addressed to new arrivals with the first meeting date.
- [ ] Within 3 days: record counts (QR scans if measurable, Discord joins, Bevy members before and after, paper sign-ups) in the event folder. Counts only.
- [ ] Anyone who signed up on paper gets one email with the Discord and Bevy links, then the sheet is destroyed.
- [ ] Fill in the retro: which hook worked, which shift was busiest, what ran out.
- [ ] Add the semester's member count to `semesters/<term>/roster.md` (a number, not names).
