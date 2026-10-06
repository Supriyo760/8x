# Infrastructure & Cloud Resources — Amazon Re-imagined

## 1. Edge Architecture
- **DNS & CDN Layer**: Vercel Global Anycast Edge Network / Cloudflare CDN.
- **Regions**: Automatically routed to lowest-latency nearest POP (Point of Presence) across US, EU, and APAC.
- **Asset Caching**:
  - HTML documents: `Cache-Control: public, max-age=0, must-revalidate`
  - Bundled JS/CSS assets (hashed): `Cache-Control: public, max-age=31536000, immutable`
  - Static images: `Cache-Control: public, max-age=86400, stale-while-revalidate=604800`

## 2. Resource Utilization & Limits
- **CPU / Compute**: 0 server instances required; serverless static edge delivery.
- **Bandwidth**: Average payload per fresh visit < 400KB; subsequent page navigation < 15KB.
- **Availability SLA**: 99.99% edge uptime backed by Vercel / Cloudflare edge infrastructure.
