import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
  darkMode?: boolean;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete, darkMode = false }) => {
  const [phase, setPhase] = useState<'enter' | 'radiance' | 'exit'>('enter');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPhase('radiance');
    }, 500);

    const timer2 = setTimeout(() => {
      setPhase('exit');
    }, 2400);

    const timer3 = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div
      role="dialog"
      aria-label="Brand Intro"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-all duration-700 select-none px-4 ${
        phase === 'exit' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      } ${darkMode ? 'bg-[#11100E] text-[#F5F2EB]' : 'bg-[#FAF8F5] text-[#1C1917]'}`}
    >
      {/* Background Soft Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[450px] h-[340px] sm:h-[450px] rounded-full blur-3xl transition-transform duration-1000 ease-out ${
            darkMode
              ? 'bg-gradient-to-tr from-[#C5A880]/15 via-[#9E7F55]/20 to-transparent'
              : 'bg-gradient-to-tr from-[#EADDCB]/40 via-[#F3E9DD]/60 to-[#FDFBF7]'
          } ${phase === 'radiance' ? 'scale-125 opacity-80' : 'scale-75 opacity-20'}`}
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(#D4AF37_0.75px,transparent_0.75px)] [background-size:20px_20px] opacity-10"
        />
      </div>

      {/* Central Brand Presentation - Mobile-First Proportions */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-sm px-4">
        {/* Decorative Emblem */}
        <div
          className={`mb-4 transition-all duration-1000 ease-out ${
            phase === 'radiance'
              ? 'opacity-100 translate-y-0 rotate-0'
              : 'opacity-0 translate-y-3 -rotate-12'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-full border flex items-center justify-center backdrop-blur-md shadow-sm ${
              darkMode
                ? 'border-[#D4AF37]/40 bg-white/5'
                : 'border-[#C5A880]/50 bg-white/70'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${darkMode ? 'text-[#D4AF37]' : 'text-[#9E7F55]'}`} />
          </div>
        </div>

        {/* Brand Name - Compact for Mobile Screens */}
        <div className="overflow-hidden mb-2 w-full">
          <h1
            className={`font-serif text-xl sm:text-3xl md:text-4xl font-light tracking-[0.16em] sm:tracking-[0.2em] leading-snug transition-all duration-1000 ease-out uppercase ${
              darkMode ? 'text-[#F5F2EB]' : 'text-[#1C1917]'
            } ${
              phase === 'radiance'
                ? 'opacity-100 translate-y-0 filter-none'
                : 'opacity-0 translate-y-5 blur-xs'
            }`}
          >
            ISMAIL CLOTHING CENTER
          </h1>
        </div>

        {/* Sub-line */}
        <div className="overflow-hidden">
          <p
            className={`text-[10px] tracking-[0.25em] uppercase font-sans transition-all duration-1000 delay-200 ease-out ${
              darkMode ? 'text-[#A8A196]' : 'text-[#665F57]'
            } ${
              phase === 'radiance'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3'
            }`}
          >
            Ladies Unstitched &amp; Stitching · Rawalpindi
          </p>
        </div>

        {/* Optical Light Line */}
        <div className="w-36 h-[1px] mt-6 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent relative overflow-hidden">
          <div
            className={`absolute inset-0 bg-white/80 transition-transform duration-1000 ease-in-out ${
              phase === 'radiance' ? 'translate-x-full' : '-translate-x-full'
            }`}
          />
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className={`absolute bottom-8 z-20 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wider uppercase backdrop-blur-md transition-all shadow-xs cursor-pointer ${
          darkMode
            ? 'text-[#C4BEB5] hover:text-white bg-white/10 hover:bg-white/15 border border-white/15'
            : 'text-[#665F57] hover:text-[#1C1917] bg-white/80 hover:bg-white border border-[#E2DAD0]'
        }`}
      >
        <span>Enter Store</span>
        <ArrowRight className="w-3 h-3 text-[#C5A880]" />
      </button>
    </div>
  );
};
