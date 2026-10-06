# Task Breakdown — Granular Action Items

## Epic 1: Scaffolding & Design Foundation
- [ ] **TASK-101**: Initialize Vite React 19 project with Tailwind CSS and Lucide Icons.
- [ ] **TASK-102**: Configure Tailwind design tokens for Amazon Navy (`#131921`), Nav Belt (`#232F3E`), Amazon Amber (`#FF9900`), and Prime Blue (`#00A8E1`).
- [ ] **TASK-103**: Build `data/products.ts` with 50+ realistic products, multi-angle image URLs, ratings, specs, and AI digests.
- [ ] **TASK-104**: Create global state store (Zustand or React Context) with LocalStorage synchronization.

## Epic 2: Navigation & Homepage
- [ ] **TASK-201**: Build `GlobalHeader` with search bar, category selector, language dropdown, and Cart badge.
- [ ] **TASK-202**: Build `DeliveryModal` allowing postal code updates with immediate delivery date calculation.
- [ ] **TASK-203**: Build `SubNav` with category drawer and promotional links.
- [ ] **TASK-204**: Build `HeroCarousel` with responsive banners and slide navigation.
- [ ] **TASK-205**: Build `HomeCategoryCards` grid featuring curated product groupings.
- [ ] **TASK-206**: Build `DealsSlider` row with live countdown timers and discount percentage badges.

## Epic 3: Search, Catalog & Filtering
- [ ] **TASK-301**: Implement search indexing and debounced instant filtering.
- [ ] **TASK-302**: Build `FilterSidebar` with Department, Prime, Rating (4★+), Price slider, and In-Stock filters.
- [ ] **TASK-303**: Build `ActiveFilterPills` bar allowing individual or bulk removal of filters.
- [ ] **TASK-304**: Build `ProductCard` component with Prime badge, star ratings, and "+ Compare" button.
- [ ] **TASK-305**: Implement Grid vs. List view switcher.

## Epic 4: Product Detail Page (PDP) & Buy Box
- [ ] **TASK-401**: Build `ImageGallery` with thumbnail previews, active swap, and zoom lens.
- [ ] **TASK-402**: Build `VariantSelector` supporting color swatches and storage pills with live price shifts.
- [ ] **TASK-403**: Build `AIReviewDigest` widget presenting verdict, 3 pros, 2 cons, and recommendation.
- [ ] **TASK-404**: Build `BuyBox` with live countdown timer, stock indicator, quantity dropdown, and CTAs.
- [ ] **TASK-405**: Build `SpecificationsTable` categorizing technical parameters.

## Epic 5: Comparison Dock & Quick Peek
- [ ] **TASK-501**: Build sticky floating `ComparisonDock` with item chips and badge counter.
- [ ] **TASK-502**: Build `ComparisonModal` showing side-by-side spec comparison table with difference highlights.
- [ ] **TASK-503**: Build `QuickPeekDrawer` slide-over modal for zero-friction product exploration.

## Epic 6: Cart, Checkout & Orders
- [ ] **TASK-601**: Build `CartDrawer` with subtotal, free shipping progress bar, and quantity modifiers.
- [ ] **TASK-602**: Build `CartView` full page with "Save for Later" section.
- [ ] **TASK-603**: Build `CheckoutModal` accordion (Shipping address, delivery speed, payment method).
- [ ] **TASK-604**: Build `OrderConfirmation` screen with generated Amazon Order IDs and celebration feedback.
- [ ] **TASK-605**: Build `OrdersDashboard` with 4-stage tracking timeline stepper and cancellation option.

## Epic 7: Deployment & Submission
- [ ] **TASK-701**: Deploy production bundle to Vercel/Netlify with custom live URL.
- [ ] **TASK-702**: Verify external access for unauthenticated users.
- [ ] **TASK-703**: Complete `CAPTURE-TEST.md` and commit all `.agent-logs/`.
- [ ] **TASK-704**: Record 5-minute Loom walkthrough with camera on.
