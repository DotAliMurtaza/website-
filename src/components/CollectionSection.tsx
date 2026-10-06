import React, { useState, useMemo } from 'react';
import { Eye, Heart, Search, Sparkles, Plus } from 'lucide-react';
import { PRODUCTS, CATEGORIES, CategoryFilter, Product } from '@/src/data/products';
import { useCart } from '@/src/context/CartContext';

interface CollectionSectionProps {
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
}) => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products by category and search
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        activeCategory === 'All'
          ? true
          : item.category === activeCategory ||
            (activeCategory === '3 Piece' && item.category === '3 Piece') ||
            (activeCategory === '2 Piece' && item.category === '2 Piece') ||
            (activeCategory === 'Lawn' && (item.category === 'Lawn' || item.fabric.toLowerCase().includes('lawn'))) ||
            (activeCategory === 'Chiffon' && (item.category === 'Chiffon' || item.fabric.toLowerCase().includes('chiffon'))) ||
            (activeCategory === 'Cotton' && (item.category === 'Cotton' || item.fabric.toLowerCase().includes('cotton') || item.fabric.toLowerCase().includes('linen'))) ||
            (activeCategory === 'Khaddar' && (item.category === 'Khaddar' || item.fabric.toLowerCase().includes('khaddar')));

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query) ||
        item.fabric.toLowerCase().includes(query) ||
        item.collectionType.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="collection" className="py-12 sm:py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#9E7F55] dark:text-[#D4AF37] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ladies Collection</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-[#1C1917] dark:text-[#F5F2EB] tracking-tight mb-2 sm:mb-3">
            Ladies Unstitched Suits
          </h2>

          <p className="text-xs sm:text-sm text-[#665F57] dark:text-[#A8A196] leading-relaxed">
            Pure lawn, chiffon, cotton &amp; winter khaddar. Add to cart to order unstitched or with bespoke tailoring.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-[#E2DAD0]/80 dark:border-white/10">
          
          {/* Swipable / Responsive Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto py-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium rounded-full whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1C1917] text-white dark:bg-[#C5A880] dark:text-[#1C1917] shadow-xs font-semibold'
                      : 'bg-white/80 dark:bg-white/10 text-[#665F57] dark:text-[#A8A196] border border-[#E2DAD0]/80 dark:border-white/10 hover:border-[#C5A880]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64 lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8C847A]" />
            <input
              type="text"
              placeholder="Search lawn, chiffon, code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 sm:py-2.5 rounded-full bg-white/85 dark:bg-white/5 border border-[#E2DAD0] dark:border-white/10 text-xs text-[#1C1917] dark:text-[#F5F2EB] placeholder-[#8C847A] focus:outline-none focus:border-[#C5A880] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#8C847A] hover:text-[#1C1917] dark:hover:text-white cursor-pointer px-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#665F57] dark:text-[#A8A196] mb-4 sm:mb-6 px-1">
          <span>{filteredProducts.length} ladies suits available</span>
          <span className="text-[#9E7F55] dark:text-[#D4AF37] font-medium">Bespoke Stitching Available</span>
        </div>

        {/* Responsive Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white/60 dark:bg-white/5 rounded-3xl border border-[#E2DAD0] dark:border-white/10">
            <p className="font-serif text-lg text-[#1C1917] dark:text-[#F5F2EB] mb-1">No suits found</p>
            <p className="text-xs text-[#665F57] dark:text-[#A8A196] mb-4">
              Try a different keyword or reset categories.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-white dark:text-[#1C1917] bg-[#1C1917] dark:bg-[#C5A880] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="group relative bg-white/85 dark:bg-[#181614]/90 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-[#E2DAD0]/90 dark:border-white/10 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Container with Tap/Click to View */}
                  <div
                    className="relative aspect-[3/4] overflow-hidden bg-[#EAE4DC] dark:bg-[#12110F] cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Quick View Button on Hover (Desktop) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="hidden sm:flex absolute bottom-3 left-3 right-3 py-2 px-3 rounded-full bg-white/95 dark:bg-[#1C1917]/95 text-[#1C1917] dark:text-[#F5F2EB] text-xs font-medium tracking-wide shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 items-center justify-center gap-1.5 border border-white/60 dark:border-white/10 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>

                    {/* Wishlist Heart Top-Right */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/85 dark:bg-[#1C1917]/85 backdrop-blur-xs text-[#1C1917] dark:text-[#F5F2EB] flex items-center justify-center shadow-xs active:scale-90 transition-transform cursor-pointer"
                      aria-label="Save to Wishlist"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                          isWishlisted ? 'text-[#C48B8B] fill-[#C48B8B]' : 'text-[#665F57] dark:text-[#A8A196]'
                        }`}
                      />
                    </button>

                    {/* Category Tag Top-Left */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:py-1 rounded-md sm:rounded-full bg-white/90 dark:bg-[#1C1917]/90 text-[9px] sm:text-[10px] font-semibold text-[#1C1917] dark:text-[#F5F2EB] shadow-2xs">
                      {product.category}
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Code & Collection */}
                      <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-[#8C847A] mb-1 font-sans">
                        <span className="text-[#9E7F55] dark:text-[#D4AF37] font-semibold">{product.collectionType}</span>
                        <span>·</span>
                        <span className="font-mono">{product.code}</span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-serif text-xs sm:text-base font-normal text-[#1C1917] dark:text-[#F5F2EB] line-clamp-1 leading-snug cursor-pointer hover:text-[#9E7F55] transition-colors"
                        title={product.name}
                      >
                        {product.name}
                      </h3>

                      {/* Fabric note */}
                      <p className="text-[10px] sm:text-xs text-[#665F57] dark:text-[#A8A196] line-clamp-1 mt-1">
                        {product.fabric}
                      </p>
                    </div>

                    <div className="pt-2 sm:pt-3 mt-2 border-t border-[#E2DAD0]/60 dark:border-white/10">
                      {/* Price Row */}
                      <div className="flex items-baseline justify-between mb-2 sm:mb-3">
                        <div>
                          <span className="font-serif text-xs sm:text-base font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                            Rs. {product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="ml-1.5 text-[10px] sm:text-xs text-[#8C847A] line-through font-serif">
                              Rs. {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#9E7F55] dark:text-[#D4AF37]">Unstitched</span>
                      </div>

                      {/* Action Buttons: Add to Cart and Info */}
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="inline-flex items-center justify-center gap-1 py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-xl text-[10px] sm:text-xs font-semibold text-white dark:text-[#1C1917] bg-[#1C1917] dark:bg-[#C5A880] hover:bg-[#2C2723] dark:hover:bg-[#d5b990] active:scale-95 transition-all cursor-pointer shadow-2xs"
                        >
                          <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                          <span>Add<span className="hidden xs:inline sm:inline"> to Cart</span></span>
                        </button>

                        <button
                          onClick={() => onSelectProduct(product)}
                          className="inline-flex items-center justify-center py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-xl text-[10px] sm:text-xs font-semibold text-[#1C1917] dark:text-[#F5F2EB] bg-white dark:bg-white/10 hover:bg-[#FAF8F5] dark:hover:bg-white/15 border border-[#E2DAD0] dark:border-white/10 active:scale-95 transition-all cursor-pointer"
                        >
                          <span>Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
