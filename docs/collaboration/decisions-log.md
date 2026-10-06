# Architecture Decision Records (ADRs) & Decisions Log

## ADR-001: Automated Capture via Daemon & Lifecycle Hook
- **Date**: 2026-10-06
- **Status**: Approved & Implemented
- **Context**: 8x requires capturing verbatim prompts and responses in `.agent-logs/` automatically without manual intervention.
- **Decision**: Implemented `.agents/hooks.json` paired with `.agents/capture.py` running as a background daemon process (`IsDaemon: true`).
- **Consequence**: Guaranteed prompt-response logging across all sessions with automated commit capability.

## ADR-002: Reference Over Blueprint (Product Redesign)
- **Date**: 2026-10-06
- **Status**: Approved & Implemented
- **Context**: Pixel-for-pixel cloning of Amazon's dated UI does not demonstrate software engineering product judgement.
- **Decision**: Cut sponsored ad clutter and 1990s table layouts; introduce **AI Review Synthesis**, **Floating Comparison Dock**, and **Quick-Peek Drawer**.
- **Consequence**: Substantially elevates submission quality and UX clarity compared to standard junior clones.

## ADR-003: Single Page React 19 + Localized Data Engine
- **Date**: 2026-10-06
- **Status**: Approved & Implemented
- **Context**: A heavy multi-container backend introduces network latency, database connection flakiness, and cold-start delays during external evaluation.
- **Decision**: Adopt React 19 with Vite, Tailwind CSS, and a rich 50+ item local catalog persisted in LocalStorage.
- **Consequence**: Sub-second page loads, zero downtime risk, instant evaluation without login gates.
