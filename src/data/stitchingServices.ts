import stitchingImg from '@/src/assets/images/stitching_craft_tailoring_1791187076748.jpg';

export interface StitchingServiceItem {
  id: string;
  title: string;
  urduTitle: string;
  category: string;
  description: string;
  features: string[];
  startingPrice: string;
  turnaround: string;
}

export const STITCHING_IMAGE = stitchingImg;

export const STITCHING_SERVICES: StitchingServiceItem[] = [
  {
    id: 'shalwar-kameez',
    title: 'Traditional Shalwar Kameez',
    urduTitle: 'شلوار قمیض',
    category: 'Classic Fit',
    description: 'Timeless ladies silhouette with options for classic pleated shalwar, patiala, or straight trouser paired with perfectly proportioned kameez.',
    features: [
      'Tailored shoulder and armhole drop',
      'Clean fusing neckline (Round, V-Slit, Ban Collar)',
      'Side chaak and daman reinforcement with matching piping',
      'Option for contrast thread or lace finishing'
    ],
    startingPrice: 'Rs. 1,200',
    turnaround: '4-6 Days'
  },
  {
    id: 'designer-shirts',
    title: 'Designer Shirts & Kurtis',
    urduTitle: 'ڈیزائنر شرٹ / کرتی',
    category: 'Contemporary Cuts',
    description: 'Modern straight cut, A-line, or relaxed silhouette kurtis with intricate lace application, organza extensions, and button work.',
    features: [
      'Organza border stitching and appliqué work',
      'Custom sleeve styles (Bell, Cuffed, Bishop, Straight)',
      'Delicate fabric buttons or loop closures',
      'Crisp iron press and internal overlock finish'
    ],
    startingPrice: 'Rs. 900',
    turnaround: '3-5 Days'
  },
  {
    id: 'trousers-pants',
    title: 'Trousers, Plazos & Tulip Shalwar',
    urduTitle: 'ٹراؤزر، پلازو اور ٹیولپ شلوار',
    category: 'Bottoms',
    description: 'Expertly drafted bottom wear ensuring maximum comfort, flattering drape, and neat bottom opening detailing.',
    features: [
      'Cigarette pants with side slit / pearl buttons',
      'Wide-leg flared plazos & culottes',
      'Trendy Tulip cut and Dhoti style shalwars',
      'Comfortable elastic waistband with drawstring or front belt'
    ],
    startingPrice: 'Rs. 600',
    turnaround: '2-4 Days'
  },
  {
    id: 'two-piece-suits',
    title: '2-Piece Suit Stitching',
    urduTitle: 'ٹو پیس سوٹ سلائی',
    category: 'Full Set',
    description: 'Complete coordination for shirt and trouser or shirt and shalwar with uniform finishing, matching piping, and overlock.',
    features: [
      'Coordinated piping and overlock seams',
      'Sleeve cuff and daman lace integration',
      'Exact length customization to customer height',
      'Fusing on neckline and hems for durable elegance'
    ],
    startingPrice: 'Rs. 1,600',
    turnaround: '4-7 Days'
  },
  {
    id: 'three-piece-suits',
    title: '3-Piece Suit Master Stitching',
    urduTitle: 'تھری پیس سوٹ ماسٹر سلائی',
    category: 'Full Set & Dupatta',
    description: 'Our signature complete service: Kameez, Trouser/Shalwar, and complete 4-sided Dupatta finishing with pico, kiran lace, or matching borders.',
    features: [
      'Complete suit with matching inner lining (Astar) if required',
      'Dupatta 4-side lace, kiran, or neat silk piping',
      'Intricate neck and daman embroidery placement',
      'Bespoke fitting guaranteed'
    ],
    startingPrice: 'Rs. 2,200',
    turnaround: '5-8 Days'
  },
  {
    id: 'custom-bespoke',
    title: 'Custom Requirements & Sample Replication',
    urduTitle: 'کسٹم ڈیزائن اور سیمپل فِٹنگ',
    category: 'Custom Atelier',
    description: 'Have a specific fashion magazine design, Pinterest photo, or your own favorite sample suit? Our master tailors replicate your exact fit.',
    features: [
      'Replication based on your physical sample suit in Rawalpindi',
      'Custom sizing measurements taken via WhatsApp or in person',
      'Party wear and formal suit delicate hand-tacking',
      'Alteration & fit perfection guarantee'
    ],
    startingPrice: 'Consultation',
    turnaround: 'Flexible'
  }
];

export const STITCHING_STEPS = [
  {
    step: '01',
    title: 'Select Fabric or Bring Your Own',
    description: 'Choose any unstitched suit from our collection or provide your own unstitched fabric.'
  },
  {
    step: '02',
    title: 'Share Measurements or Sample Suit',
    description: 'Pick standard sizing (XS to XXL), send your custom measurements, or provide your best-fitting sample suit.'
  },
  {
    step: '03',
    title: 'Master Tailoring & Finishing',
    description: 'Cut with precision by experienced ladies tailors in Rawalpindi with premium fusing, overlock, and detailing.'
  },
  {
    step: '04',
    title: 'Ready for Pickup or Delivery',
    description: 'Steamed, inspected, and packaged. Available for quick pickup in Rawalpindi or doorstep dispatch.'
  }
];
