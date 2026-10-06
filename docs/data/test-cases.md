# Test Cases & Input-Output Specifications

## TC-01: Free Shipping Calculation Threshold
- **Input**:
  - Item 1: `$19.99`
  - Threshold: `$35.00`
- **Expected Output**:
  - `subtotal = 19.99`
  - `shipping = 5.99`
  - `freeShippingRemaining = 15.01`
  - `progressPercent = 57.1%`
- **Step 2**: Add Item 2 (`$24.99`):
  - `subtotal = 44.98`
  - `shipping = 0.00`
  - `freeShippingRemaining = 0.00`
  - `freeShippingQualified = true`

## TC-02: Instant Filter Multi-Match
- **Input**:
  - `query = "Sony"`
  - `category = "audio"`
  - `isPrime = true`
- **Expected Output**:
  - Matches: `prod-001` (Sony WH-1000XM5)
  - Excludes: `prod-004` (Sony PlayStation 5 - category is gaming, not audio)
  - Excludes: `prod-006` (Bose Earbuds - brand is Bose, not Sony)

## TC-03: Variant Switching Consistency
- **Input**:
  - Base Product: `prod-004` (PS5 Digital @ $449.99)
  - Selected Variant: `var-004-dsc` (Disc Edition, priceModifier: +$50.00)
- **Expected Output**:
  - Display Price: `$499.99`
  - Cart Item SKU: `prod-004-disc`
  - Buy Box updates button payload to reflect the Disc variant.

## TC-04: Order Generation & Timeline Stepper
- **Input**:
  - User submits checkout for 1 item.
- **Expected Output**:
  - Generates Order ID matching `/^11[0-9]-[0-9]{7}-[0-9]{7}$/`
  - Order added to LocalStorage under `orders` key.
  - Cart items cleared from `cart` key.
  - Active tracking status set to `ordered`.
