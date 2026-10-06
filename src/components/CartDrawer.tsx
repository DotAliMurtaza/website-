import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Scissors } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalQuantity,
    openCheckout,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-end bg-black/70 dark:bg-black/85 backdrop-blur-xs transition-opacity duration-300"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="w-full sm:max-w-md bg-white dark:bg-[#181614] text-[#1C1917] dark:text-[#F5F2EB] h-[92vh] sm:h-full rounded-t-3xl sm:rounded-none shadow-2xl border-t sm:border-t-0 sm:border-l border-[#E2DAD0] dark:border-white/10 flex flex-col justify-between overflow-hidden animate-in slide-in-from-bottom sm:slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E2DAD0] dark:border-white/10 flex items-center justify-between bg-white/80 dark:bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#1C1917] dark:bg-[#C5A880] text-white dark:text-[#1C1917] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                Shopping Bag
              </h3>
              <span className="text-[10px] text-[#665F57] dark:text-[#A8A196]">
                {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-white dark:bg-white/10 border border-[#E2DAD0] dark:border-white/10 text-[#665F57] dark:text-[#A8A196] flex items-center justify-center cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 border border-[#E2DAD0] dark:border-white/10 flex items-center justify-center mx-auto mb-3 text-[#8C847A]">
                <ShoppingBag className="w-6 h-6 opacity-60" />
              </div>
              <h4 className="font-serif text-lg text-[#1C1917] dark:text-[#F5F2EB] mb-1">
                Your cart is empty
              </h4>
              <p className="text-xs text-[#665F57] dark:text-[#A8A196] max-w-xs mx-auto mb-5 leading-relaxed">
                Add unstitched suits from our collection to place your order.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2 rounded-full text-xs font-semibold text-white dark:text-[#1C1917] bg-[#1C1917] dark:bg-[#C5A880] cursor-pointer"
              >
                Browse Suits
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-white/85 dark:bg-white/5 border border-[#E2DAD0]/90 dark:border-white/10 shadow-2xs flex gap-3"
              >
                {/* Thumbnail */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-20 object-cover rounded-xl border border-[#E2DAD0]/60 dark:border-white/10 shrink-0"
                />

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[9px] font-mono text-[#8C847A]">
                        {item.product.code}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#8C847A] hover:text-[#C48B8B] p-1 cursor-pointer"
                        title="Remove product"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h5 className="font-serif text-xs font-normal text-[#1C1917] dark:text-[#F5F2EB] line-clamp-1">
                      {item.product.name}
                    </h5>

                    {item.withStitching && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-medium text-[#9E7F55] dark:text-[#D4AF37] bg-[#FAF4ED] dark:bg-white/10 px-1.5 py-0.5 rounded mt-0.5">
                        <Scissors className="w-2.5 h-2.5" />
                        {item.stitchingType === 'express' ? 'Express' : 'Standard'} Stitching (+Rs. {item.stitchingPrice})
                      </span>
                    )}
                  </div>

                  {/* Quantity and Line Total */}
                  <div className="flex items-center justify-between pt-1 mt-1 border-t border-[#E2DAD0]/60 dark:border-white/10">
                    <div className="flex items-center rounded-lg border border-[#E2DAD0] dark:border-white/15 bg-white dark:bg-white/10 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#665F57] dark:text-[#A8A196] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#665F57] dark:text-[#A8A196] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                        Rs. {item.lineTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Mobile Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-[#E2DAD0] dark:border-white/10 bg-white/90 dark:bg-white/5 backdrop-blur-md space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#665F57] dark:text-[#A8A196]">Total ({totalQuantity} items):</span>
              <span className="font-serif text-base font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                Rs. {subtotal.toLocaleString()}
              </span>
            </div>

            <button
              onClick={openCheckout}
              className="w-full inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl text-xs font-semibold text-white dark:text-[#1C1917] bg-[#1C1917] dark:bg-[#C5A880] active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-between text-[10px] text-[#8C847A]">
              <button
                onClick={() => setIsCartOpen(false)}
                className="hover:text-[#1C1917] dark:hover:text-white cursor-pointer"
              >
                Continue Shopping
              </button>
              <button
                onClick={clearCart}
                className="hover:text-[#C48B8B] cursor-pointer"
              >
                Empty Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
