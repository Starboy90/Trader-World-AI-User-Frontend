# Trader World AI — User Frontend

A responsive Next.js App Router frontend recreated from the supplied 92-second reference recording. The design uses white translucent cards, a lavender-to-cyan canvas, locally hosted Geist typography, gradient controls, and Motion animations.

## Run

Use Node.js 24 and npm 11 (validated versions: 24.22.1 and 11.9.0).

```bash
npm ci
npm run dev
```

Production:

```bash
npm run build
npm run start
```

The server defaults to port 3000. Pass `-- --port 3001` to the start command if needed. No application secrets, backend services, or Google Fonts access are required. Keep the existing cloud proxy and CA settings for dependency installation.

## Validate

```bash
npm run lint
npx next typegen
npx tsc --noEmit
npm run build
```

The project retains its existing Next.js configuration, dependency declarations, and lockfile. Cache Components, Partial Prefetching, and the Tailwind Turbopack loader remain enabled.

## Editable content

Edit **`src/data.js`** for public content, navigation, the 22-tool catalog, broker and prop-firm records, example market values, module prices, subscription plans, FAQ answers, and section headings. Subscription annual prices are annual totals, not monthly equivalents. The monthly package total is derived from selected module prices.

## Included interactions

- Sticky responsive navigation, AI tools dropdown, anchor scrolling, active navigation, mobile menu, hover states, and scroll reveals.
- AI question demo with staged research progress and explicitly illustrative responses.
- Seven tool categories and 22 tool cards, with filtering and working tool destinations.
- Broker matching that recalculates from capital, experience, instrument, region, and fee preferences.
- Prop-firm filtering by budget, drawdown rule, and payout window, including a resettable empty state.
- Validated risk calculations for capital at risk, position units, risk/reward, and hypothetical reward.
- Example journal analytics and a personal workspace with asset selection, chart timeframes, watchlist, saved price targets, and a journal.
- Four pricing plans, monthly/annual billing, an eight-module package builder, and live totals.
- Zod-validated local demo profile and contact draft forms, FAQ accordions, and privacy/data-removal controls.
- Keyboard-accessible native dialogs, focus restoration, reduced-motion support, and compact sidebar labels.

Open **Sign In** to enter the demo workspace. `Ctrl+K` / `⌘K` also opens it. Profile creation is optional.

## Scope and integrations

This is a frontend demonstration, matching the simulated experience shown in the recording. AI outputs, quotes, chart points, broker records, and journal statistics are examples. There is no real authentication, payment processing, trade execution, live market feed, or server-side subscription or alert service. Selecting a plan never charges a card or starts a subscription. Price alerts save a target; they do not monitor prices or send notifications.

A name/email demo profile, watchlist, journal, alerts, and contact draft are stored only in browser local storage. Contact drafts are not sent. Use the footer Privacy Policy dialog to clear saved demo information. Browser storage failure falls back to a session-only workspace with a visible explanation.

To connect production services, replace the example adapters and local storage with authenticated APIs. Keep API keys on the server. No admin repository is accessed or required by this frontend.

## Structure

```text
src/app/                  App Router page, layout, global and workspace styling
src/components/           Reusable landing, discovery, pricing, chart, and workspace UI
src/lib/use-workspace.ts   Validated browser storage with cross-tab synchronization
src/data.js               Editable content, sample records, and prices
public/fonts/             Self-hosted Geist font and SIL Open Font License
scripts/package-source.py Reproducible source ZIP generator
```

## Source archive

```bash
python3 scripts/package-source.py
```

This creates `artifacts/Trader-World-AI-Frontend.zip`, containing the complete source, configuration, dependency lockfile, local font and license, and documentation. It excludes dependencies, build outputs, Git metadata, local QA outputs, reference video frames, and secrets.

See [reference notes](docs/REFERENCE.md) and [validation results](docs/VALIDATION.md).
