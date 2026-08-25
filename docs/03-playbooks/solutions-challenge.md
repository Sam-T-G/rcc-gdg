# Playbook: Solutions Challenge

Google's own name for the program is "GDG on Campus Solution Challenge" (singular). The club calendar says "Solutions Challenge." Use Google's wording in Bevy event titles and demo video titles. Either wording is fine in Discord.

## Purpose

Get RCC teams to submit a working prototype to that year's challenge. The program asks students to identify a real-world problem and build a solution using Google technologies. A US chapter's 2026 info session described it as open to all majors with no prior experience required. For a community college chapter, a submitted entry is the win. Placing is a bonus.

## When

The challenge runs in spring. Google retired the official hub, timeline, and terms pages on developers.google.com (they now land on the generic Community and Events page), so each year's rules arrive by regional email, chapter info sessions, and Devpost pages. A search result showing the old URL is not a live source.

| Phase | Typical window | This year |
|---|---|---|
| Find and snapshot the rules | late January to early February | [TBD] |
| Kickoff workshop | first two weeks of spring classes | [TBD] |
| Team formation day | late February to early March | [TBD] |
| Weekly build sessions | March through the deadline | [TBD] |
| Submission deadline | 2026 US deadline was April 20, 2026 (PT) | [TBD: confirm from that year's official rules] |
| Demo Day | last instructional week before finals | see [demo-day.md](demo-day.md) |

Spring anchors (first day of classes, spring break, finals) are in that semester's `calendar.md`; the Solution Challenge rows in [semesters/2026-fall/calendar.md](../../semesters/2026-fall/calendar.md) show the fall half of the arc. A late-April deadline lands shortly after spring break, which at RCC is in mid April; plan the last two build sessions around it.

## Owner role

| Role | Does |
|---|---|
| Event lead (one organizer) | Owns the dates, the rules snapshot, the team tracker, and the Bevy events |
| Mentors (organizers, faculty, alumni) | Float during build sessions; one mentor per two teams is comfortable |
| Advisor | Attends on-campus sessions as required by Student Activities |

Officer titles are defined in [officer-roles.md](../00-charter/officer-roles.md).

## Rules that have held across editions (confirm every year)

| Rule | What we have seen | Where it came from |
|---|---|---|
| Problem framing | Solve a real-world problem; the India edition frames it around the 17 UN Sustainable Development Goals | Chapter restatements, 2026 |
| Technology | Use Google technology; one chapter's local hackathon required two Google technologies | Chapter rules, 2026 |
| Deliverable | Working prototype plus a demo video | Chapter rules, 2026 |
| Team size | Chapter rules in 2026 ranged from 1 to 4 and 2 to 4 | Chapter rules, 2026 |
| Demo video | Max 2 minutes; judges review only the first 2 minutes of a longer video | Chapter restatement of Google's video rules, 2026 |
| Video structure | 15 to 30 seconds of intro (solution name, team location, problem, overview), then 90 to 105 seconds of working demo | Same |
| Video hosting | Landscape, on YouTube, unlisted is fine | Same |
| Video title | "(Your Solution Name) - GDG on Campus Solution Challenge YYYY" | Same |
| Judging weights (India edition only) | Technical Merit 40%, Topic Alignment 25%, Creative Innovation 25%, User Experience 10% | India chapter site, 2026 |

Anything not in this year's official rules is a guess. Snapshot the rules first, then plan.

## Rules snapshot (required)

Create the event folder with `scripts/new-event.sh` and add a `rules.md` inside it:

```text
semesters/<YYYY-term>/events/<YYYY-MM-DD>-solution-challenge/rules.md
```

The file records: the source (email, Devpost URL, or PDF filename in the shared drive), the date you saved it, the submission deadline with time zone, team size, required technologies, video spec, and eligibility. Link the PDF from the shared drive; do not commit it if it is over 1 MB.

## T-minus checklist

- [ ] T-10 weeks (late January): find this year's rules. Check the GDG organizer channels on gdg.community.dev and the regional program email. Write `rules.md`.
- [ ] T-10 weeks: go/no-go decision. One paragraph in the [decision log](../01-governance/decision-log.md): are we running a full spring arc or only a kickoff?
- [ ] T-9 weeks: publish the kickoff on Bevy first ([bevy-event-publishing.md](bevy-event-publishing.md)), then Discord, Instagram, and classroom announcements ([communications.md](../02-operations/communications.md)).
- [ ] T-9 weeks: advisor books rooms in 25Live for kickoff and every build session, at least two weeks ahead of each ([room-booking.md](../02-operations/room-booking.md)). Weekly build sessions can use the regular meeting slot: Wednesdays 10:00 AM, BLCIS A-103.
- [ ] T-8 weeks: run the kickoff. Use [workshop-modular-impact-sprint.md](workshop-modular-impact-sprint.md). Students leave with a one-sentence problem statement and a working AI Studio prototype.
- [ ] T-7 weeks: team formation day. Pitches of 60 seconds each, then open floor. Cap teams at this year's maximum. Record team count and member count only (no names in the repo; see [privacy policy](../01-governance/privacy-and-public-repo-policy.md)).
- [ ] T-7 weeks: every team creates a GitHub repo and a shared doc for the problem statement, user, and technology list. Keep the tracker in the club shared drive.
- [ ] T-6 to T-2 weeks: weekly build sessions (run sheet below). Mentors check that each team has a working path from input to output before adding features.
- [ ] T-3 weeks: video rehearsal session. Every team records a rough 2-minute cut on a phone. Watch them together and time them.
- [ ] T-1 week: submission dry run. Each team walks the submission checklist with a mentor.
- [ ] Deadline day: event lead confirms every team submitted, with the confirmation screenshot saved in the shared drive.

## Build session run sheet (60 minutes)

| Time | What | Who |
|---|---|---|
| 0:00 | Bevy check-in at the door ([attendance-tracking.md](../02-operations/attendance-tracking.md)) | Event lead |
| 0:05 | Each team: 30-second status (what works, what is blocked) | Teams |
| 0:15 | Micro-lesson on one blocker most teams share (grounding, auth, deployment) | Mentor |
| 0:25 | Build time; mentors rotate | Everyone |
| 0:55 | Each team names one thing to finish before next week | Teams |
| 1:00 | Close; room reset | Event lead |

## Submission checklist (per team)

- [ ] Problem statement in one sentence, with the user named
- [ ] At least one Google technology, listed by name, and used in the demo
- [ ] Prototype runs end to end on a clean machine
- [ ] Public GitHub repo with a README (setup steps, technologies, team size)
- [ ] Demo video: landscape, under 2 minutes, unlisted on YouTube, titled "(Solution Name) - GDG on Campus Solution Challenge YYYY"
- [ ] Every field on this year's submission form filled in before the deadline in the stated time zone
- [ ] Screenshot of the submission confirmation saved to the shared drive

## Video spec (the 2-minute cut)

| Seconds | Content |
|---|---|
| 0 to 15 | Solution name, team location (Riverside City College), the problem, a one-line overview |
| 15 to 30 | Who the user is and what they did before this existed |
| 30 to 105 | Working demo; real input, real output, no slides |
| 105 to 120 | What comes next; team thanks |

Record on a phone in landscape. Screen recording plus a voiceover is fine. Judges stop at 2:00, so nothing important goes after 1:50.

## After

- [ ] Export registered vs checked-in counts from Bevy for each session; put the counts in `semesters/<term>/retrospective.md`
- [ ] Add each team's repo link to `semesters/<term>/projects/README.md` (team consent required; project names and repo links only)
- [ ] Fill in `retro.md` in the event folder within two weeks ([templates/event-retro.md](../../templates/event-retro.md))
- [ ] Book teams into Demo Day ([demo-day.md](demo-day.md))
- [ ] If any team advances, log it in the decision log and the semester retrospective; results by team name only

## Budget shape

There is no dedicated Solutions Challenge line in the FY 2026-27 ASRCC request. Build sessions share the "Google Guest Speakers & Workshops" line ($2,000 for the year: transportation 500, lodging 500, meals 600, marketing/swag 200, technology 100, supplies 100). Anything spent here competes with every other workshop.

| Item | Typical cost | Source of funds |
|---|---|---|
| Kickoff snacks | [TBD] | Workshops line, meals |
| Printed design briefs for the kickoff | [TBD] | Workshops line, supplies |
| Cloud credits or API keys | $0; use free tiers and Google AI Studio | none |
| Video recording | $0; phones | none |

Acknowledge ASRCC at any session paid from the request ([asrcc-funding.md](../02-operations/asrcc-funding.md)). Receipts with price and date go through [reimbursements.md](../02-operations/reimbursements.md).

## Sources (last verified 2026-08-24)

- Old official hub, timeline, and terms URLs on developers.google.com now render the generic Community page: https://developers.google.com/community
- US chapter info session with the April 20, 2026 (PT) deadline: https://gdg.community.dev/events/details/google-gdg-on-campus-florida-international-university-presents-wed-info-session-google-developer-groups-on-campus-solution-challenge-2026-all-majors-welcome-feb-18-apr-11-2026-02-18/
- Chapter restatement of the video rules and local team rules: https://gdg-vt-spring.devpost.com/rules
- India edition restatement (SDG framing, judging weights): https://www.gdgcrcc.tech/solution-challenge
