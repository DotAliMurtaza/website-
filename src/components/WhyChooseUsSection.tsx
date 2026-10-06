import React from 'react';
import { Award, Scissors, Layers, Smile, Sparkles, ShieldCheck } from 'lucide-react';
import { BRAND_INFO } from '@/src/data/brandInfo';

export const WhyChooseUsSection: React.FC = () => {
  const points = [
    {
      icon: Award,
      title: 'Guaranteed Quality Ladies Fabrics',
      description: 'Authentic, colorfast, shrinkage-tested lawn, crinkle chiffon, cotton & khaddar.',
    },
    {
      icon: Scissors,
      title: 'Master Ladies Stitching',
      description: 'Specialized in ladies cuts: clean necklines, durable fusing, neat overlock & exact fittings.',
    },
    {
      icon: Layers,
      title: 'Seasonal Variety',
      description: 'Daily wear 2-pieces to heavy embroidered festive wedding suits and winter shawls.',
    },
    {
      icon: Smile,
      title: 'Customer Satisfaction',
      description: 'Video previews and fabric consultation via WhatsApp before dispatch.',
    },
    {
      icon: ShieldCheck,
      title: 'Rawalpindi Atelier Trust',
      description: 'Honest pricing, exact meter measurements, and prompt doorstep delivery.',
    },
  ];

  return (
    <section id="why-us" className="py-12 sm:py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#9E7F55] dark:text-[#D4AF37] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Standards</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-[#1C1917] dark:text-[#F5F2EB] tracking-tight mb-2 sm:mb-3">
            Why Choose Our Clothing Center
          </h2>

          <p className="text-xs sm:text-sm text-[#665F57] dark:text-[#A8A196] leading-relaxed">
            Dedicated exclusively to ladies unstitched suits and master tailoring in Rawalpindi.
          </p>
        </div>

        {/* Responsive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 mb-6">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/85 dark:bg-[#181614]/90 backdrop-blur-md border border-[#E2DAD0]/90 dark:border-white/10 shadow-2xs flex items-start gap-3.5 hover:border-[#C5A880] transition-colors"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#FAF8F5] dark:bg-white/10 border border-[#E2DAD0] dark:border-white/10 flex items-center justify-center text-[#9E7F55] dark:text-[#D4AF37] shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-sm sm:text-base font-semibold text-[#1C1917] dark:text-[#F5F2EB] mb-1">
                    {pt.title}
                  </h3>
                  <p className="text-xs text-[#665F57] dark:text-[#A8A196] leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stitching Only Banner */}
        <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1C1917] to-[#2E2822] dark:from-[#24201C] dark:to-[#171513] text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase tracking-wider text-[#C5A880] font-bold block mb-1">
              Have Your Own Fabric?
            </span>
            <h4 className="font-serif text-base sm:text-lg font-medium text-white mb-0.5">
              We stitch your own fabrics too!
            </h4>
            <p className="text-xs text-[#DFD8CC]">
              Drop off or courier your unstitched cloth to our Rawalpindi shop for master custom tailoring.
            </p>
          </div>

          <a
            href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent("Assalam o Alaikum, I have my own unstitched ladies fabric and want to get it stitched at Ismail Clothing Center Rawalpindi.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-5 rounded-full text-xs font-bold text-[#1C1917] bg-[#C5A880] hover:bg-[#D5B890] transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            Inquire via WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
