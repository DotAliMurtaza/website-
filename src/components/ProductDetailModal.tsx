import React, { useState } from 'react';
import { X, Heart, Scissors, Sparkles, Shield, Share2, Plus, Minus, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { Product } from '@/src/data/products';
import { useCart } from '@/src/context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
}) => {
  const { addToCart, openCheckout } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [includeStitching, setIncludeStitching] = useState(false);
  const [stitchingType, setStitchingType] = useState<'standard' | 'express'>('standard');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) return null;

  const stitchingPrice = includeStitching ? (stitchingType === 'express' ? 2200 : 1600) : 0;
  const unitPrice = product.price + stitchingPrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, includeStitching, stitchingType, stitchingPrice);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, includeStitching, stitchingType, stitchingPrice);
    onClose();
    openCheckout();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`${product.code} - ${product.name}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto bg-black/70 dark:bg-black/85 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#181614] text-[#1C1917] dark:text-[#F5F2EB] rounded-t-3xl sm:rounded-3xl border border-[#E2DAD0] dark:border-white/10 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 dark:bg-white/20 text-[#1C1917] dark:text-[#F5F2EB] border border-[#E2DAD0] dark:border-white/10 flex items-center justify-center shadow-xs cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto flex-1">
          {/* Top Product Image */}
          <div className="relative aspect-[16/11] bg-[#F5EFEB] dark:bg-[#12110F] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.featured && (
              <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#1C1917] dark:bg-[#C5A880] text-white dark:text-[#1C1917] text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3 text-[#C5A880] dark:text-[#1C1917]" />
                <span>Featured</span>
              </div>
            )}
          </div>

          {/* Details Content */}
          <div className="p-4 sm:p-6 space-y-4">
            <div>
              {/* Category & Code */}
              <div className="flex items-center justify-between text-[11px] text-[#665F57] dark:text-[#A8A196] mb-1 font-mono">
                <span className="tracking-wider uppercase font-sans font-semibold text-[#9E7F55] dark:text-[#D4AF37]">
                  {product.category} · {product.collectionType}
                </span>
                <span>{product.code}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1C1917] dark:text-[#F5F2EB] mb-1 leading-snug">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-xl font-serif font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                  Rs. {unitPrice.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-[#8C847A] line-through font-serif">
                    Rs. {(product.originalPrice + stitchingPrice).toLocaleString()}
                  </span>
                )}
                <span className="text-[10px] text-[#25D366] font-semibold">
                  {includeStitching ? 'Suit + Tailoring' : 'Unstitched Fabric'}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#665F57] dark:text-[#A8A196] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Suit Contents Details */}
            <div className="p-3 rounded-2xl bg-[#FAF8F5] dark:bg-white/5 border border-[#E2DAD0] dark:border-white/10 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#F5F2EB] block mb-1">
                Fabric Details
              </span>
              <p className="text-xs font-medium text-[#9E7F55] dark:text-[#D4AF37] mb-1.5">
                {product.fabric}
              </p>
              <ul className="space-y-1 text-[11px] text-[#665F57] dark:text-[#A8A196]">
                {product.includes.map((inc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#C5A880]">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bespoke Stitching Option Checkbox */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-white/5 border border-[#E2DAD0] dark:border-white/10">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeStitching}
                  onChange={(e) => setIncludeStitching(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1C1917] accent-[#C5A880] cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-[#1C1917] dark:text-[#F5F2EB] flex items-center gap-1">
                    <Scissors className="w-3.5 h-3.5 text-[#9E7F55] dark:text-[#D4AF37]" />
                    Add Bespoke Master Stitching
                  </span>
                  <span className="text-[10px] text-[#665F57] dark:text-[#A8A196] block truncate">
                    Custom fitted by Ismail Clothing Center Rawalpindi.
                  </span>
                </div>
              </label>

              {includeStitching && (
                <div className="mt-2.5 pt-2 border-t border-[#E2DAD0] dark:border-white/10 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStitchingType('standard')}
                    className={`text-[10px] py-1 px-2.5 rounded-lg border transition-all cursor-pointer ${
                      stitchingType === 'standard'
                        ? 'bg-[#1C1917] text-white dark:bg-[#C5A880] dark:text-[#1C1917] font-semibold border-transparent'
                        : 'bg-white dark:bg-white/10 text-[#665F57] dark:text-[#A8A196] border-[#E2DAD0] dark:border-white/10'
                    }`}
                  >
                    Standard (+Rs. 1,600)
                  </button>
                  <button
                    type="button"
                    onClick={() => setStitchingType('express')}
                    className={`text-[10px] py-1 px-2.5 rounded-lg border transition-all cursor-pointer ${
                      stitchingType === 'express'
                        ? 'bg-[#1C1917] text-white dark:bg-[#C5A880] dark:text-[#1C1917] font-semibold border-transparent'
                        : 'bg-white dark:bg-white/10 text-[#665F57] dark:text-[#A8A196] border-[#E2DAD0] dark:border-white/10'
                    }`}
                  >
                    Express (+Rs. 2,200)
                  </button>
                </div>
              )}
            </div>

            {/* Quantity Selector Row */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                Select Quantity:
              </span>
              <div className="flex items-center rounded-xl border border-[#E2DAD0] dark:border-white/15 bg-white dark:bg-white/10 overflow-hidden">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#665F57] dark:text-[#A8A196] cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-8 h-8 flex items-center justify-center text-[#665F57] dark:text-[#A8A196] cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Wishlist and Share */}
            <div className="flex items-center justify-between text-[11px] text-[#665F57] dark:text-[#A8A196] pt-1">
              <button
                onClick={() => onToggleWishlist(product)}
                className="flex items-center gap-1 hover:text-[#1C1917] dark:hover:text-white cursor-pointer"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    isWishlisted ? 'text-[#C48B8B] fill-[#C48B8B]' : 'text-[#8C847A]'
                  }`}
                />
                <span>{isWishlisted ? 'Saved' : 'Save to Wishlist'}</span>
              </button>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 hover:text-[#1C1917] dark:hover:text-white cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-[#25D366]" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Share Code'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Mobile Bottom Bar: Add to Cart and Buy Now */}
        <div className="p-3 sm:p-4 bg-white/95 dark:bg-[#181614]/95 border-t border-[#E2DAD0] dark:border-white/10 shadow-lg">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#665F57] dark:text-[#A8A196]">Total Amount:</span>
            <span className="font-serif text-base font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              Rs. {totalPrice.toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-[#1C1917] dark:text-[#F5F2EB] bg-[#FAF8F5] dark:bg-white/10 border border-[#E2DAD0] dark:border-white/15 active:scale-95 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#9E7F55] dark:text-[#D4AF37]" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-white dark:text-[#1C1917] bg-[#1C1917] dark:bg-[#C5A880] active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
