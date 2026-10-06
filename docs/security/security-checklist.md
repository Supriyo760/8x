# Security & Quality Control Checklist

- [x] **XSS Prevention**: React automatically escapes interpolated JSX content. No dangerouslySetInnerHTML usage without sanitization.
- [x] **Secure Content Delivery (HTTPS)**: Production deployment enforces HTTP Strict Transport Security (HSTS) and SSL termination via Vercel Edge.
- [x] **Content Security Policy (CSP)**: Assets restricted to `self` and verified CDN origins (`images.unsplash.com`).
- [x] **Zero Secret Leakage**: No secret credentials or sensitive tokens committed to git or exposed in client bundles.
- [x] **Defensive LocalStorage Parsing**: All `JSON.parse` operations on browser storage are wrapped in try-catch guards with fallback defaults to prevent corrupted storage crashes.
- [x] **Input Validation & Sanitization**: Address inputs and search query parameters are stripped of control characters before processing.
