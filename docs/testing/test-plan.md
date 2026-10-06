# Test Plan & Quality Assurance Strategy

## 1. Testing Philosophy
The application follows a pragmatic testing pyramid balancing unit calculation verification, state integration testing, and end-to-end critical journey testing.

```
          / \
         / E2E \       Journey 1: Search -> PDP -> Buy Box -> Cart -> Checkout -> Tracking
        /-------\      Journey 2: Catalog -> Pin 3 to Comparison Dock -> Spec Matrix
       /  Integ  \     Cart Drawer subtotal & tax synchronization with LocalStorage
      /-----------\    Faceted filter multi-clause predicate logic
     /    Unit     \   Price calculation, discount %, order ID format, date calculations
    /---------------\
```

## 2. Test Execution Suites

### 2.1. Unit Test Scope
- `calculateSubtotal(items)`: Validates multi-item summation and quantity multiplication.
- `calculateTax(subtotal, rate)`: Validates financial rounding to 2 decimals.
- `calculateFreeShippingGap(subtotal, threshold)`: Validates remaining amount and qualification flag.
- `generateAmazonOrderId()`: Confirms output conforms to `11X-XXXXXXX-XXXXXXX`.
- `filterProducts(catalog, criteria)`: Validates AND/OR clause logic.

### 2.2. Integration Test Scope
- Cart drawer mounts automatically when "Add to Cart" is clicked from any surface (Catalog, PDP, Quick Peek).
- Live variant selection properly shifts current SKU price and image.
- Comparison dock limits active items to 4 and reflects accurate specification diffs.

### 2.3. End-to-End User Journey Walkthrough
1. **Journey A (Instant Discovery to Purchase)**:
   - Land on Home → Search "Sony" in Omnibar → Filter by "Prime Only" → Click "Quick Peek" → Add to Cart → Proceed to 2-step Checkout → Select Prime Two-Day → Place Order → Verify Order ID in "My Orders".
2. **Journey B (Product Comparison & Evaluation)**:
   - Browse "Computers" → Pin MacBook Air to Compare → Pin second laptop to Compare → Open Comparison Tray → Review highlighted RAM/Storage differences → Select preferred laptop → Direct "Buy Now".
