# Handoff: complete player capstone in a separate repo

**Date:** 2026-09-02  
**Next session purpose:** Stand up a dedicated git repo for the player-capstone **app**, copy the locked spec/tickets/notes, then implement remaining weeks **one ticket per session**, starting at issue 13.  
**Do not continue this work in `AI_new`.** That repo is an agent-hub (prompts/skills). Application code there is an accident of planning.

## Suggested skills (invoke in the new session)

1. **`/ask-matt`** — confirm you are on the idea→ship **implement** branch, not wayfinder again.
2. **`/setup-matt-pocock-skills`** — first thing in the new repo if tracker/docs layout is missing (`CONTEXT.md`, `.scratch/`, issue files).
3. **`/implement`** — one ready ticket at a time; **clear context between tickets**.
4. **`/research`** — only when a week’s official docs need gathering (packager, Shaka, Next, CSP). Research feeds implement; it does not replace the ticket.
5. **`/code-review`** — after each ticket’s Done-when, against the ticket + `spec.md`.
6. **`/handoff`** — if a session fills before a ticket is done.

**Do not use:** `/wayfinder` (map already reached), `/grill-with-docs` / `/grill-me` (product decisions locked), `/to-spec` / `/to-tickets` (already done), `/triage` (these tickets were produced by `/to-tickets`), `/prototype` (variant B already locked). **`/tdd` is not the default** — see Learn loop below.

## What this project is

A **12-week part-time skill capstone**: one fictional VOD catalog + one live channel, **player-first**. Thick Watch, thin Home / Search / Account. Learner is senior .NET/Angular closing a Player-team gap (React/Next, Shaka, HLS/DASH, QoS, TV web, security, tests).

**Phase 1 (weeks 1–7):** Vite + React + TypeScript + Shaka. Week 7 is the visitor demo gate.  
**Phase 2 (weeks 8–12):** in-place promote of the **same** `app/` directory to Next.js App Router, then QoS ingest, Chrome Leanback, CSP+drills, CWV+CI+one tiny A/B flag.

Playback engine is **Shaka only**. Media is **fully local** (clear HLS/DASH + ClearKey, no license vendor). Styling **Tailwind only**. Shared session **Nanostores**; local UI `useState`/`useReducer`.

## Source locations (today — hub repo)

Hub: `C:\Users\337023\Documents\Code\AI_new`

| Artifact | Path |
|---|---|
| Spec (canonical product) | `.scratch/player-capstone/spec.md` |
| Wayfinder map (decisions index) | `.scratch/player-capstone/map.md` |
| Build tickets 12–23 | `.scratch/player-capstone/issues/` |
| Decision tickets 01–11 | same folder (`Status: resolved` — **do not implement**) |
| Research notes | `tasks/2026-09-02-player-capstone/notes/` |
| Week 1 app (in progress) | `tasks/2026-09-02-player-capstone/app/` |
| Throwaway prototype (winner B) | `tasks/2026-09-02-player-capstone/prototypes/watch-browse/` |
| Job profile | `docs/webdev_jobprofile.txt` |
| Learner profile | `docs/candidate_profile.txt` |

**Read `spec.md` + the current ticket. Do not paste the spec into chat.** User stories, folder conventions, QoS event table, and visitor checklist live there.

## Seed the new repo

Create a **new git repository** (empty product repo, not a clone of `AI_new`). Suggested layout:

```
<new-repo>/
  README.md                 # how to run; pointer to spec + week order
  CONTEXT.md                # glossary after /setup-matt-pocock-skills
  spec.md                   # copy of spec.md
  map.md                    # copy of map.md (reference only)
  docs/                     # job + candidate profiles (optional but useful)
  notes/                    # copy research notes 01–04
  .scratch/player-capstone/issues/   # copy issues 12–23 (and 01–11 if you want the paper trail)
  app/                      # copy the Vite app (week 1 already done)
  prototypes/watch-browse/  # optional reference only; do not ship; do not extend
```

**Copy:** `app/` source (`src/`, `public/`, `index.html`, `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig*.json`, `eslint`/`oxlint` config if present).  
**Do not copy:** `app/node_modules/`, `app/dist/`. Run `npm install` in `app/` after copy.

**Do not copy** the rest of `AI_new` (`.cursor` agent prompts, other `tasks/`, skills). Point Cursor at the new folder as workspace root. Install the Matt/Pocock skills in the new repo (or user-level) so `/implement` exists there.

After copy, **open a fresh Cursor chat on the new repo** and attach this handoff file.

## Current implementation (week 1 done)

Issue **12** is **done**. Visitor can hit four routes; browse has left destinations; Watch does not.

- Stack: Vite 8, React 19, React Router 8, Tailwind 4 (`@tailwindcss/vite`), Vitest 4 + RTL, oxlint, TypeScript `strict` + `noUncheckedIndexedAccess`.
- Scripts: `dev` / `build` / `test` (`vitest run`). `e2e` is **week 7**.
- Alias `@/` → `src`.
- Routes: `/`, `/search`, `/watch/:id`, `/account`. BrowseShell wraps Home/Search/Account; Watch is a sibling route (no rail).
- Pages are placeholders (headings + empty poster-wall region). No catalog JSON, no Shaka, no `public/media/`.
- Tests: `app/src/App.test.tsx` — four routes; Watch has no Destinations nav.

Run: `npm run dev` and `npm test` from `app/`.

## What to do next (blockers-first)

Tickets **13 and 14 are both unblocked** (only blocked by 12). They do not overlap much: 13 is React chrome + mock JSON; 14 is ffmpeg/packager files under `app/public/media/`. Prefer **13 first** if doing one session, or 13 then 14 sequentially. **15 needs both.**

| Ticket | Week | Status | Blocked by |
|---|---|---|---|
| 12 scaffold + B shell | 1 | **done** | — |
| **13 Home / Search / Account chrome** | **2** | **ready — start here** | 12 |
| **14 local HLS/DASH/ClearKey fixtures** | **3** | ready | 12 |
| 15 Shaka island + docked chrome | 4 | ready | 13, 14 |
| 16 buffer / error / live | 5 | ready | 15 |
| 17 quality / captions / continue-watching | 6 | ready | 16 |
| 18 Phase 1 demo + ClearKey | 7 | ready | 17 |
| 19 in-place Next App Router | 8 | ready | 18 |
| 20 QoS ingest | 9 | ready | 19 |
| 21 Chrome Leanback 10-foot | 10 | ready | 19 |
| 22 CSP + key hygiene + drills | 11 | ready | 20, 21 |
| 23 CWV + CI + one A/B flag | 12 | ready | 22 |

**20 and 21 both unblock after 19** — they can be sequential weeks (locked order: 9 then 10) even though both only list 19 as blocker. Follow the twelve-week sequence, not “grab any unblocked ticket.”

## How to implement (overrides `/implement` defaults)

From [Learn-loop format](.scratch/player-capstone/issues/10-learn-loop-format.md) and spec:

1. Open that week’s **2–5 official docs** before coding (no Angular→React mapping notes).
2. Implement to the ticket’s Done-when.
3. One-line DevTools glance.
4. **Tests after implement, same week** — **not TDD by default**. Vitest+RTL from UI weeks.  
   - **Week 3 (ticket 14):** no test gate.  
   - **Week 7 (ticket 18):** Playwright **is** the implement.
5. `/code-review` (Standards + Spec). Commit on the current branch.
6. Mark the issue `done`. **New chat** for the next ticket.

`/implement` says “use `/tdd` where possible.” **Ignore that when it fights the learn loop.** Use TDD only if you already know the seam (e.g. continue-watching write/read, QoS batching).

## Hard product locks (do not reopen)

- One app directory: Vite through week 7, **becomes** Next in that same tree in week 8. No parallel Next app.
- Routes only: `/`, `/search`, `/watch/:id`, `/account`. No title-details. Tiles go straight to Watch.
- Watch: picture on top, **docked** always-visible chrome underneath (prototype **B**). Rail off. Destroy Shaka on leave.
- Watch MVP: play/pause, seek+time, volume, fullscreen, buffering, error+retry, live vs VOD, ABR/quality (auto + optional manual), captions if VTT. **Not** Chromecast, PiP, watch party, mini-player, scrub thumbnails.
- Continue watching: Watch writes, Home reads; resume if position **> ~10s** and **< ~90%**; cap ~6–8.
- QoS ingest is **week 9**, not a Phase 1 mock week.
- Leanback is **week 10** (same layout + overscan/type/focus + D-pad). Native DOM focus; no CSS `nav-*`.
- ClearKey: `drm.clearKeys` before load; keys in fixture `keys.json`; no media `.env`.
- Nanostores: client session `map` + `useStore` with `{ keys }`; reset on asset change. Phase 2: `{ ssr: 'initial' }`, no `set` during SSR. Checkpoint after Next+QoS before migrating stores.
- Shaka: constructed after mount only; Phase 2 `dynamic({ ssr: false })` **inside** a Client Component.

Paint: graphite/steel from prototype B. Variants A and C rejected.

## Open questions (do not block Phase 1)

- Whether Nanostores still holds after Next + QoS (Phase 2 checkpoint).
- Optional Tizen/webOS packaging (appendix, one platform, not VIDAA).

## First message to paste in the new repo

```
Read C:\Users\337023\AppData\Local\Temp\player-capstone-handoff.md
This workspace is the player-capstone product repo.
Run /setup-matt-pocock-skills if CONTEXT.md / issue tracker are missing.
Then /implement .scratch/player-capstone/issues/13-home-search-account-chrome.md
Follow spec.md and the learn loop (docs → implement → tests after, not TDD).
Do not reopen wayfinder decisions.
```

If 13 is already done in that repo, implement the next undone ticket in week order (14, then 15, …).
)
