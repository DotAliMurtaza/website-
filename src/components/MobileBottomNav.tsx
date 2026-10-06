import React from 'react';
import { Home, Layers, Scissors, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';

interface MobileBottomNavProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  wishlistCount,
  onOpenWishlist,
}) => {
  const { totalQuantity, setIsCartOpen } = useCart();

  const handleScroll = (id: string) => {
    if (id === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/92 dark:bg-[#161412]/92 backdrop-blur-xl border-t border-[#E2DAD0]/80 dark:border-white/10 px-2 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)]"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
        {/* Home */}
        <button
          onClick={() => handleScroll('#')}
          className="flex flex-col items-center justify-center py-1 text-[#665F57] dark:text-[#A8A196] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] active:scale-95 transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight mt-1">Home</span>
        </button>

        {/* Collection */}
        <button
          onClick={() => handleScroll('#collection')}
          className="flex flex-col items-center justify-center py-1 text-[#665F57] dark:text-[#A8A196] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] active:scale-95 transition-all cursor-pointer"
        >
          <Layers className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight mt-1">Collection</span>
        </button>

        {/* Stitching */}
        <button
          onClick={() => handleScroll('#stitching')}
          className="flex flex-col items-center justify-center py-1 text-[#665F57] dark:text-[#A8A196] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] active:scale-95 transition-all cursor-pointer"
        >
          <Scissors className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight mt-1">Stitching</span>
        </button>

        {/* Saved */}
        <button
          onClick={onOpenWishlist}
          className="relative flex flex-col items-center justify-center py-1 text-[#665F57] dark:text-[#A8A196] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] active:scale-95 transition-all cursor-pointer"
        >
          <div className="relative">
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-[#C48B8B] fill-[#C48B8B]' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] px-0.5 rounded-full bg-[#1C1917] dark:bg-[#C5A880] text-white dark:text-[#1C1917] text-[9px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-1">Saved</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 text-[#1C1917] dark:text-[#F5F2EB] active:scale-95 transition-all cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-[#9E7F55] dark:text-[#D4AF37]" />
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] px-0.5 rounded-full bg-[#1C1917] dark:bg-[#C5A880] text-white dark:text-[#1C1917] text-[9px] font-bold flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-tight mt-1">Cart</span>
        </button>
      </div>
    </nav>
  );
};
