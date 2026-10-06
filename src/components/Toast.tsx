import React, { useEffect } from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  productImage?: string;
  type?: 'success' | 'info' | 'error';
  onAction?: () => void;
  actionLabel?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-[92vw] sm:w-auto pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div className="pointer-events-auto flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/95 dark:bg-[#1C1917]/95 backdrop-blur-xl border border-[#E2DAD0] dark:border-white/15 shadow-xl text-[#1C1917] dark:text-[#F5F2EB] animate-in fade-in slide-in-from-bottom-4 duration-300">
      {toast.productImage ? (
        <img
          src={toast.productImage}
          alt="Product thumbnail"
          className="w-12 h-14 object-cover rounded-xl border border-[#E2DAD0]/60 dark:border-white/10 shrink-0"
        />
      ) : (
        <div className="w-9 h-9 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      )}

      <div className="flex-1 min-w-0 pr-1">
        <h4 className="text-xs font-semibold text-[#1C1917] dark:text-[#F5F2EB] truncate">
          {toast.title}
        </h4>
        {toast.message && (
          <p className="text-[11px] text-[#665F57] dark:text-[#A8A196] truncate mt-0.5">
            {toast.message}
          </p>
        )}
        {toast.onAction && toast.actionLabel && (
          <button
            onClick={toast.onAction}
            className="mt-1.5 text-[11px] font-semibold text-[#9E7F55] dark:text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>{toast.actionLabel}</span>
          </button>
        )}
      </div>

      <button
        onClick={() => onDismiss(toast.id)}
        className="text-[#8C847A] hover:text-[#1C1917] dark:hover:text-white p-1 rounded-lg transition-colors cursor-pointer shrink-0"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
