import React from 'react';
import { X, Trash2, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '@/src/data/products';
import { useCart } from '@/src/context/CartContext';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (productId: string) => void;
  onClear: () => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemove,
  onClear,
  onSelectProduct,
}) => {
  const { addToCart, setIsCartOpen } = useCart();

  if (!isOpen) return null;

  const handleAddAllToCart = () => {
    items.forEach((item) => {
      addToCart(item, 1);
    });
    onClose();
    setIsCartOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 dark:bg-black/80 backdrop-blur-xs transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-[#181614] text-[#1C1917] dark:text-[#F5F2EB] h-full shadow-2xl border-l border-[#E2DAD0] dark:border-white/10 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E2DAD0] dark:border-white/10 flex items-center justify-between bg-white/70 dark:bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C48B8B] fill-[#C48B8B]" />
            <h3 className="font-serif text-xl font-normal text-[#1C1917] dark:text-[#F5F2EB]">
              Saved Wishlist ({items.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white dark:bg-white/10 border border-[#E2DAD0] dark:border-white/10 text-[#665F57] dark:text-[#A8A196] hover:text-[#1C1917] dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close saved items"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-20 px-4">
              <div className="w-14 h-14 rounded-full bg-white dark:bg-white/10 border border-[#E2DAD0] dark:border-white/10 flex items-center justify-center mx-auto mb-4 text-[#8C847A]">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg text-[#1C1917] dark:text-[#F5F2EB] mb-1.5">No Saved Suits Yet</h4>
              <p className="text-xs text-[#665F57] dark:text-[#A8A196] max-w-xs mx-auto mb-6">
                Tap the heart icon on any ladies suit in the collection to save it here.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-white dark:text-[#1C1917] bg-[#1C1917] dark:bg-[#C5A880] transition-colors cursor-pointer"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-white/80 dark:bg-white/5 border border-[#E2DAD0] dark:border-white/10 flex items-center gap-3.5 shadow-2xs hover:shadow-xs transition-all"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-20 object-cover rounded-xl cursor-pointer"
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono text-[#8C847A] block truncate">{item.code}</span>
                  <h5
                    onClick={() => {
                      onSelectProduct(item);
                      onClose();
                    }}
                    className="font-serif text-sm font-normal text-[#1C1917] dark:text-[#F5F2EB] truncate cursor-pointer hover:text-[#9E7F55] dark:hover:text-[#D4AF37]"
                  >
                    {item.name}
                  </h5>
                  <span className="text-xs font-semibold text-[#1C1917] dark:text-[#F5F2EB] block mt-0.5">
                    Rs. {item.price.toLocaleString()}
                  </span>

                  <button
                    onClick={() => addToCart(item, 1)}
                    className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#9E7F55] dark:text-[#D4AF37] hover:underline cursor-pointer"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Move to Cart</span>
                  </button>
                </div>

                <button
                  onClick={() => onRemove(item.id)}
                  className="p-2 text-[#8C847A] hover:text-[#C48B8B] transition-colors cursor-pointer"
                  title="Remove from saved"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-[#E2DAD0] dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md space-y-3">
            <button
              onClick={handleAddAllToCart}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white dark:text-[#1C1917] bg-[#1C1917] dark:bg-[#C5A880] hover:bg-[#2C2723] dark:hover:bg-[#d5b990] transition-all shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add All Saved Suits to Cart</span>
            </button>

            <div className="flex items-center justify-between text-[11px] text-[#8C847A] pt-1">
              <button
                onClick={onClear}
                className="hover:text-[#C48B8B] transition-colors cursor-pointer"
              >
                Clear all saved
              </button>
              <span>Saved in your browser</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
