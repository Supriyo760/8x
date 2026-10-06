# Acceptance Criteria — Amazon Re-imagined

## AC-01: Header & Global Navigation
- [x] Omnibar search triggers instant debounced filtering (< 100ms) across titles, brands, and categories.
- [x] Category dropdown filters results to the selected department.
- [x] "Deliver to" modal allows setting a ZIP code and immediately updates simulated delivery estimates across all cards.
- [x] Cart counter badge reflects current total item count and bounces on item addition.
- [x] Navigation links (Deals, Best Sellers, Electronics, Orders) route smoothly without full-page browser reload.

## AC-02: Catalog & Faceted Filters
- [x] Applying multiple filters (e.g. "Prime Eligible" + "$50 - $100" + "4★ & Up") combines correctly via logical AND.
- [x] Active filters appear as dismissable pill chips above the grid.
- [x] Clearing an individual pill or clicking "Clear All" restores the previous catalog state instantly.
- [x] Sort dropdown correctly reorders items by Price Ascending, Price Descending, Rating, and Newest.
- [x] Grid/List view toggle smoothly changes card layout without losing active filters.

## AC-03: Product Detail Page (PDP)
- [x] Clicking thumbnail swaps the primary gallery image with smooth crossfade.
- [x] Variant selection (Color / Storage) updates price, SKU image, and stock availability immediately.
- [x] "The Verdict" AI review card displays an overall rating, 3 pros, 2 cons, and a buyer target.
- [x] Buy Box displays live countdown timer (*"Order in X hrs Y mins for Tomorrow 10 AM"*).
- [x] "Add to Cart" triggers slide-out drawer with subtotal; "Buy Now" triggers direct checkout modal.

## AC-04: Comparison Dock
- [x] Product cards feature a "+ Compare" toggle button.
- [x] Adding an item mounts the sticky floating comparison bar at screen bottom.
- [x] Dock enforces a maximum of 4 items with a clear warning if exceeded.
- [x] Clicking "Compare Now" opens full modal with side-by-side spec comparison and highlighted differences.

## AC-05: Cart & 2-Step Checkout
- [x] Modifying item quantity dynamically updates subtotal, estimated tax (8%), and shipping.
- [x] Removing item removes it with an undo option or "Save for Later" relocation.
- [x] Step 1 of checkout validates shipping address fields.
- [x] Step 2 allows selecting delivery speed and mock payment method.
- [x] Placing order generates an Amazon Order ID (`114-XXXXXXX-XXXXXXX`), stores order in LocalStorage, and empties the cart.

## AC-06: Order Tracking & History
- [x] "Returns & Orders" screen displays all previous orders sorted by most recent date.
- [x] Clicking "Track Package" displays 4-step progress stepper with estimated arrival date and courier information.
- [x] Orders can be canceled if status is in "Ordered" or "Processing" stage.
