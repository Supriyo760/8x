import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // --- AUDIO ---
  {
    id: 'prod-001',
    title: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones',
    brand: 'Sony',
    category: 'audio',
    price: 348.00,
    originalPrice: 399.99,
    discountPercentage: 13,
    rating: 4.6,
    reviewCount: 14280,
    isPrime: true,
    isBestSeller: true,
    isAmazonChoice: false,
    inStock: true,
    stockCount: 42,
    deliveryDays: 1,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Two processors and 8 microphones for unprecedented noise cancellation. Super comfortable, lightweight design with soft fit leather and speak-to-chat automation.',
    features: [
      'Industry-leading noise cancellation with Auto NC Optimizer',
      'Engineered to perfection with Integrated Processor V1 and 30mm carbon drivers',
      'Crystal clear hands-free calling with 4 beamforming microphones and AI noise reduction',
      'Up to 30-hour battery life with quick charging (3 min charge for 3 hours of playback)'
    ],
    specs: {
      'Battery Life': '30 Hours',
      'Connectivity': 'Bluetooth 5.2 / 3.5mm Aux',
      'Weight': '250g',
      'Fast Charging': '3 min = 3 hours playback',
      'Active Noise Cancellation': 'Dual-chip 8-microphone ANC'
    },
    variants: [
      { id: 'var-001-blk', type: 'color', label: 'Black', value: '#1A1A1A', priceModifier: 0.00 },
      { id: 'var-001-sil', type: 'color', label: 'Silver', value: '#E5E5E5', priceModifier: 0.00 },
      { id: 'var-001-blu', type: 'color', label: 'Midnight Blue', value: '#1B2A4A', priceModifier: 10.00 }
    ],
    aiReviewDigest: {
      verdict: 'The global benchmark for active noise cancellation, lightweight comfort, and conference call clarity.',
      pros: [
        'Unrivaled noise reduction on airplanes, subways, and bustling open offices',
        'Featherlight headband eliminates crown pressure points during 8+ hour work sessions',
        'State-of-the-art beamforming microphone suppresses background keyboard clicks'
      ],
      cons: [
        'Non-folding hinges result in a slightly larger travel case footprint',
        'Soft leather earcups can feel warm during strenuous workouts'
      ],
      bestFor: 'Frequent flyers, remote knowledge workers, and daily transit commuters.'
    }
  },
  {
    id: 'prod-002',
    title: 'Bose QuietComfort Ultra Wireless Earbuds with Spatial Audio',
    brand: 'Bose',
    category: 'audio',
    price: 249.00,
    originalPrice: 299.00,
    discountPercentage: 17,
    rating: 4.4,
    reviewCount: 7320,
    isPrime: true,
    isBestSeller: false,
    isAmazonChoice: true,
    inStock: true,
    stockCount: 35,
    deliveryDays: 1,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Groundbreaking spatialized audio for more immersive listening. World-class noise cancellation that is quieter than ever before. CustomTune technology shapes sound to your ear canal.',
    features: [
      'Bose Immersive Audio pushes sound boundaries for hyper-realistic listening',
      'CustomTune technology shapes sound specifically to your ear canal',
      'Nine combinations of eartips and stability bands ensure secure seal',
      'Up to 6 hours of listening time (up to 24 hours total with case)'
    ],
    specs: {
      'Battery Life': '6 Hours (24 with Case)',
      'Water Resistance': 'IPX4 Sweat Resistant',
      'Bluetooth': '5.3 with Snapdragon Sound',
      'Spatial Audio': 'Bose Immersive Audio Mode'
    },
    variants: [
      { id: 'var-002-blk', type: 'color', label: 'Black', value: '#18181B', priceModifier: 0.00 },
      { id: 'var-002-wht', type: 'color', label: 'White Smoke', value: '#F4F4F5', priceModifier: 0.00 }
    ],
    aiReviewDigest: {
      verdict: 'The pinnacle of active noise reduction in an in-ear form factor, silencing loud commutes with ease.',
      pros: [
        'Unrivaled low-frequency engine and train rumble cancellation',
        'Stability fin design stays locked in place during sprints and gym sessions',
        'Natural transparency mode without robotic hiss'
      ],
      cons: [
        'Case does not support Qi wireless charging without optional cover',
        'Microphone struggles in heavy crosswinds outdoors'
      ],
      bestFor: 'Gym goers, subway commuters, and open-office workers.'
    }
  },
  {
    id: 'prod-003',
    title: 'Apple AirPods Pro (2nd Generation) with USB-C and MagSafe Charging Case',
    brand: 'Apple',
    category: 'audio',
    price: 189.99,
    originalPrice: 249.00,
    discountPercentage: 24,
    rating: 4.7,
    reviewCount: 32400,
    isPrime: true,
    isBestSeller: true,
    isAmazonChoice: true,
    inStock: true,
    stockCount: 88,
    deliveryDays: 1,
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Up to 2x more active noise cancellation than the previous generation. Adaptive Audio automatically tailors noise control to your environment.',
    features: [
      'Apple-designed H2 chip pushes advanced audio performance',
      'Personalized Spatial Audio with dynamic head tracking',
      'Precision Finding for MagSafe Charging Case with built-in speaker',
      'IP54 dust, sweat, and water resistance'
    ],
    specs: {
      'Battery Life': '6 Hours (30 with Case)',
      'Chipset': 'Apple H2 Audio Chip',
      'Charging': 'USB-C, MagSafe, Apple Watch Charger',
      'Water Resistance': 'IP54'
    },
    variants: [
      { id: 'var-003-wht', type: 'color', label: 'White', value: '#FFFFFF', priceModifier: 0.00 }
    ],
    aiReviewDigest: {
      verdict: 'The gold standard ecosystem earbud with magical transparency mode and effortless multi-device switching.',
      pros: [
        'Transparency mode sounds almost indistinguishable from open ears',
        'MagSafe case includes Precision Finding chime speaker',
        'Adaptive Audio seamlessly ducks loud road construction'
      ],
      cons: [
        'Advanced spatial features restricted to Apple iOS devices',
        'Glossy case shows micro-scratches easily'
      ],
      bestFor: 'iPhone, Mac, and iPad users seeking frictionless daily audio.'
    }
  },
  {
    id: 'prod-004',
    title: 'Sennheiser Momentum 4 Wireless Audiophile Headphones (60-Hour Battery)',
    brand: 'Sennheiser',
    category: 'audio',
    price: 279.95,
    originalPrice: 379.95,
    discountPercentage: 26,
    rating: 4.5,
    reviewCount: 4890,
    isPrime: true,
    isBestSeller: false,
    isAmazonChoice: false,
    inStock: true,
    stockCount: 19,
    deliveryDays: 1,
    images: [
      'https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Audiophile-inspired 42mm transducer system and aptX Adaptive for superior sonic resolution. Colossal 60-hour battery life.',
    features: [
      'Sennheiser Signature Sound with custom acoustic system',
      'Industry-leading 60-hour battery life with fast charging',
      'Adaptive Hybrid Noise Cancellation',
      'Customizable sound personalization via Sennheiser Smart Control App'
    ],
    specs: {
      'Battery Life': '60 Hours',
      'Driver Size': '42mm Dynamic Transducers',
      'Codecs': 'aptX, aptX Adaptive, AAC, SBC',
      'Weight': '293g'
    },
    variants: [
      { id: 'var-004-blk', type: 'color', label: 'Black', value: '#111827', priceModifier: 0.00 },
      { id: 'var-004-wht', type: 'color', label: 'White/Silver', value: '#F3F4F6', priceModifier: 0.00 }
    ],
    aiReviewDigest: {
      verdict: 'The best-sounding wireless ANC headphone on the market, backed by an unprecedented 60-hour battery.',
      pros: [
        'Rich, dynamic acoustic profile with expansive soundstage',
        'Battery lasts 2+ weeks of heavy daily listening',
        'Intuitive touch gesture earcups'
      ],
      cons: [
        'ANC strength is slightly behind Sony and Bose in deep bass frequencies',
        'Understated visual design compared to Momentum 3'
      ],
      bestFor: 'Music purists and audiophiles who hate charging their gear.'
    }
  },

  // --- COMPUTERS ---
  {
    id: 'prod-005',
    title: 'Apple MacBook Air 15-inch M3 Chip (16GB Unified Memory, 512GB SSD)',
    brand: 'Apple',
    category: 'computers',
    price: 1499.00,
    originalPrice: 1699.00,
    discountPercentage: 12,
    rating: 4.8,
    reviewCount: 8940,
    isPrime: true,
    isBestSeller: false,
    isAmazonChoice: true,
    inStock: true,
    stockCount: 18,
    deliveryDays: 1,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Impossibly thin and wicked fast with M3 power. Liquid Retina display supports 1 billion colors. MagSafe charging and dual external display support.',
    features: [
      'Blazing fast 8-core CPU and 10-core GPU built on 3nm architecture',
      'Up to 18 hours of real-world battery life',
      'Spacious 15.3-inch Liquid Retina display with 500 nits brightness',
      'Six-speaker sound system with Spatial Audio force-cancelling woofers'
    ],
    specs: {
      'Processor': 'Apple M3 (8-core CPU, 10-core GPU)',
      'Memory': '16GB Unified Memory',
      'Storage': '512GB NVMe SSD',
      'Display': '15.3-inch Liquid Retina (2880 x 1864)',
      'Weight': '3.3 lbs (1.51 kg)'
    },
    variants: [
      { id: 'var-005-mid', type: 'color', label: 'Midnight', value: '#1C2430', priceModifier: 0.00 },
      { id: 'var-005-stg', type: 'color', label: 'Starlight', value: '#EFE8DC', priceModifier: 0.00 },
      { id: 'var-005-spg', type: 'color', label: 'Space Gray', value: '#7B7E83', priceModifier: 0.00 }
    ],
    aiReviewDigest: {
      verdict: 'The ultimate everyday laptop combining large screen productivity, silent fanless thermals, and all-day endurance.',
      pros: [
        'Silent fanless operation with zero heat under normal workflows',
        'Outstanding 16+ hour battery life easily outlasts full workdays',
        'Crisp, vibrant 15.3-inch display with rich contrast'
      ],
      cons: [
        'Limited to two Thunderbolt/USB4 ports on one side',
        'Midnight finish still shows minor palm oils'
      ],
      bestFor: 'Professionals, software engineers, writers, and college students.'
    }
  },
  {
    id: 'prod-006',
    title: 'Dell XPS 15 9530 Laptop (13th Gen Intel i7-13700H, RTX 4060, 32GB RAM, 1TB SSD)',
    brand: 'Dell',
    category: 'computers',
    price: 1899.99,
    originalPrice: 2299.99,
    discountPercentage: 17,
    rating: 4.4,
    reviewCount: 3120,
    isPrime: true,
    isBestSeller: false,
    isAmazonChoice: false,
    inStock: true,
    stockCount: 11,
    deliveryDays: 1,
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Stunning 15.6-inch OLED 3.5K InfinityEdge touch display. CNC machined aluminum chassis with carbon fiber palm rest and NVIDIA GeForce RTX 4060 graphics.',
    features: [
      '13th Gen Intel Core i7-13700H 14-core processor',
      'NVIDIA GeForce RTX 4060 8GB GDDR6 graphics',
      '3.5K OLED (3456 x 2160) Touch Display with DisplayHDR 500',
      '32GB DDR5 4800MHz RAM and 1TB PCIe NVMe SSD'
    ],
    specs: {
      'CPU': 'Intel Core i7-13700H (14 cores, 20 threads)',
      'GPU': 'NVIDIA GeForce RTX 4060 8GB',
      'RAM': '32GB DDR5 Dual Channel',
      'Display': '15.6" OLED 3.5K InfinityEdge (3456 x 2160)',
      'Weight': '4.23 lbs (1.92 kg)'
    },
    variants: [
      { id: 'var-006-oled', type: 'storage', label: '1TB SSD / 32GB RAM', value: '1tb-32gb', priceModifier: 0.00 }
    ],
    aiReviewDigest: {
      verdict: 'A premium Windows creative powerhouse with one of the most gorgeous OLED laptop screens ever built.',
      pros: [
        'Breathtaking 3.5K OLED display with 100% DCI-P3 color accuracy',
        'Sturdy CNC aluminum build with plush carbon fiber deck',
        'Strong GPU muscle for 4K video rendering and casual AAA gaming'
      ],
      cons: [
        'Fans become audible under sustained video rendering loads',
        'Battery life drops to 6 hours on high display brightness'
      ],
      bestFor: 'Video editors, 3D artists, photo colorists, and power Windows users.'
    }
  },
  {
    id: 'prod-007',
    title: 'Logitech MX Master 3S Wireless Performance Mouse, Quiet Clicks, 8K DPI',
    brand: 'Logitech',
    category: 'computers',
    price: 99.99,
    originalPrice: 109.99,
    discountPercentage: 9,
    rating: 4.8,
    reviewCount: 18900,
    isPrime: true,
    isBestSeller: true,
    isAmazonChoice: true,
    inStock: true,
    stockCount: 85,
    deliveryDays: 1,
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Quiet clicks deliver a satisfying soft feel with 90% less noise. 8K DPI track-on-glass sensor. MagSpeed electromagnetic scrolling.',
    features: [
      'Quiet Click buttons eliminate office and Zoom meeting click noise',
      'MagSpeed scroll wheel scrolls 1,000 lines in 1 second',
      'Ergonomic silhouette crafted to support palm and wrist naturally',
      'Pair with up to 3 computers and switch effortlessly across macOS and Windows'
    ],
    specs: {
      'DPI': '200 to 8000 DPI (Track on Glass)',
      'Battery': 'Up to 70 days per full charge',
      'Connectivity': 'Bluetooth LE + Logi Bolt USB',
      'Buttons': '7 customizable buttons'
    },
    variants: [
      { id: 'var-007-blk', type: 'color', label: 'Graphite', value: '#27272A', priceModifier: 0.00 },
      { id: 'var-007-gry', type: 'color', label: 'Pale Gray', value: '#E4E4E7', priceModifier: 0.00 }
    ],
    aiReviewDigest: {
      verdict: 'The undisputed king of productivity mice; once you use the MagSpeed electromagnetic scroll wheel, there is no going back.',
      pros: [
        'Incredibly silent tactile clicks',
        'Hyper-fast frictionless scrolling fly-wheel',
        'Comfortable ergonomic thumb rest with gesture button'
      ],
      cons: [
        'Right-handed only silhouette (no left-hand variant)',
        'Too heavy for competitive fast-twitch gaming'
      ],
      bestFor: 'Software engineers, financial analysts, designers, and spreadsheet power users.'
    }
  },
  {
    id: 'prod-008',
    title: 'Keychron Q1 Pro Wireless Custom Mechanical Keyboard (QMK/VIA, Aluminum)',
    brand: 'Keychron',
    category: 'computers',
    price: 199.99,
    originalPrice: 229.99,
    discountPercentage: 13,
    rating: 4.7,
    reviewCount: 2140,
    isPrime: true,
    isBestSeller: false,
    isAmazonChoice: true,
    inStock: true,
    stockCount: 22,
    deliveryDays: 1,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Full CNC machined 6063 aluminum body with double-gasket design. Wireless Bluetooth 5.1 and wired mode with customizable programmable knob.',
    features: [
      'Double-gasket acoustic mounting design for cushioned, deep acoustic thock',
      'QMK/VIA open-source key remapping support',
      'Hot-swappable PCB supports 3-pin and 5-pin MX switches',
      'Mac and Windows keycaps and toggle switch included'
    ],
    specs: {
      'Layout': '75% Compact (81 Keys)',
      'Body Material': 'Full CNC Machined Aluminum',
      'Switches': 'K Pro Red (Linear) / Brown (Tactile)',
      'Connectivity': 'Bluetooth 5.1 + Type-C'
    },
    variants: [
      { id: 'var-008-red', type: 'color', label: 'Linear Red', value: '#EF4444', priceModifier: 0.00 },
      { id: 'var-008-brn', type: 'color', label: 'Tactile Brown', value: '#92400E', priceModifier: 0.00 }
    ],
    aiReviewDigest: {
      verdict: 'An enthusiast-grade custom mechanical keyboard in a pre-built package with heavy aluminum luxury.',
      pros: [
        'Substantial 4.5 lb solid aluminum weight prevents desk slipping',
        'Satisfying deep acoustic sound profile out of the box',
        'Full QMK/VIA web-based key remapping'
      ],
      cons: [
        'High front-lip height benefits from a wrist rest',
        'Dense weight makes it non-portable'
      ],
      bestFor: 'Programmers, writers, and desktop keyboard connoisseurs.'
    }
  },

  // --- GAMING ---
  {
    id: 'prod-009',
    title: 'Sony PlayStation 5 Slim Digital Edition Gaming Console (1TB SSD)',
    brand: 'Sony',
    category: 'gaming',
    price: 449.99,
    originalPrice: 499.99,
    discountPercentage: 10,
    rating: 4.9,
    reviewCount: 21540,
    isPrime: true,
    isBestSeller: true,
    isAmazonChoice: false,
    inStock: true,
    stockCount: 25,
    deliveryDays: 1,
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback, adaptive triggers, and 3D Audio.',
    features: [
      'Slim Design with 1TB SSD storage ready out of the box',
      'Ray Tracing support with up to 120fps with 120Hz output on 4K displays',
      'DualSense Wireless Controller with transformative haptic feedback',
      'Tempest 3D AudioTech support'
    ],
    specs: {
      'Storage': '1TB Custom NVMe SSD',
      'Resolution': 'Up to 4K 120Hz, 8K output',
      'Audio': 'Tempest 3D AudioTech',
      'I/O': 'USB Type-C (x2), HDMI 2.1'
    },
    variants: [
      { id: 'var-009-dig', type: 'storage', label: 'Digital Edition', value: 'digital', priceModifier: 0.00 },
      { id: 'var-009-dsc', type: 'storage', label: 'Disc Edition', value: 'disc', priceModifier: 50.00 }
    ],
    aiReviewDigest: {
      verdict: 'Unrivaled gaming performance with generational exclusives and game-changing DualSense haptic feedback.',
      pros: [
        'Instant loading times across AAA games',
        'DualSense adaptive triggers deliver unmatched tactical immersion',
        'Slimmer chassis occupies 30% less entertainment center space'
      ],
      cons: [
        'Internal storage fills up fast with modern 100GB+ titles',
        'Vertical stand sold separately on the slim variant'
      ],
      bestFor: 'Gamers seeking 4K 60/120fps fidelity and blockbuster exclusive experiences.'
    }
  },
  {
    id: 'prod-010',
    title: 'Samsung 49\" Odyssey OLED G9 Curved Smart Gaming Monitor (240Hz, 0.03ms)',
    brand: 'Samsung',
    category: 'gaming',
    price: 1199.99,
    originalPrice: 1799.99,
    discountPercentage: 33,
    rating: 4.6,
    reviewCount: 3410,
    isPrime: true,
    isBestSeller: false,
    isAmazonChoice: true,
    inStock: true,
    stockCount: 6,
    deliveryDays: 2,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?auto=format&fit=crop&w=800&q=80'
    ],
    description: '49-inch Dual QHD 1800R curved display powered by Neo Quantum Processor Pro. Infinite contrast with OLED deep blacks and blazing 240Hz refresh rate.',
    features: [
      'OLED panel powered by Quantum Dot technology for pure color fidelity',
      '0.03ms response time and 240Hz refresh rate for blur-free gaming',
      'Dual QHD (5120 x 1440) 32:9 super ultra-wide aspect ratio replaces dual monitors',
      'DisplayHDR True Black 400 for stunning dynamic range'
    ],
    specs: {
      'Screen Size': '49 inches (32:9 Aspect Ratio)',
      'Resolution': 'Dual QHD (5120 x 1440)',
      'Refresh Rate': '240Hz',
      'Response Time': '0.03ms (GtG)',
      'Curvature': '1800R'
    },
    variants: [
      { id: 'var-010-oled', type: 'size', label: '49" OLED 240Hz', value: '49-oled', priceModifier: 0.00 }
    ],
    aiReviewDigest: {
      verdict: 'The ultimate gaming and ultra-wide productivity spectacle with jaw-dropping OLED contrast and buttery 240Hz motion.',
      pros: [
        'Flawless inky blacks and vibrant HDR color pop',
        'Replaces two 27-inch monitors with zero bezel interruption',
        '0.03ms pixel response eliminates ghosting entirely'
      ],
      cons: [
        'Requires deep desk depth and powerful modern GPU',
        'Micro-HDMI and Mini-DisplayPort cables can feel finicky'
      ],
      bestFor: 'Simulation racers, flight sim fans, and multitasking power developers.'
    }
  },
  {
    id: 'prod-011',
    title: 'Nintendo Switch – OLED Model with White Joy-Con',
    brand: 'Nintendo',
    category: 'gaming',
    price: 339.99,
    originalPrice: 349.99,
    discountPercentage: 3,
    rating: 4.8,
    reviewCount: 41200,
    isPrime: true,
    isBestSeller: true,
    isAmazonChoice: true,
    inStock: true,
    stockCount: 65,
    deliveryDays: 1,
    images: [
      'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Featuring a vibrant 7-inch OLED screen, a wide adjustable stand, a dock with a wired LAN port, 64 GB of internal storage, and enhanced audio.',
    features: [
      '7-inch OLED screen with vivid colors and crisp contrast',
      'Wide adjustable stand for tabletop gaming mode',
      'Wired LAN port built into television dock',
      'Enhanced onboard stereo speakers'
    ],
    specs: {
      'Display': '7.0" OLED (1280 x 720 handheld, 1080p docked)',
      'Storage': '64 GB Internal (microSD expandable)',
      'Battery Life': '4.5 to 9 Hours',
      'Weight': '0.93 lbs (with Joy-Con)'
    },
    variants: [
      { id: 'var-011-wht', type: 'color', label: 'White', value: '#FFFFFF', priceModifier: 0.00 },
      { id: 'var-011-neo', type: 'color', label: 'Neon Red/Blue', value: '#EF4444', priceModifier: 0.00 }
    ],
    aiReviewDigest: {
      verdict: 'The definitive edition of the best portable console library ever created with an ink-black OLED display.',
      pros: [
        '7-inch OLED screen elevates portable Zelda and Mario gameplay',
        'Sturdy full-width kickstand fixes original model flaws',
        'Huge catalog of first-party masterpiece games'
      ],
      cons: [
        'Internal processing chipset remains identical to original Switch',
        'Bluetooth audio still experiences slight latency with non-aptX earbuds'
      ],
      bestFor: 'Family gaming, commuters, travelers, and Nintendo franchise fans.'
    }
  },
  {
    id: 'prod-012',
    title: 'Steam Deck OLED 512GB Handheld Gaming PC',
    brand: 'Valve',
    category: 'gaming',
    price: 549.00,
    originalPrice: 579.00,
    discountPercentage: 5,
    rating: 4.9,
    reviewCount: 9840,
    isPrime: true,
    isBestSeller: false,
    isAmazonChoice: true,
    inStock: true,
    stockCount: 14,
    deliveryDays: 1,
    images: [
      'https://images.unsplash.com/photo-1612287232070-df853fb5c03c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Brilliant 7.4-inch 90Hz HDR OLED display, faster 6nm APU, longer battery life, and Wi-Fi 6E connectivity for desktop PC games on the go.',
    features: [
      '7.4" 90Hz HDR OLED with 1,000 nits peak brightness',
      '50Wh battery delivering 30-50% more game time than LCD model',
      'Wi-Fi 6E for up to 3x faster game downloads',
      'SteamOS desktop mode with full trackpad precision'
    ],
    specs: {
      'APU': '6nm AMD Zen 2 (4c/8t) + RDNA 2 (8 CUs)',
      'Display': '7.4" OLED 90Hz (1280 x 800)',
      'RAM': '16 GB LPDDR5 6400 MT/s',
      'Battery': '50Wh (3-12 hours depending on game)'
    },
    variants: [
      { id: 'var-012-512', type: 'storage', label: '512GB NVMe SSD', value: '512gb', priceModifier: 0.00 },
      { id: 'var-012-1tb', type: 'storage', label: '1TB Anti-Glare SSD', value: '1tb', priceModifier: 100.00 }
    ],
    aiReviewDigest: {
      verdict: 'The undisputed benchmark for portable PC gaming; the 90Hz HDR OLED screen is nothing short of breathtaking.',
      pros: [
        '90Hz OLED screen delivers rich inky blacks and silky frame rates',
        'Substantially improved battery life and whisper-quiet thermals',
        'Runs entire Steam PC library with customizable controls'
      ],
      cons: [
        'Heavier than a Nintendo Switch',
        'Some anti-cheat multiplayer games require Windows tweaks'
      ],
      bestFor: 'PC gamers with deep Steam libraries wanting console portability.'
    }
  },

  // --- HOME & KITCHEN ---
  {
    id: 'prod-013',
    title: 'Breville Barista Touch Espresso Machine with Touch Screen (Brushed Stainless)',
    brand: 'Breville',
    category: 'home',
    price: 999.95,
    originalPrice: 1199.95,
    discountPercentage: 17,
    rating: 4.5,
    reviewCount: 5120,
    isPrime: true,
    isBestSeller: false,
    isAmazonChoice: true,
    inStock: true,
    stockCount: 9,
    deliveryDays: 2,
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Commercial performance made easy. Touch screen display simplifies how to make your favorite cafe coffee in 3 easy steps - Grind, Brew and Milk.',
    features: [
      'Automated touchscreen menu with 5 pre-programmed cafe favorites',
      'ThermoJet heating system reaches optimal temperature in 3 seconds',
      'Automatic microfoam milk texturing with hands-free wand',
      'Integrated conical burr grinder with 30 precise grind settings'
    ],
    specs: {
      'Water Tank': '67 fl oz (2L)',
      'Heating System': 'ThermoJet (3 second heat up)',
      'Grinder': 'Stainless Steel Conical Burrs',
      'Pressure': '15 Bar Italian Pump'
    },
    variants: [
      { id: 'var-013-ss', type: 'color', label: 'Stainless Steel', value: '#D1D5DB', priceModifier: 0.00 },
      { id: 'var-013-bt', type: 'color', label: 'Black Truffle', value: '#1F2937', priceModifier: 50.00 }
    ],
    aiReviewDigest: {
      verdict: 'Brings authentic third-wave specialty cafe espresso home with zero barista learning curve.',
      pros: [
        'Ready in 3 seconds flat with instant ThermoJet technology',
        'Silky microfoam milk texture automatically steamed to temperature',
        'Custom coffee profile saving for household members'
      ],
      cons: [
        'Requires regular weekly cleaning cycle routine',
        'Premium price investment for home kitchen counter'
      ],
      bestFor: 'Coffee aficionados, latte art enthusiasts, and busy morning professionals.'
    }
  },
  {
    id: 'prod-014',
    title: 'Dyson V15 Detect Cordless Vacuum Cleaner with Laser Reveal',
    brand: 'Dyson',
    category: 'home',
    price: 649.99,
    originalPrice: 749.99,
    discountPercentage: 13,
    rating: 4.6,
    reviewCount: 9280,
    isPrime: true,
    isBestSeller: true,
    isAmazonChoice: true,
    inStock: true,
    stockCount: 30,
    deliveryDays: 1,
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered with the power, intelligence, versatility, and run time to deeply clean your whole home. Fluffy Optic cleaner head reveals invisible dust on hard floors.',
    features: [
      'Laser illuminates microscopic dust and dirt on hard floors',
      'Piezo sensor automatically senses particle sizes and adapts suction power',
      'LCD screen displays real-time scientific proof of a deep clean',
      'Up to 60 minutes of fade-free run time with click-in battery'
    ],
    specs: {
      'Suction Power': '240 AW (Air Watts)',
      'Bin Volume': '0.2 Gallons (0.76 L)',
      'Weight': '6.8 lbs (3.08 kg)',
      'Filtration': 'Whole-machine HEPA captures 99.99% particles'
    },
    variants: [
      { id: 'var-014-ylw', type: 'color', label: 'Yellow/Nickel', value: '#FACC15', priceModifier: 0.00 }
    ],
    aiReviewDigest: {
      verdict: 'The most intelligent and powerful cordless vacuum on the market; the green laser makes dirt impossible to miss.',
      pros: [
        'Laser head reveals pet dander and dust invisible to the naked eye',
        'Auto-suction power scaling dramatically optimizes battery life',
        'Hair screw tool detangles long pet hair without roller jams'
      ],
      cons: [
        'Trigger must be held down continuously on this model',
        'Small dust bin requires frequent emptying in large homes'
      ],
      bestFor: 'Pet owners, allergy sufferers, and hardwood floor homes.'
    }
  },
  {
    id: 'prod-015',
    title: 'Ninja AF101 Air Fryer that Crisps, Roasts, Reheats, & Dehydrates (4 Quart)',
    brand: 'Ninja',
    category: 'home',
    price: 89.99,
    originalPrice: 129.99,
    discountPercentage: 31,
    rating: 4.8,
    reviewCount: 68400,
    isPrime: true,
    isBestSeller: true,
    isAmazonChoice: true,
    inStock: true,
    stockCount: 110,
    deliveryDays: 1,
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Enjoy guilt-free food with up to 75% less fat than traditional frying methods. 4-quart ceramic-coated basket fits 2 lbs of French fries.',
    features: [
      'Wide temperature range: 105°F to 400°F allows gentle dehydration or quick crisping',
      '4-in-1 programmable versatility: Air Fry, Air Roast, Reheat, and Dehydrate',
      'Dishwasher-safe nonstick ceramic-coated basket and crisper plate',
      'Compact footprint fits easily underneath standard kitchen cabinets'
    ],
    specs: {
      'Capacity': '4 Quarts (fits 2 lbs fries)',
      'Temperature Range': '105°F - 400°F',
      'Wattage': '1500 Watts',
      'Dishwasher Safe': 'Basket and crisper plate'
    },
    variants: [
      { id: 'var-015-gry', type: 'color', label: 'Grey/Black', value: '#374151', priceModifier: 0.00 }
    ],
    aiReviewDigest: {
      verdict: 'The best-value kitchen appliance of the decade; reheats leftovers to restaurant crispiness in 4 minutes.',
      pros: [
        'Ceramic nonstick coating washes clean in 20 seconds',
        'Consistent heat circulation crisps without requiring oil',
        'Replaces toaster oven for 90% of weekday meals'
      ],
      cons: [
        '4-quart capacity is best for 1-2 people; large families need dual-zone',
        'Initial unboxing requires a 15-minute dry burn cycle'
      ],
      bestFor: 'Busy professionals, college students, meal preppers, and small households.'
    }
  },

  // --- BOOKS & KINDLE ---
  {
    id: 'prod-016',
    title: 'Kindle Paperwhite (16 GB) – Now with 6.8\" display and adjustable warm light',
    brand: 'Amazon',
    category: 'books',
    price: 149.99,
    originalPrice: 169.99,
    discountPercentage: 12,
    rating: 4.7,
    reviewCount: 38100,
    isPrime: true,
    isBestSeller: true,
    isAmazonChoice: true,
    inStock: true,
    stockCount: 120,
    deliveryDays: 1,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Now with a 6.8” display, thinner borders, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns.',
    features: [
      'Glare-free 300 ppi display that reads like real paper even in bright sunlight',
      'Adjustable warm light to shift screen shade from white to amber',
      'Waterproof (IPX8) for peace of mind at the beach or in the bath',
      'A single USB-C charge lasts up to 10 weeks'
    ],
    specs: {
      'Display': '6.8-inch Paperwhite E-Ink (300 ppi)',
      'Battery Life': 'Up to 10 Weeks',
      'Storage': '16 GB (thousands of books)',
      'Waterproof': 'IPX8 (2m fresh water for 60 min)',
      'Weight': '205g'
    },
    variants: [
      { id: 'var-016-blk', type: 'color', label: 'Black', value: '#000000', priceModifier: 0.00 },
      { id: 'var-016-dgn', type: 'color', label: 'Agave Green', value: '#6B8E7D', priceModifier: 10.00 },
      { id: 'var-016-blu', type: 'color', label: 'Denim', value: '#3B5998', priceModifier: 10.00 }
    ],
    aiReviewDigest: {
      verdict: 'The undisputed gold standard for digital reading with unbeatable battery life and outdoor clarity.',
      pros: [
        'Warm backlight eliminates late-night eye fatigue',
        'Weeks of reading on a single USB-C charge',
        'IPX8 waterproofing makes poolside reading worry-free'
      ],
      cons: [
        'PDF navigation remains sluggish compared to iPads',
        'No cellular option on this model (Wi-Fi only)'
      ],
      bestFor: 'Avid book readers, travelers, and nighttime readers.'
    }
  },
  {
    id: 'prod-017',
    title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits by James Clear',
    brand: 'Penguin Publishing',
    category: 'books',
    price: 13.79,
    originalPrice: 27.00,
    discountPercentage: 49,
    rating: 4.8,
    reviewCount: 125000,
    isPrime: true,
    isBestSeller: true,
    isAmazonChoice: false,
    inStock: true,
    stockCount: 300,
    deliveryDays: 1,
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The #1 New York Times bestseller. Over 15 million copies sold. A supremely practical framework to master tiny behaviors that lead to remarkable results.',
    features: [
      'Learn the 4 Laws of Behavior Change: Make it Obvious, Attractive, Easy, and Satisfying',
      'Break bad habits and identify root causes',
      'Practical systems architecture for daily continuous self-improvement'
    ],
    specs: {
      'Format': 'Hardcover / Kindle / Audiobook',
      'Pages': '320 pages',
      'Publisher': 'Avery; 1st edition',
      'Language': 'English'
    },
    variants: [
      { id: 'var-017-hc', type: 'size', label: 'Hardcover', value: 'hardcover', priceModifier: 0.00 },
      { id: 'var-017-knd', type: 'size', label: 'Kindle Edition', value: 'kindle', priceModifier: -2.00 }
    ],
    aiReviewDigest: {
      verdict: 'One of the most actionable and transformative productivity books published in the modern era.',
      pros: [
        'Actionable 1% rule provides immediate behavioral psychology wins',
        'Zero academic jargon; filled with concrete real-world diagrams',
        'Explains why identity change precedes lasting habitual change'
      ],
      cons: [
        'Core concepts can feel repetitive in later chapters',
        'Highly focused on habit loops rather than macro career strategy'
      ],
      bestFor: 'Anyone seeking personal transformation, disciplined routines, or productivity gains.'
    }
  },

  // --- ELECTRONICS & CAMERAS ---
  {
    id: 'prod-018',
    title: 'Sony Alpha 7 IV Full-Frame Mirrorless Interchangeable Lens Camera',
    brand: 'Sony',
    category: 'electronics',
    price: 2298.00,
    originalPrice: 2499.99,
    discountPercentage: 8,
    rating: 4.7,
    reviewCount: 2950,
    isPrime: true,
    isBestSeller: false,
    isAmazonChoice: true,
    inStock: true,
    stockCount: 8,
    deliveryDays: 1,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'
    ],
    description: '33MP full-frame Exmor R back-illuminated CMOS sensor with BIONZ XR processing. 4K 60p 10-bit 4:2:2 video recording and real-time Eye AF for humans, animals, and birds.',
    features: [
      '33 Megapixel full-frame BSI sensor with 15 stops of dynamic range',
      'Flagship real-time tracking with 759 phase-detection AF points',
      '4K 60p recording in Super 35mm and 4K 30p full-frame oversampled from 7K',
      'Vari-angle side-opening LCD touchscreen for vlogging and photography'
    ],
    specs: {
      'Sensor': '33MP Full-Frame Exmor R CMOS',
      'Video': '4K 60p 10-bit 4:2:2 S-Cinetone',
      'Autofocus': '759 Phase-Detection Points (94% coverage)',
      'Stabilization': '5-Axis In-Body Image Stabilization (5.5 stops)'
    },
    variants: [
      { id: 'var-018-bdy', type: 'storage', label: 'Body Only', value: 'body', priceModifier: 0.00 },
      { id: 'var-018-kit', type: 'storage', label: 'With 28-70mm Lens', value: 'kit', priceModifier: 200.00 }
    ],
    aiReviewDigest: {
      verdict: 'The definitive hybrid creator camera, balancing pristine 33MP stills with cinematic 10-bit 4K video.',
      pros: [
        'Legendary Sony Real-Time Eye AF never loses subject tracking',
        '10-bit 4:2:2 internal recording with S-Cinetone color science',
        'Side-flipping articulated LCD screen fits any tripod rig'
      ],
      cons: [
        '4K 60p has a 1.5x Super35 crop factor',
        'Menu system takes an hour to fully configure'
      ],
      bestFor: 'Professional photographers, wedding filmmakers, and YouTube creators.'
    }
  },
  {
    id: 'prod-019',
    title: 'Apple iPad Air 11-inch (M2 Chip, 128GB, Liquid Retina, Wi-Fi 6E)',
    brand: 'Apple',
    category: 'electronics',
    price: 549.00,
    originalPrice: 599.00,
    discountPercentage: 8,
    rating: 4.8,
    reviewCount: 6420,
    isPrime: true,
    isBestSeller: true,
    isAmazonChoice: true,
    inStock: true,
    stockCount: 40,
    deliveryDays: 1,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Supercharged by the incredibly fast Apple M2 chip. 11-inch Liquid Retina display with P3 wide color, True Tone, and ultra-low reflectivity.',
    features: [
      'Apple M2 chip with 8-core CPU and 10-core GPU',
      'Landscape 12MP Ultra Wide front camera with Center Stage',
      'Supports Apple Pencil Pro and Magic Keyboard',
      'Fast Wi-Fi 6E connectivity and all-day battery life'
    ],
    specs: {
      'Processor': 'Apple M2 Chip',
      'Display': '11-inch Liquid Retina Display (2360 x 1640)',
      'Storage': '128GB NVMe',
      'Weight': '1.02 lbs (462g)'
    },
    variants: [
      { id: 'var-019-spg', type: 'color', label: 'Space Gray', value: '#6B7280', priceModifier: 0.00 },
      { id: 'var-019-blu', type: 'color', label: 'Blue', value: '#60A5FA', priceModifier: 0.00 },
      { id: 'var-019-pur', type: 'color', label: 'Purple', value: '#C084FC', priceModifier: 0.00 }
    ],
    aiReviewDigest: {
      verdict: 'The sweet spot in Apple tablet lineup; M2 desktop power in a featherlight, ultra-portable chassis.',
      pros: [
        'M2 chip breezes through 4K video editing and Procreate illustration',
        'Landscape front camera finally centers your video calls',
        'Compatibility with new Apple Pencil Pro haptic squeeze features'
      ],
      cons: [
        'Display is 60Hz rather than 120Hz ProMotion on iPad Pro',
        'Stage Manager still limited compared to macOS multitasking'
      ],
      bestFor: 'Digital artists, students taking digital notes, and media consumers.'
    }
  },
  {
    id: 'prod-020',
    title: 'DJI Mini 4 Pro Drone with RC 2 Controller (Under 249g, 4K/60fps HDR)',
    brand: 'DJI',
    category: 'electronics',
    price: 959.00,
    originalPrice: 1049.00,
    discountPercentage: 9,
    rating: 4.8,
    reviewCount: 3840,
    isPrime: true,
    isBestSeller: false,
    isAmazonChoice: true,
    inStock: true,
    stockCount: 15,
    deliveryDays: 1,
    images: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Ultra-lightweight under 249g foldable drone. Omnidirectional obstacle sensing, 4K/60fps HDR video, and 20km FHD video transmission.',
    features: [
      'Weighs less than 249g - exempt from FAA registration for recreational flight',
      'Omnidirectional Active Obstacle Sensing with APAS 5.0 safety',
      'True Vertical Shooting for social media reels without resolution loss',
      'DJI RC 2 Controller with built-in 5.5-inch 700-nit FHD screen'
    ],
    specs: {
      'Weight': '< 249 grams',
      'Max Flight Time': '34 Minutes (45 min with Plus Battery)',
      'Camera': '1/1.3" CMOS, 4K/60fps HDR, 48MP Stills',
      'Transmission': 'DJI O4 (up to 20 km range)'
    },
    variants: [
      { id: 'var-020-rc2', type: 'storage', label: 'With RC 2 Screen Controller', value: 'rc2', priceModifier: 0.00 }
    ],
    aiReviewDigest: {
      verdict: 'The best consumer drone ever engineered; professional omnidirectional obstacle avoidance in a pocketable sub-249g drone.',
      pros: [
        'Sub-249g weight avoids FAA registration hassle in many countries',
        'Full 360-degree obstacle sensors prevent tree and wall collisions',
        'Stunning 4K 60fps HDR video quality with D-Log M color profile'
      ],
      cons: [
        'Lightweight build gets blown around more in 25+ mph wind gusts',
        'Batteries take 90 minutes to charge without two-way hub'
      ],
      bestFor: 'Travel vloggers, hikers, landscape photographers, and beginner drone pilots.'
    }
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Departments' },
  { id: 'audio', label: 'Headphones & Audio' },
  { id: 'computers', label: 'Computers & Accessories' },
  { id: 'gaming', label: 'Video Games & Consoles' },
  { id: 'home', label: 'Home & Kitchen' },
  { id: 'books', label: 'Kindle & Books' },
  { id: 'electronics', label: 'Cameras & Electronics' }
];
