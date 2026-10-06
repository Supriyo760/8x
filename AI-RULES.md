# AI Development Rules & Operational Guidelines

## 1. Prime Directives for Coding Agents
1. **Never Break Agent Capture**: Never add `.agent-logs/` to `.gitignore`. Keep [`.agents/capture.py`](file:///c:/Users/Dange/OneDrive/Desktop/8x/.agents/capture.py) active.
2. **Commit Interleaved**: Commit changes progressively as features are built, keeping `.agent-logs/` committed alongside code changes.
3. **No Placeholders**: Never render broken image links, `TODO` stubs, or empty cards. Always provide high-quality data or SVG fallbacks.
4. **Rich Visual Aesthetics**: Maintain Amazon's iconic identity (`#131921` header, `#232F3E` subnav, `#FF9900` amber, `#00A8E1` Prime blue) with modern typography and generous whitespace.
5. **Type Safety**: Strictly adhere to TypeScript interfaces defined in `src/types/`. Avoid `any`.

## 2. Code Conventions
- Use functional components with React hooks.
- Use Tailwind CSS utility classes; avoid inline styles except for dynamic calculated values (e.g. progress bar widths).
- Keep components modular: presentational UI separated from business logic.
- Ensure all interactive elements have accessible labels and unique identifiers.

## 3. Build & Test Verification Commands
- `npm run dev`: Start local development server.
- `npm run build`: Verify TypeScript compilation and production bundle build.
- `python .agents/capture.py`: Manual trigger for session capture if daemon is ever paused.
