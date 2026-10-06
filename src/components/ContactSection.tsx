import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, Copy, Check, Send, Sparkles } from 'lucide-react';
import { BRAND_INFO, createWhatsAppUrl, createEmailUrl } from '@/src/data/brandInfo';

export const ContactSection: React.FC = () => {
  const [copiedType, setCopiedType] = useState<'whatsapp' | 'email' | null>(null);

  const [customerName, setCustomerName] = useState('');
  const [inquiryType, setInquiryType] = useState('Ladies Unstitched Clothing Inquiry');
  const [customerMessage, setCustomerMessage] = useState('');

  const handleCopy = (text: string, type: 'whatsapp' | 'email') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDirectWhatsAppForm = (e: React.FormEvent) => {
    e.preventDefault();
    let text = `Assalam o Alaikum, my name is ${customerName.trim() || 'a customer'}.\n`;
    text += `• Inquiry: ${inquiryType}\n`;
    if (customerMessage.trim()) {
      text += `• Details: ${customerMessage.trim()}\n`;
    } else {
      text += `• Details: I would like to inquire about your ladies clothing and stitching services.\n`;
    }
    text += `Ismail Clothing Center - Rawalpindi.`;

    window.open(createWhatsAppUrl(text), '_blank');
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#9E7F55] dark:text-[#D4AF37] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-[#1C1917] dark:text-[#F5F2EB] tracking-tight mb-2 sm:mb-3">
            Get in Touch
          </h2>

          <p className="text-xs sm:text-sm text-[#665F57] dark:text-[#A8A196]">
            Questions about unstitched fabric stock, video previews, or custom stitching in Rawalpindi.
          </p>
        </div>

        {/* Contact Cards Grid for Mobile & Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mb-8">
          
          {/* Card 1: WhatsApp */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/85 dark:bg-[#181614]/90 backdrop-blur-md border border-[#E2DAD0]/90 dark:border-white/10 shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-[#9E7F55] dark:text-[#D4AF37] font-bold block">
                  WhatsApp
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold text-[#1C1917] dark:text-[#F5F2EB] block truncate">
                  {BRAND_INFO.whatsappDisplay}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => handleCopy(BRAND_INFO.whatsappDisplay, 'whatsapp')}
                className="p-2 rounded-xl bg-[#FAF8F5] dark:bg-white/10 text-[#665F57] dark:text-[#A8A196] hover:text-[#1C1917] dark:hover:text-white cursor-pointer"
                title="Copy Number"
                aria-label="Copy Number"
              >
                {copiedType === 'whatsapp' ? <Check className="w-3.5 h-3.5 text-[#25D366]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <a
                href={createWhatsAppUrl("Assalam o Alaikum, I would like to inquire about your ladies clothing and stitching services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3.5 rounded-xl text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 transition-all"
              >
                Chat
              </a>
            </div>
          </div>

          {/* Card 2: Email */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/85 dark:bg-[#181614]/90 backdrop-blur-md border border-[#E2DAD0]/90 dark:border-white/10 shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-[#FAF8F5] dark:bg-white/10 text-[#9E7F55] dark:text-[#D4AF37] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-[#9E7F55] dark:text-[#D4AF37] font-bold block">
                  Email
                </span>
                <span className="font-mono text-[11px] sm:text-xs font-medium text-[#1C1917] dark:text-[#F5F2EB] block truncate">
                  {BRAND_INFO.email}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => handleCopy(BRAND_INFO.email, 'email')}
                className="p-2 rounded-xl bg-[#FAF8F5] dark:bg-white/10 text-[#665F57] dark:text-[#A8A196] hover:text-[#1C1917] dark:hover:text-white cursor-pointer"
                title="Copy Email"
                aria-label="Copy Email"
              >
                {copiedType === 'email' ? <Check className="w-3.5 h-3.5 text-[#25D366]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <a
                href={createEmailUrl()}
                className="py-2 px-3.5 rounded-xl text-xs font-semibold text-[#1C1917] dark:text-[#F5F2EB] bg-[#FAF8F5] dark:bg-white/10 border border-[#E2DAD0] dark:border-white/10 active:scale-95 transition-all"
              >
                Mail
              </a>
            </div>
          </div>

          {/* Card 3: Location */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/85 dark:bg-[#181614]/90 backdrop-blur-md border border-[#E2DAD0]/90 dark:border-white/10 shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-[#FAF8F5] dark:bg-white/10 text-[#9E7F55] dark:text-[#D4AF37] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-[#9E7F55] dark:text-[#D4AF37] font-bold block">
                  Store Location
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#1C1917] dark:text-[#F5F2EB] block truncate">
                  Rawalpindi, Pakistan (11am - 9pm)
                </span>
              </div>
            </div>

            <a
              href={createWhatsAppUrl("Assalam o Alaikum, please share your shop address and directions in Rawalpindi.")}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3.5 rounded-xl text-xs font-semibold text-[#1C1917] dark:text-[#F5F2EB] bg-[#FAF8F5] dark:bg-white/10 border border-[#E2DAD0] dark:border-white/10 active:scale-95 transition-all shrink-0"
            >
              Directions
            </a>
          </div>

        </div>

        {/* Quick Message Form */}
        <div className="max-w-2xl mx-auto p-5 sm:p-7 rounded-3xl bg-white/90 dark:bg-[#181614]/90 backdrop-blur-md border border-[#E2DAD0] dark:border-white/10 shadow-sm">
          <div className="mb-4">
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#1C1917] dark:text-[#F5F2EB] mb-1">
              Send Quick Message
            </h3>
            <p className="text-xs text-[#665F57] dark:text-[#A8A196]">
              Have a quick question about fabric, dimensions or bespoke stitching? Send directly to WhatsApp.
            </p>
          </div>

          <form onSubmit={handleDirectWhatsAppForm} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#FAF8F5] dark:bg-white/5 border border-[#E2DAD0] dark:border-white/10 text-xs text-[#1C1917] dark:text-[#F5F2EB] placeholder-[#8C847A] focus:outline-none"
                />
              </div>

              <div>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#FAF8F5] dark:bg-[#181614] border border-[#E2DAD0] dark:border-white/10 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none"
                >
                  <option value="Ladies Unstitched Clothing Inquiry" className="bg-white dark:bg-[#181614]">Ladies Unstitched Clothing</option>
                  <option value="Custom Stitching Service Inquiry" className="bg-white dark:bg-[#181614]">Custom Stitching Service</option>
                  <option value="Drop Sample Suit in Rawalpindi" className="bg-white dark:bg-[#181614]">Drop Sample Suit in Rawalpindi</option>
                </select>
              </div>
            </div>

            <div>
              <textarea
                rows={3}
                placeholder="Message / suit questions..."
                value={customerMessage}
                onChange={(e) => setCustomerMessage(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#FAF8F5] dark:bg-white/5 border border-[#E2DAD0] dark:border-white/10 text-xs text-[#1C1917] dark:text-[#F5F2EB] placeholder-[#8C847A] focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs sm:text-sm font-semibold text-white dark:text-[#1C1917] bg-[#1C1917] dark:bg-[#C5A880] hover:bg-[#2C2723] dark:hover:bg-[#d5b990] active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#25D366] dark:text-[#1C1917]" />
              <span>Send via WhatsApp</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};
