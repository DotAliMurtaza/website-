import React, { useState } from 'react';
import { X, ArrowLeft, MessageCircle, ShieldCheck, User, AlertCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';
import { CustomerInfo, OrderSummaryData } from '@/src/types/cart';
import { BRAND_INFO } from '@/src/data/brandInfo';

interface CheckoutModalProps {
  onSuccess: (order: OrderSummaryData) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onSuccess }) => {
  const {
    items,
    subtotal,
    totalQuantity,
    isCheckoutOpen,
    setIsCheckoutOpen,
    setIsCartOpen,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    address: '',
    city: 'Rawalpindi',
    email: '',
    notes: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    const cleanPhone = formData.phone.trim().replace(/[\s-]/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Please enter your WhatsApp / mobile number.';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number (e.g. 03282305470).';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Please enter your delivery address.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Please enter your city.';
    }

    if (items.length === 0) {
      newErrors.cart = 'Your cart is empty.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrderOnWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.getElementById(`checkout-${firstErrorKey}`);
      if (element) {
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const orderId = `ICC-${Date.now().toString().slice(-6)}`;

      let message = `*New Order — ${BRAND_INFO.name}*\n`;
      message += `Order ID: ${orderId}\n\n`;

      message += `*Customer Information:*\n`;
      message += `• Name: ${formData.fullName.trim()}\n`;
      message += `• Phone: ${formData.phone.trim()}\n`;
      message += `• Address: ${formData.address.trim()}\n`;
      message += `• City: ${formData.city.trim()}\n`;
      if (formData.email?.trim()) {
        message += `• Email: ${formData.email.trim()}\n`;
      }
      if (formData.notes?.trim()) {
        message += `• Notes: ${formData.notes.trim()}\n`;
      }

      message += `\n*Order Details:*\n`;
      items.forEach((item, index) => {
        const stitchTag = item.withStitching ? ` (${item.stitchingType === 'express' ? 'Express' : 'Standard'} Stitched)` : ' (Unstitched)';
        message += `${index + 1}. ${item.product.name} × ${item.quantity}${stitchTag} — Rs. ${item.lineTotal.toLocaleString()}\n`;
      });

      message += `\n*Total Items:* ${totalQuantity}\n`;
      message += `*Grand Total:* Rs. ${subtotal.toLocaleString()}\n\n`;
      message += `Assalam o Alaikum, please confirm my order.`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodedMessage}`;

      const orderData: OrderSummaryData = {
        orderId,
        customer: { ...formData },
        items: [...items],
        totalQuantity,
        grandTotal: subtotal,
        placedAt: new Date().toLocaleString(),
      };

      try {
        const win = window.open(whatsappUrl, '_blank');
        if (!win || win.closed || typeof win.closed === 'undefined') {
          window.location.href = whatsappUrl;
        }
      } catch {
        window.location.href = whatsappUrl;
      }

      clearCart();
      setIsCheckoutOpen(false);
      onSuccess(orderData);
    } catch (err) {
      console.error(err);
      setErrors({ form: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto bg-black/70 dark:bg-black/85 backdrop-blur-xs transition-opacity duration-200"
      onClick={() => setIsCheckoutOpen(false)}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#181614] text-[#1C1917] dark:text-[#F5F2EB] rounded-t-3xl sm:rounded-3xl border border-[#E2DAD0] dark:border-white/10 shadow-2xl overflow-hidden max-h-[94vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-3.5 sm:p-4 border-b border-[#E2DAD0] dark:border-white/10 flex items-center justify-between bg-white/80 dark:bg-white/5 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setIsCartOpen(true);
              }}
              className="p-1.5 rounded-lg bg-white dark:bg-white/10 text-[#665F57] dark:text-[#A8A196] cursor-pointer"
              aria-label="Back to Cart"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h3 className="font-serif text-base sm:text-lg font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
              Checkout Details
            </h3>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-7 h-7 rounded-full bg-white dark:bg-white/10 text-[#665F57] dark:text-[#A8A196] flex items-center justify-center cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto p-4 sm:p-5 flex-1 space-y-4">
          
          {/* Compact Order Summary Mini-Card */}
          <div className="p-3 rounded-2xl bg-white/80 dark:bg-white/5 border border-[#E2DAD0] dark:border-white/10">
            <div className="flex items-center justify-between text-xs font-semibold mb-2 pb-1.5 border-b border-[#E2DAD0]/60 dark:border-white/10">
              <span className="flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-[#9E7F55]" />
                <span>Your Items ({totalQuantity})</span>
              </span>
              <span className="font-serif text-sm">Rs. {subtotal.toLocaleString()}</span>
            </div>

            <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-[11px]">
                  <span className="truncate pr-2 text-[#665F57] dark:text-[#A8A196]">
                    {item.quantity}× {item.product.name}
                  </span>
                  <span className="font-semibold shrink-0">
                    Rs. {item.lineTotal.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <form id="checkout-form" onSubmit={handlePlaceOrderOnWhatsApp} className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#F5F2EB] mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="checkout-fullName"
                type="text"
                name="fullName"
                placeholder="e.g. Ayesha Khan"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full py-2 px-3 rounded-xl bg-white dark:bg-[#1A1815] border text-xs text-[#1C1917] dark:text-[#F5F2EB] placeholder-[#8C847A] focus:outline-none ${
                  errors.fullName ? 'border-red-500' : 'border-[#E2DAD0] dark:border-white/10'
                }`}
              />
              {errors.fullName && (
                <p className="mt-0.5 text-[10px] text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-2.5 h-2.5" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#F5F2EB] mb-1">
                WhatsApp / Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="checkout-phone"
                type="tel"
                name="phone"
                placeholder="e.g. 03282305470"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full py-2 px-3 rounded-xl bg-white dark:bg-[#1A1815] border text-xs text-[#1C1917] dark:text-[#F5F2EB] placeholder-[#8C847A] focus:outline-none ${
                  errors.phone ? 'border-red-500' : 'border-[#E2DAD0] dark:border-white/10'
                }`}
              />
              {errors.phone && (
                <p className="mt-0.5 text-[10px] text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-2.5 h-2.5" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#F5F2EB] mb-1">
                Delivery Address <span className="text-red-500">*</span>
              </label>
              <input
                id="checkout-address"
                type="text"
                name="address"
                placeholder="House/Street, Area name"
                value={formData.address}
                onChange={handleChange}
                className={`w-full py-2 px-3 rounded-xl bg-white dark:bg-[#1A1815] border text-xs text-[#1C1917] dark:text-[#F5F2EB] placeholder-[#8C847A] focus:outline-none ${
                  errors.address ? 'border-red-500' : 'border-[#E2DAD0] dark:border-white/10'
                }`}
              />
              {errors.address && (
                <p className="mt-0.5 text-[10px] text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-2.5 h-2.5" />
                  <span>{errors.address}</span>
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#F5F2EB] mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  id="checkout-city"
                  type="text"
                  name="city"
                  placeholder="Rawalpindi"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full py-2 px-3 rounded-xl bg-white dark:bg-[#1A1815] border text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none ${
                    errors.city ? 'border-red-500' : 'border-[#E2DAD0] dark:border-white/10'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#F5F2EB] mb-1">
                  Email <span className="text-[9px] font-normal text-[#8C847A]">(Optional)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Optional"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-2 px-3 rounded-xl bg-white dark:bg-[#1A1815] border border-[#E2DAD0] dark:border-white/10 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#F5F2EB] mb-1">
                Order Notes (Optional)
              </label>
              <input
                type="text"
                name="notes"
                placeholder="e.g. Kurti size Medium, delivery afternoon"
                value={formData.notes}
                onChange={handleChange}
                className="w-full py-2 px-3 rounded-xl bg-white dark:bg-[#1A1815] border border-[#E2DAD0] dark:border-white/10 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none"
              />
            </div>

            {errors.cart && (
              <p className="text-[11px] text-red-500 font-medium">{errors.cart}</p>
            )}
          </form>
        </div>

        {/* Sticky Mobile Bottom Order Button */}
        <div className="p-3.5 sm:p-4 bg-white/95 dark:bg-[#181614]/95 border-t border-[#E2DAD0] dark:border-white/10 shadow-lg shrink-0">
          <button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white dark:text-[#1C1917] bg-[#1C1917] dark:bg-[#C5A880] active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366] dark:text-[#1C1917]" />
            <span>Place Order on WhatsApp</span>
          </button>

          <p className="text-[10px] text-[#665F57] dark:text-[#A8A196] text-center mt-1.5 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#25D366]" />
            <span>WhatsApp will open with your complete order details</span>
          </p>
        </div>
      </div>
    </div>
  );
};
