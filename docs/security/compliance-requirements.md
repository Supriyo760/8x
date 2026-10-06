# Compliance & Privacy Requirements — Amazon Re-imagined

## 1. Regulatory Context
Even within a 24-hour sprint rebuild, adhering to modern web privacy and accessibility standards is essential for product excellence.

## 2. Key Standards

### 2.1. Accessibility (WCAG 2.1 AA)
- **Contrast Ratios**: All text elements achieve a minimum 4.5:1 contrast ratio against their respective card and header backgrounds.
- **Keyboard Navigation**: All interactive elements (search inputs, variant swatches, buy buttons, modal dialogs) are reachable via `Tab` key and activate via `Enter` or `Space`.
- **ARIA Attributes**: Dropdowns, slide drawers, and tabs feature descriptive `aria-expanded`, `aria-label`, and `role` indicators.

### 2.2. Data Privacy & Zero-Tracking (GDPR / CCPA)
- **Zero Third-Party Ad Trackers**: No invasive Facebook Pixel, Google AdSense, or third-party fingerprinting scripts.
- **Client-Side Data Storage**: All mock purchase records, addresses, and wishlist items reside exclusively in the client's browser sandbox.
- **Right to Erasure**: Clicking "Clear Data" in the footer or settings purges all LocalStorage state instantly.

### 2.3. PCI-DSS Payment Emulation
- No real primary account numbers (PAN) or CVVs are accepted or transmitted. Form inputs use synthetic masking patterns (`•••• •••• •••• 4242`).
