# Player capstone spec map

Label: `wayfinder:map`

## Destination

A **capstone spec** (skill-to-feature coverage + ordered learn→implement sequence) for one player-first streaming app, complete enough to start building in `tasks/2026-09-02-player-capstone/app/` without further “what are we building” decisions. The app itself is **not** built on this map.

**Reached:** [spec.md](spec.md) (`Status: ready-for-agent`).

## Notes

- **Domain:** Skill development against `docs/webdev_jobprofile.txt` (Player team: React/Next, Shaka, HLS/DASH, QoS, TV web, security, tests). Learner profile: `docs/candidate_profile.txt` (senior .NET/Angular; React player work is the gap).
- **Skills every session should consult:** `/grilling`, `/domain-modeling`, `/research`, `/prototype`. Tracker: local markdown (this folder).
- **Standing preferences (charting, not tickets):**
  - One product: **player-first** fictional VOD + one live channel; thin browse/account chrome; thick watch page.
  - **Phase 1:** Vite + React + TypeScript (React fundamentals). **Phase 2:** promote the same UI to Next.js.
  - Playback engine: **Shaka only**. HLS/DASH as protocols through Shaka. HLS.js / Video.js / dash.js are not built.
  - Surfaces: desktop web, mobile web, **Chrome Leanback** 10-foot mode. Real Tizen/webOS packaging is a late optional spike, not a gate.
  - Media/security: **fully local**. Clear HLS/DASH on localhost + **ClearKey**. No license vendor, no subscription, no Widevine/FairPlay service.
  - Data: local thin API (catalog, continue-watching, QoS ingest). Phase 1 JSON/mock; Phase 2 Next.js Route Handlers. Stub profile only.
  - Sized as **~12-week part-time spine**, one substantial feature per week, with a **Phase 1 demo gate**. Overflow → appendix, not fake features.
  - App path: `tasks/2026-09-02-player-capstone/app/`. Specs/plans in that task folder; this map in `.scratch/player-capstone/`.
  - Styling: **Tailwind only**.
  - Tests: **Vitest + RTL** from first UI feature; **Playwright** when Shaka lands; **CI + tiny A/B flag** in Phase 2.
  - State: component **useState/useReducer**; **Nanostores** for shared session; Phase 2 keep or migrate to Zustand or TanStack Store. TanStack Query is fetching, not the client store.
  - Watch MVP: play/pause, seek + time, volume, fullscreen, buffering, error + retry, live vs VOD, ABR/quality readout (auto + optional manual), captions if VTT exists. Not Chromecast, PiP, watch party, mini-player, scrub thumbnails.
- **Plan, don’t build** unless a ticket’s type is `task` and it unblocks a decision.

## Decisions so far

- [Local HLS/DASH and ClearKey for Shaka](issues/01-local-media-clearkey.md) — ffmpeg encode, Shaka Packager dual HLS/DASH fMP4; ClearKey via Packager raw keys + `drm.clearKeys` (no license HTTP); serve from `app/public/media/` on localhost.
- [Shaka in Vite React then Next.js](issues/02-shaka-vite-next.md) — Player after mount + custom React chrome; Phase 2 same island, client-only / `dynamic({ ssr: false })`, never construct Shaka on the server.
- [Nanostores with React and Next.js](issues/03-nanostores-react-next.md) — viable as a **client-only** session `map` + `useStore`; `{ ssr: 'initial' }`; no `set` during SSR; reset on asset change.
- [Leanback spatial navigation on the web](issues/04-leanback-spatial-nav.md) — native DOM focus + in-page D-pad `keydown` router; skip CSS `nav-*` / spatial-nav spec; overscan via author padding.
- [Skill-to-feature coverage matrix](issues/05-skill-feature-coverage.md) — four buckets; product is Shaka/Vite→Next/Tailwind/HLS+DASH/QoS ingest/failure drills/CSP/Leanback-web/Vitest+RTL+Playwright+tiny A/B; other SDKs/Jest/Webpack/PFR/VIDAA are talking-points; Tizen-or-webOS packaging + optional memory pass are appendix; mentorship omitted.
- [How thin is browse and account chrome](issues/06-catalog-chrome-scope.md) — Home / Search / Watch / Account only; Home = CW rail + live tile + static VOD; Search substring + four states; read-only stub profile (no auth); shell hidden on Watch; per-region loading/error; RTL+Vitest on chrome, Playwright with Shaka.
- [QoS and analytics event contract](issues/07-qos-metrics-contract.md) — seven events + batch `POST /api/qos/events` (Phase 1 `localStorage` mock); TTFF = load→first frame; dashboard appendix; Vitest + one Playwright success/fail pair.
- [Watch and browse fidelity prototype](issues/08-watch-browse-prototype.md) — variant **B**: left destinations + poster wall; Watch docks chrome under the picture; one skeleton (Leanback = overscan/type/focus); Home focus = first Continue poster; Watch focus = Play.
- [Twelve-week learn-then-implement sequence](issues/09-twelve-week-sequence.md) — weeks 1–7 Phase 1 (chrome → media → Shaka; demo at 7); 8–12 Next, QoS ingest, Leanback, CSP+drills, CWV+CI+tiny A/B; dashboard/memory/TV packaging appendix.
- [Learn-loop format per feature](issues/10-learn-loop-format.md) — one week template (no Angular notes); official docs then implement; one-line DevTools; tests after except week 3 (none) and week 7 (Playwright is the work).
- [Phase 1 demo gate and architecture conventions](issues/11-phase1-demo-gate.md) — in-place Vite→Next in `app/`; locked folders/routes/TS/npm/`@/`; no media env; week-7 visitor path is Home/Search/Account, clear VOD chrome, CW, live, ClearKey, quality (captions if VTT).

## Not yet specified

- Whether Nanostores still holds after Next + QoS (Phase 2 checkpoint — research says the library can; product complexity may still force a migrate).
- Optional real Tizen/webOS packaging steps (only if the late appendix spike is taken — one platform, not VIDAA).

## Out of scope

- Production integrations of HLS.js, Video.js, or dash.js.
- Paid DRM, Widevine/FairPlay license services, cloud media, real user accounts.
- Building and shipping the app as part of this map (implementation starts after destination).
- Chromecast, PiP, watch party, cross-route mini-player, thumbnails-on-scrub (MVP).
- styled-components; Redux as the default store.
- Real Smart TV firmware packaging as a Phase 1/2 launch gate; VIDAA as a build target.
- Mentorship / code-review training ([Skill-to-feature coverage matrix](issues/05-skill-feature-coverage.md) — omitted, not an appendix ritual).
