# Facilitator Playbook: The 40-Minute "Modular Impact" Sprint

| | |
|---|---|
| Owner | Workshop lead (any organizer who has run the prompts once end to end) |
| Duration | 40 minutes of build time, plus 5 minutes before for the Design Brief and 5 minutes after for deploy and closing |
| Tools | Google AI Studio in Build mode (one Google account per student), a projector, printed or shared Student Design Brief, the Capability Map on screen or as a handout |
| When to run | As the kickoff workshop for the Solutions Challenge season (see [solutions-challenge.md](solutions-challenge.md)), or any week the club wants a hands-on build session with zero setup |
| Publish first | Create the Bevy event before announcing anywhere else: [bevy-event-publishing.md](bevy-event-publishing.md) |
| Generic checklist | Room, advisor, food, and day-of logistics live in [workshop.md](workshop.md); this file is only the facilitation script |

Target audience: students (Solutions Challenge focus).
Strategy: Sync-Stream (lecture while the AI builds).

---

## Before Anyone Opens a Laptop

Hand out the Student Design Brief. Tell students to fill in only the first two fields before they pick an engine. One sentence each.

### Student Design Brief

- **The problem:** Who has it, and when does it hurt most?
- **The user:** Describe the specific person this is built for.
- **The gap this fills:** What did they do before this existed?
- **The next feature:** What would make this worth coming back to?

They will fill in the last two at the end. The point of doing this now is that it changes what they build: they are solving for a real person, not completing an exercise.

---

## Phase 1: The Core Engines (0:00 to 0:10)

One instruction before they open AI Studio: pick the engine that matches what you just wrote down. Not the most impressive one; the most honest one.

| Core Option | Starter Prompt | Why It Matters |
| :--- | :--- | :--- |
| **The Empathy Lens** | "Build an app where I can input a complex instruction or cultural phrase and it explains the hidden social context, tone, and implied meaning so I don't miscommunicate." | Turns a translator into a cultural guide. Useful for refugees, exchange students, and cross-border teams. |
| **The Opportunity Scout** | "Build an app where I can describe a skill I have or a local resource I found, and it suggests five ways to turn that into a small business or community project." | Converts underused skills and materials into economic starting points. |
| **The Guardian** | "Build an app where I can describe a strange sound, an unfamiliar plant, or a confusing warning light, and it returns an immediate risk assessment with first-step instructions." | Extends expert-level judgment to anyone in an uncertain or hazardous situation. |

**While the UI generates:**
We are not coding in the traditional sense. We are architecting intent. The AI is acting as a senior developer who executes exactly what the product manager specifies. Your job is to be a precise, thoughtful product manager, and that is a harder and more transferable skill than writing syntax.

Then ask the room: what would make your chosen engine useless? Bad data? No context? No follow-through? Hold that answer. The next three layers each address one of those failure points directly.

---

## Phase 2: The Bolt-On Layers (0:10 to 0:35)

Each layer adds one dimension of real-world usefulness. Introduce them one at a time. If you are running behind, Layers 1 and 2 are the critical path: skip Layers 3 and 4 and assign them as homework. If you have the time, all four together tell a complete story: the app can see, it knows where you are, it thinks in steps, and it remembers you.

---

### Layer 1: Vision (0:10 to 0:18)

**Prompt:** "Add an image upload button. Instead of typing, let me snap a photo and have the AI apply the same reasoning to what it sees."

**Optional add-on for early finishers:** "Now add a microphone button so I can describe what I am seeing out loud instead of typing."

**While the UI generates:**
Gemini's multimodality is not OCR. It does more than read text from a photo: it understands spatial relationships, context, and condition. A photo of a plant is a scene to reason about, not pixels to decode.

This is where a broader ecosystem opens up. "Image input" is a layer with multiple entry points, and which one you need depends on what your app actually has to see:

**Real-time body and motion tracking.** Detecting hands, faces, or body position live from a camera feed, without uploading anything. Useful for accessibility tools, sign language interpretation, or fitness apps. Tools: MediaPipe (Google).

**General image understanding.** Labeling what is in any photo, extracting text from signs or documents, detecting unsafe content. Useful when you do not know in advance what the user will upload. Tools: Google Cloud Vision API.

**Custom object recognition.** Teaching an app to identify something specific: a crop disease, a local plant species, a product defect. You define what it looks for. Tools: Roboflow.

For voice input specifically:

**Accurate transcription.** Higher quality speech recognition that handles accents, background noise, and multiple languages reliably. The first choice for anything users will actually depend on. Tools: Google Speech-to-Text API.

**Basic voice-to-text.** Letting users speak instead of type, with no setup or API key. Good enough for prototypes and low-stakes inputs. Tools: Web Speech API (built into most browsers).

---

### Layer 2: Ground Truth (0:18 to 0:26)

**Prompt:** "Before responding to any input, automatically detect my location and pull in current local conditions relevant to my question. The app should know where I am and what is happening around me without me having to say it."

**Optional add-on for early finishers:** "Add a Risk Meter: a visual gauge that moves from green to red based on the AI's confidence in its answer."

**While the UI generates:**
An AI that reasons brilliantly from stale or general data is a confident guesser. Grounding connects the model's output to live information: current prices, local services, real addresses. This is the line between a demo and a tool someone would actually rely on.

A user who sees their actual neighborhood reflected in an answer is a user who comes back. Beyond Search and Maps, there are several grounding categories worth knowing:

**Maps and location context.** Directions, nearby services, real addresses, local businesses. Turns a general recommendation into one that works where the user actually lives. Tools: Google Maps Platform.

**Live weather and environmental data.** Current conditions, forecasts, air quality. Relevant for agricultural, safety, logistics, or climate apps. Tools: Open-Meteo (free, no account needed).

**Civic and public datasets.** Government health data, transport schedules, school locations, demographic information. Often free, underused, and highly credible for Solutions Challenge submissions. Tools: any public government or NGO open data portal.

**Shared live data between users.** When the app needs multiple users contributing or reading from the same source in real time, rather than each person working in isolation. Tools: Firebase Realtime Database.

---

### Layer 3: Agent Mode, a Detour (0:26 to 0:33)

This layer is a deliberate detour. Every student builds it. Not because every app needs it, but because you cannot make an informed decision about a tool you have never seen.

**Prompt:** "When I give this app a goal (not a question, but an actual goal) I want it to break that goal into steps, work through each one in sequence, and report back what it did and what it found. It should think out loud."

**While the UI generates:**
Everything up to this point has been the AI responding to a single input. This layer is different. A single response is a tool. A sequence of reasoning steps toward a goal is an agent.

The distinction matters because most real problems are not answered in one shot. A farmer asking about their crop needs more than one answer: they need the AI to check what is growing, look up what disease matches the symptoms, find the nearest supplier, and tell them what to do first. That chain of steps, executed automatically, is what agentic AI actually means.

This is also the layer most cited by Solutions Challenge judges when evaluating sustained impact: a system that can carry a user from problem to resolution on its own, rather than a clever response.

For students who want to extend this further:

**Production-grade agents.** For students who want to move beyond AI Studio into a fully managed agent infrastructure. Vertex AI Agent Builder lets you build, deploy, and monitor agents on Google Cloud with access to grounding, tool use, and memory built in. Tools: Vertex AI Agent Builder, Google Cloud Scheduler.

**Scheduled and triggered agents.** An agent that runs on its own when a condition is met, not just when a user opens the app. Checks in daily, alerts when something changes, follows up automatically. Tools: Google Cloud Scheduler, Vertex AI.

**Agents that take real-world actions.** Beyond reasoning, an agent that can send a message, book an appointment, or update a record as part of its chain. Tools: Gmail API, Google Calendar API, Twilio.

#### Reflection checkpoint: pause before moving on

Stop the room here. Ask students to pick up their Design Brief and read back the first two fields (the problem and the user) silently.

Then ask out loud: does your user have a goal that takes multiple steps to complete, or do they need a single, sharp answer delivered fast?

Give the room ten seconds of actual silence. Then ask for a show of hands: who thinks their app needs the agent, and who is not sure? You do not need to resolve it for them. The uncertainty is the point.

Two reference points to offer:

A farmer navigating a crop disease needs the agent: check symptoms, find matches, locate a supplier, recommend a first action. That is four steps, and collapsing them into one response loses something real.

A traveler trying to understand a cultural phrase does not need the agent. They need one excellent, contextually rich answer delivered immediately. Adding steps slows down the thing that makes the app valuable.

If a student decides the agent does not fit, they should remove it now and return to the Layer 2 version. A focused tool that does one thing reliably is a stronger submission than one that does many things loosely. Encourage that call; it is the harder and more honest one to make.

---

### Layer 4: Memory (0:33 to 0:38)

**Prompt:** "This app should remember me. Save my past inputs, my preferences, and what the AI told me before. The next time I open it, it should pick up where we left off."

**While the UI generates:**
Every layer so far makes the app smarter in the moment. This layer makes it smarter over time. Without memory, every session starts from zero and the app has no relationship with its user. With memory, the app becomes something a person returns to rather than tries once.

For Solutions Challenge submissions specifically, this is what separates a demo from a product. Judges want to see sustained impact. An app that learns from its users and improves with use is a fundamentally different proposition than one that resets on every visit.

AI Studio scaffolds React by default, and React is the right choice. Do not switch unless there is a specific reason to. It is component-based, widely documented, and the most useful frontend skill students can pick up right now.

For persistence, two options cover everything students will build:

**React state + local storage.** No setup, no account. Data lives in the browser. Sufficient for single-user apps and most workshop projects.

**Firebase.** When the app needs to remember users across devices or share data between them. Free tier is generous and pairs directly with React.

The more valuable decisions are about what to store and how to surface it, rather than which database to use:

**What to remember.** Preferences and context are more powerful than raw history. An app that remembers a user's location, language, or recurring problem type gives a better answer the second visit than the first.

**How to show it.** Consider whether a "last time you asked..." prompt, a saved favorites list, or a simple history log serves the user better. The default is always a list. It is rarely the best choice.

**When to forget.** Sensitive inputs and one-off queries should clear automatically. Build that boundary intentionally.

#### Reflection checkpoint: who is your app for over time?

One quick question before moving to deploy: is your user someone who will come back to this app repeatedly, or someone who needs it once in a moment of need and then moves on?

Both are valid. A one-time tool (something you reach for in an emergency, get your answer, and close) does not need persistent memory. Adding it creates infrastructure that serves no one. A returning tool (a daily health tracker, a learning companion, a business advisor) becomes meaningfully worse without it.

If memory fits, keep it. If it does not, remove it. The app is cleaner for the decision either way.

---

## Deploy (0:38 to 0:40)

**Prompt:** "Give this a professional [student's choice: Minimalist / High-Contrast / Clean Dark] design. Then click Deploy to generate a live URL."

**While the deploy runs:**
Ask students to finish the last two fields of the Design Brief: The gap this fills, and The next feature. Then take two or three verbal answers from the room on the next feature question only. You do not need discussion; just let the room hear what excited each other.

**Closing talk track:** Forty minutes ago you had a blank page. You now have a working application, and more importantly, you made real product decisions along the way. You chose who you are building for. You decided what your app needs to see and know. You considered whether complexity serves your user or just impresses a room. That combination of technical ability and product judgment is what separates builders who ship things that matter from builders who ship things that work. The pace of this era is features per hour. Your job is to make sure each one earns its place.

---

## Capability Map

Leave this on screen or print it as a handout. It shows where today's workshop fits in the full landscape of what is buildable, and where students can go next on their own.

| Layer | What it enables | Example products |
| :--- | :--- | :--- |
| **Reasoning** | The AI brain. Understands what users mean, not just what they type | Gemini, Claude, ChatGPT |
| **Vision** | The AI eyes. Reads photos, detects objects, tracks motion in real time | Google Lens, MediaPipe, Cloud Vision API, Roboflow |
| **Voice** | The AI ears. Converts speech to text so users can talk instead of type | Google Speech-to-Text API, Web Speech API |
| **Grounding** | The connection to the real world. Live data, local places, current facts | Google Search, Google Maps, Firebase, Open-Meteo |
| **Agent Mode** | The ability to pursue a goal across multiple steps, not just answer once | Google AI Studio, Vertex AI, Google Cloud Scheduler |
| **Action** | Reaches out and does something. Sends messages, books appointments, triggers events | Gmail API, Google Calendar API, Twilio |
| **Memory** | Remembers users across sessions. Browser storage for solo apps, Firebase for multi-user | React state + local storage, Firebase |
| **Deployment** | Makes it real and shareable. Turns a prototype into a live link anyone can open | Google AI Studio Deploy, Firebase Hosting, Vercel |

---

## After the workshop

- [ ] Export registered vs checked-in counts from Bevy (Chapter Dashboard > Events > this event > Attendees) and record counts only in the semester event folder.
- [ ] Collect deployed URLs from students who want to share them; post in Discord.
- [ ] Fill in the retro from [templates/event-retro.md](../../templates/event-retro.md). If a prompt failed or a layer ran long, change this file, not your notes.
- [ ] If this was the Solutions Challenge kickoff, point teams at [solutions-challenge.md](solutions-challenge.md) for the next steps.

This file is the maintained copy of the facilitator playbook. Edit here, not in personal notes.
