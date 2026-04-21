import { useEffect, useState } from "react";
import { X, CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";
import type { ToastParams } from "../types/ToastContextValue";

const DURATION = 4000;

const CONFIG = {
    success: { Icon: CheckCircle2, iconClass: "text-emerald-400 bg-emerald-400/10", barClass: "bg-emerald-500" },
    error: { Icon: XCircle, iconClass: "text-red-400 bg-red-400/10", barClass: "bg-red-500" },
    warning: { Icon: AlertTriangle, iconClass: "text-yellow-400 bg-yellow-400/10", barClass: "bg-yellow-500" },
    info: { Icon: Info, iconClass: "text-blue-400 bg-blue-400/10", barClass: "bg-blue-500" },
};

interface Props {
    toast: ToastParams;
    onDismiss: () => void;
}

export function ToastItem({ toast, onDismiss }: Props) {
    const { Icon, iconClass, barClass } = CONFIG[toast.status];
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
    }, []);

    useEffect(() => {
        const start = Date.now();
        const tick = () => {
            const elapsed = Date.now() - start;
            const pct = Math.max(0, 100 - (elapsed / DURATION) * 100);
            setProgress(pct);
            if (pct > 0) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);

        const timer = setTimeout(dismiss, DURATION);
        return () => clearTimeout(timer);
    }, []);

    function dismiss() {
        setVisible(false);
        setTimeout(onDismiss, 320);
    }

    return (
        <div
            onClick={dismiss}
            className={` relative overflow-hidden cursor-pointer flex items-start gap-3 px-3.5 py-3 rounded-xl border transition-all duration-300 ease-out ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"} `}
     
            style={{ background: "rgba(22, 23, 22, 0.96)", borderColor: "rgba(255,255,255,0.08)" }}
        >
            <div className={`mt-0.5 flex-shrink-0 rounded-full p-1 ${iconClass}`}>
                <Icon className="w-3.5 h-3.5" />
            </div>

            <div className="flex-1 min-w-0 pr-1">
                <p className="text-[13px] font-medium text-white/90 leading-snug">
                    {toast.title}
                </p>
                {toast.description && (
                    <p className="text-[12px] text-white/40 font-light mt-0.5 leading-snug truncate">
                        {toast.description}
                    </p>
                )}
            </div>

            <button
                onClick={(e) => { e.stopPropagation(); dismiss(); }}
                className="flex-shrink-0 mt-0.5 p-0.5 rounded text-white/20 hover:text-white/55 hover:bg-white/[0.07] transition-colors duration-150"
            >
                <X className="w-3.5 h-3.5" />
            </button>

            <div
                className={`absolute bottom-0 left-0 h-[2px] ${barClass}`}
                style={{ width: `${progress}%`, transition: "none" }}
            />
        </div>
    );
}