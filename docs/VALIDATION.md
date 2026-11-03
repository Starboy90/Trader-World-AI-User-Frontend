# Validation

Validated on 3 November 2026 with Node.js 24.22.1 and npm 11.9.0.

- `npm ci --no-audit --no-fund`: installed locked dependencies.
- `npm run lint`: passed with no warnings or errors.
- `next typegen` followed by `tsc --noEmit`: passed.
- `npm run build`: passed; the home page and standard not-found page prerender successfully with the existing Next.js configuration.
- `next start`: production server starts and responds successfully.
- Chromium desktop and mobile inspection: no runtime errors or horizontal overflow.
- 34 end-to-end checks passed against the production build.

The browser checks cover all 22 tool cards, category filtering, broker ranking and capital input, prop-firm filters and empty states, risk calculations and invalid stop prices, annual pricing, custom package totals, FAQ opening/closing, Zod profile validation, profile creation, watchlists, journal creation/persistence/deletion, saved price targets, staged AI responses, mobile navigation, mobile workspace navigation, keyboard dialog dismissal, and runtime errors.

Responsive overflow was checked at 320, 390, 768, and 1440 CSS pixels. Desktop, mobile, broker, and pricing screenshots were visually inspected. The final production build includes locally hosted Geist fonts, so it needs no Google Fonts access.

The initial build caught Next.js Cache Components rejecting `new Date()` during client prerender. The copyright year was moved to editable content in `src/data.js`. Mobile browser tests caught unlabeled compact sidebar buttons, which now have explicit accessible names.

The backend-dependent features listed in the README are demonstrations. No live AI, authentication, market-data, billing, trade-execution, email-delivery, or alert-notification integration was tested or claimed.

The source archive is checked using ZIP CRC validation and a required-file inventory. It excludes dependencies, generated build outputs, private reference recordings, QA scratch files, Git metadata, and environment files.
