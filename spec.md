# Player capstone spec

Status: ready-for-agent
Parent: map.md
Label: wayfinder:map

A skill-to-feature coverage spec plus ordered learn→implement sequence for one player-first streaming app. Completing this spec is enough to start building under the task app tree without further “what are we building” decisions. The app itself is not part of this document.

## Problem Statement

A senior .NET/Angular engineer needs a single, realistic product to close the Player-team gap (React/Next, Shaka, HLS/DASH, QoS, TV web, security, tests) against the webdev job profile. Scattered tutorials do not force the same decisions a watch-heavy streaming app would: local media and ClearKey, a thick watch page, thin browse chrome, QoS ingest, Leanback-in-Chrome, and a Vite-then-Next promotion. Without a locked product and week order, the 12-week part-time spine either invents extra surface to “cover” skills or skips the demo gate.

## Solution

Build one fictional VOD catalog plus one live channel as a **player-first** web app: thick Watch, thin Home / Search / Account. Phase 1 is Vite + React + TypeScript with Shaka and custom chrome; week 7 is a visitor demo. Phase 2 promotes that same UI in place to Next.js App Router, then adds QoS ingest, Chrome Leanback 10-foot mode, CSP and failure drills, Core Web Vitals notes, CI, and one tiny A/B flag. Learning each week is official docs then implement, with tests the same week except where the sequence already carved exceptions. Overflow (QoS dashboard, memory pass, one TV packaging spike) stays appendix.

## User Stories

1. As a learner, I want one product that maps every job-profile bullet to product, appendix, talking-point, or omit, so that I do not invent extra screens to cover a skill.
2. As a learner, I want a 12-week part-time spine with one substantial feature per week, so that overflow becomes appendix instead of fake features.
3. As a learner, I want each week to name Learn, Feature, and Done-when, so that I know when to stop.
4. As a learner, I want a reusable week template (docs list, one-line DevTools glance, implement, tests), so that the sequence is not a second curriculum.
5. As a learner, I want official docs only (about 2–5 links) opened before implement, so that I do not learn React via an Angular mapping track.
6. As a learner, I want tests after implement in the same week (not TDD by default), so that Done-when includes proof without blocking learning.
7. As a learner, I want week 3 to have no test gate, so that packing local HLS/DASH fixtures is judged by smoke playback.
8. As a learner, I want week 7 Playwright to *be* the work, so that the demo path is the feature.
9. As a visitor at the Phase 1 demo, I want to open Home and see Continue Watching, a live tile, and static VOD with left destinations, so that the product is recognizable without Shaka explanation.
10. As a visitor, I want Search to return a known title and empty for nonsense, so that browse is real enough to click through.
11. As a visitor, I want Account to show a read-only stub with no sign-in, so that chrome has a fourth route without an auth week.
12. As a visitor, I want a clear VOD poster to open Watch with no left rail and chrome docked under the picture, so that the player owns the screen.
13. As a visitor, I want play/pause, seek and time, volume, and fullscreen on Watch, so that the MVP controls are visible.
14. As a visitor, I want a quality readout (auto plus optional manual), so that ABR is interview-visible.
15. As a visitor, I want captions controls when a fixture has VTT, so that tracks are not skipped if they exist.
16. As a visitor, I want leaving Watch to update Continue Watching and not leave a leftover player, so that session teardown is part of the demo.
17. As a visitor, I want the live tile to play the live fixture with live vs VOD visible, so that live is not a poster-only fake.
18. As a visitor, I want a ClearKey title to play via in-player keys with no license HTTP, so that EME is demonstrated locally.
19. As a catalog user, I want only Home, Search, Watch, and Account, so that React fundamentals and Shaka stay the center of the 12 weeks.
20. As a catalog user, I want tiles and search hits to go straight to Watch, so that there is no title-details page.
21. As a Home user, I want Continue Watching always on top, including empty copy when nothing to resume, so that the rail is never silently missing.
22. As a Home user, I want one live row with one channel tile, so that live has a first-class entry without a live hub.
23. As a Home user, I want one static VOD poster wall (a second labeled row is the same list sliced), so that the catalog stays ~8–16 titles plus one live channel.
24. As a Home user, I want no hero, infinite scroll, recs, “see all,” or pagination, so that lists stay teachable.
25. As a Search user, I want `/search?q=…` with debounce and case-insensitive substring on title (optional description), so that filtering is a real React state exercise.
26. As a Search user, I want loading, error, empty query, and no-results states, so that chrome tests have four outcomes.
27. As a Search user, I want a flat list of matching VOD plus live if it matches, so that I do not build facets or ranking.
28. As an Account user, I want a fake display name, avatar, and short product blurb from local JSON, so that the route is not an empty stub.
29. As an Account user, I do not want login, extra profiles, billing, PIN, devices, or a watch-history list, so that the spine does not spend weeks on auth.
30. As a Watch user, I want the shell and left destinations hidden (or overlay so the player owns the screen), so that browse chrome does not compete with playback.
31. As a Watch user, I want Back / Escape to return to the previous browse route, so that Watch is not a dead end.
32. As a Watch user, I want buffering UI, so that waiting after first frame is visible.
33. As a Watch user, I want error plus retry that can recover, so that production-triage drills have a UI.
34. As a Watch user, I want unknown ids to show not-found with a link Home, so that routing is honest.
35. As a Watch user, I want play/pause, seek, volume, fullscreen, buffering, error+retry, live vs VOD, ABR/quality readout, and captions if VTT exists — and not Chromecast, PiP, watch party, mini-player, or scrub thumbnails — so that MVP stays bounded.
36. As a resume user, I want Watch to write progress (asset id, position seconds, duration, `updatedAt`) and Home to read it, so that Continue Watching is data, not a page.
37. As a resume user, I want resume only when position is greater than about 10 seconds and less than about 90%, so that intros and finished titles do not clutter the rail.
38. As a resume user, I want a cap of about 6–8 entries, newest first, so that the rail stays short.
39. As a developer, I want a Continue Watching reset as a test helper, not an Account control, so that product surface stays thin.
40. As a Home user, I want per-region loading, error, and empty — not one blank Home — so that a failed live tile does not hide catalog.
41. As a Home user, I want Continue Watching errors to leave the rest of Home working (empty rail or one-line “couldn’t load progress”), so that progress is not a single point of failure.
42. As a Home user, I want a missing live fixture to hide the live row, so that we do not show a broken channel as catalog.
43. As a catalog user, I want a “No titles” empty for VOD even when fixtures exist in tests, so that empty is exercisable.
44. As a desktop user, I want variant-B layout: left destinations plus poster wall, Continue Watching as a short poster row, Live as one tile, Catalog as a wrapping grid, so that browse matches the locked prototype.
45. As a Watch user, I want the picture on top and a persistent control bar docked underneath, always visible, so that Leanback and desktop share one skeleton.
46. As a Leanback user, I want the same layout with ~20px overscan padding, larger type/targets, and a stronger focus ring — not a second product — so that 10-foot is a mode.
47. As a Leanback user, I want native DOM focus plus an in-page D-pad router (arrows, Enter, Escape), so that Chrome 10-foot works without a TV SDK.
48. As a Leanback user, I want Home focus on the first Continue Watching poster (Live tile if that row is empty), so that first keypress is content, not chrome.
49. As a Leanback user, I want last-focused tile restored when returning from Watch, so that Back is not a maze.
50. As a Leanback user, I want ArrowLeft from a row to reach the destination rail, so that Home / Search / Account stay reachable.
51. As a Leanback user, I want Watch to land on Play, then Seek → Volume → Fullscreen, with Back last, so that playback is the default action.
52. As a Leanback user, I want Watch to own focus once playback starts, so that the D-pad does not fight the picture.
53. As a playback engineer, I want Shaka as the only engine, with HLS and DASH as protocols through Shaka, so that HLS.js / Video.js / dash.js stay talking-points.
54. As a playback engineer, I want compiled `shaka.Player` on a stable `<video>` after mount (polyfill → `isBrowserSupported` → attach → load) and `destroy` on unmount, so that lifecycle is the Phase 1 constraint.
55. As a playback engineer, I want custom React chrome, not Shaka Overlay, so that controls are a React skill.
56. As a Phase 2 engineer, I want the same player island as a client-only module (`dynamic({ ssr: false })` inside a Client Component), so that Shaka is never constructed on the server.
57. As a Phase 2 engineer, I want only serializable props from the Watch Server Component, so that the RSC boundary stays clean.
58. As a session user, I want a Nanostores `map` plus `useStore` for shared playback session, with time ticks subscribed by keys, so that chrome does not rerender on every tick.
59. As a session user, I want session reset on asset change, so that a new title does not inherit the previous clock and error.
60. As a Phase 2 engineer, I want `{ ssr: 'initial' }`, no `set` during server render, and no `allTasks` in RSC for session, so that hydration and process-wide atoms do not leak.
61. As a media engineer, I want ffmpeg-encoded H.264/AAC ladders packaged by Shaka Packager into shared fMP4 with both `h264.mpd` and `h264_master.m3u8`, so that one encode serves both protocols.
62. As a media engineer, I want clear fixtures without encryption flags and ClearKey fixtures with raw keys and Common SystemID PSSH (no `--protection_systems`), so that EME works without a license vendor.
63. As a media engineer, I want `drm.clearKeys` configured before `load`, so that Phase 1 needs no HTTP license server.
64. As a media engineer, I want fixtures served same-origin under the app public media tree on `http://localhost`, never `file://`, so that EME and Range requests work.
65. As a media engineer, I want `vod-clear/`, `vod-clearkey/` plus `keys.json`, and one live loop (`ffmpeg -re -stream_loop` → UDP → packager live HLS + dynamic MPD), so that the catalog has real bits.
66. As a catalog client, I want a local thin API for catalog, continue-watching, and QoS ingest (Phase 1 JSON/mock; Phase 2 Next Route Handlers), so that there is no cloud media or real users.
67. As a QoS owner, I want seven events (`playback_start` with `ttffMs`, `rebuffer_start`/`rebuffer_end` after first frame, `quality_change`, `error`, `heartbeat` ~30s while playing, `playback_end`) sharing `sessionId`, `contentId`, and `timestamp`, so that job metrics are ingestible.
68. As a QoS owner, I want TTFF as `performance.now()` at `player.load()` until first shown frame (ClearKey delay inside TTFF), so that startup is not click-to-play or React mount.
69. As a QoS owner, I want a failed load before a frame to emit `error` only, with no `playback_start`, so that failures are not fake startups.
70. As a QoS owner, I want no play/pause/seek QoS events, so that engagement is `watchDurationMs` / `completed` / heartbeats, not a second control stream.
71. As a QoS owner, I want an AnalyticsClient that batches (~50, plus `playback_end` and `pagehide`) to `POST /api/qos/events`, so that ingest is one module.
72. As a QoS owner, I want Nanostores to hold only `qosSessionId` and `contentId`, not the event log, so that the store stays a session, not a warehouse.
73. As a Phase 1 engineer, I want the QoS URL mocked by appending `qos-events:v1` in `localStorage` only when week 9 lands — not a Phase 1 week on that mock — so that weeks 1–7 stay chrome then media then Shaka.
74. As a Phase 2 engineer, I want the same POST as a Route Handler (append-only, not SQL), so that the contract does not change at promote.
75. As a QoS owner, I want derived metrics (startup, buffering ratio, rebuffer frequency, switches/drops, failures, engagement) computed from the log, not extra events, so that the contract stays seven rows.
76. As a learner, I want a QoS dashboard as appendix (recent-session table + avg TTFF, rebuffer ratio, error count, bitrate-switch count), so that ingest is the spine skill.
77. As a security-minded engineer, I want XSS hygiene, Phase 2 CSP that does not break MSE/EME, ClearKey key hygiene, and same-origin API, so that security is product work not a slide.
78. As a reliability engineer, I want failure drills (bad manifest, bad ClearKey, offline) with error + retry, so that triage is practiced on localhost.
79. As a Leanback user, I do not want CSS `nav-*`, the spatial-nav spec, or Chromium spatial-navigation flags, so that focus stays standards that actually ship.
80. As a TV engineer, I want OEM Back/media keys, Magic Remote pointer, Tizen inputdevice, and firmware packaging postponed to an optional one-platform spike, so that Chrome Leanback is the gate.
81. As a performance engineer, I want Phase 2 CWV checklist on Watch and Home (not a RUM product), so that Core Web Vitals is notes plus a glance, not a vendor.
82. As a release engineer, I want CI plus one tiny A/B flag that changes a harmless UI bit, so that experiments are a skill without an experiment platform.
83. As a styling engineer, I want Tailwind only, so that CSS-in-JS stays a talking-point.
84. As a state engineer, I want component `useState`/`useReducer` plus Nanostores for shared session, so that Phase 1 does not add a second store.
85. As a Phase 2 engineer, I want a checkpoint to keep Nanostores or migrate to Zustand or TanStack Store if product complexity forces it, so that the library verdict is not a forever lock.
86. As a fetching engineer, I want TanStack Query (if used) as fetching, not the client store, so that session and cache stay distinct.
87. As a scaffold engineer, I want one app tree that is Vite through week 7 and becomes App Router in that same directory in week 8, so that Watch is not rewritten.
88. As a scaffold engineer, I want TypeScript `strict` and `noUncheckedIndexedAccess` (not `exactOptionalPropertyTypes`), npm, `@/` → `src`, and scripts `dev` / `build` / `test` from week 1 and `e2e` from week 7, so that week 1 does not invent structure.
89. As a scaffold engineer, I want no Phase 1 media env vars; catalog uses same-origin `/media/...` and ClearKey from fixture `keys.json`, so that media is files, not secrets sprawl.
90. As a designer, I want graphite/steel paint from prototype B as a starting point in the first UI week, so that throwaway variants A and C stay rejected.
91. As a tester, I want Vitest + RTL from the first UI feature, Playwright when Shaka lands, and CI + tiny A/B in Phase 2, so that the job’s test stack is product, not Jest-as-second-runner.
92. As a talking-points reader, I want HLS.js / Video.js / dash.js, Webpack, Jest, VIDAA, PFR, vendor RUM, and paid DRM compared in notes only, so that the product stays Shaka/Vite→Next.
93. As a mentor, I accept that mentorship/code-review training is omitted, so that the capstone does not fake a ritual that is not a product feature.

## Implementation Decisions

- **Product:** One player-first fictional VOD service plus one live channel. Surfaces: desktop web, mobile web, Chrome Leanback 10-foot. App lives in the dated player-capstone task `app/` tree. Specs and plans stay in that task folder; wayfinder map and this spec live under `.scratch/player-capstone/`.
- **Phases:** Weeks 1–7 Phase 1 (Vite + React + TypeScript). Week 7 is the demo gate. Weeks 8–12 Phase 2. In-place promote: the same directory becomes Next.js App Router. No parallel Next app. The watch-browse prototype stays throwaway.
- **Routes:** `/`, `/search`, `/watch/:id`, `/account`. Phase 1 React Router screens; Phase 2 the same paths as App Router. No title-details, Continue Watching URL, My List, genres, kids, or settings product.
- **Folder conventions (scaffold):** public media (week 3; Next still serves `public/`); `src` with app entry, React Router + variant-B shell hidden on Watch; pages for the four screens; components; mock catalog JSON; lib for Shaka island and later QoS client; stores for Nanostores session (week 4). Tests colocated (`*.test.ts`); Playwright under `e2e/`.
- **Tooling:** npm; path alias `@/` → `src`; Vite official React + TS + Tailwind + React Router. TypeScript `strict: true`, `noUncheckedIndexedAccess`, `skipLibCheck: true`. Tailwind only.
- **Chrome IA:** Home three regions (Continue Watching always visible, Live one tile, Catalog static VOD ~8–16 titles). Search substring + four states. Account read-only stub JSON. Shell: left destinations Home / Search / Account (prototype B; not a top bar). Shell off on Watch. Back from Watch → previous browse route. At most one persisted Leanback/layout pref, and only if a later week assigns it a home.
- **Visual (from prototype B):** Left destinations + poster wall; Continue Watching short poster row; Live one tile; Catalog wrapping grid. Watch: picture on top, docked always-visible control bar. One skeleton for desktop and Leanback; Leanback = overscan padding, type, focus ring. Paint: graphite/steel. Variants A (overlay) and C (inspector) rejected.
- **Focus (from prototype + Leanback research):** Native DOM focus + in-page `keydown` router. Home lands on first Continue poster (Live if CW empty). Watch lands on Play. Do not use CSS `nav-*` or spatial-nav spec. Overscan is author padding (~20px), not `env(safe-area-inset-*)` on rectangular displays.
- **Watch MVP:** play/pause, seek + time, volume, fullscreen, buffering, error + retry, live vs VOD, ABR/quality readout (auto + optional manual), captions if VTT exists. Shaka compiled player after mount; custom React chrome; `destroy` on leave Watch.
- **Continue watching data:** Watch writes; Home reads. Fields: asset id, position (seconds), duration, `updatedAt`. Resume if position **> ~10s** and **< ~90%**; finished drops off. Cap ~6–8, newest first. Reset is a test helper.
- **Media pipeline:** ffmpeg encode aligned H.264/AAC ladder (minimum 360p + 720p + AAC for ABR). Shaka Packager: shared fMP4, both MPD and HLS master. Clear vs ClearKey trees; ClearKey via packager raw keys, W3C Common SystemID v1 PSSH, Shaka `drm.clearKeys` before load. Serve localhost same origin. No media `.env`. Optional later: localhost POST returning EME JWK Set for `org.w3.clearkey` (appendix).
- **State:** Local UI: `useState` / `useReducer`. Shared session: Nanostores `map` + `useStore` (keys for time). Session fields include playback identity and chrome (asset, paused, time, volume, buffer, error) plus `qosSessionId` + `contentId` only. Reset on `assetId` change. Phase 2: Client Components only; `{ ssr: 'initial' }`; never `set` during SSR; do not use Nanostores for per-request user data. Checkpoint after Next + QoS: keep or migrate. TanStack Query = fetching only. No Redux default.
- **Data:** Phase 1 mock JSON for catalog/profile; continue-watching local. Phase 2 Route Handlers for catalog, continue-watching, QoS ingest. Stub profile only.
- **QoS contract:** Events and extras as locked in the QoS ticket. `AnalyticsClient` batches to `POST /api/qos/events`. Phase 1 mock (when built in week 9, not earlier): append `qos-events:v1` in `localStorage`. Phase 2 same URL, append-only. Dashboard appendix. TTFF definition locked. Live: heartbeats while playing; `playback_end` on leave with `completed: false`.
- **QoS event shape (from grilling, not code):**

  | Event | Extra fields | When |
  |---|---|---|
  | `playback_start` | `ttffMs` | First shown frame |
  | `rebuffer_start` | `currentTime` | `waiting` after first frame |
  | `rebuffer_end` | `durationMs` | `playing` after that wait |
  | `quality_change` | `fromBitrate`, `toBitrate`, `reason` (`abr` \| `manual`) | ABR or manual |
  | `error` | `code`, `category`, `message` | Shaka/media failure, pass-through |
  | `heartbeat` | `currentTime`, `bitrate`, `bufferLength` | ~30s while playing |
  | `playback_end` | `watchDurationMs`, `completed` | Leave Watch or VOD `ended` |

- **Twelve-week order (locked):** 1 scaffold + B shell; 2 Home/Search/Account chrome; 3 local fixtures; 4 Shaka island + docked chrome; 5 buffer/error/live; 6 quality/captions/CW write-read; 7 Playwright demo path + ClearKey. Phase 2: 8 Next promote; 9 QoS ingest; 10 Leanback; 11 CSP + drills; 12 CWV + CI + one A/B flag.
- **Learn loop:** Docs → implement → one-line DevTools → tests (except week 3 none; week 7 Playwright is implement) → Done-when. No Angular→React notes.
- **Coverage buckets:** Product implements Shaka, Vite→Next, Tailwind, HLS+DASH, QoS ingest, failure drills, CSP, Leanback-web, Vitest+RTL+Playwright, tiny A/B. Appendix: QoS dashboard, optional memory/`destroy` pass, Tizen-or-webOS packaging (one platform, not VIDAA), optional ClearKey HTTP. Talking-points: other SDKs, Jest, Webpack, PFR, VIDAA, vendor RUM, later store migrate. Mentorship omitted.
- **Phase 1 visitor checklist (week 7):** Home rails; Search known vs nonsense; Account stub; clear VOD Watch with docked chrome and quality (captions if VTT); leave Watch → CW + no leftover player; live fixture; ClearKey via `drm.clearKeys`. Not on the gate: Next, QoS ingest, Leanback D-pad, CSP, CI, A/B, poison-tile drill.

## Testing Decisions

A good test asserts **external behavior**: what the user, the network ingest, or the visitor checklist can observe. It does not assert Shaka internals, Nanostores keys, or folder names.

**Preferred seams (already locked; one product, two observation points):**

1. **App UI (highest):** Vitest + RTL on routes and chrome from the first UI week — routes render; Search reads `q`; tile → Watch; unknown Watch id; Home rails from fixtures; Search filter + empty-query + no-results; at least one loading, one error+retry, Continue Watching empty copy; Account stub from fixture. Watch chrome: docked controls, buffering, error+retry, quality readout, CW write/read, leaving Watch tears the player down. Do **not** add a snapshot matrix, a11y audit suite, E2E of every rail, or auth tests in the chrome spine.
2. **Running player (when Shaka exists):** Playwright. Week 7 happy path is browse → play plus ClearKey. Week 9: successful play writes `playback_start` + `ttffMs`; one failure drill writes `error` only. Week 10: D-pad/keyboard to Home’s first Continue poster and Watch Play. Week 11: three drills (bad manifest, bad key, offline). Week 8: existing RTL/Playwright stay green after promote. Week 12: CI green with the flag.

**QoS module:** Vitest on AnalyticsClient — batch/flush, no pre-frame rebuffer, quality from/to, failed load = `error` without `playback_start`, fake timers for heartbeat. Nanostores tests may use `keepMount` / `cleanStores` as library prior art; still assert session-visible behavior, not store internals as the spec.

**Not spine-tested:** QoS dashboard UI, PFR, vendor RUM, Leanback D-pad before week 10, week 3 packager (smoke play is the gate).

**Prior art:** This hub has no production app tests. The first UI week *creates* the Vitest+RTL convention; Playwright arrives with Shaka. Do not introduce Jest as a second runner.

## Out of Scope

- Building and shipping the app as part of this spec (implementation starts after this destination).
- Production HLS.js, Video.js, or dash.js; homemade MSE player; second CDM.
- Paid DRM, Widevine/FairPlay license services, cloud media, real user accounts, login/user management.
- Chromecast, PiP, watch party, cross-route mini-player, thumbnails-on-scrub.
- styled-components; Redux as the default store; a second store in Phase 1.
- Real Smart TV firmware packaging as a Phase 1/2 launch gate; VIDAA as a build target.
- QoS dashboard, memory leak pass, Tizen-or-webOS packaging, ClearKey HTTP license as spine weeks.
- Mentorship / code-review training.
- Fake PM tools, design-system marketing site, toast platform, global error boundary as the only UX, infinite spinners.
- RUM/APM vendors, experiment SaaS, CSP-report SaaS, WAF.
- CSS Spatial Navigation / `nav-*` as the Leanback strategy.

## Further Notes

- **Open after Phase 2 start:** Whether Nanostores still holds after Next + QoS (research: the library can; product complexity may still force a migrate).
- **Appendix only if taken:** Optional real Tizen **or** webOS packaging (one platform). Not VIDAA.
- Domain sources: `docs/webdev_jobprofile.txt` (Player team) and `docs/candidate_profile.txt` (senior .NET/Angular gap).
- Skills to consult while building: grilling, domain-modeling, research, prototype.
- Wayfinder children that this spec synthesizes: local media/ClearKey, Shaka Vite→Next, Nanostores, Leanback spatial nav, coverage matrix, chrome scope, QoS contract, watch/browse prototype B, twelve-week sequence, learn-loop format, Phase 1 demo gate.
