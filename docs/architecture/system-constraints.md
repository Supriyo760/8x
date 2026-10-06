# System Constraints & Non-Functional Requirements

## 1. Performance Constraints
- **Time to Interactive (TTI)**: < 1.2 seconds on standard 4G throttled connections.
- **First Contentful Paint (FCP)**: < 0.6 seconds on desktop edge networks.
- **Search Latency**: < 50ms keystroke-to-filtered-render response time via indexed client-side memory search.
- **Total Bundle Size**: Production JavaScript bundle < 160KB (gzipped).

## 2. Scalability & Availability
- **Stateless Client Shell**: Zero reliance on stateful server instances; can be replicated instantly across 300+ CDN edge points.
- **Zero Login Barrier**: Evaluator can execute full purchasing and comparison loops without needing pre-existing accounts or passwords.

## 3. Reliability & Offline Resilience
- **Persistent State**: Cart, wishlist, and order history survive page refresh, browser tab closing, or network disconnection via LocalStorage.
- **Asset Fallback**: Image loading errors fall back gracefully to inline SVG placeholders.

## 4. Security & Compliance Constraints
- **Zero Hardcoded Secrets**: No production API tokens in client bundles.
- **Input Sanitization**: All search inputs and checkout form fields are sanitized against XSS injection attacks.
