# Proposed Codebase Directory Layout

```
8x/
├── .agent-logs/                     # Mandatory 8x prompt-and-response session logs
├── .agents/                         # Antigravity hooks & capture engine daemon
│   ├── capture.py                   # Automated transcript parser & markdown emitter
│   └── hooks.json                   # Antigravity lifecycle hook registrations
├── docs/                            # Comprehensive Enterprise Documentation Suite
│   ├── planning/                    # Brief, PRD, user stories, acceptance criteria, scope
│   ├── architecture/                # System architecture, schemas, diagrams, API spec
│   ├── data/                        # Edge cases, test cases, dummy data specs
│   ├── design/                      # Brand guidelines, style guide, mockups, wireframes
│   ├── security/                    # Auth flow, permissions matrix, compliance
│   ├── testing/                     # Test plan, eval set, performance benchmarks
│   ├── deployment/                  # Hosting, infrastructure, monitoring, rollback
│   └── collaboration/               # Stakeholders, ADR decisions log, handoff notes
├── data/                            # Seed Data & Exports
│   ├── sample-data.json             # 50+ rich realistic product models
│   ├── sample-data.csv              # Tabular catalog export
│   ├── expected-output.json         # Order & calculation test expectations
│   └── dummy-database.sql           # SQL database seed script
├── public/                          # Static Assets
│   ├── favicon.ico
│   └── logo.svg                     # Amazon Re-imagined vector branding
├── src/                             # Application Source Code
│   ├── components/
│   │   ├── common/                  # Buttons, Badges, Modals, RatingStars
│   │   ├── navigation/              # GlobalHeader, SubNav, DeliveryModal
│   │   ├── home/                    # HeroCarousel, CategoryGridCards, DealsSlider
│   │   ├── catalog/                 # FilterSidebar, ProductCard, ActiveFilterPills
│   │   ├── pdp/                     # ImageGallery, VariantSelector, BuyBox, AIReviewDigest
│   │   ├── overlays/                # ComparisonDock, ComparisonModal, QuickPeekDrawer
│   │   └── checkout/                # CartDrawer, CartView, CheckoutModal, TrackingModal
│   ├── context/ or store/           # Centralized reactive state engine
│   ├── data/                        # Product catalog TS bindings
│   ├── types/                       # TypeScript interfaces
│   ├── utils/                       # Pricing, formatting, date calculation helpers
│   ├── App.tsx                      # Root component & view router
│   ├── main.tsx                     # Vite entry point
│   └── index.css                    # Tailwind design tokens & base rules
├── CAPTURE-TEST.md                  # Mandatory 8x canary verification report
├── README.md                        # Project overview and setup instructions
├── CLAUDE.md / AI-RULES.md          # Coding conventions and operational rules
├── package.json                     # Node.js dependencies and scripts
├── vite.config.ts                   # Vite build configuration
├── tailwind.config.js               # Tailwind design system configuration
└── tsconfig.json                    # TypeScript compiler configuration
```
