# 5. Motion

How things move, and what is allowed to move at all. Every duration and curve here resolves to a custom property in [tokens.css](tokens.css).

This file was §5 of [foundations.md](foundations.md) until 2026-09-21, where it was five short sections covering UI state changes and nothing else. Meanwhile the club shipped a pinned scroll scene on the landing page and a 17-slide deck, both of which invented their own motion with no rule to check against. The section numbers are unchanged, so every existing `§5.x` citation still resolves. §5.5 moved: icons are a drawing decision, not a motion one, and they now live at [visual-voice.md §9.5](visual-voice.md).

## 5.1 Two tracks

**Spatial** covers position, size, rotation, and corner radius. It may overshoot.
**Effects** covers opacity, color, and state layers. It never overshoots.

That split is the whole system, and it is what makes the reduced-motion override two lines rather than an audit.

## 5.2 Durations

Three tiers per track for interface time. Spatial runs roughly 2.2 times the effects duration at the same tier, which is the ratio at which a movement and the color change riding along with it feel like one event.

| Tier | Effects | Spatial | Use |
|---|---|---|---|
| fast | 90ms | 200ms | State layers, hover, press, focus ring |
| default | 140ms | 320ms | Card lift, disclosure, chip selection, radius morph |
| slow | 220ms | 480ms | Dialog and sheet enter, page-level transitions |

**Enter is slower than exit.** An exit uses the tier below its enter. A dialog enters on slow and leaves on default.

### The narrative tier

Interface time is not presentation time. A card lift has to disappear into the click; a slide transition is watched by thirty people who are not touching anything, and at 320ms it reads as a glitch rather than as a move. The landing page's chapter handoffs run about 900ms of scroll-scrubbed time and its opening headline runs 1.1s, and both are correct.

Two more tokens, used only by decks, scroll scenes, and page-load entrances. Never by a control.

| Tier | Value | Use |
|---|---|---|
| `--rcc-dur-beat` | 700ms | One beat of a presentation: a line arriving, a panel resolving, a number landing |
| `--rcc-dur-move` | 1100ms | A movement boundary: the stage turning, a headline arriving, the rail crossing into a new segment |

Both are spatial-track values and both zero under reduced motion. Chosen, not sourced, and set from the two shipped artifacts rather than from a ratio.

## 5.3 Easing

| Token | Curve | Use |
|---|---|---|
| `--rcc-ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Effects, always. Spatial moves that must land exactly. |
| `--rcc-ease-spatial` | `cubic-bezier(0.34, 1.28, 0.64, 1)` | Spatial only. Overshoots and settles. |
| `--rcc-ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Anything leaving. Accelerates out. |
| `--rcc-ease-arrive` | `cubic-bezier(0.16, 1, 0.3, 1)` | Narrative tier only. Covers most of the distance immediately and settles for a long time. |

`--rcc-ease-spatial` is the only curve with a control point above 1, which is what produces the overshoot. Never apply it to opacity or color: a color that overshoots renders as a flash.

`--rcc-ease-arrive` is the presentation curve and the one that carries the polish. It is the CSS equivalent of the `expo.out` the landing page headline already uses. It matters at the narrative tier because a 1.1s move on `--rcc-ease-standard` spends too much of its life in transit and the room watches it travel; on `--rcc-ease-arrive` the thing is essentially where it belongs after 300ms and the remaining 800ms is it coming to rest. The first reads as slow, the second reads as considered.

**One curve per element per move.** A thing that eases one way on its position and another way on its opacity reads as two events.

## 5.4 Reduced motion

**Zero the spatial durations, leave effects intact.** Every state change survives, every movement stops. `tokens.css` ships the block.

The two narrative durations zero with them, which is necessary and not sufficient, because a zeroed duration only fixes motion that runs through a token. Motion that runs through a scroll position, a `requestAnimationFrame` loop, or a library timeline has to be switched off at its source. So the contract has three layers, and each one names what it degrades to.

| Layer | Under reduced motion |
|---|---|
| Token-driven transitions and animations | Duration goes to 0ms. The end state applies instantly. Nothing else changes. |
| Ambient motion (§5.6) | Does not start. The element renders in its resting state, which must be a state worth looking at. |
| Scrubbed and scripted scenes (§5.8) | The scene never initializes. The content renders as a static stack in document order, with every state that the scene would have passed through either present at once or resolved to its final value. |

**The static fallback is a real deliverable, not a fallback.** The landing page's is: the same three chapters, stacked, all three visible, the staircase drawn once at full extent, and the Voice rep showing its three written rounds as a list. Someone reading it that way gets the whole argument. Build that first and animate it second; a scene whose static form is incoherent is a scene whose content was never there.

**Check it by preference and by failure, because they are different.** `prefers-reduced-motion: reduce` is the preference. A blocked CDN, a slow script, and an old browser are the failure, and they land on the same static stack. Both paths need a pass before publishing.

## 5.5 Icons

Moved to [visual-voice.md §9.5](visual-voice.md), which resolves the contradiction this section used to carry: it named Lucide with an unverified license while `accessibility.md` named Phosphor with a worked licensing position. Phosphor won. See [checklist.md](checklist.md) open item 20.

## 5.6 The four registers, and what ambient motion is

Motion in this system does one of four jobs. The register decides the tier, the budget, and whether the thing is allowed to repeat.

| Register | Answers | Tier | Repeats |
|---|---|---|---|
| **State** | "Did that work?" | fast, default | On every interaction |
| **Entrance** | "What am I looking at now?" | default, slow, beat | Once per arrival |
| **Ambient** | "Is this still alive?" | beat, move | Yes, that is what makes it ambient |
| **Narrative** | "Where are we in this?" | beat, move | Once per movement |

### The ambient rule

**Ambient motion is the subject of the slide, moving. It is never a background texture.**

This is the club's one non-obvious motion rule and it is worth the paragraph. The default answer to "make it feel alive" is a drifting gradient, a floating shape field, a slow parallax, a pattern breathing behind the type. The club tried exactly that on the Club Rush landing page in September 2026 and it was rejected twice in one review: first as invisible, then on sight. The replacement, which shipped, has more motion than the version that was rejected and no decoration in it at all. What moves is a staircase drawing itself and a sentence being cut down, which is to say: the two things the page is about.

So the rule, stated as a test anyone can run. Point at the thing that is moving and say what it means. If the answer is "it makes it feel alive" or "it fills the space", delete it. If the answer is a sentence about the content, keep it.

Sanctioned ambient subjects, all of which are content:

- **A rail or rule drawing itself** to the position that encodes where the reader is.
- **A clock or meter running**, when the slide is about a duration.
- **Text being compressed, cut, or replaced**, when the slide is about what to say.
- **A count arriving**, when the number is the point.
- **A cursor or caret**, on exactly one element, when the slide is asking the room to say something.

Not sanctioned, in any register: drifting gradients, particle or shape fields, parallax on decorative layers, looping glows, pulsing "thinking" treatments, anything that moves the logo, and anything a four-color loader could be mistaken for. The last three are also [bright-lines.md §1.3](bright-lines.md) violations, so they fail twice.

### The ambient budget

When ambient motion is warranted, these are the ceilings. They exist so that a slide can be alive and still be read by someone taking notes.

- **One ambient subject per screen.** Not one per element.
- **Period 4s or longer** for anything that loops. Faster than that and it reads as an alert.
- **Amplitude under 2% of the stage's short side** for anything that translates without being read as movement, which is 21px on a 1080 stage.
- **Nothing ambient inside 400ms of a transition.** The stage settles, then the subject starts.
- **It stops when the room is working.** A timer running is the exception, because the timer is the subject. Everything else holds still from the moment a facilitator starts an exercise, and the kit does this automatically (§13.6).

## 5.7 Choreography

### The rise, and why not a fade

**Content arrives by rising through a mask.** The mask is a container with `overflow: hidden`; the content sits inside it and starts fully below its own box, at `translateY(100%)` or a little past it, then moves to zero. It does not fade. The landing page headline already does this word by word and it is the club's entrance.

The reason it is a rule rather than a preference: the club's signature device is a stroke that runs, rises, and runs (§9.6), so a rise is the one entrance that says something. A fade-up says nothing, and a fade-up on a projector in a bright lab is nearly invisible for its first half, which spends the budget and delivers a third of the move.

**Exits leave through the same mask, fast.** Anything leaving goes out on `--rcc-ease-exit` in 30% of the beat, accelerating so it never reads as a second arrival. Going forward it continues upward, so an outgoing frame and an incoming one read as a single climb; going backward everything runs downward (§5.9).

One exception. An element that must not move because something is measuring against it (a timer's digits, a table's rows during a sort) changes on the effects track only.

### Stagger

**Stagger is 8% of the beat, capped at six elements.** At `--rcc-dur-beat` that is 56ms between siblings. Below about 40ms the group reads as one object, which defeats the purpose; above about 90ms the last element arrives after the room has moved on. Six is where a stagger stops reading as rhythm and starts reading as a queue; a seventh item means the slide has too much on it.

Stagger runs in reading order, always. Never from the centre out, never alternating sides.

### One subject at a time

**At most one thing moves in the narrative register at once.** A headline arriving while a rail advances while a panel resolves is three events competing, and the room picks one at random. Sequence them, or cut two of them.

The corollary is the useful part: if a slide has three things that all deserve to arrive, it is three slides, or it is one slide with three beats. Both are better than the simultaneous version, and the deck kit's beat mechanism (§13.5) exists so the second one costs nothing.

### What carries across

**Continuity is what separates a sequence from a slideshow.** Anything present in both the outgoing and the incoming frame does not exit and re-enter; it moves. In practice that is the rail, the ledger line, the footer, and any heading that survives a beat change. The kit implements this by keeping those elements in the stage chrome rather than inside the slide, which is the structural version of the rule and cannot be forgotten.

## 5.8 Scrubbed motion

A scrubbed scene is one where the reader, not a clock, controls the playhead: a pinned scroll scene, a slider, a deck scrubbed with arrow keys. The landing page is the club's worked example and its architecture is the rule.

**Every visual state is a pure function of the playhead position.** Not of the events that got there. Write `render(t)` and call it; never write "on entering chapter two, do X". The test is that scrubbing backwards rebuilds the earlier state exactly, including text content, and that a reload at any scroll position renders correctly with no flash.

That one constraint buys reversibility, resize correctness, and a static fallback in the same move, because `render(1)` with no scrolling at all is a legitimate final state.

**Reserve the space before you animate into it.** Measure every state the scene can be in, take the tallest, and pin the container to it. The landing page runs this over four majors at three clocks each and sets `min-block-size` from the maximum, which is why switching majors cannot shove the page. A scene that reflows while it plays will reflow under someone's finger.

**Hide by opacity, not by removal.** Stacked scenes keep every layer in the DOM so a screen reader gets all of it in order. The layer that is not showing must not take pointer input (it will swallow taps meant for the layer that is), and focus landing inside it must bring the playhead to that layer first. The landing page does both, and the `focusin` recovery is nine lines.

**Never trap the scroll.** Pinning is fine. Hijacking the wheel, snapping against the reader, or making one screen of content cost five screens of scrolling without telling them are not. The landing page's cue line ("Scroll to see the whole semester") exists because a pinned scene's first screen looks like a stuck page otherwise.

## 5.9 Transitions

A transition is what happens between two frames of the same argument. The system has four and there are no others. Each one means something, which is the point: a room learns the vocabulary in about ninety seconds and then the transition itself is carrying information.

| Name | What moves | Means | Duration |
|---|---|---|---|
| **Hold** | The subject only. Stage, rail, and chrome are still. | "Same idea, next beat." | `--rcc-dur-beat` |
| **Ascend** | Outgoing content exits up through its mask, incoming rises through its. The rail's fill advances one slide. | "Next step in the same movement." | `--rcc-dur-beat` |
| **Turn** | The rail's fill crosses into the next segment and that movement's name lights, while incoming content rises on the long curve. | "New movement. The argument turned." | `--rcc-dur-move` |
| **Cut** | Nothing. The frame is replaced. | "We are working now, stop watching the screen." | 0ms |

**Turn is rationed.** Four to six per deck, one per movement boundary (§13.2), and never twice in a row. It is the only transition that lights a new name on the rail. Spending it on an ordinary slide change is the fastest way to make a deck feel like a template with transitions switched on.

**Cut is not a failure state.** It is the correct transition the moment a timer starts, during any live exercise, and on every slide in room mode. Motion is attention, and attention during a rep belongs to the person doing the rep.

**Direction encodes direction.** Going backwards runs everything the other way: outgoing content sinks, incoming content descends from above, the rail retracts, all at 60% of the forward duration. A deck that animates identically forwards and backwards is telling the room that the argument does not have a shape.

**A press never waits.** A press during a transition lands that transition instantly and then starts the next one from the settled state. The first version of the deck kit read its position before landing the transition in flight, so a quick second press recomputed the same target and was lost; its check now fires six presses faster than any transition and requires exactly six steps.

## 5.10 Performance budget

**Animate `transform` and `opacity`. Everything else needs a reason in a comment.**

`width`, `height`, `top`, `left`, `margin`, and `padding` trigger layout on every frame. `box-shadow`, `filter`, and `background-position` trigger paint. The sanctioned exceptions, which are the ones the club actually needs: `stroke-dashoffset` or `stroke-dasharray` on a drawn path, which is how a Step or a rail draws itself and is cheap because the path is small; the `d` of that same path, when the cover's Step lies down into the deck's rail; `font-size` on words being cut from a sentence, because closing the gap is the content (the landing page's Voice rep and the deck kit's `compress` both do it, on one line of text); `inline-size` on a single odometer window, which the landing page animates deliberately and which is one element; and `clip-path` on a reveal where a mask will not do.

**Budgets, measured on the machine the deck will run from.**

- The stage holds 60fps through every transition. If the presenting laptop cannot, the deck is too heavy, not the laptop.
- No more than eight units in flight at once, where a line of words rising together counts as one unit. The stagger cap of six plus the rail already allows for it.
- An element is promoted to its own layer only while it moves. GSAP does this itself during a tween; hand-written CSS sets `will-change` on the element about to move and removes it when it lands. Leaving it on a dozen elements permanently costs more than it saves.
- A pinned scroll scene does its layout arithmetic in a `layout()` that runs on refresh, not per frame. Per frame it may only read precomputed values and write transforms.

**Fonts and layout.** Call the scene's refresh after `document.fonts.ready`. Type metrics change when the webfont lands, and a scene laid out against the fallback is laid out against the wrong thing. The landing page does this in one line and it is the difference between a staircase that clears the text and one that crosses it.

## 5.11 Motion accessibility beyond the preference

`prefers-reduced-motion` is one of four obligations and the only one that is a preference. The other three are conformance.

**WCAG 2.2.2, moving content.** Anything that moves automatically, for more than five seconds, in parallel with other content needs a pause, stop, or hide control. A looping ambient subject qualifies. The landing page's major cycler carries a real Pause button for exactly this reason, and it holds on pointer, on focus, and while scrolling.

**WCAG 2.3.1, three flashes.** Nothing in the system flashes, and nothing should be built that does. Relevant in practice to a timer's final ten seconds: it changes color and stays there, it does not blink.

**WCAG 2.3.3, animation from interactions.** A movement triggered by an interaction, and not essential to it, must be disableable. The reduced-motion block is how this is satisfied, which is why the block has to actually reach scripted motion (§5.4) and not just CSS transitions.

**Announce a choice, not a tick.** A scene that updates continuously must not write to a live region continuously. The landing page announces only when a person picks a major, never when the cycle advances, because the alternative interrupts a screen reader every seven seconds with something nobody asked for. Live regions carry decisions; they do not narrate animation.

**Focus never lands on something invisible.** If a scene can hide an element that is still in the DOM and still focusable, either take it out of the tab order in that state or bring the scene to it on `focusin`. Pick one per scene and apply it everywhere in that scene.

## 5.12 Judgment calls and open items

Chosen here and open to argument: the two narrative durations, the `--rcc-ease-arrive` curve, the 8% stagger and its cap of six, the ambient budget's four numbers, the four-transition vocabulary and the ration on Turn, and the eight-element in-flight cap.

Sourced from the club's own shipped artifacts rather than from Google: the masked rise (landing page headline), the pure-function scrub architecture, the reserved-height measurement pass, the opacity-only layer stacking with focus recovery, and the `document.fonts.ready` refresh.

| # | Open item | Blocks |
|---|---|---|
| M1 | Ambient amplitude at 2% of the short side is a guess. Look at a rail and a caret on the A-210 projector and record the real number. | Not blocking |
| M2 | 60fps is asserted for the deck kit and has not been traced on the machine that will present. Run a performance trace on the first real deck. | First deck |
| M3 | `--rcc-dur-beat` at 700ms is read off two artifacts, not tested in a room. The first session that runs from a kit deck is the test. | Not blocking |

---

**Last updated: 2026-09-23.**
