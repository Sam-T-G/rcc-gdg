# The meeting algorithm

How every weekly meeting is built. This file is the machine; the semester's session cards are what you feed it.

The club's weekly meeting is a practice floor for skills that no class assigns and no major teaches: saying what you want, asking someone with power for it, and making your own work visible. It is deliberately not technical. A student in nursing, business, art, or undeclared should never be the least equipped person in the room. Programmers get their vertical growth from the ladder (below), not from the content.

| | |
|---|---|
| Owner | Lead organizer sets the arc; a rotating facilitator seat runs each block (see Seats, below) |
| Slot | Thursdays, 2:30 to 3:30 PM, BLCIS A-210 Simulation Lab |
| Inputs | one session card from `semesters/<term>/sessions/` |
| Generic checklist | room, advisor, day-of logistics: [weekly-meeting.md](weekly-meeting.md) |

## The block

Sixty minutes, fixed phases, hard time boxes. The facilitator's job is to move the clock, not to fill it.

| Clock | Phase | Min | What happens |
|---|---|---|---|
| 2:25 | Setup | -5 | Door open, arrival prompt on the screen, Bevy check-in live on a laptop |
| 2:30 | Open | 5 | Dates and asks only. No discussion. Hard stop. |
| 2:35 | Warm rep | 7 | Everyone speaks. Pairs. Lowest possible stakes. |
| 2:42 | The Rep | 18 | The week's skill, practiced in pairs or trios. Never a talk. |
| 3:00 | Live fire | 12 | Two or three volunteers do it in front of the room, on a timer |
| 3:12 | Debrief and rung | 10 | What changed, then name the technical form of the skill |
| 3:22 | The Ask | 5 | One action due before next Thursday, with a name attached |
| 3:27 | Close | 3 | Check-in sweep, room reset |

Setup starts at 2:25 and the room is shared: ACM meets in A-210 until 2:30. Turnover is zero minutes. Confirm the handoff with the ACM officers each term, and expect the first two minutes to be furniture.

## The five laws

These do not bend for a good idea.

1. **Everyone speaks in the first twelve minutes.** If a person has not made a sound by 2:42, the meeting has already failed for that person. The warm rep exists for this and nothing else.
2. **No deck over five slides.** The room is a practice floor. Slides are for dates and a single prompt.
3. **Practice beats talk three to one.** At least 30 of the 60 minutes are students doing the thing. Count it if you are unsure.
4. **The rung is named, never taught.** Every session ends by pointing at the technical version of the skill for ten seconds. No demo, no tangent, no laptop.
5. **Every session is playable cold.** Arcs compound, but a stranger who walks in during week 9 does the full rep without catching up. Never open with "as we discussed last week."

## The pacing algorithm

Meetings are grouped into four-week arcs. Each arc takes one theme through four fixed slots. The slot determines the shape of the session; the theme determines its content.

| Slot | Name | What changes | Who the rep is aimed at |
|---|---|---|---|
| 1 | Install | The skill and its mechanics, nothing else | A partner the student picked |
| 2 | Pressure | Same skill, one constraint added: a timer, an indifferent listener, missing information | A partner the student did not pick |
| 3 | Transfer | The skill applied to the student's own real, current situation | The whole room |
| 4 | Ship | The skill leaves the room and a receipt is due | A real person outside the club |

Slot 4 is the load-bearing one. An arc that ends without a receipt (a sent message, a booked appointment, a posted thing) taught nothing that survives the hour. Build the arc backwards from its receipt.

To schedule a semester:

1. Count the instruction meeting days. Subtract holidays, no-class weeks, and finals.
2. Reserve the last meeting for the term's public event (Demo Day).
3. Reserve any meeting before the club fair as a hook session: no arc, no continuity, designed for strangers.
4. Divide what remains by four. That is the arc count. Assign a theme to each.
5. Fill slots in order. Never reorder within an arc; the stakes ramp is the point.
6. Anything technical becomes a separate published event, not a weekly meeting.

## Seats, not names

Session cards name a **seat**, never a person, and one table per semester maps seats to people. A mid-semester swap is then one row, not an edit across every card, and the cards stay reusable next year when the officers have changed. It also keeps the repo inside the [privacy policy](../01-governance/privacy-and-public-repo-policy.md) by default: a name appears only where written consent is on file.

| Seat | Job |
|---|---|
| `LEAD` | Lead organizer. Runs the rooms that punish inexperience. |
| `FAC-A` .. `FAC-D` | Rotating facilitator seats. Collapse two into one person if the club has fewer officers. |
| `NOTE` | Notes and Bevy check-in, every week. |
| `FLOAT-1`, `FLOAT-2` | Circulate during a ship week so the facilitator can keep running the clock. |
| `TIME` | Runs the clock and nothing else, when the facilitator needs both hands (Demo Day). |

Two rules for building the rotation:

1. **Nobody runs two weeks in a row, and nobody runs a session before backing one up twice.** A facilitator's first time in front of the room should not be their first time holding the card.
2. **The lead takes the hooks, the sessions that go personal, every ship week, and the public event.** Rotators take install and pressure weeks, where the mechanics are already on a slide and the worst outcome is a phase running long.

Give the lightest seat to the newest officer. It is the seat that grows into a heavier one next semester.

Fall 2026's rotation is the worked example: [semesters/2026-fall/sessions/README.md](../../semesters/2026-fall/sessions/README.md#facilitator-rotation).

## The ladder

Every session closes by naming the technical form of the human skill just practiced. Ten seconds, no elaboration. This is what makes a non-technical club a real on-ramp: a student who wants the next rung now knows its name and can go look it up.

| Human skill | Technical rung |
|---|---|
| Say what you do in twenty seconds | The first paragraph of a README |
| Hold your point with an indifferent listener | Defending a design in review |
| Ask a question someone can act on | A reproducible bug report |
| Scope the problem before solving it | Writing an issue or a spec |
| Take critique without defending | Receiving a code review |
| Give critique without wounding | Giving a code review |
| Keep going after a no | A rejected pull request you do not abandon |
| Ask a stranger with power for something | Opening a pull request on a repo you do not own |
| Decide without full information and record why | An architecture decision record |
| Make invisible work visible | Commit messages and a changelog |
| Tell a failure so people trust you more | A postmortem |
| Run twenty minutes that respect people's time | A standup or a retro |

Keep this table current. When a session invents a new rung, add the row here rather than leaving it in the session card.

## Critique protocol

Used in live fire, every week, without variation. Announce it by name so the room learns it as a form.

**Two trues and a turn.** After a volunteer finishes, the room gives:

- Two things that actually landed. Specific. "You said the number" beats "that was good."
- One turn: the single change with the highest payoff. Phrased as a turn, not a verdict. "Turn the last sentence into a question."

Rules: the volunteer says nothing until all three are given. No advice unless asked. No stacking, one voice at a time. The facilitator cuts anyone who opens with "I would have."

## Warm rep bank

Any of these fills the 2:35 slot. Rotate so the room never predicts it. Pairs, sixty seconds each way, no debrief.

- The best thing that happened to you since Thursday, in one sentence.
- Something you changed your mind about this year.
- A thing you are good at that is not on your transcript.
- What you would do this weekend if nothing were due.
- The last thing you looked up.
- One thing you want from this semester that you have not told anyone here.

## Facilitator failure modes

- **The activity becomes a discussion.** Cut it. Discussion is the room avoiding the rep. Restart the timer.
- **Two people carry live fire every week.** Track who has volunteered. Ask a specific person by name at 3:00 rather than asking the room.
- **The Open eats fifteen minutes.** Dates only. Everything else is Discord.
- **Nobody has a receipt at slot 4.** The receipt is produced in the room, not assigned as homework. If people are leaving without it, the rep was too big.
- **A programmer answers everything technically.** Name the rung, then move on. The rung is a door, not a detour.
- **The room is under five people.** Run it anyway, unchanged. Two pairs is a rep. Cancelling teaches the room that the meeting is optional.

## After every meeting

- [ ] Fill the meeting notes: attendance count, decisions, action items, and how many people produced the week's receipt. Counts only, never names.
- [ ] If a phase ran long or a rep failed, edit the session card in `semesters/<term>/sessions/`, not your own notes.
- [ ] Post the Ask in Discord the same day.
