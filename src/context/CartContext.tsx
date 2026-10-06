import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Product } from '@/src/data/products';
import { CartItem, OrderSummaryData } from '@/src/types/cart';
import { ToastMessage } from '@/src/components/Toast';

const CART_STORAGE_KEY = 'icc_shopping_cart_items';

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    withStitching?: boolean,
    stitchingType?: 'standard' | 'express',
    stitchingPrice?: number
  ) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  totalQuantity: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  completedOrder: OrderSummaryData | null;
  setCompletedOrder: (order: OrderSummaryData | null) => void;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  openCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial cart from localStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderSummaryData | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync cart to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const openCheckout = useCallback(() => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }, []);

  const addToCart = useCallback(
    (
      product: Product,
      quantity = 1,
      withStitching = false,
      stitchingType: 'standard' | 'express' = 'standard',
      stitchingPrice = 0
    ) => {
      const stitchCost = withStitching ? stitchingPrice : 0;
      const unitPrice = product.price + stitchCost;
      const cleanQty = Math.max(1, quantity);

      // Create a composite item id based on product and stitching selection
      const compositeId = withStitching
        ? `${product.id}-stitch-${stitchingType}`
        : `${product.id}-unstitched`;

      setItems((prevItems) => {
        const existingIndex = prevItems.findIndex((item) => item.id === compositeId);

        if (existingIndex > -1) {
          const updated = [...prevItems];
          const newQty = updated[existingIndex].quantity + cleanQty;
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: newQty,
            lineTotal: unitPrice * newQty,
          };
          return updated;
        } else {
          const newItem: CartItem = {
            id: compositeId,
            product,
            quantity: cleanQty,
            withStitching,
            stitchingType: withStitching ? stitchingType : undefined,
            stitchingPrice: stitchCost,
            unitPrice,
            lineTotal: unitPrice * cleanQty,
          };
          return [...prevItems, newItem];
        }
      });

      // Show luxury confirmation toast notification
      addToast({
        title: 'Added to Cart',
        message: `${product.name} (${cleanQty} ${cleanQty > 1 ? 'items' : 'item'})`,
        productImage: product.image,
        type: 'success',
        actionLabel: 'View Cart & Checkout',
        onAction: () => setIsCartOpen(true),
      });
    },
    [addToast]
  );

  const updateQuantity = useCallback((itemId: string, newQuantity: number) => {
    setItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item.id !== itemId);
      }
      return prevItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: newQuantity,
            lineTotal: item.unitPrice * newQuantity,
          };
        }
        return item;
      });
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const totalQuantity = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.lineTotal, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalQuantity,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        completedOrder,
        setCompletedOrder,
        toasts,
        addToast,
        removeToast,
        openCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
