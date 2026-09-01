# GDG on Campus @ RCC

![GDG on Campus Riverside City College](assets/gdg-on-campus-horizontal-light.svg)

Google Developer Group on Campus at Riverside City College is a student-run chapter in Google's GDG on Campus program. We meet weekly, run hands-on workshops (Google AI Studio, vibe coding, pitching), bring in guest speakers, build toward the Solutions Challenge, and closed our first semester with a Demo Day. The chapter was founded in Spring 2026 and reported 23 active members on its Spring 2026 ASRCC funding request. Events, RSVPs, live streams, and recordings live on our Bevy chapter page.

GDG on Campus Riverside City College is an independent group; our activities and the opinions expressed here should in no way be linked to Google, the corporation.

## Meet us

| | |
|---|---|
| Weekly meeting | Thursdays, 2:30 to 3:30 PM |
| Room | BLCIS A-210 Simulation Lab |
| Chapter page (events, RSVP, recordings) | <https://gdg.community.dev/gdg-on-campus-riverside-city-college-riverside-united-states/> |
| Discord | <https://discord.gg/ddwjKJJN9v> |
| Instagram | [TBD: add Instagram URL] |
| Every public link | [docs/04-brand/links.md](docs/04-brand/links.md) |

## This semester

Current semester: [semesters/2026-fall/](semesters/2026-fall/README.md). Goals, calendar, budget, meeting notes, and event folders for Fall 2026 all live there. Past semesters sit next to it; [semesters/README.md](semesters/README.md) explains how a semester starts, runs, and closes.

## What this repo is

This repo is the club's memory. It holds the rules for running the club, the playbooks for every kind of event we do, and one folder per semester that each officer team copies and works through. It is public on purpose: future officers, the advisor, and Student Activities can all read it. It is not a code project, and it never holds personal data (see [docs/01-governance/privacy-and-public-repo-policy.md](docs/01-governance/privacy-and-public-repo-policy.md)).

## Where things live

| Path | What is there |
|---|---|
| [README.md](README.md) | This page |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to add or change anything; naming; PR rules; what never goes in the repo |
| [MAINTAINERS.md](MAINTAINERS.md) | Current maintainers by role, admin succession, handoff rules |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | Google's event guidelines, adopted by reference, plus how to report at RCC |
| [LICENSE](LICENSE) | CC BY 4.0 for everything in this repo |
| [.github/](.github/PULL_REQUEST_TEMPLATE.md) | Issue forms, PR template, CODEOWNERS, and the docs-check workflow |
| [docs/README.md](docs/README.md) | Index of every docs folder |
| [docs/00-charter/](docs/00-charter/mission.md) | Mission, constitution (draft), officer roles, elections, membership |
| [docs/01-governance/](docs/01-governance/maintenance-rules.md) | Maintenance rules, semester lifecycle, decision log, handoff, privacy policy |
| [docs/02-operations/](docs/02-operations/README.md) | ASRCC funding, club recognition and ICC, room booking, reimbursements, event checklist, communications, attendance |
| [docs/03-playbooks/](docs/03-playbooks/README.md) | Step-by-step guides for each event type we run |
| [docs/04-brand/](docs/04-brand/brand.md) | Logo files, naming rules, colors, and every public link |
| [docs/05-onboarding/](docs/05-onboarding/new-member.md) | Start-here guides for new members and new officers, plus a repo tour |
| [assets/](assets/gdg-on-campus-horizontal-light.svg) | Logos and brand files (SVG and PNG, under 1 MB each) |
| [templates/](templates/README.md) | Blank meeting notes, event plans, run sheets, retros, decision records, and more |
| [semesters/](semesters/README.md) | One folder per semester, created from `semesters/_template/` |
| [scripts/](scripts/check.sh) | `new-semester.sh`, `new-event.sh`, `new-meeting.sh`, and `check.sh` |

## Start here

### New member

1. Join the chapter on Bevy so you get event RSVPs and recordings: <https://gdg.community.dev/gdg-on-campus-riverside-city-college-riverside-united-states/>
2. Show up Thursdays at 2:30 PM in BLCIS A-210 Simulation Lab.
3. Read [docs/05-onboarding/new-member.md](docs/05-onboarding/new-member.md) and [docs/00-charter/membership.md](docs/00-charter/membership.md).
4. Read the [code of conduct](CODE_OF_CONDUCT.md). It applies at every meeting and event.
5. Have an idea for a workshop or event? Open an issue with one of the forms under [.github/ISSUE_TEMPLATE/](.github/ISSUE_TEMPLATE/config.yml).

### New officer

1. Read [docs/05-onboarding/new-officer.md](docs/05-onboarding/new-officer.md) and [docs/05-onboarding/repo-tour.md](docs/05-onboarding/repo-tour.md).
2. Find your role in [docs/00-charter/officer-roles.md](docs/00-charter/officer-roles.md). It lists what you own in this repo.
3. Read [docs/01-governance/maintenance-rules.md](docs/01-governance/maintenance-rules.md) once, all the way through.
4. Open the current semester folder, [semesters/2026-fall/](semesters/2026-fall/README.md), and work through its README.
5. Before your first event, read [docs/03-playbooks/bevy-event-publishing.md](docs/03-playbooks/bevy-event-publishing.md) and [docs/02-operations/event-checklist.md](docs/02-operations/event-checklist.md).
6. Get your GitHub handle added to [MAINTAINERS.md](MAINTAINERS.md) by a current admin.
7. At the end of the term, follow [docs/01-governance/handoff-procedure.md](docs/01-governance/handoff-procedure.md); the semester README's Close checklist walks you through it.

### Advisor

1. [MAINTAINERS.md](MAINTAINERS.md) lists you as the fallback contact and explains when you would need repo access.
2. [docs/02-operations/room-booking.md](docs/02-operations/room-booking.md) covers 25Live, which only you can submit.
3. [docs/02-operations/club-recognition-and-icc.md](docs/02-operations/club-recognition-and-icc.md) covers rechartering and good standing.
4. [docs/02-operations/asrcc-funding.md](docs/02-operations/asrcc-funding.md) covers the ASRCC funding cycle and requisitions.
5. [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) names you as a reporting route.

## How this repo stays maintained

Ten rules keep this repo useful after every officer team leaves. Short version: evergreen material in `docs/`, dated material in `semesters/`, no personal data, decisions logged, semesters closed with a retro and handoff, two admins at all times, PRs only. The full list, with the reasoning, is in [docs/01-governance/maintenance-rules.md](docs/01-governance/maintenance-rules.md). `scripts/check.sh` and the CI workflow enforce what they can.

## License

Content is licensed under [CC BY 4.0](LICENSE). Google, GDG, and the GDG on Campus logo are Google trademarks and are used under Google's brand rules; see [docs/04-brand/brand.md](docs/04-brand/brand.md).
