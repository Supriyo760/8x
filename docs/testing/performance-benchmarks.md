# Performance Benchmarks & Targets

## 1. Web Vitals & Runtime Targets

| Metric | Target Threshold | Amazon.com Real-world Current | Our Target (Amazon Re-imagined) |
| :--- | :--- | :--- | :--- |
| **First Contentful Paint (FCP)** | < 1.0s | ~ 1.8s - 2.4s | **< 0.6s** |
| **Largest Contentful Paint (LCP)** | < 2.0s | ~ 3.2s - 4.5s | **< 1.2s** |
| **Interaction to Next Paint (INP)** | < 100ms | ~ 150ms - 250ms | **< 40ms** |
| **Cumulative Layout Shift (CLS)** | < 0.05 | ~ 0.12 (Banner jumps) | **< 0.01** |
| **Client Search Filter Latency** | < 50ms | ~ 800ms (Full page reload) | **< 15ms** |
| **Cart Slide-out Trigger Latency** | < 100ms | ~ 400ms | **< 20ms** |

## 2. Bundle Size Optimization
- Total Gzipped JavaScript: `< 150 KB`
- Total Gzipped CSS: `< 25 KB`
- Zero blocking third-party telemetry scripts.
