# Attendance tracking

Bevy is the system of record for attendance. Every meeting and event is published on Bevy first (see [bevy-event-publishing.md](../03-playbooks/bevy-event-publishing.md)), members RSVP there, and organizers check people in there. The numbers that end up in the semester folder come from Bevy's reports.

Why it matters: ASRCC funding requests ask for attendance (the Spring 2026 request promised 50 or more at Google guest speaker events), Google's description of the organizer role is hosting events roughly monthly, Bevy's analytics are what Google and the chapter can both see (so published events and check-ins are the numbers to keep clean), and the retrospective compares planned events against what actually happened.

## Two numbers per event

| Number | Bevy term | Meaning |
|---|---|---|
| Registered | Attendees | People who RSVP'd (ticket holders) |
| Checked in | Check-ins | People who actually came |

Record both, as counts only, in the event's retro and in `semesters/<term>/roster.md`. Never commit the attendee export itself; it contains names and emails.

## Before the event

- [ ] Event is published on Bevy with the right date, time, and room.
- [ ] Decide who runs the door. That person needs organizer access on the chapter dashboard.
- [ ] If you plan to scan QR codes, confirm that QR codes in ticket emails are turned on. That is an admin-level setting in Bevy and is not on by default. [TBD: confirm current state for our chapter]
- [ ] Install the Bevy Organizer App (iOS or Android) on the door person's phone and log in with the community URL and dashboard credentials.

## Checking people in (in person)

Bevy supports three ways. Pick one per event and stick with it.

| Method | How | Best for |
|---|---|---|
| Organizer App, swipe | Open the event, swipe the attendee's name right; the name turns green | Most meetings; works one-handed at the door |
| Organizer App, QR scan | Scan the QR code from the attendee's ticket confirmation email | Big events where people have their email open |
| Chapter dashboard | Event > registration table > toggle the check-in checkbox, or the standalone "Check-in attendees" page from the profile menu | Laptop at a table; fixing misses after the event |

Walk-ins: add them manually in the Organizer App so they count, then ask them to join the chapter on Bevy for next time.

Bevy quirks to know:

- Bevy stores only the last check-in time per person. Checking someone in twice does not double count, and it overwrites the earlier time.
- Analytics refresh about every two hours. Do not panic if the count lags during the event.
- Ad blockers can break the analytics view by blocking `/api/analytics`. Turn them off on the dashboard.

## Virtual and hybrid events

Anyone who joins the Bevy virtual event between 15 minutes before start and the end is checked in automatically. Nothing to do at the door for remote attendees. In-person attendees at a hybrid event still need manual check-in.

## After the event, within 48 hours

- [ ] In the chapter dashboard, open Events > (the event) > Attendees and export CSV or PDF. The report compares registered to checked in. The dashboard defaults to a 30-day window; widen it for older events.
- [ ] Copy the two counts into the event retro (`semesters/<term>/events/<date>-<slug>/retro.md`) and the roster file. Do not commit the export.
- [ ] Form responses, if the event had a form, export from the Forms tab; summarize, do not commit.
- [ ] Optional: send a chapter newsletter segmented to "Attendees who did not check in" with the recording link, and to "Attendees who checked in" with the follow-up.
- [ ] Delete the export from your laptop once the counts are in the repo.

## Recordings

Bevy gives members live streams and recordings for events set up that way. The Participation Terms mean attendees consented to recording when they RSVP'd; say so at the start anyway. Recording links belong in the event retro. Video files belong in the shared drive, not here.

## Reporting

| Where | What goes in |
|---|---|
| Event retro | Registered, checked in, walk-ins, recording link |
| `semesters/<term>/roster.md` | Per-event table of the two counts, plus the semester's Bevy member count at start and end |
| `semesters/<term>/retrospective.md` | Events planned vs published, total registered vs checked in, best and worst turnout and why |
| ASRCC funding request (spring) | Event count and typical attendance, pulled from the roster tables |

## Sources

Bevy help articles (these open in a browser but return 403 to link checkers):

- Event Registration Management: <https://help.bevy.com/hc/en-us/articles/1500001761601-Event-Registration-Management>
- Bevy Organizer App: <https://help.bevy.com/hc/en-us/articles/360060373794-How-to-use-the-Bevy-Organizer-App>
- Event reports: <https://help.bevy.com/hc/en-us/articles/4407283568279-Event-reports>
- Event Analytics: <https://help.bevy.com/hc/en-us/articles/16741852181143-Event-Analytics>
- Chapter newsletters: <https://help.bevy.com/hc/en-us/articles/1500001775802-Send-a-chapter-newsletter>
