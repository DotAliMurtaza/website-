import React from 'react';
import { MapPin, Sparkles, HeartHandshake, Scissors } from 'lucide-react';
import { BRAND_INFO, createWhatsAppUrl } from '@/src/data/brandInfo';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-12 sm:py-16 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Glass Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white/85 dark:bg-[#181614]/90 backdrop-blur-xl border border-[#E2DAD0]/90 dark:border-white/10 shadow-sm relative">
          
          <div className="flex flex-col items-center text-center">
            
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#9E7F55] dark:text-[#D4AF37] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Us</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#1C1917] dark:text-[#F5F2EB] tracking-tight mb-3">
              Ismail Clothing Center
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-[#665F57] dark:text-[#A8A196] leading-relaxed mb-6 max-w-2xl text-center">
              <p>
                Based in <strong className="text-[#1C1917] dark:text-[#F5F2EB]">Rawalpindi, Pakistan</strong>, 
                <strong className="text-[#1C1917] dark:text-[#F5F2EB]"> Ismail Clothing Center</strong> is a specialized boutique dedicated exclusively to ladies unstitched fashion and bespoke tailoring.
              </p>
              
              <p>
                We curate genuine premium ladies fabrics — including lawn, crinkle chiffon, cambric cotton, and warm textured winter khaddar — alongside expert custom stitching by experienced craftspeople according to your exact specifications.
              </p>
            </div>

            {/* 3 Badges */}
            <div className="grid grid-cols-3 gap-3 w-full pt-6 border-t border-[#E2DAD0]/60 dark:border-white/10 text-center mb-6">
              <div className="p-3 sm:p-4 rounded-2xl bg-[#FAF8F5] dark:bg-white/5 border border-[#E2DAD0]/60 dark:border-white/10">
                <MapPin className="w-4 h-4 text-[#9E7F55] dark:text-[#D4AF37] mx-auto mb-1.5" />
                <h3 className="font-serif text-xs sm:text-sm font-semibold text-[#1C1917] dark:text-[#F5F2EB]">Rawalpindi</h3>
                <span className="text-[10px] text-[#8C847A]">Shop Location</span>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-[#FAF8F5] dark:bg-white/5 border border-[#E2DAD0]/60 dark:border-white/10">
                <Scissors className="w-4 h-4 text-[#9E7F55] dark:text-[#D4AF37] mx-auto mb-1.5" />
                <h3 className="font-serif text-xs sm:text-sm font-semibold text-[#1C1917] dark:text-[#F5F2EB]">Master Tailor</h3>
                <span className="text-[10px] text-[#8C847A]">Custom Fit</span>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-[#FAF8F5] dark:bg-white/5 border border-[#E2DAD0]/60 dark:border-white/10">
                <HeartHandshake className="w-4 h-4 text-[#9E7F55] dark:text-[#D4AF37] mx-auto mb-1.5" />
                <h3 className="font-serif text-xs sm:text-sm font-semibold text-[#1C1917] dark:text-[#F5F2EB]">WhatsApp</h3>
                <span className="text-[10px] text-[#8C847A]">Direct Support</span>
              </div>
            </div>

            <a
              href={createWhatsAppUrl("Assalam o Alaikum, I would like to learn more about Ismail Clothing Center.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3 px-7 rounded-full text-xs sm:text-sm font-semibold text-white dark:text-[#1C1917] bg-[#1C1917] dark:bg-[#C5A880] hover:bg-[#2C2723] dark:hover:bg-[#d5b990] active:scale-95 transition-all shadow-xs"
            >
              <span>Chat on WhatsApp</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};
