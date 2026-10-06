import React, { useState } from 'react';
import { Scissors, CheckCircle, MessageCircle, Ruler, Sparkles, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { STITCHING_SERVICES, STITCHING_STEPS, STITCHING_IMAGE } from '@/src/data/stitchingServices';
import { BRAND_INFO, createWhatsAppUrl } from '@/src/data/brandInfo';

export const StitchingSection: React.FC = () => {
  const [selectedGarment, setSelectedGarment] = useState('3-Piece Suit (Kameez + Trouser + Dupatta finish)');
  const [selectedStyle, setSelectedStyle] = useState('Classic Straight Cut with Lace & Piping');
  const [sizingType, setSizingType] = useState('Standard Medium (M)');
  const [customNotes, setCustomNotes] = useState('');

  const garmentOptions = [
    '3-Piece Suit (Kameez + Trouser + Dupatta finish)',
    '2-Piece Suit (Shirt + Trouser / Shalwar)',
    'Traditional Shalwar Kameez',
    'Designer Kurti / Straight Shirt',
    'Trousers, Cigarette Pants or Tulip Shalwar',
    'Custom Ladies Design / Sample Replication'
  ];

  const styleOptions = [
    'Classic Straight Cut with Lace & Piping',
    'V-Neck with Organza Inserts & Sleeves Detailing',
    'Round Neck with Slit, Pearl Buttons & Chaak Piping',
    'A-Line Silhouette with Flared Daman & Cuff Sleeves',
    'Bespoke According to Sample Suit Provided'
  ];

  const sizingOptions = [
    'Standard Small (S)',
    'Standard Medium (M)',
    'Standard Large (L)',
    'Standard Extra Large (XL)',
    'Will Provide Sample Suit in Rawalpindi',
    'Have Custom Measurement Numbers'
  ];

  const handleSendStitchingWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    let message = `Assalam o Alaikum, I would like to inquire about bespoke stitching at ${BRAND_INFO.name}:\n`;
    message += `• Garment Type: ${selectedGarment}\n`;
    message += `• Preferred Style: ${selectedStyle}\n`;
    message += `• Sizing/Fitting: ${sizingType}\n`;
    if (customNotes.trim()) {
      message += `• Special Notes: ${customNotes.trim()}\n`;
    }
    message += `\nPlease let me know stitching rates, turnaround time, and delivery/pickup in Rawalpindi.`;

    window.open(createWhatsAppUrl(message), '_blank');
  };

  return (
    <section id="stitching" className="py-12 sm:py-16 md:py-20 bg-[#F5EFEB]/50 dark:bg-[#151311]/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#9E7F55] dark:text-[#D4AF37] mb-2">
            <Scissors className="w-3.5 h-3.5" />
            <span>Master Atelier</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-[#1C1917] dark:text-[#F5F2EB] tracking-tight mb-2 sm:mb-3">
            Bespoke Ladies Stitching
          </h2>

          <p className="text-xs sm:text-sm text-[#665F57] dark:text-[#A8A196] leading-relaxed">
            Our master tailors in Rawalpindi specialize exclusively in women's clothing — ensuring perfect fits, necklines, piping, and neat seams.
          </p>
        </div>

        {/* Top Showcase: Atelier Image & Interactive Stitching Assistant */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-10 sm:mb-14">
          {/* Atelier Image Showcase */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-md border border-white/80 dark:border-white/10 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] bg-[#EAE4DC] dark:bg-[#181614]">
            <img
              src={STITCHING_IMAGE}
              alt="Ladies stitching atelier"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-white/92 dark:bg-[#161412]/92 backdrop-blur-md border border-white/90 dark:border-white/10 flex items-center justify-between">
              <div className="truncate pr-2">
                <span className="text-[10px] uppercase tracking-wider text-[#9E7F55] dark:text-[#D4AF37] font-semibold block">
                  Finishing Guarantee
                </span>
                <span className="text-xs sm:text-sm font-serif text-[#1C1917] dark:text-[#F5F2EB] font-medium block truncate">
                  Interfacing, Overlock &amp; Piping Included
                </span>
              </div>
              <div className="w-8 h-8 rounded-xl bg-[#1C1917] dark:bg-[#C5A880] text-[#C5A880] dark:text-[#1C1917] flex items-center justify-center shrink-0">
                <Scissors className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Stitching Assistant Form */}
          <div className="lg:col-span-7 rounded-3xl bg-white/90 dark:bg-[#181614]/90 backdrop-blur-md border border-[#E2DAD0] dark:border-white/10 p-5 sm:p-7 shadow-sm">
            <div className="mb-4">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#9E7F55] dark:text-[#D4AF37] font-bold block mb-1">
                Quick Tailor Estimation
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                Custom Stitching Assistant
              </h3>
              <p className="text-xs text-[#665F57] dark:text-[#A8A196]">
                Select options and send a tailored inquiry directly to our tailor on WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSendStitchingWhatsApp} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#1C1917] dark:text-[#F5F2EB] mb-1">
                    Garment Type
                  </label>
                  <select
                    value={selectedGarment}
                    onChange={(e) => setSelectedGarment(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1815] border border-[#E2DAD0] dark:border-white/10 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none"
                  >
                    {garmentOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-white dark:bg-[#1A1815]">{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#1C1917] dark:text-[#F5F2EB] mb-1">
                    Finishing &amp; Neckline Style
                  </label>
                  <select
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1815] border border-[#E2DAD0] dark:border-white/10 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none"
                  >
                    {styleOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-white dark:bg-[#1A1815]">{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#1C1917] dark:text-[#F5F2EB] mb-1">
                  Measurements / Sizing
                </label>
                <select
                  value={sizingType}
                  onChange={(e) => setSizingType(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1815] border border-[#E2DAD0] dark:border-white/10 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none"
                >
                  {sizingOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-white dark:bg-[#1A1815]">{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#1C1917] dark:text-[#F5F2EB] mb-1">
                  Special Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kurti length 42 inches, lace on daman, loop buttons..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1815] border border-[#E2DAD0] dark:border-white/10 text-xs text-[#1C1917] dark:text-[#F5F2EB] placeholder-[#8C847A] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs sm:text-sm font-semibold text-white dark:text-[#1C1917] bg-[#1C1917] dark:bg-[#C5A880] hover:bg-[#2C2723] dark:hover:bg-[#d5b990] active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] dark:text-[#1C1917]" />
                <span>Send Stitching Request via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>

        {/* 6 Core Stitching Services Grid */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center justify-between mb-4 sm:mb-6 px-1">
            <h3 className="font-serif text-lg sm:text-2xl font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
              Stitching Services &amp; Starting Rates
            </h3>
            <span className="text-xs text-[#9E7F55] dark:text-[#D4AF37] font-medium hidden sm:inline">
              Rawalpindi Atelier
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {STITCHING_SERVICES.map((service) => (
              <div
                key={service.id}
                className="p-4 rounded-2xl sm:rounded-3xl bg-white/85 dark:bg-[#181614]/90 backdrop-blur-md border border-[#E2DAD0]/90 dark:border-white/10 shadow-2xs flex flex-col justify-between hover:border-[#C5A880] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#9E7F55] dark:text-[#D4AF37] font-semibold mb-1.5">
                    <span>{service.category}</span>
                    <span className="font-serif font-bold text-xs sm:text-sm text-[#1C1917] dark:text-[#F5F2EB]">{service.urduTitle}</span>
                  </div>

                  <h4 className="font-serif text-sm sm:text-base font-normal text-[#1C1917] dark:text-[#F5F2EB] mb-1.5">
                    {service.title}
                  </h4>

                  <p className="text-xs text-[#665F57] dark:text-[#A8A196] leading-relaxed mb-3">
                    {service.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#E2DAD0]/60 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8C847A] block">Starting from</span>
                    <span className="text-xs sm:text-sm font-semibold text-[#1C1917] dark:text-[#F5F2EB] font-serif">
                      {service.startingPrice}
                    </span>
                  </div>

                  <a
                    href={createWhatsAppUrl(`Assalam o Alaikum, I would like to inquire about stitching: ${service.title} (${service.urduTitle}) at Ismail Clothing Center.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold text-[#1C1917] dark:text-[#F5F2EB] bg-[#FAF8F5] dark:bg-white/10 border border-[#E2DAD0] dark:border-white/10 hover:border-[#C5A880] transition-colors"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3 h-3 text-[#9E7F55]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Steps Process */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STITCHING_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-3.5 sm:p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-[#E2DAD0]/80 dark:border-white/10"
            >
              <span className="font-serif text-xl sm:text-2xl font-light text-[#C5A880] block mb-1">
                {step.step}
              </span>
              <h4 className="text-xs sm:text-sm font-semibold text-[#1C1917] dark:text-[#F5F2EB] mb-1 leading-snug">
                {step.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-[#665F57] dark:text-[#A8A196] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
