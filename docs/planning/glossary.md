# Domain Glossary — Amazon Re-imagined

| Term | Definition | Context in Application |
| :--- | :--- | :--- |
| **PDP (Product Detail Page)** | The primary surface dedicated to a single product SKU, showing gallery, specifications, price, reviews, and Buy Box. | `ProductDetailView.tsx` |
| **Buy Box** | The conversion focal point on the right side of a PDP containing stock status, delivery guarantees, quantity selector, "Add to Cart", and "Buy Now". | `BuyBox.tsx` |
| **SKU (Stock Keeping Unit)** | A distinct product variation (e.g., Space Gray / 512GB vs. Silver / 256GB). | Managed inside `Product.variants` |
| **Prime Eligible** | Denotes items backed by Amazon's fast, free delivery standard (typically 1-2 business days). | `product.isPrime: boolean` |
| **AI Review Digest ("The Verdict")** | An synthesized executive summary of hundreds of customer reviews highlighting consensus pros, cons, and buyer target. | `AIReviewDigest.tsx` |
| **Comparison Dock** | A persistent floating tray at the screen bottom where users pin 2–4 items to inspect an instant spec differential matrix. | `ComparisonDock.tsx` |
| **Quick Peek** | A slide-over drawer that enables previewing imagery, specs, and variants without navigating away from search results. | `QuickPeekDrawer.tsx` |
| **Faceted Search** | Multi-dimensional catalog filtering using attributes such as department, brand, price tier, and star rating. | `FilterSidebar.tsx` |
| **Filter Pills** | Dismissible chips displayed above the catalog indicating active filter constraints. | `ActiveFilterPills.tsx` |
| **Tracking Stepper** | A 4-stage visual timeline displaying order fulfillment status: Ordered → Processing → Out for Delivery → Delivered. | `OrderTrackingModal.tsx` |
| **Agent Capture** | The mandatory 8x assignment requirement to record raw prompts and responses in `.agent-logs/`. | `.agent-logs/` & `.agents/capture.py` |
