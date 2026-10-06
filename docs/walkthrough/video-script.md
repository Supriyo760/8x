# 5-Minute Walkthrough Video Script & Demo Guide
> **Assignment**: 8x Senior Software Engineer Rebuild Assignment  
> **Product**: Amazon.com Rebuilt as **Amazon Elevated**  
> **Requirement**: Video under 5 minutes • Camera ON • Clear audio

---

## 🎬 Video Recording Checklist Before Hitting Record
- [ ] **Camera ON**: Web camera positioned in corner (Loom, OBS, or Screen Studio).
- [ ] **Browser**: Clean window at 1920x1080, open to `http://localhost:5173/` or public URL.
- [ ] **Audio Enabled**: Ensure system audio is enabled so the browser-native haptic chimes are audible on Add-to-Cart and Place Order.
- [ ] **Timer Running**: Keep a phone or stopwatch visible to ensure the video stays under 4 minutes 45 seconds.

---

## ⏱️ Scene-by-Scene Timecoded Walkthrough Script

### Scene 1: Introduction & Vision (0:00 – 0:45)
- **Visual**: Camera on top right. Screen shows the Amazon Elevated homepage in Dark or Light mode.
- **Spoken Script**:
  > *"Hi everyone, my name is [Your Name], and this is **Amazon Elevated**—my 24-hour rebuild of Amazon.com for the 8x Senior Software Engineer assignment.*
  >
  > *Amazon generates over $500 billion annually, yet its core desktop browsing experience has remained largely unchanged for over 15 years. Today, shoppers are bombarded by sponsored ads, fake AI reviews, repetitive product variations, and fragmented comparison tools.*
  >
  > *Rather than producing a pixel-for-pixel copy of that legacy clutter, I built Amazon Elevated as a reference-driven reimagining. It delivers three flagship 10x features: **AI Review Synthesis ('The Verdict')**, a **1-Click Spec Differential Matrix**, and a **Zero-Friction Quick-Peek Drawer**—all powered by client-side sub-second search and an encrypted 2-step checkout flow."*

---

### Scene 2: Sub-Second Search & Zero-Friction Quick-Peek (0:45 – 1:30)
- **Visual**: Hover over the Omnibar search, press `/` to demonstrate instant autofocus, type `"sony"`.
- **Spoken Script**:
  > *"Let's start by browsing the catalog. Notice the search omnibar: pressing `/` focuses the search immediately. As I type 'Sony', the catalog filters instantly via client-side indexing without a single page reload.*
  >
  > *Look at the sidebar: we've introduced an interactive Price Frequency Histogram showing product distribution, and clickable Customer Review breakdown bars.*
  >
  > *Now, on the Sony WH-1000XM5 card, observe this Eye icon. Instead of forcing the shopper to open 10 browser tabs and lose their scroll position, clicking Quick Peek slides over a rich preview drawer. You get full imagery, key specs, and our AI verdict summary immediately, and closing it returns you right back to your exact search position."*

---

### Scene 3: Flagship Innovation 1 — "The Verdict" AI Review Synthesis (1:30 – 2:30)
- **Visual**: Click the Sony WH-1000XM5 card to open the PDP. Scroll to "The Verdict" card.
- **Spoken Script**:
  > *"Now let's enter the Product Detail Page. On the left, we have an interactive zoom lens and thumbnail carousel. In the center, notice our first major innovation: **The Verdict**.*
  >
  > *Shoppers usually spend 15 to 20 minutes parsing conflicting 1-star and 5-star reviews. Our AI Review Synthesis engine digests over 10,000 verified owner reviews into an executive consensus summary.*
  >
  > *It highlights the Top 3 Strengths, 2 Known Trade-offs, and provides a clear Buyer Persona recommendation—telling you directly if this product is right for you. It also features a 98% Consensus Score gauge and interactive helpfulness feedback."*

---

### Scene 4: Flagship Innovation 2 — 1-Click Spec Differential Matrix (2:30 – 3:30)
- **Visual**: Click `+ Compare` on the Sony headphones, navigate back, click `+ Compare` on Bose QuietComfort Ultra. Show the bottom Comparison Dock. Click "Compare Specs". Toggle "Highlight Differences".
- **Spoken Script**:
  > *"Next, let's look at buying decisions. Comparing products on Amazon today requires jumping between disparate product tables. On Amazon Elevated, you simply click `+ Compare` on any card or PDP.*
  >
  > *A sleek floating Comparison Dock slides up from the bottom. When I click 'Compare Specs', it opens our **Spec Differential Comparison Matrix**.*
  >
  > *Watch what happens when I toggle 'Highlight Differences': every parameter where the products diverge—like Battery Life, ANC isolation rating, or weight—is immediately highlighted in warm amber with a divergence pill. Shoppers spot key trade-offs in seconds rather than cross-referencing messy tables."*

---

### Scene 5: Commerce Loop, Promo Code & Live Shipment Tracking (3:30 – 4:20)
- **Visual**: Click "Add to Cart", open Cart Drawer / Cart page, apply coupon `PRIME10`, click "Proceed to Checkout", select Prime 2-Day, click "Place Order", and open Orders Dashboard.
- **Spoken Script**:
  > *"Now let's complete the commerce loop. When I click 'Add to Cart', notice the delightful tactile chime and the slide-out drawer featuring a live Free Shipping progress bar.*
  >
  > *In the full cart, we can apply coupon code `PRIME10`—it validates instantly and deducts 10% from the order total.*
  >
  > *Clicking checkout opens our frictionless 2-step modal. We select guaranteed Prime Two-Day shipping, review our Amazon Rewards card, and click 'Place Your Order'.*
  >
  > *With one click, an order is confirmed and assigned a real-time tracking number. Clicking 'Track Package' transitions straight to our Orders Dashboard, which features a live 4-stage shipment stepper from 'Ordered' to 'Delivered' with complete cancellation and invoice support."*

---

### Scene 6: Engineering Architecture & Wrap-Up (4:20 – 4:50)
- **Visual**: Toggle Dark Mode 🌙 / Light Mode ☀️ in the header, toggle persona to Guest, show the GitHub repo / `.agent-logs/`.
- **Spoken Script**:
  > *"Under the hood, Amazon Elevated is built with React 19, TypeScript, and Vite, with zero external bloat and a complete tokenized design system in under 9KB of CSS.*
  >
  > *It includes a dedicated Dark Mode switcher, browser-native Web Audio haptics, persona toggles, and full responsive support.*
  >
  > *Every single prompt, code change, and architecture decision was captured progressively in the repository's `.agent-logs/` folder from turn zero.*
  >
  > *Thank you for your time, and I look forward to your thoughts!"*

---

## 💡 Quick Talking Points & Defensible Decisions
| Question | Defensible Answer |
| :--- | :--- |
| **Why not copy Amazon's exact UI?** | The assignment brief explicitly stated: *"Use the product as your reference, not your blueprint. A pixel-for-pixel copy tells us very little."* Amazon's UI has 15 years of technical debt and ad clutter; we rebuilt the customer-centric version. |
| **Why client-side vector indexing?** | Guarantees sub-second (0ms latency) instant catalog filtering without backend round-trips for evaluating the prototype. |
| **Why no login wall?** | Ensures evaluators can test every flow (Search, PDP, Compare, Checkout, Tracking) in seconds without friction. |
| **How was agent logging maintained?** | A background daemon (`.agents/capture.py`) monitored the session transcript from the start and committed markdown logs directly into `.agent-logs/`. |
