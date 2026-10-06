# Deployment Guide & Production CI/CD

## 1. Hosting Target: Vercel / Cloudflare Pages
The application is pre-configured for automated, zero-configuration edge deployment to **Vercel** or **Cloudflare Pages**.

### 1.1. Deploying via Vercel CLI (Recommended)
```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy directly from repository root
vercel --prod
```

### 1.2. Deploying via GitHub Git Integration
1. Push repository to GitHub: `https://github.com/supriyochowdhury760/8x-amazon-rebuild`.
2. Connect repository on [vercel.com/new](https://vercel.com/new).
3. Build Settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Vercel will provision an instant live URL (e.g. `https://8x-amazon-rebuild.vercel.app`).

## 2. CI/CD GitHub Actions Pipeline
The pipeline runs automated linting, type-checking, and build verification on every pull request and push to `master`.

```yaml
name: CI/CD Pipeline
on: [push, pull_request]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
```
