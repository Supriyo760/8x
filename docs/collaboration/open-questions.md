# Open Decisions & Resolved Inquiries

## 1. Resolved Inquiries
- **Q**: Should we build a real user authentication wall requiring email verification?
  - *Resolution*: No. 8x strictly requires: *"The live link opens for somebody who is not signed in as you."* Guest mode with instant simulated identity switching is optimal.
- **Q**: Should we integrate a real Stripe API key?
  - *Resolution*: No. Live credit card transactions require test cards that may fail across regional review networks. A clean, realistic client-side payment simulator is far more reliable and faster to evaluate.
- **Q**: How many products in the catalog?
  - *Resolution*: 50+ rich realistic items across 6 departments (Electronics, Computers, Audio, Gaming, Home, Books).

## 2. Active Considerations
- **Wishlist Export**: Should we provide a 1-click "Share Wishlist Link" that encodes the list into the URL hash? (Slated for Phase 5 polish).
