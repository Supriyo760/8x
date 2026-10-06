# Technology Stack & Tooling Rationale

## 1. Core Framework & Build Engine
- **Framework**: **React 19**
  - *Rationale*: Industry-standard component architecture with optimized reconciliation, sub-millisecond component mounting, and clean state primitives.
- **Build Tool**: **Vite 6**
  - *Rationale*: Instant HMR (< 50ms), lightning-fast esbuild pre-bundling, and highly optimized Rollup production builds.
- **Language**: **TypeScript 5.x**
  - *Rationale*: Strict type safety across complex product models, variant matrices, and cart operations prevents runtime UI regressions.

## 2. Styling & Design System
- **CSS Framework**: **Tailwind CSS 3.4 / 4.x**
  - *Rationale*: Tokenized design system with Amazon-specific color palettes (`#131921`, `#232F3E`, `#FF9900`, `#00A8E1`). Utility-first approach ensures minimal CSS bundle overhead and zero CSS specificity collisions.
- **Icons**: **Lucide React**
  - *Rationale*: Crisp, modern, customizable SVG icon set matching Amazon's navigation iconography (Search, ShoppingCart, Star, MapPin, Truck, ShieldCheck, Heart, Scales).

## 3. State Management & Storage
- **State Architecture**: **Zustand / React Context with Custom Hooks**
  - *Rationale*: Unopinionated, lightweight (< 1KB) reactive state management. Eliminates boilerplate while enabling selective component re-rendering.
- **Storage Tier**: **Browser LocalStorage + In-Memory Index**
  - *Rationale*: Instant read/write access without network latency; guarantees that cart items, comparison items, and placed orders persist across browser sessions.

## 4. Hosting & Deployment
- **Hosting Platform**: **Vercel / Cloudflare Pages**
  - *Rationale*: Global edge CDN distribution, sub-second TTFB, instant HTTPS provisioning, and zero server maintenance overhead. Perfect for live external reviewer evaluation.
