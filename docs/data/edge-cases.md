# Edge Cases & Failure Scenarios — Amazon Re-imagined

## 1. Catalog & Search Edge Cases
1. **Zero Search Results**:
   - *Scenario*: User types nonsense query (`"xyz999qwerty"`).
   - *Expected Behavior*: Render a clean "No results found" empty state with suggested categories and popular searches, preserving the active search query in the input.
2. **Conflicting Filter Combinations**:
   - *Scenario*: User filters by Price ($0 - $25) + Rating (4★+) in Computers department where no items exist.
   - *Expected Behavior*: Display informative empty state with a 1-click button to *"Reset Filters"*.
3. **Special Character Injection in Search**:
   - *Scenario*: Inputting `' OR 1=1 --`, `<script>alert(1)</script>`, or emojis (`🎧✨`).
   - *Expected Behavior*: Safely sanitized client-side regex without UI crashes or syntax errors.

## 2. Cart & Inventory Edge Cases
1. **Cart Overflow & Exceeding Max Stock**:
   - *Scenario*: Product has 6 units left in stock; user attempts to increment quantity to 10.
   - *Expected Behavior*: Quantity cap enforced at current stock count with toast notice: *"Only 6 items available in stock"*.
2. **Decimal & Currency Rounding Drift**:
   - *Scenario*: Multiple items with cents (e.g. `$99.99 * 3` + 8.25% tax).
   - *Expected Behavior*: Financial half-up rounding to exactly 2 decimal places (`Number.toFixed(2)`), preventing floating-point calculation drift (`.000000004`).
3. **Removing Last Item from Cart**:
   - *Scenario*: User deletes the only item in their cart.
   - *Expected Behavior*: Cart drawer transitions smoothly to "Your Amazon Cart is empty" illustration with a "Continue Shopping" CTA.

## 3. Comparison Dock Edge Cases
1. **Adding More Than 4 Items**:
   - *Scenario*: User attempts to pin a 5th item to the comparison tray.
   - *Expected Behavior*: Dock rejects addition and pulses the tray with notice: *"Comparison tray full (maximum 4 items)"*.
2. **Comparing Across Drastically Different Categories**:
   - *Scenario*: User compares an Espresso Machine with an Audio Headphone.
   - *Expected Behavior*: Display a "Category Mismatch" notification while still cleanly aligning shared attributes (Price, Rating, Brand, Delivery Speed).
