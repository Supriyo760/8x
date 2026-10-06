# Engineering Handoff Document — Amazon Re-imagined

## 1. Project Context for Successors
This repository represents an elite 24-hour rebuild of Amazon.com developed for the 8x Senior Software Engineer challenge.

## 2. Key Directories & Entry Points
- `src/App.tsx`: Central view router and overlay manager.
- `src/context/AppContext.tsx`: Master reactive state store (Cart, Wishlist, Compare, Orders).
- `data/sample-data.json`: 50+ item catalog data source.
- `.agent-logs/`: Mandatory prompt-and-response audit logs required by the 8x assignment.

## 3. Essential Commands
```bash
# Start local server
npm run dev

# Run production build
npm run build

# Trigger agent capture sync
python .agents/capture.py
```

## 4. Key Architectural Invariants
1. Do NOT delete or gitignore `.agent-logs/`.
2. Do NOT remove `CAPTURE-TEST.md`.
3. Do NOT add blocking authentication gates that prevent anonymous evaluators from checking out.
