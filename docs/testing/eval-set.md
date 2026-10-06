# Evaluation Dataset & Query Benchmark Set

## 1. Search Query Benchmark Suite

| Test ID | Query String | Category Constraint | Expected Matches | Validation Target |
| :--- | :--- | :--- | :--- | :--- |
| **Q-01** | `Sony` | All | `prod-001`, `prod-004` | Brand match across multiple categories |
| **Q-02** | `MacBook` | Computers | `prod-002` | Keyword match within specific category |
| **Q-03** | `Noise canceling` | Audio | `prod-001`, `prod-006` | Feature phrase matching in title & description |
| **Q-04** | `Espresso` | Home | `prod-005` | Kitchen category keyword |
| **Q-05** | `Gaming` | Gaming | `prod-004`, `prod-008` | Department relevance |
| **Q-06** | `Under $100` | All | Items with `price <= 100` | Price facet boundary |
| **Q-07** | `xyzrandomnotfound`| All | `[]` (Empty state) | Clean empty state message with recommendations |

## 2. AI Review Synthesis Evaluation Rubric

| Criteria | Scoring Range (1–5) | Target Standard |
| :--- | :--- | :--- |
| **Accuracy to Review Base** | 1 (Hallucinatory) to 5 (Faithful) | 5: Summarizes verified user pain points accurately (e.g. non-folding XM5 hinges). |
| **Brevity & Scannability** | 1 (Dense paragraph) to 5 (3-bullet digest) | 5: 1-sentence verdict, 3 pros, 2 cons, 1 buyer persona. |
| **Honesty & Balance** | 1 (Biased marketing) to 5 (Critical balance) | 5: Never hides real drawbacks (e.g. fingerprints, port limitations). |
