import React, { useState, useEffect } from 'react';
import { Heart, Moon, Sun, ShoppingBag, MessageCircle } from 'lucide-react';
import { BRAND_INFO, createWhatsAppUrl } from '@/src/data/brandInfo';

interface NavbarProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onReplayIntro?: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wishlistCount,
  onOpenWishlist,
  cartCount,
  onOpenCart,
  darkMode,
  onToggleTheme,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collection', href: '#collection' },
    { label: 'Stitching', href: '#stitching' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/92 dark:bg-[#161412]/92 backdrop-blur-md border-b border-[#E2DAD0]/80 dark:border-white/10 shadow-xs py-2.5 sm:py-3'
          : 'bg-[#FAF8F5]/90 dark:bg-[#11100E]/90 backdrop-blur-sm border-b border-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-1.5 text-xs sm:text-base md:text-lg font-serif font-semibold tracking-[0.14em] uppercase text-[#1C1917] dark:text-[#F5F2EB] truncate"
          >
            <span>{BRAND_INFO.name}</span>
          </a>

          {/* Desktop Nav Links (Visible on Tablet/Laptop/Desktop) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-medium tracking-wider uppercase text-[#665F57] dark:text-[#A8A196]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#1C1917] dark:hover:text-[#F5F2EB] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C5A880] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={onToggleTheme}
              title={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full text-[#665F57] dark:text-[#D4AF37] bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-[#E2DAD0] dark:border-white/10 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Toggle dark/light theme"
            >
              {darkMode ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#665F57]" />
              )}
            </button>

            {/* Saved Wishlist Toggle */}
            <button
              onClick={onOpenWishlist}
              className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full text-[#1C1917] dark:text-[#F5F2EB] bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-[#E2DAD0] dark:border-white/10 flex items-center justify-center transition-all cursor-pointer"
              aria-label="View Saved Items"
              title="Saved Items"
            >
              <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${wishlistCount > 0 ? 'text-[#C48B8B] fill-[#C48B8B]' : 'text-[#665F57] dark:text-[#A8A196]'}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] px-0.5 rounded-full bg-[#1C1917] dark:bg-[#C5A880] text-white dark:text-[#1C1917] text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-full text-xs font-medium text-[#1C1917] dark:text-[#F5F2EB] bg-white/85 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-[#E2DAD0] dark:border-white/15 transition-all shadow-2xs active:scale-95 cursor-pointer"
              aria-label={`Shopping Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#9E7F55] dark:text-[#D4AF37]" />
              <span className="text-[11px] sm:text-xs font-semibold">Cart</span>
              <span className="min-w-[16px] h-[16px] px-1 rounded-full bg-[#1C1917] dark:bg-[#C5A880] text-white dark:text-[#1C1917] text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Desktop WhatsApp Action */}
            <a
              href={createWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-white dark:text-[#1C1917] bg-[#1C1917] dark:bg-[#C5A880] hover:bg-[#2C2723] dark:hover:bg-[#d5b990] active:scale-95 transition-all shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366] dark:text-[#1C1917]" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
