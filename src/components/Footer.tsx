import React from 'react';
import { MessageCircle, Mail, MapPin, Sparkles } from 'lucide-react';
import { BRAND_INFO, createWhatsAppUrl, createEmailUrl } from '@/src/data/brandInfo';

interface FooterProps {
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  return (
    <footer className="border-t border-[#E2DAD0]/80 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#11100E] pt-10 sm:pt-12 pb-24 md:pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Summary */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 pb-8 border-b border-[#E2DAD0]/60 dark:border-white/10">
          <div className="max-w-md text-center md:text-left">
            <span className="font-serif text-lg sm:text-xl font-semibold tracking-[0.14em] uppercase text-[#1C1917] dark:text-[#F5F2EB] block mb-1">
              {BRAND_INFO.name}
            </span>
            <p className="text-[10px] text-[#9E7F55] dark:text-[#D4AF37] tracking-widest uppercase mb-2 font-medium">
              Ladies Unstitched Clothing &amp; Master Stitching
            </p>
            <p className="text-xs text-[#665F57] dark:text-[#A8A196] leading-relaxed">
              Curating premium ladies unstitched lawn, festive chiffon, breathable cambric cotton, and rich winter khaddar — paired with bespoke master tailoring in Rawalpindi, Pakistan.
            </p>
          </div>

          {/* Quick Contact Links */}
          <div className="flex flex-col sm:flex-row md:flex-col items-center md:items-end justify-center gap-3 text-xs text-[#665F57] dark:text-[#A8A196]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#9E7F55] dark:text-[#D4AF37]" />
              <span className="text-[#1C1917] dark:text-[#F5F2EB] font-medium">{BRAND_INFO.location}</span>
            </div>

            <a
              href={createWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#1C1917] dark:hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp: <strong className="text-[#1C1917] dark:text-[#F5F2EB]">{BRAND_INFO.whatsappDisplay}</strong></span>
            </a>

            <a
              href={createEmailUrl()}
              className="flex items-center gap-2 hover:text-[#1C1917] dark:hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-[#9E7F55] dark:text-[#D4AF37]" />
              <span className="truncate">{BRAND_INFO.email}</span>
            </a>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="flex items-center justify-between gap-2 text-xs text-[#8C847A] pt-4">
          <p>© {new Date().getFullYear()} {BRAND_INFO.name}. All rights reserved.</p>
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              className="inline-flex items-center gap-1.5 text-xs text-[#665F57] dark:text-[#A8A196] hover:text-[#1C1917] dark:hover:text-white cursor-pointer transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#9E7F55] dark:text-[#D4AF37]" />
              <span>Replay Cinematic Intro</span>
            </button>
          )}
        </div>

      </div>
    </footer>
  );
};
