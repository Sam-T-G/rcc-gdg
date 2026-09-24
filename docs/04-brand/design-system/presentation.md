# 13. Presentation decks

How a club deck is built, how it moves, and what shape its argument takes. The implementation is [deck-kit/](../../../deck-kit/README.md) at the repo root; this file is the language it implements, and where the two disagree this file wins and the kit gets a bug.

Written 2026-09-21. Before that, the whole deck spec was one paragraph in [assets.md §10.5](assets.md), which still owns the export size, margins, and type minimums. The motion vocabulary this file relies on is in [motion.md](motion.md). The semester slide is the rung rail from [visual-voice.md §9.2](visual-voice.md); the progress rail along the bottom of every slide is a different and simpler object (§13.4).

## 13.1 What a deck is for

**A club deck is a room instrument, not a document.** It is read from the back of a lab in daylight by people who are about to be asked to stand up and say something. Everything in this file follows from that.

**Law 2 of the [meeting algorithm](../../03-playbooks/meeting-algorithm.md) still binds: no deck over five slides in a weekly meeting.** The room is a practice floor. So a meeting deck has two readings. The full deck is the argument, for rehearsal, for the facilitator who inherits the session next year, and for anyone opening the link later. **Room mode** is the subset marked `data-room`, five slides or fewer, and it is what the wall shows while the hour runs. The Cold Open deck (2026-09-03) established this and it is now a kit feature, not a trick.

Event decks (a Club Rush talk, the Demo Day opener, a guest introduction, a DevFest welcome, an officer pitch to ASRCC) are not meetings and have no slide cap. They follow the same journey and the same motion rules.

**A weekly deck is scaffolded, not copied.** `scripts/new-deck.sh <term> <date>` fills `deck-kit/weekly.html` from the session card and the sessions index, writes the deck beside the card, and leaves a fill marker wherever a person has to decide; `check.mjs` refuses the deck until the markers are gone. [deck-kit/README.md](../../../deck-kit/README.md) has the steps and the reasons the scaffold is shaped that way.

## 13.2 The journey

**Every deck is one argument in five movements, in a fixed order.** A movement can be skipped. Movements are never reordered, for the same reason slots within an arc are never reordered: the stakes ramp is the point.

| Movement | `data-move` | Its job | In a weekly meeting |
|---|---|---|---|
| **Arrive** | `arrive` | Where we are, who this is for, what the next stretch of time promises. | Open, 2:30 |
| **Tension** | `tension` | The gap. Why the obvious way fails, stated so that someone in the room recognizes themselves in it. | Warm rep, 2:35 |
| **Work** | `work` | The mechanic, shown and then done. The longest movement and the one with the most beats. | The Rep and Live fire, 2:42 to 3:12 |
| **Turn** | `turn` | What changed, named out loud. The debrief, the reveal, the rung. | Debrief and rung, 3:12 |
| **Ask** | `ask` | One action with a name attached, and the door out. | The Ask and Close, 3:22 |

Rules:

- **Every deck opens in Arrive and ends in Ask.** A deck that ends anywhere else leaves the room holding nothing, which is the failure the receipt mechanic exists to prevent.
- **Tension is what makes it a journey.** A deck that goes Arrive, Work, Ask is a set of instructions. It may be exactly right for a five-slide room deck; it is never right for an event deck.
- **The Turn is earned by the Tension.** Whatever the Turn names as changed has to be the thing the Tension said was broken. If they do not rhyme, one of them is wrong.
- **The shape is visible.** The rail (§13.4) names one segment per movement present, so a room can see where in the argument it is, and a deck with a missing movement looks like one.

**The read-aloud test.** Read only the first slide of each movement aloud, in order. It should be a coherent five-sentence argument. If it is not, the deck has a structure problem that no animation will fix, and it is cheaper to find that with five sentences than with forty slides.

## 13.3 The stage

A fixed 1920 x 1080 stage, scaled uniformly to fit the window and letterboxed on the page surface. Because the stage never reflows, a line that breaks in a particular place on the laptop breaks in the same place on the projector, and text measurement can be done once after fonts load.

| Role | Size | Use |
|---|---|---|
| Title | 136px | The cover's H1 only |
| Head | 92px | Every slide heading, and a statement |
| Body | 48px | Running text on a slide |
| Body small | 40px | Secondary lines, captions under a figure |
| Ledger | 32px | The ledger line, counter, footnotes, sources |
| Digits | 240px on a clock, 320px on a figure | The one number the slide is about |

Margins are 96px. The floors in [assets.md §10.5](assets.md) (title 72, body 40, ledger 32) are floors; nothing in the kit goes under them. **One exception, decided 2026-09-21:** labels inside a drawn diagram, which today means the session names on the semester slide, may use the 32px ledger floor. Fourteen names have to fit one stage, and at 40px the climb's short first tread cannot hold two of them. Running text never takes the exception, and `check.mjs` enforces both floors.

**Decks run light.** A-210 projects onto a wall in daylight and a dark ground washes out. `D` toggles dark for laptop preview only, and in dark the horizontal lockup swaps for the stacked dark file, because the horizontal lockup exists only as a light file and may not be recolored ([bright-lines.md §1.5](bright-lines.md)).

**On a phone** the deck becomes a vertical stack of every slide, each scaled to the width, with every beat showing and nothing animated. Be honest about what that is: on a 390px phone, body text lands around 9px, so it is a preview to pinch into, not a reading format. The same stack is what a browser with scripts off gets, and `?stack` on the URL forces it on a laptop.

## 13.4 The rail, and the move that opens every deck

The rail runs along the bottom of every slide: **one named segment per movement present**, in order, each as wide as its share of the slides, with a 14px gap between segments. Each segment is an 8px bar on `--rcc-surface-container-highest` that fills with `--rcc-primary` as the deck moves through it: past segments are full, the current one is filled up to and including this slide, later ones are empty. The movement's name sits above its segment in the ledger line (§9.7): past names in ink, the current one in `--rcc-primary`, later ones in `--rcc-on-surface-variant`. A name wider than its segment shows only while that segment is current. The counter in the corner ("04 / 12") is the text equivalent, so the rail itself is `aria-hidden`.

In room mode the rail counts only room slides.

Rebuilt 2026-09-21 on review. The first version was the rung rail at deck scale: a thin stepped line with a tick per slide and a taller tick for this one. It read as a pale ruler, twelve ticks named nothing, and a 12px rise between movements was too small to see. Named segments say where the room is in the argument in words, which is the job.

### The Step lies down

This is the deck's signature move and it happens exactly once.

The cover carries a Step under its title: the club's mark at banner scale, run, rise, run, with the rise at the arc's position. The rail does not exist yet. On the first advance **the Step lies down**: it slides to the bottom of the stage while its riser shortens to nothing, so it becomes a straight line along the bar; then the line splits into the named segments, which show how far the deck has already come. It runs on `--rcc-dur-move` with `--rcc-ease-arrive`.

It is one value throughout. The Step is a path whose five numbers (start, low run, riser position, high run, end) interpolate to a flat line at the bar over the first 70% of the move; the segments fade in over the last 40%, overlapping, so there is never a frame with nothing on screen. So it is a pure function of one number (§5.8), and going back to the cover stands the Step back up exactly.

Why it is worth one move per deck: the club's mark is a step, and the deck is the road it opens onto.

**The rail closes.** On the last slide every segment is full.

**The rail steps aside on a `rail` slide.** That slide draws the semester across the whole stage, down into the band the rail uses. The chrome rail fades out on the effects track and the counter stays. It follows that **a `rail` slide never comes second in a deck that opens on a cover**: the Step would lie down onto a screen that hides the rail. `check.mjs` fails that order.

## 13.5 The archetypes

A closed set of ten. Every slide is one of them, named in `data-kind`. An idea that does not fit one is either two slides or one slide with beats. If a real deck needs an eleventh, add it here first, then to the kit.

| Kind | For | What moves | Room-safe |
|---|---|---|---|
| `cover` | The first slide. Lockup, eyebrow, title, sub, the Step, the independence sentence. | Eyebrow, title, and subtitle rise; the Step draws as they land | Yes |
| `statement` | One sentence that carries the slide by itself. | Lines rise, staggered | Yes |
| `contrast` | Two things side by side: what it is and what it is not, before and after, weak and strong. | Left resolves, then right; right can be a beat | Yes |
| `beats` | Up to four items that land one per press. | Each item rises on its beat; earlier items step back to `on-surface-variant` | Yes |
| `card` | The prompt the room works from. A card on the tinted ground, the words to write or say. | The card rises and settles | Yes |
| `compress` | A sentence being cut down. Two to four versions, each shorter or sharper. | Words being cut strike through and close up; new words rise into the gap | No |
| `figure` | One number that is the point. | The number counts from its start value to its end value | No |
| `clock` | A timed exercise. | The clock, only while it runs | Yes |
| `rail` | The semester, with this week marked. Two styles: `climb` (default) and `ledger` ([visual-voice.md §9.2](visual-voice.md)). | Climb: the camera opens on this week and pulls back while the travelled Step draws. Ledger: the columns rise in order, the Step rule draws, this week's band fills | Yes |
| `ask` | The last slide. The action, who it is for, when it is due, the way in (QR), the independence sentence. | Heading and the action rise; the QR and the sentence never move | Yes |

"Room-safe" means the archetype still works with every transition forced to Cut. `compress` and `figure` do not: their whole content is a change over time, and in room mode they would show only their end state, which is a statement slide that lost its reason to exist.

### Rules by archetype

- **`cover`** Only the eyebrow, title, subtitle, and the Step move. The lockup and the independence sentence are present at full opacity from the first frame ([bright-lines.md §1.4](bright-lines.md): no motion on it, never revealed by interaction).
- **`statement`** One sentence, fourteen words or fewer. If it needs a second sentence, the second sentence is the next slide.
- **`contrast`** Both sides at the same size, weight, and ink. The words have to win the comparison; greying out the weak side decides it for the room before they read it. Only the label says which side is which.
- **`beats`** Four items maximum. `check.mjs` fails a deck at five.
- **`card`** Write what is actually on the physical card, word for word. The slide is the reference the room copies from.
- **`compress`** **The final version has to be something a person would actually say out loud.** Deleting words until the line is telegraphic is the failure mode: it reads as the demo filtering out the meaning. The landing page's Voice rep was rebuilt for exactly this reason in September 2026. Cut in the early versions, then spend the time that freed up on one specific detail with a real number in it.
- **`figure`** The number has to be real and sourced in the speaker notes. A figure slide with an invented number is worse than no slide.
- **`clock`** Duration comes from the session card and matches it to the second.
- **`rail`** Data comes from the sessions index, not from memory; `new-deck.sh` writes the list. The slide draws the semester from that list in the markup (`data-arc`, `data-receipt`, `aria-current="step"` on this week); it is the text equivalent and is what a screen reader gets. `data-style="ledger"` swaps the climb for the ledger. The climb's camera runs about three seconds and the heading rises as it settles; a press lands it at once.
- **`ask`** One action. Verb first. With a date or a "before next Thursday".

## 13.6 The motion score

**Transitions are derived, never authored.** The kit reads the two slides on either side of a press and picks one of the four transitions in [motion.md §5.9](motion.md). An author who wants a different transition has written a structure problem, and the fix is in `data-move`.

| Situation | Transition |
|---|---|
| Same slide, next `data-beat` | Hold |
| Next slide, same movement | Ascend |
| Next slide, new movement | Turn |
| Leaving the cover, or going back to it | The Step lies down into the rail; going back, it stands up again (§13.4) |
| A timer is running, or room mode is on, or reduced motion is on, or GSAP did not load | Cut |
| Going backwards | The same transition reversed, at the tier below |

**A press during a transition finishes it instantly and starts the next one.** Nobody waits for an animation to be allowed to move on, and a presenter clicking fast gets exactly as many steps as they pressed.

**A `compress` step runs two beats**, 1.4s, because a cut the room cannot follow did not happen. Going back through one runs at 60% of that, like every backward transition.

**Never animated, on any slide:** the lockup, the independence sentence, a QR code (a scanner needs a still target), the ledger line, the counter. Chrome carries across every transition by staying still (§5.7).

**Ambient motion by archetype**, per the ambient rule in [motion.md §5.6](motion.md): the clock's bar while it runs, the cut in a compression, the count in a figure, the draw in a rail. Nothing else is ambient, nothing loops, and every one of them stops the moment a facilitator starts a timer on a different slide.

**Offline.** GSAP loads from cdnjs, pinned and SRI-checked, the same way the landing page loads it. Without it the kit falls back to CSS-only motion: content still rises through its masks on entry, the Step jumps to the rail instead of lying down, and `compress` and `figure` show each version's end state per press. That fallback is the same code path as reduced motion, minus the CSS entrance, so it gets tested whether or not anyone thinks to test offline.

## 13.7 Running the room

| Key | Does |
|---|---|
| `→`, `Space`, `Page Down`, `Enter` | Next beat, or next slide |
| `←`, `Page Up`, `Backspace` | Back |
| `Home`, `End` | First, last |
| `T` | Start or pause the clock on this slide |
| `R` | Reset the clock on this slide |
| `5` | Room mode on or off |
| `N` | Speaker notes |
| `D` | Dark theme, for laptop preview only |
| `F` | Fullscreen |
| `?` | Key help |
| `Esc` | Close the notes or the help |

Presentation clickers send `Page Down` and `Page Up`, so they work with nothing configured.

**The clock.** Idle, running, paused, ending, done. Ending is the last ten seconds: the bar and digits change to the highlight fill and stay there. They do not blink (WCAG 2.3.1). Done shows "Time" and holds.

**The URL follows the slide** (`#7`), so a reload or a link lands where it should. Room mode and theme persist per deck in the browser.

**The independence sentence** is on the cover and the last slide whenever the logo appears ([bright-lines.md §1.4](bright-lines.md)). The kit's `check.mjs` fails a deck that shows the lockup and lacks it on either.

**Fonts.** Google Sans comes from the Fonts API and the club does not self-host it ([foundations.md §3.1](foundations.md)). With no network, type falls back to Inter or the system face, and **line breaks move**. Run the offline pass (§13.9) on anything where a break matters, which on a 136px title is everything.

## 13.8 Writing for the stage

- **One idea per slide.** Beats are how one idea gets built up in front of people; they are not how two ideas share a slide.
- **The room reads a slide in the time it takes the facilitator to breathe.** If it takes longer, the room is reading instead of listening, and that is the facilitator's time being spent by the slide.
- **Casual and concrete**, in the club's own voice. The flyers are the reference: "Want to have professional rizz?" rather than "Develop your professional communication skills."
- **Name the thing in place.** A slide that says "three things you need to know" before saying them has spent a slide on a teaser. Put the three things on the slide.
- **Speaker notes are where the script goes.** Read-aloud passages from the session card go in `aside.notes`, word for word. The slide carries the words the room needs to see, not the words the facilitator needs to say.
- **Verb-first asks**, naming the action and when: "Say it to two people before next Thursday."

## 13.9 Before you present

Run these on every deck, in order. The first two are automated.

1. `node deck-kit/check.mjs <deck.html>`. It fails on: a fill marker or template token left by the scaffold, a type size under the floors, a slide with no `data-kind` or `data-move`, a movement out of order, a deck that does not start in Arrive or end in Ask, more than five room slides, more than four beats on a `beats` slide, a lockup with no independence sentence on the cover or last slide, and any overflow of the stage. With `--shots` it also screenshots every step of the walk.
2. `scripts/check.sh` from the repo root.
3. **Read the five movement openers aloud** (§13.2). Fix structure before styling.
4. **Room mode.** Press `5`, walk it, confirm it is the five slides the hour needs.
5. **Offline.** Turn off wi-fi, reload, walk the whole deck. Check title line breaks under the fallback face.
6. **Reduced motion.** Turn it on in the OS, walk the deck, confirm every slide's end state is complete.
7. **The projector.** Once per semester, on the A-210 projector in afternoon light, walk the cover, one clock, and the rail. Record anything that failed in §13.10.

## 13.10 Open items

| # | Open item | Blocks |
|---|---|---|
| P1 | A-210 projector native resolution, and whether the light theme's container tint survives it. Also [assets.md §10.5](assets.md). | Not blocking |
| P2 | The kit has been traced for frame rate in headless Chrome only, not on the laptop that will present. | First deck run from the kit |
| P3 | Title and statement line breaks under the Inter fallback have not been compared against Google Sans on a real deck. | Any offline presentation |
| P4 | There is no presenter view (notes and next slide on the laptop while the projector shows the slide). `N` shows notes on the same screen, which is fine for rehearsal and wrong for a mirrored projector. | Not blocking |
| P5 | There is no reflowed reading version for phones; the stack is scaled slides. A link shared to members is readable only by zooming. | Not blocking |
| P6 | The climb's three-second camera and 32px session names have been checked on a laptop only. Walk the semester slide on the A-210 projector before the first arc deck uses it. | Not blocking |

---

**Last updated: 2026-09-23.**
