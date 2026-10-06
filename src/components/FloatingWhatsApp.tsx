import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BRAND_INFO, createWhatsAppUrl } from '@/src/data/brandInfo';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed bottom-16 right-3.5 sm:bottom-20 sm:right-6 md:bottom-8 md:right-8 z-30">
      <a
        href={createWhatsAppUrl("Assalam o Alaikum, I would like to inquire about ladies clothing and stitching at Ismail Clothing Center.")}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg active:scale-95 transition-all border-2 border-white dark:border-[#1F1B18]"
        aria-label="Chat on WhatsApp"
        title="WhatsApp: 03282305470"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-25 animate-ping pointer-events-none" />
        <MessageCircle className="w-6 h-6 fill-white" />
      </a>
    </div>
  );
};
