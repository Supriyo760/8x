# Rollback Strategy & Disaster Recovery

## 1. Zero-Downtime Rollback
Because production is hosted on modern edge infrastructure (Vercel / Cloudflare Pages), every git push generates an immutable atomic deployment URL.

### Immediate Rollback Procedure
1. Navigate to Vercel Project Dashboard → Deployments tab.
2. Locate the previous healthy deployment (e.g. `d7ec045`).
3. Click `...` → **Instant Rollback**.
4. Traffic is routed to the previous immutable build in < 5 seconds with zero server restart or compilation delay.

## 2. Git-Level Rollback
```bash
# Revert erroneous commit locally
git revert HEAD --no-edit

# Push to trigger fresh automated edge build
git push origin master
```

## 3. Client Storage Reset
If a schema migration corrupts user LocalStorage:
- The app automatically version-checks storage schema (`SCHEMA_VERSION = 1`).
- If an incompatible version is detected, the store resets to pristine seed defaults gracefully without throwing fatal uncaught exceptions.
