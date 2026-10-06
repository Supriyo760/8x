import { Product, AIReviewDigest } from '../types';

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

export const geminiService = {
  /**
   * Generates live AI Review Synthesis ("The Verdict") for a product using Google Gemini
   */
  async synthesizeVerdict(
    product: Product, 
    lens: 'general' | 'power_user' | 'value' | 'durability' = 'general'
  ): Promise<AIReviewDigest> {
    if (!geminiApiKey) {
      return product.aiReviewDigest;
    }

    const lensInstructions = {
      general: 'Generate an objective, high-signal, zero-sponsored general consensus review.',
      power_user: 'Focus specifically from the perspective of an uncompromising software engineer or technical power user analyzing thermals, acoustics, chipset/build limits, and deep technical nuances.',
      value: 'Focus aggressively on price-to-performance ratio, competitive alternatives, and whether the feature set justifies the MSRP dollar-for-dollar.',
      durability: 'Focus on long-term hardware durability, chassis materials, repairability, and real customer teardown experiences after 1+ years of daily use.'
    };

    const prompt = `You are the lead Amazon Elevated Product Intelligence Engine.
Analyze the following product details, technical specifications, and verified customer reviews.

Product Title: "${product.title}"
Brand: "${product.brand}"
Category: "${product.category}"
Price: $${product.price}
Specs: ${JSON.stringify(product.specs)}
Features: ${JSON.stringify(product.features)}

Evaluation Lens: ${lensInstructions[lens]}

Respond ONLY with a valid JSON object matching this schema:
{
  "verdict": "One powerful, executive summary sentence capturing the core truth of this product under this lens.",
  "pros": ["Crisp verified strength 1", "Crisp verified strength 2", "Crisp verified strength 3"],
  "cons": ["Honest verified trade-off 1", "Honest verified trade-off 2"],
  "bestFor": "Target persona or exact optimal use-case."
}`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.3
            }
          })
        }
      );

      if (!response.ok) {
        console.warn(`Gemini API returned status ${response.status}, using curated synthesis.`);
        return product.aiReviewDigest;
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const parsed = JSON.parse(rawText);

      if (parsed.verdict && Array.isArray(parsed.pros) && Array.isArray(parsed.cons)) {
        return {
          verdict: parsed.verdict,
          pros: parsed.pros,
          cons: parsed.cons,
          bestFor: parsed.bestFor || product.aiReviewDigest.bestFor
        };
      }

      return product.aiReviewDigest;
    } catch (err) {
      console.warn('Gemini synthesis fallback:', err);
      return product.aiReviewDigest;
    }
  },

  /**
   * Interactive AI Assistant: Answers custom shopper questions about any product
   */
  async askProductQuestion(product: Product, question: string): Promise<string> {
    if (!geminiApiKey) {
      return `Based on verified specifications for the ${product.title}: This model features ${product.features[0]} and delivers industry-standard performance.`;
    }

    const prompt = `You are the Amazon Elevated AI Shopping Assistant. 
The shopper is asking a question about this specific product:
Product: ${product.title} (${product.brand}, $${product.price})
Specs: ${JSON.stringify(product.specs)}
Features: ${JSON.stringify(product.features)}
AI Consensus Verdict: ${product.aiReviewDigest.verdict}

Shopper's Question: "${question}"

Provide a concise, direct, helpful, and completely honest 2-3 sentence answer based on the real specs and acoustic/thermal/battery data.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.3
            }
          })
        }
      );

      if (!response.ok) {
        return `Based on verified specifications for the ${product.title}: It is equipped with ${product.specs['Battery Life'] || product.specs['Processor'] || 'high performance hardware'} and verified specs.`;
      }

      const data = await response.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
    } catch {
      return `Based on manufacturer specs: The ${product.title} meets standard verified criteria for ${product.category}.`;
    }
  },

  /**
   * Real-Time Global Amazon Search via Google Gemini AI
   * Generates authentic, spec-accurate products matching ANY search query
   */
  async generateProductsForQuery(query: string): Promise<Product[]> {
    if (!geminiApiKey || !query.trim()) return [];

    const prompt = `You are the Amazon Catalog AI Engine. The customer is searching for: "${query}".
Generate 2 to 3 real, commercial products that perfectly match this search query with accurate market prices, real specifications, authentic features, and an AI Review Verdict ("The Verdict").

Respond ONLY with a valid JSON array of objects with this schema:
[
  {
    "id": "gen-prod-unique",
    "title": "Exact full commercial title",
    "brand": "Manufacturer Name",
    "category": "audio | computers | gaming | home | books | electronics",
    "price": 299.99,
    "originalPrice": 349.99,
    "discountPercentage": 14,
    "rating": 4.6,
    "reviewCount": 1250,
    "isPrime": true,
    "isBestSeller": true,
    "isAmazonChoice": false,
    "inStock": true,
    "stockCount": 28,
    "deliveryDays": 1,
    "description": "Accurate 2-3 sentence description.",
    "features": [
      "Key feature 1",
      "Key feature 2",
      "Key feature 3",
      "Key feature 4"
    ],
    "specs": {
      "Spec 1": "Value 1",
      "Spec 2": "Value 2",
      "Spec 3": "Value 3",
      "Spec 4": "Value 4"
    },
    "variants": [
      { "id": "v1", "type": "color", "label": "Default", "value": "#1A1A1A", "priceModifier": 0 }
    ],
    "aiReviewDigest": {
      "verdict": "Executive 1-sentence verdict.",
      "pros": ["Crisp verified pro 1", "Crisp verified pro 2"],
      "cons": ["Honest verified con 1"],
      "bestFor": "Target use case or persona."
    }
  }
]`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.3
            }
          })
        }
      );

      if (!response.ok) return [];

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      if (Array.isArray(parsed) && parsed.length > 0) {
        // Assign beautiful contextual images based on query keywords
        const q = query.toLowerCase();
        let fallbackImages = [
          'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
        ];

        if (q.includes('camera') || q.includes('sony a') || q.includes('dslr') || q.includes('lens')) {
          fallbackImages = [
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=800&q=80'
          ];
        } else if (q.includes('keyboard') || q.includes('keychron') || q.includes('switch')) {
          fallbackImages = [
            'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
          ];
        } else if (q.includes('vacuum') || q.includes('dyson') || q.includes('cleaner')) {
          fallbackImages = [
            'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80'
          ];
        } else if (q.includes('shoe') || q.includes('sneaker') || q.includes('nike') || q.includes('jordan')) {
          fallbackImages = [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
          ];
        } else if (q.includes('coffee') || q.includes('espresso') || q.includes('breville')) {
          fallbackImages = [
            'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80'
          ];
        } else if (q.includes('chair') || q.includes('desk') || q.includes('herman') || q.includes('aeron')) {
          fallbackImages = [
            'https://images.unsplash.com/photo-1580481077197-0f81d187216a?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=800&q=80'
          ];
        } else if (q.includes('drone') || q.includes('dji')) {
          fallbackImages = [
            'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80'
          ];
        } else if (q.includes('watch') || q.includes('rolex') || q.includes('garmin')) {
          fallbackImages = [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
          ];
        } else if (q.includes('laptop') || q.includes('macbook') || q.includes('dell')) {
          fallbackImages = [
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
          ];
        }

        return parsed.map((item: any, idx: number) => ({
          ...item,
          id: `ai-${Date.now()}-${idx}`,
          images: item.images && item.images.length > 0 ? item.images : fallbackImages,
          inStock: true,
          stockCount: item.stockCount || 25,
          deliveryDays: item.deliveryDays || 1
        })) as Product[];
      }

      return [];
    } catch (err) {
      console.warn('AI search generation error:', err);
      return [];
    }
  }
};
