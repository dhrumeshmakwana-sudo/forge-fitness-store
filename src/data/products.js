// FORGE product catalogue — all data is local (frontend-only demo, no backend).
// Prices are in INR. `mrp` is the struck-through price used for discount %.

const img = (id) => `https://images.unsplash.com/${id}?q=80&w=900&auto=format&fit=crop`;

export const CATEGORIES = [
  { name: 'Whey Protein', slug: 'whey-protein', blurb: 'Build lean muscle', image: img('photo-1593095948071-474c5cc2989d') },
  { name: 'Pre-Workout', slug: 'pre-workout', blurb: 'Energy & focus', image: img('photo-1571019613454-1cb2f99b2d8b') },
  { name: 'Creatine', slug: 'creatine', blurb: 'Strength & power', image: img('photo-1594882645126-14020914d58d') },
  { name: 'Vitamins', slug: 'vitamins', blurb: 'Daily wellness', image: img('photo-1471864190281-a93a3070b6de') },
  { name: 'Gear', slug: 'gear', blurb: 'Train pro-grade', image: img('photo-1517836357463-d25dfeac3438') },
];

export const PRODUCTS = [
  // ——— Whey Protein ———
  {
    id: 'whey-gold-1kg',
    name: 'Gold Standard 100% Whey — Double Rich Chocolate, 1 kg',
    brand: 'Optimum Nutrition',
    category: 'Whey Protein',
    price: 3199, mrp: 3899,
    rating: 4.7, reviews: 12843,
    image: img('photo-1593095948071-474c5cc2989d'),
    badge: 'Bestseller',
    inStock: true,
    description:
      '24 g of premium whey protein per scoop with 5.5 g BCAAs and 11 g EAAs. Instantised for easy mixing, lab-tested for purity and banned-substance screened. The world\'s best-selling whey, trusted by lifters across India.',
  },
  {
    id: 'whey-isolate-900',
    name: 'ISO-XP Whey Isolate — Vanilla, 900 g (Zero Sugar)',
    brand: 'Applied Nutrition',
    category: 'Whey Protein',
    price: 3799, mrp: 4599,
    rating: 4.6, reviews: 3211,
    image: img('photo-1579722821273-0f6c7d44362f'),
    badge: 'New',
    inStock: true,
    description:
      'Ultra-filtered whey isolate delivering 25 g protein with near-zero fat and lactose per serving. Ideal for lean-muscle goals and sensitive stomachs. Mixes clear and light — no bloating, no heaviness.',
  },
  {
    id: 'whey-impact-1kg',
    name: 'Impact Whey Protein — Kulfi, 1 kg',
    brand: 'Myprotein',
    category: 'Whey Protein',
    price: 2499, mrp: 3299,
    rating: 4.5, reviews: 8930,
    image: img('photo-1626200419199-391ae4be7a41'),
    badge: null,
    inStock: true,
    description:
      '23 g protein per serving in a limited-edition Kulfi flavour made for Indian taste buds. Great value everyday whey for post-workout recovery, with a full amino profile and Informed Choice certification.',
  },
  {
    id: 'whey-plant-500',
    name: 'Plant Protein — Pea + Brown Rice, Mocha, 500 g',
    brand: 'Cosmix',
    category: 'Whey Protein',
    price: 1199, mrp: 1499,
    rating: 4.3, reviews: 1547,
    image: img('photo-1610725664285-7c57e6eeac3f'),
    badge: null,
    inStock: true,
    description:
      'A complete vegan protein blend with 24 g protein per serving, added digestive enzymes and zero added sugar. Smooth, non-gritty texture — proof plant protein can actually taste good.',
  },
  {
    id: 'whey-mass-3kg',
    name: 'Serious Mass Gainer — Chocolate, 3 kg',
    brand: 'Optimum Nutrition',
    category: 'Whey Protein',
    price: 4299, mrp: 5199,
    rating: 4.4, reviews: 5620,
    image: img('photo-1594381898411-846e7d193883'),
    badge: null,
    inStock: false,
    description:
      '1,250 kcal and 50 g protein per serving with 252 g carbs, creatine and 25 vitamins & minerals. Built for hardgainers who struggle to eat enough to grow. Restock expected soon.',
  },
  // ——— Pre-Workout ———
  {
    id: 'pre-ignite-300',
    name: 'IGNITE Pre-Workout — Blue Raspberry, 300 g (30 servings)',
    brand: 'FORGE Labs',
    category: 'Pre-Workout',
    price: 1499, mrp: 1999,
    rating: 4.6, reviews: 4210,
    image: img('photo-1571019613454-1cb2f99b2d8b'),
    badge: 'Bestseller',
    inStock: true,
    description:
      '200 mg caffeine, 3.2 g beta-alanine and 6 g citrulline per scoop for skin-splitting pumps, laser focus and zero crash. Our own in-house formula — dosed like the label says, nothing hidden in proprietary blends.',
  },
  {
    id: 'pre-c4-30',
    name: 'C4 Original Pre-Workout — Fruit Punch, 30 servings',
    brand: 'Cellucor',
    category: 'Pre-Workout',
    price: 2199, mrp: 2799,
    rating: 4.5, reviews: 6102,
    image: img('photo-1546483875-ad9014c88eba'),
    badge: null,
    inStock: true,
    description:
      'America\'s #1 pre-workout with 150 mg caffeine, CarnoSyn beta-alanine and creatine nitrate. Explosive energy for early-morning sessions without the jitters. Great first pre-workout.',
  },
  {
    id: 'pre-pump-250',
    name: 'PULSE Stim-Free Pump — Watermelon, 250 g',
    brand: 'FORGE Labs',
    category: 'Pre-Workout',
    price: 1299, mrp: 1699,
    rating: 4.4, reviews: 986,
    image: img('photo-1518611012118-696072aa579a'),
    badge: 'New',
    inStock: true,
    description:
      'All pump, no stimulants. 8 g L-citrulline, glycerol and pink salt for late-night training that won\'t wreck your sleep. Stack it with IGNITE on heavy days.',
  },
  {
    id: 'pre-beta-alanine',
    name: 'Beta-Alanine Pure — Unflavoured, 200 g (62 servings)',
    brand: 'Nutrabay',
    category: 'Pre-Workout',
    price: 699, mrp: 999,
    rating: 4.3, reviews: 2210,
    image: img('photo-1599058917212-d750089bc07e'),
    badge: null,
    inStock: true,
    description:
      '100% pure beta-alanine, nothing else. Buffers lactic acid so your last reps feel like your first. Expect the famous harmless tingles — that means it\'s working.',
  },
  // ——— Creatine ———
  {
    id: 'creatine-mono-300',
    name: 'Creatine Monohydrate — Micronised, Unflavoured, 300 g',
    brand: 'FORGE Labs',
    category: 'Creatine',
    price: 899, mrp: 1299,
    rating: 4.8, reviews: 15230,
    image: img('photo-1594882645126-14020914d58d'),
    badge: 'Bestseller',
    inStock: true,
    description:
      'The most researched supplement in sports science. 3 g of 200-mesh micronised creatine monohydrate per serving — dissolves instantly, zero taste, zero bloating. 100 servings of pure strength.',
  },
  {
    id: 'creatine-creapure-250',
    name: 'Creapure Creatine — German-grade, 250 g',
    brand: 'MuscleBlaze',
    category: 'Creatine',
    price: 1099, mrp: 1449,
    rating: 4.6, reviews: 7845,
    image: img('photo-1571019614242-c5c5dee9f50b'),
    badge: null,
    inStock: true,
    description:
      'Made with Creapure — the purest creatine monohydrate in the world, 99.99% pure and HPLC tested. Labdoor USA certified. For lifters who want the gold standard and nothing less.',
  },
  {
    id: 'creatine-hcl-120',
    name: 'Creatine HCL Capsules — 120 caps (No Loading)',
    brand: 'GNC',
    category: 'Creatine',
    price: 1399, mrp: 1899,
    rating: 4.4, reviews: 1890,
    image: img('photo-1607619056574-7b8d3ee536b2'),
    badge: null,
    inStock: true,
    description:
      'Creatine hydrochloride in convenient capsules — superior solubility, no loading phase, no water retention bloat. Perfect for travel and for anyone who hates mixing powders.',
  },
  // ——— Vitamins ———
  {
    id: 'vit-multi-60',
    name: 'Daily Multivitamin — 60 Tablets (23 Vitamins & Minerals)',
    brand: 'FORGE Labs',
    category: 'Vitamins',
    price: 599, mrp: 899,
    rating: 4.5, reviews: 9312,
    image: img('photo-1471864190281-a93a3070b6de'),
    badge: 'Bestseller',
    inStock: true,
    description:
      'A complete A-to-zinc formula tuned for active Indians — including the vitamin D3 and B12 that most Indian diets lack. One tablet with breakfast covers your micronutrient bases so training never stalls.',
  },
  {
    id: 'vit-omega3-90',
    name: 'Omega-3 Fish Oil — 1000 mg, 90 Softgels (EPA 360 / DHA 240)',
    brand: 'Nutrabay',
    category: 'Vitamins',
    price: 749, mrp: 1099,
    rating: 4.6, reviews: 6540,
    image: img('photo-1584308666744-24d5c474f2ae'),
    badge: null,
    inStock: true,
    description:
      'Triple-strength fish oil for joint support, heart health and faster recovery between sessions. Mercury-tested, no fishy burps — enteric coated so it digests where it should.',
  },
  {
    id: 'vit-d3-60',
    name: 'Vitamin D3 60000 IU — Weekly, 8 Softgels + K2',
    brand: 'Carbamide Forte',
    category: 'Vitamins',
    price: 349, mrp: 550,
    rating: 4.4, reviews: 3120,
    image: img('photo-1550572017-edd951b55104'),
    badge: null,
    inStock: true,
    description:
      'High-dose weekly D3 with vitamin K2 for bone strength, immunity and healthy testosterone support. Over 80% of urban Indians are D-deficient — this is the cheapest fix in fitness.',
  },
  {
    id: 'vit-zma-90',
    name: 'ZMA Night Recovery — Zinc, Magnesium & B6, 90 Caps',
    brand: 'FORGE Labs',
    category: 'Vitamins',
    price: 849, mrp: 1199,
    rating: 4.5, reviews: 2764,
    image: img('photo-1512069772995-ec65ed45afd6'),
    badge: 'New',
    inStock: true,
    description:
      'The classic night-time recovery stack. Magnesium glycinate for deeper sleep, zinc for hormone health and B6 for absorption. Wake up ready to train again.',
  },
  {
    id: 'vit-electrolyte-30',
    name: 'Hydrate Electrolytes — Orange, 30 Sachets (Zero Sugar)',
    brand: 'Fast&Up',
    category: 'Vitamins',
    price: 499, mrp: 690,
    rating: 4.3, reviews: 1980,
    image: img('photo-1556679343-c7306c1976bc'),
    badge: null,
    inStock: true,
    description:
      'Sodium, potassium and magnesium in the ratios you actually sweat out — plus vitamin C. Drop a sachet in your shaker for long sessions, runs and brutal Indian summer workouts.',
  },
  // ——— Gear ———
  {
    id: 'gear-belt-10mm',
    name: 'Lever Lifting Belt — 10 mm Genuine Leather, Black',
    brand: 'FORGE Gear',
    category: 'Gear',
    price: 2499, mrp: 3499,
    rating: 4.7, reviews: 3415,
    image: img('photo-1517836357463-d25dfeac3438'),
    badge: 'Bestseller',
    inStock: true,
    description:
      'Competition-grade 10 mm leather belt with a quick-release lever buckle. Serious intra-abdominal pressure for squats and deadlifts — the last belt you\'ll ever buy. Sizes S–XL.',
  },
  {
    id: 'gear-gloves-pro',
    name: 'Pro Training Gloves — Wrist Wrap Support, Half Finger',
    brand: 'FORGE Gear',
    category: 'Gear',
    price: 799, mrp: 1299,
    rating: 4.4, reviews: 5230,
    image: img('photo-1584735935682-2f2b69dff9d2'),
    badge: null,
    inStock: true,
    description:
      'Padded leather palm with silicone grip and an integrated 18-inch wrist wrap. No more torn calluses or slipping bars. Breathable mesh back keeps your hands cool.',
  },
  {
    id: 'gear-bands-set',
    name: 'Resistance Bands Set of 5 — 10 to 50 lbs, with Handles & Bag',
    brand: 'FORGE Gear',
    category: 'Gear',
    price: 999, mrp: 1799,
    rating: 4.5, reviews: 8740,
    image: img('photo-1598289431512-b97b0917affc'),
    badge: null,
    inStock: true,
    description:
      'Five stackable latex tubes with handles, ankle straps and a door anchor — a full gym in a carry bag. Perfect for home workouts, warm-ups and travel training.',
  },
  {
    id: 'gear-shaker-steel',
    name: 'Steel Shaker Bottle — Insulated, 750 ml, Matte Black',
    brand: 'FORGE Gear',
    category: 'Gear',
    price: 649, mrp: 999,
    rating: 4.6, reviews: 11230,
    image: img('photo-1602143407151-7111542de6e8'),
    badge: null,
    inStock: true,
    description:
      'Double-wall stainless steel keeps your shake cold for 12 hours and never smells like last week\'s whey. Leak-proof flip cap, steel mixing ball, laser-etched FORGE logo.',
  },
  {
    id: 'gear-bag-duffel',
    name: 'Duffel Gym Bag 35L — Shoe Garage & Wet Pocket, Olive',
    brand: 'FORGE Gear',
    category: 'Gear',
    price: 1799, mrp: 2699,
    rating: 4.6, reviews: 4310,
    image: img('photo-1553062407-98eeb64c6a62'),
    badge: 'New',
    inStock: true,
    description:
      'Water-repellent 900D fabric, a ventilated shoe garage, separate wet pocket and a padded laptop sleeve. Fits a belt, bands, shaker and a change of clothes with room to spare.',
  },
  {
    id: 'gear-straps-cotton',
    name: 'Lifting Straps — Heavy-Duty Cotton, Padded Wrist',
    brand: 'FORGE Gear',
    category: 'Gear',
    price: 449, mrp: 699,
    rating: 4.5, reviews: 3980,
    image: img('photo-1526506118085-60ce8714f8c5'),
    badge: null,
    inStock: true,
    description:
      'Stop letting your grip fail before your back does. 21-inch heavy-duty cotton straps with neoprene wrist padding for deadlifts, rows and shrugs.',
  },
  {
    id: 'gear-sleeves-7mm',
    name: 'Knee Sleeves 7 mm — Neoprene, Pair (Competition Legal)',
    brand: 'FORGE Gear',
    category: 'Gear',
    price: 1599, mrp: 2299,
    rating: 4.7, reviews: 2145,
    image: img('photo-1571731956672-f2b94d7dd0cb'),
    badge: null,
    inStock: true,
    description:
      '7 mm neoprene compression for warm, stable knees under heavy squats. Contoured fit that doesn\'t slide down mid-set. Approved for raw powerlifting competition.',
  },
  {
    id: 'gear-roller-45',
    name: 'Foam Roller — High-Density EPP, 45 cm',
    brand: 'FORGE Gear',
    category: 'Gear',
    price: 899, mrp: 1399,
    rating: 4.4, reviews: 1670,
    image: img('photo-1600881333168-2ef49b341f30'),
    badge: null,
    inStock: false,
    description:
      'Firm high-density roller for deep-tissue recovery — quads, back, calves and IT band. Ten minutes a day and your mobility (and your squat depth) will thank you.',
  },
];

export const PROMO_CODES = {
  FORGE10: 0.10,
  FIRSTBUY: 0.15,
};

export const formatINR = (n) =>
  '₹' + Number(n).toLocaleString('en-IN', { maximumFractionDigits: 0 });

export const discountPct = (p) => Math.round(((p.mrp - p.price) / p.mrp) * 100);
