# Environment Configurations

## 1. Overview
The application maintains clean environment isolation between local development, testing preview, and production.

## 2. Configuration Profiles

### `env.development`
- `VITE_APP_ENV="development"`
- `VITE_ENABLE_DEBUG_LOGGING=true`
- `VITE_SIMULATE_SLOW_NETWORK=false`

### `env.production`
- `VITE_APP_ENV="production"`
- `VITE_ENABLE_DEBUG_LOGGING=false`
- `VITE_ANALYTICS_ENDPOINT=""`
