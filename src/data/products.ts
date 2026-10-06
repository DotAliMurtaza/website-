import lawnSuitImg from '@/src/assets/images/aaa.png';
import chiffonSuitImg from '@/src/assets/images/bbb.png';
import cottonLinenImg from '@/src/assets/images/ccc.png';
import khaddarSuitImg from '@/src/assets/images/ddd.png';
import heroFashionImg from '@/src/assets/images/eee.png';

export interface Product {
  id: string;
  code: string;
  name: string;
  category: '3 Piece' | '2 Piece' | 'Lawn' | 'Chiffon' | 'Cotton' | 'Khaddar';
  collectionType: string; // e.g. "Luxury Lawn", "Festive Chiffon", "Everyday Cotton"
  price: number;
  originalPrice?: number;
  image: string;
  fabric: string;
  includes: string[];
  description: string;
  highlights: string[];
  inStock: boolean;
  featured?: boolean;
}

export const CATEGORIES = [
  'All',
  '3 Piece',
  '2 Piece',
  'Lawn',
  'Chiffon',
  'Cotton',
  'Khaddar',
] as const;

export type CategoryFilter = typeof CATEGORIES[number];

export const PRODUCTS: Product[] = [
  {
    id: 'icc-01',
    code: 'ICC-LN-101',
    name: 'Gul-e-Noor Embroidered Lawn 3-Piece',
    category: 'Lawn',
    collectionType: 'Luxury Lawn',
    price: 4850,
    originalPrice: 5500,
    image: lawnSuitImg,
    fabric: 'Fine 80/80 Airjet Pure Lawn',
    includes: [
      'Embroidered Digital Printed Lawn Shirt (3.0 Meters)',
      'Digital Printed Silk Chiffon Dupatta (2.5 Meters)',
      'Dyed Cambric Cotton Trouser with Lace Border (2.5 Meters)'
    ],
    description: 'An ethereal pastel mint and peach composition featuring fine threadwork embroidery along the neckline and borders. Paired with a featherweight printed chiffon dupatta.',
    highlights: ['Intricate neckline embroidery', 'Soft luxury lawn feel', 'Colorfast guarantee', 'Stitching available on request'],
    inStock: true,
    featured: true,
  },
  {
    id: 'icc-02',
    code: 'ICC-CH-202',
    name: 'Shahana Zari Chiffon Festive 3-Piece',
    category: 'Chiffon',
    collectionType: 'Festive Embroidered',
    price: 6950,
    originalPrice: 7800,
    image: chiffonSuitImg,
    fabric: 'Pure Organza & Crinkle Chiffon with Zari Tilla',
    includes: [
      'Heavy Embroidered Chiffon Front & Back (3.0 Meters)',
      'Embroidered Organza Dupatta with 4-Sided Scallop Border (2.5 Meters)',
      'Dyed Raw Silk Trouser with Embroidered Patches (2.5 Meters)'
    ],
    description: 'A regal dusty rose and champagne gold ensemble adorned with delicate zari, sequins, and micro-pearl motifs. Designed for weddings, festive evenings, and formal gatherings.',
    highlights: ['Hand-embellished zari work', '4-side scalloped border dupatta', 'Premium raw silk trouser', 'Master custom stitching available'],
    inStock: true,
    featured: true,
  },
  {
    id: 'icc-03',
    code: 'ICC-CT-303',
    name: 'Azure Bloom Summer Cotton Linen 2-Piece',
    category: 'Cotton',
    collectionType: 'Casual & Semi-Formal',
    price: 2950,
    originalPrice: 3400,
    image: cottonLinenImg,
    fabric: 'Breathable Cotton Linen Blend',
    includes: [
      'All-Over Floral Printed Cotton Linen Shirt (2.75 Meters)',
      'Dyed Dyed Cambric Straight Trouser (2.5 Meters)',
      'Bonus: Embroidered Neckline & Sleeves Lace Patch'
    ],
    description: 'Crisp indigo and ivory floral motifs on premium breathable cotton linen. Perfect for daily elegance, university, office, or comfortable summer wear.',
    highlights: ['Ultra-breathable weave', 'Shrink-resistant fabric', 'Includes lace embellishment', 'Quick turnaround stitching'],
    inStock: true,
    featured: false,
  },
  {
    id: 'icc-04',
    code: 'ICC-KH-404',
    name: 'Kashmiri Dastaan Textured Khaddar 3-Piece',
    category: 'Khaddar',
    collectionType: 'Winter Collection',
    price: 5450,
    originalPrice: 6200,
    image: khaddarSuitImg,
    fabric: 'Heavy Textured Yarn Khaddar with Wool Shawl',
    includes: [
      'Embroidered Textured Khaddar Shirt (3.0 Meters)',
      'Rich Jacquard Weave Warm Wool Shawl (2.5 Meters)',
      'Matching Solid Khaddar Trouser (2.5 Meters)'
    ],
    description: 'Warm forest emerald and ochre tones with traditional Kashmiri needlework embroidery on the front neckline and sleeves, accompanied by a soft, cozy woolen shawl.',
    highlights: ['Warm textured winter khaddar', 'Kashmiri heritage embroidery', 'Drapeable winter shawl', 'Custom stitching available'],
    inStock: true,
    featured: true,
  },
  {
    id: 'icc-05',
    code: 'ICC-LN-105',
    name: 'Mah-e-Nau Pastel Lawn 3-Piece',
    category: '3 Piece',
    collectionType: 'Luxury Lawn',
    price: 4650,
    originalPrice: 5200,
    image: heroFashionImg,
    fabric: 'Pure Lawn with Voile Dupatta',
    includes: [
      'Digital Printed Front & Back Lawn Shirt (3.0 Meters)',
      'Soft Voile Printed Dupatta with Pearl Edges (2.5 Meters)',
      'Dyed Cambric Trouser Fabric (2.5 Meters)'
    ],
    description: 'Exquisite blush pink with gold foil accents and delicate floral prints. Ideal for daytime gatherings, tea parties, and warm summer festivities.',
    highlights: ['Foil print accents', 'Featherlight voile dupatta', 'Comfortable lawn weave', 'Stitching available'],
    inStock: true,
    featured: true,
  },
  {
    id: 'icc-06',
    code: 'ICC-2P-106',
    name: 'Zeenat Everyday Cotton 2-Piece',
    category: '2 Piece',
    collectionType: 'Everyday Classic',
    price: 2650,
    originalPrice: 3100,
    image: cottonLinenImg,
    fabric: 'Soft Cotton Cambric',
    includes: [
      'Screen Printed Cotton Shirt Piece (2.5 Meters)',
      'Matching Printed / Plain Trouser Piece (2.25 Meters)'
    ],
    description: 'Timeless two-piece silhouette suited for modern kurtis, straight cut trousers, or classic short shirts. High color durability after washing.',
    highlights: ['Effortless daily wear', 'Machine washable', 'Tailored finish on demand'],
    inStock: true,
    featured: false,
  },
  {
    id: 'icc-07',
    code: 'ICC-CH-207',
    name: 'Mehtab Embroidered Chiffon 3-Piece',
    category: '3 Piece',
    collectionType: 'Festive Embroidered',
    price: 7200,
    originalPrice: 8200,
    image: chiffonSuitImg,
    fabric: 'Heavy Crinkle Chiffon with Resham & Mirror Work',
    includes: [
      'Resham & Zari Embroidered Chiffon Shirt (3.0 Meters)',
      'Heavy Embroidered Pallu Chiffon Dupatta (2.5 Meters)',
      'Dyed Raw Silk Fabric with Inner Lining included (3.5 Meters)'
    ],
    description: 'Subtle sage and silver tilla embroidery over luxury chiffon with matching inner lining fabric included. Crafted for evening celebrations.',
    highlights: ['Includes matching lining/astar', 'Intricate resham threadwork', 'Master stitching with piping'],
    inStock: true,
    featured: false,
  },
  {
    id: 'icc-08',
    code: 'ICC-KH-408',
    name: 'Kohsar Woven Khaddar 2-Piece',
    category: '2 Piece',
    collectionType: 'Winter Collection',
    price: 3350,
    originalPrice: 3800,
    image: khaddarSuitImg,
    fabric: 'Pure Handloom Style Khaddar',
    includes: [
      'Dyed & Embroidered Khaddar Kurti Length (2.5 Meters)',
      'Solid Khaddar Shalwar / Trouser Length (2.5 Meters)'
    ],
    description: 'Rich earth tones and rustic handloom texture. Perfect for a cozy Shalwar Kameez or comfortable winter Kurti set.',
    highlights: ['Natural cotton khaddar warmth', 'Clean minimal embroidery', 'Durable seasonal fabric'],
    inStock: true,
    featured: false,
  }
];
