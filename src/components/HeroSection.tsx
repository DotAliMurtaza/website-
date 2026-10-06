import React from 'react';
import { ArrowRight, MessageCircle, Scissors, MapPin, ShieldCheck } from 'lucide-react';
import { BRAND_INFO, createWhatsAppUrl } from '@/src/data/brandInfo';
import heroImage from '@/src/assets/images/logo.png';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-18 pb-10 sm:pt-24 sm:pb-16 md:pt-32 md:pb-20 overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-6 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#EADDCB]/40 dark:bg-[#D4AF37]/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-[#E2D4C3]/30 dark:bg-[#C5A880]/5 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (Content & CTAs) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Origin Line */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#9E7F55] dark:text-[#D4AF37] mb-2 sm:mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>Rawalpindi, Pakistan</span>
              <span aria-hidden="true">·</span>
              <span>Boutique Atelier</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#1C1917] dark:text-[#F5F2EB] leading-[1.12] mb-3 sm:mb-5">
              Exquisite Ladies <br className="hidden sm:inline" />
              <span className="italic font-normal">Unstitched Fabrics</span> <br />
              &amp; Master Stitching.
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-base text-[#665F57] dark:text-[#A8A196] max-w-xl font-normal leading-relaxed mb-6">
              Welcome to <strong className="text-[#1C1917] dark:text-[#F5F2EB] font-medium">{BRAND_INFO.name}</strong>. We curate premium ladies 
              unstitched lawn, festive chiffon, breathable cotton, and rich winter khaddar — paired with bespoke 
              master tailoring according to your exact specifications.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-6 sm:mb-8 w-full sm:w-auto">
              <a
                href="#collection"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 sm:px-7 rounded-full text-xs sm:text-sm font-semibold text-white dark:text-[#1C1917] bg-[#1C1917] dark:bg-[#C5A880] hover:bg-[#2C2723] dark:hover:bg-[#d5b990] active:scale-95 transition-all shadow-sm"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#stitching"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 sm:px-6 rounded-full text-xs sm:text-sm font-semibold text-[#1C1917] dark:text-[#F5F2EB] bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15 border border-[#E2DAD0] dark:border-white/15 active:scale-95 transition-all shadow-2xs"
              >
                <Scissors className="w-3.5 h-3.5 text-[#9E7F55] dark:text-[#D4AF37]" />
                <span>Stitching Services</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 sm:pt-6 border-t border-[#E2DAD0]/80 dark:border-white/10 w-full grid grid-cols-3 gap-2 sm:gap-4 text-left">
              <div>
                <span className="block font-serif text-xs sm:text-lg font-semibold text-[#1C1917] dark:text-[#F5F2EB]">Pure Fabrics</span>
                <span className="text-[10px] sm:text-xs text-[#665F57] dark:text-[#A8A196]">Lawn &amp; Chiffon</span>
              </div>
              <div>
                <span className="block font-serif text-xs sm:text-lg font-semibold text-[#1C1917] dark:text-[#F5F2EB]">Master Tailoring</span>
                <span className="text-[10px] sm:text-xs text-[#665F57] dark:text-[#A8A196]">Custom Fit</span>
              </div>
              <div>
                <span className="block font-serif text-xs sm:text-lg font-semibold text-[#1C1917] dark:text-[#F5F2EB]">Doorstep Dispatch</span>
                <span className="text-[10px] sm:text-xs text-[#665F57] dark:text-[#A8A196]">Rawalpindi &amp; PK</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-white/80 dark:border-white/10 aspect-[4/3] sm:aspect-[4/5] bg-[#EAE4DC] dark:bg-[#1A1815]">
                <img
                  src={heroImage}
                  alt="Ismail Clothing Center - Ladies Luxury Suit"
                  className="w-full h-full object-cover object-top"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-white/90 dark:bg-[#161412]/90 backdrop-blur-md border border-white/90 dark:border-white/10 flex items-center justify-between shadow-sm">
                  <div className="truncate pr-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#9E7F55] dark:text-[#D4AF37] font-bold block">
                      Featured Collection
                    </span>
                    <span className="text-xs sm:text-sm font-serif font-medium text-[#1C1917] dark:text-[#F5F2EB] truncate block">
                      3-Piece Luxury Festive Lawn
                    </span>
                  </div>
                  <a
                    href="#collection"
                    className="p-2 rounded-xl bg-[#1C1917] dark:bg-[#C5A880] text-white dark:text-[#1C1917] shrink-0"
                    aria-label="View collection"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Desktop Floating Badges */}
              <div className="hidden sm:flex absolute -top-3 -right-3 p-3 rounded-2xl bg-white/90 dark:bg-[#1A1715]/90 backdrop-blur-md border border-white dark:border-white/15 shadow-md items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] dark:bg-white/10 border border-[#E2DAD0] dark:border-white/10 flex items-center justify-center text-[#9E7F55] dark:text-[#D4AF37]">
                  <Scissors className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#1C1917] dark:text-[#F5F2EB] block">Bespoke Stitching</span>
                  <span className="text-[10px] text-[#665F57] dark:text-[#A8A196] block">Custom fitting</span>
                </div>
              </div>

              <div className="hidden sm:flex absolute -bottom-4 -left-4 p-3 rounded-2xl bg-white/90 dark:bg-[#1A1715]/90 backdrop-blur-md border border-white dark:border-white/15 shadow-md items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] dark:bg-white/10 border border-[#E2DAD0] dark:border-white/10 flex items-center justify-center text-[#25D366]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#1C1917] dark:text-[#F5F2EB] block">Pure Fabrics</span>
                  <span className="text-[10px] text-[#665F57] dark:text-[#A8A196] block">Guaranteed quality</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
