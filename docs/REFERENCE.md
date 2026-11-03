# Reference implementation notes

The supplied `Recording 2026-11-03 132215 (1).mp4` is 92.37 seconds long at 2928 × 1080 and 30 fps. The complete timeline was reviewed through one-second contact sheets, with larger frames inspected for typography, panel spacing, filters, and pricing.

The stable navigation shown after the first few seconds is used: Home, AI Tools, Brokers, Prop Firms, Market Intelligence, Pricing, About, Sign In, and Get Started. The recording opens on an earlier navigation variant; the later repeated version is the basis of the finished header.

The implementation follows the recorded section order:

1. Split trading hero, candlestick visualization, floating analysis and broker cards.
2. Four simulated quotes and a scrolling market headline ticker.
3. AI assistant with example questions.
4. Connected AI ecosystem: 22 tools grouped into seven categories; category filtering.
5. Broker comparison with profile controls and an explanation of the top match.
6. Prop-firm discovery with budget, drawdown, and payout filters.
7. Risk planner with interactive inputs and calculated outputs.
8. Example journal equity curve and discipline metrics.
9. Four-step onboarding workflow.
10. Starter, Trader Pro, Elite, and Ultimate pricing, with monthly/annual switching.
11. Eight-module custom package builder with selected module tags and total.
12. FAQ accordions and the glass footer with a risk disclosure.

The page preserves the recording's translucent white surface treatment, lavender/cyan atmosphere, purple/blue gradient controls, soft shadows, pill controls, rounded panels, colored category icons, and sticky navigation. The editor's floating Edit toolbar is recording UI and is not included in the product.

Mobile and tablet layouts are responsive adaptations; the reference shows a desktop viewport. Animations use Motion for reveals, price transitions, chart entrance, menus, dialogs, and FAQ panels. Smooth scrolling and hover transitions have reduced-motion fallbacks.

The font is hosted locally so production builds do not depend on access to Google's font servers. Geist is distributed under the SIL Open Font License; its license is included in `public/fonts/OFL.txt`.

The additional personal demo workspace provides working destinations for the reference's tool and onboarding actions. The current starter repository contains no backend contracts; service-dependent behavior remains clearly labeled as a demonstration.
