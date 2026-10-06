# Design Style Guide & Component Rules

## 1. Button System

### Primary Action ("Add to Cart")
- Background: `#FFD814` (Hover: `#F7CA00`, Active: `#F0B800`)
- Text: `#0F1111`, font-weight: 500
- Border: `1px solid #FCD200`
- Border-radius: `9999px` (Full pill shape)
- Padding: `px-6 py-2.5`
- Shadow: `shadow-sm hover:shadow`

### Direct Purchase ("Buy Now")
- Background: `#FFA41C` (Hover: `#FA8900`)
- Text: `#0F1111`, font-weight: 500
- Border: `1px solid #FF8F00`
- Border-radius: `9999px`

### Secondary / Ghost Action
- Background: `#FFFFFF` (Hover: `#F7FAFA`)
- Text: `#0F1111`
- Border: `1px solid #D5D9D9`
- Border-radius: `9999px` or `rounded-md`

## 2. Badges & Indicators
- **Prime Badge**: `#00A8E1` text with subtle curved gradient checkmark.
- **Amazon's Choice**: Dark navy background (`#232F3E`), white bold text, orange highlight pip.
- **Best Seller**: `#E67A00` rich amber pill with white text.
- **Stock Status**: Green text (`#007600`) when > 10; Bold red/amber text (`#B12704`) when < 5 units left.

## 3. Product Cards
- Card Container: White background, subtle border `border-gray-200`, `rounded-lg`, hover elevation `hover:shadow-md hover:border-gray-300`, `transition-all duration-150`.
- Aspect Ratio: Image container 1:1 square with `object-contain` centering.
- Quick Actions: Floating hover bar with "+ Compare" and "Quick Peek" eye icon.

## 4. Spacing & Grid System
- Standard container max-width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Responsive product grid:
  - Mobile: `grid-cols-1 sm:grid-cols-2`
  - Tablet: `md:grid-cols-3`
  - Desktop: `lg:grid-cols-4 xl:grid-cols-4 gap-6`
