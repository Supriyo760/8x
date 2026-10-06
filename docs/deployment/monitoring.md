# Monitoring, Observability & Error Tracking

## 1. Runtime Telemetry
- **Browser Error Boundary**: Global React Error Boundary catches unhandled UI rendering exceptions and renders a friendly "Oops, something went wrong on Amazon" fallback with a 1-click "Reload Amazon" button.
- **Console Instrumentation**: Debug diagnostics logs structured JSON in development:
  ```json
  {
    "event": "CART_ITEM_ADDED",
    "productId": "prod-001",
    "variant": "var-001-blk",
    "timestamp": "2026-10-06T08:45:00Z"
  }
  ```

## 2. Health Check Validation
- **Synthetic Ping**: Verifies that root `/` responds with HTTP 200 and renders `<title>Amazon Re-imagined</title>` within 500ms.
- **Client Storage Health**: Tests that `window.localStorage` is accessible and writable upon initialization.
