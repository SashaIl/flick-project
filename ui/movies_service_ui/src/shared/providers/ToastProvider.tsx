import React, { useState } from 'react';
import { ToastContext } from '../contexts/ToastContext';
import type { ToastParams } from '../types/ToastContextValue';
import { ToastItem } from '../components/ToastItem';

const ToastProvider = ({ children }: { children: React.ReactNode }) => {

    const [toast, setToast] = useState<ToastParams | null>(null);

    const showToast = (toast: ToastParams) => {
        setToast(toast)
    }

    const dismiss = () => {
        setToast(null);
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div className="fixed top-5 right-5 z-[9999] w-[320px]">
                    <ToastItem toast={toast} onDismiss={dismiss} />
                </div>
            )}
        </ToastContext.Provider>
    );
}

export default ToastProvider;
