import React, { useState, useEffect, useCallback } from 'react';
import { CartProvider, useCart } from '@/src/context/CartContext';
import { CinematicIntro } from '@/src/components/CinematicIntro';
import { Navbar } from '@/src/components/Navbar';
import { MobileBottomNav } from '@/src/components/MobileBottomNav';
import { HeroSection } from '@/src/components/HeroSection';
import { CollectionSection } from '@/src/components/CollectionSection';
import { StitchingSection } from '@/src/components/StitchingSection';
import { WhyChooseUsSection } from '@/src/components/WhyChooseUsSection';
import { AboutSection } from '@/src/components/AboutSection';
import { ContactSection } from '@/src/components/ContactSection';
import { Footer } from '@/src/components/Footer';
import { FloatingWhatsApp } from '@/src/components/FloatingWhatsApp';
import { ProductDetailModal } from '@/src/components/ProductDetailModal';
import { WishlistDrawer } from '@/src/components/WishlistDrawer';
import { CartDrawer } from '@/src/components/CartDrawer';
import { CheckoutModal } from '@/src/components/CheckoutModal';
import { OrderSuccessModal } from '@/src/components/OrderSuccessModal';
import { ToastContainer } from '@/src/components/Toast';
import { PRODUCTS, Product } from '@/src/data/products';
import { OrderSummaryData } from '@/src/types/cart';

const WISHLIST_STORAGE_KEY = 'icc_saved_wishlist';
const INTRO_SHOWN_KEY = 'icc_cinematic_intro_completed';
const THEME_STORAGE_KEY = 'icc_luxury_theme_mode';

function Storefront() {
  const {
    totalQuantity,
    setIsCartOpen,
    completedOrder,
    setCompletedOrder,
    toasts,
    removeToast,
  } = useCart();

  // Theme state: defaults to false (Light Theme), respects saved preference
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) return saved === 'dark';
      return false; // Default to Light theme
    } catch {
      return false;
    }
  });

  // Apply dark class to document element and body
  useEffect(() => {
    try {
      const root = document.documentElement;
      if (darkMode) {
        root.classList.add('dark');
        document.body.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem(THEME_STORAGE_KEY, 'dark');
      } else {
        root.classList.remove('dark');
        document.body.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
        localStorage.setItem(THEME_STORAGE_KEY, 'light');
      }
    } catch {
      // Storage unavailable fallback
    }
  }, [darkMode]);

  const toggleTheme = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  // Cinematic Intro state
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(INTRO_SHOWN_KEY) !== 'true';
    } catch {
      return true;
    }
  });

  // Selected product for modal view
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Wishlist state persisted in localStorage
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['icc-01', 'icc-02'];
    } catch {
      return ['icc-01', 'icc-02'];
    }
  });

  // Wishlist drawer open state
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // Storage unavailable fallback
    }
  }, [wishlistIds]);

  const handleCompleteIntro = useCallback(() => {
    setShowIntro(false);
    try {
      sessionStorage.setItem(INTRO_SHOWN_KEY, 'true');
    } catch {
      // Ignore
    }
  }, []);

  const handleReplayIntro = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowIntro(true);
  }, []);

  const handleToggleWishlist = useCallback((product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      } else {
        return [...prev, product.id];
      }
    });
  }, []);

  const handleRemoveFromWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const handleClearWishlist = useCallback(() => {
    setWishlistIds([]);
  }, []);

  const handleOrderSuccess = useCallback((order: OrderSummaryData) => {
    setCompletedOrder(order);
  }, [setCompletedOrder]);

  // Filter products for the wishlist drawer
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div
      className={`min-h-screen w-full ${
        darkMode ? 'dark bg-[#11100E] text-[#F5F2EB]' : 'bg-[#FAF8F5] text-[#1C1917]'
      } font-sans relative selection:bg-[#C5A880] selection:text-[#1C1917] transition-colors duration-300 overflow-x-hidden flex flex-col`}
    >
      {/* 1. Cinematic Intro Animation */}
      {showIntro && (
        <CinematicIntro onComplete={handleCompleteIntro} darkMode={darkMode} />
      )}

      {/* Main Website Wrapper - Responsive across Mobile, Tablet & Desktop */}
      <div
        className={`w-full flex-1 flex flex-col transition-opacity duration-700 ease-out ${
          showIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Navigation Header */}
        <Navbar
          wishlistCount={wishlistIds.length}
          onOpenWishlist={() => setWishlistDrawerOpen(true)}
          cartCount={totalQuantity}
          onOpenCart={() => setIsCartOpen(true)}
          onReplayIntro={handleReplayIntro}
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
        />

        {/* Main Content Sections with responsive bottom spacing */}
        <main className="flex-1 pb-20 md:pb-12">
          {/* Section 1: Home / Hero */}
          <HeroSection />

          {/* Section 2: Ladies Unstitched Collection */}
          <CollectionSection
            onSelectProduct={setSelectedProduct}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />

          {/* Section 3: Stitching Services */}
          <StitchingSection />

          {/* Section 4: Why Choose Us */}
          <WhyChooseUsSection />

          {/* Section 5: About Ismail Clothing Center */}
          <AboutSection />

          {/* Section 6: Contact Section */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer onReplayIntro={handleReplayIntro} />

        {/* Floating WhatsApp Action Button */}
        <FloatingWhatsApp />

        {/* Mobile-Only Bottom Navigation Bar (Hidden on md/tablet and desktop) */}
        <MobileBottomNav
          wishlistCount={wishlistIds.length}
          onOpenWishlist={() => setWishlistDrawerOpen(true)}
        />

        {/* Product Quick View / Detail Modal */}
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* Shopping Cart Drawer */}
        <CartDrawer />

        {/* Checkout Modal / Page */}
        <CheckoutModal onSuccess={handleOrderSuccess} />

        {/* Order Success Confirmation Screen */}
        <OrderSuccessModal
          order={completedOrder}
          onClose={() => setCompletedOrder(null)}
        />

        {/* Saved Items / Wishlist Drawer */}
        <WishlistDrawer
          isOpen={wishlistDrawerOpen}
          onClose={() => setWishlistDrawerOpen(false)}
          items={wishlistProducts}
          onRemove={handleRemoveFromWishlist}
          onClear={handleClearWishlist}
          onSelectProduct={setSelectedProduct}
        />

        {/* Luxury Toast Container */}
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Storefront />
    </CartProvider>
  );
}
