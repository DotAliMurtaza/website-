import React from 'react';
import { CheckCircle2, MessageCircle, ShoppingBag, X } from 'lucide-react';
import { OrderSummaryData } from '@/src/types/cart';
import { BRAND_INFO } from '@/src/data/brandInfo';

interface OrderSuccessModalProps {
  order: OrderSummaryData | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/70 dark:bg-black/85 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm sm:max-w-md bg-white dark:bg-[#181614] text-[#1C1917] dark:text-[#F5F2EB] rounded-3xl border border-[#E2DAD0] dark:border-white/10 shadow-2xl overflow-hidden my-4 p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white dark:bg-white/10 text-[#665F57] dark:text-[#A8A196] flex items-center justify-center cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mx-auto mb-2.5 border border-[#25D366]/30">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <span className="text-[10px] font-mono tracking-widest uppercase text-[#9E7F55] dark:text-[#D4AF37] block">
            Ref: {order.orderId}
          </span>

          <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1C1917] dark:text-[#F5F2EB] mb-1">
            Order Prepared!
          </h3>

          <p className="text-[11px] text-[#665F57] dark:text-[#A8A196] leading-relaxed">
            WhatsApp has been opened with your full order details to confirm dispatch with {BRAND_INFO.name}.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-3 rounded-2xl bg-white/80 dark:bg-white/5 border border-[#E2DAD0] dark:border-white/10 mb-4 text-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2DAD0]/60 dark:border-white/10">
            <span className="font-semibold text-[#1C1917] dark:text-[#F5F2EB]">{order.customer.fullName}</span>
            <span className="text-[#8C847A]">{order.customer.city}</span>
          </div>

          <div className="space-y-1.5 mb-2 max-h-32 overflow-y-auto pr-1">
            {order.items.map((item) => (
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

          <div className="flex items-center justify-between pt-2 border-t border-[#E2DAD0]/60 dark:border-white/10 text-xs font-semibold">
            <span>Total ({order.totalQuantity} items):</span>
            <span className="font-serif text-sm">Rs. {order.grandTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => {
              const text = encodeURIComponent(
                `Assalam o Alaikum, inquiring about Order ${order.orderId} for total Rs. ${order.grandTotal.toLocaleString()}.`
              );
              window.open(`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${text}`, '_blank');
            }}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-white dark:text-[#1C1917] bg-[#1C1917] dark:bg-[#C5A880] cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366] dark:text-[#1C1917]" />
            <span>Open WhatsApp Chat Again</span>
          </button>

          <button
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-semibold text-[#1C1917] dark:text-[#F5F2EB] bg-white dark:bg-white/10 border border-[#E2DAD0] dark:border-white/10 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Continue Browsing</span>
          </button>
        </div>
      </div>
    </div>
  );
};
