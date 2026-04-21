import { Mail, Check } from "lucide-react";
import { useEmailVerification } from "../hooks/useEmailVerification";

export default function EmailVerification() {

    const {
        isTokenValid,
        code,
        isPending,
        inputRefs,
        onChange,
        onClick,
        onPaste,
        sendVerificationCode
    } = useEmailVerification();

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            {isTokenValid ? 
                <>
                    <div className="absolute w-60 h-60 rounded-full bg-gray-500/10 blur-3xl
                            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                    <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-6">

                        <div className="w-[50px] h-[50px] rounded-2xl bg-gray-500/10 border border-gray-500/20
                                flex items-center justify-center flex-shrink-0">
                            <Mail size={22} className="text-gray-400" strokeWidth={1.5} />
                        </div>

                        <div className="text-center">
                            <h1 className="text-xl font-medium text-zinc-100 tracking-tight mb-1.5">
                                Verify your email
                            </h1>
                            <p className="text-[13px] text-zinc-500 leading-relaxed">
                                Enter the 6-digit code sent to your email
                            </p>
                        </div>

                        {/* OTP — flex з обмеженнями щоб не вилазило */}
                        <div className="flex items-center justify-center gap-1.5 w-full">
                            {code.map((val, id) => (
                                <>
                                    {id === 3 && (
                                        <div key="sep" className="w-1 h-1 rounded-full bg-zinc-700 flex-shrink-0 mx-0.5" />
                                    )}
                                    <input
                                        key={id}
                                        ref={(el) => {inputRefs.current[id] = el}}
                                        type="tel"
                                        inputMode="numeric"
                                        maxLength={1}
                                        pattern="[0-9]*"
                                        value={val}
                                        placeholder="·"
                                        onChange={(e) => onChange(id,e.target.value)}
                                        onPaste={(e) => onPaste(e)}
                                        className={`
                                            flex-1 min-w-0 max-w-[52px] aspect-[5/6]
                                            text-center text-xl font-medium
                                            text-zinc-100 bg-zinc-900 rounded-[10px]
                                            border outline-none caret-gray-500
                                            transition-colors duration-150
                                            ${val ? "border-gray-500/40" : "border-zinc-800 focus:border-gray-500 focus:bg-[#1c1c24]"}
                                        `}
                                    />
                                </>
                            ))}
                        </div>

                        <button
                            disabled={isPending}
                            onClick={onClick}
                            className="w-full h-11 bg-primary hover:bg-primary/20 active:scale-[0.98]
                                disabled:opacity-35 disabled:cursor-default
                                text-white text-sm font-medium rounded-xl
                                flex items-center justify-center gap-1.5
                                transition-all duration-200"
                        >
                            <Check size={15} strokeWidth={2.2} />
                            Verify email
                        </button>

                        <div className="flex items-center gap-1.5">
                            <span className="text-[13px] text-zinc-600">Didn't receive a code?</span>
                            <button 
                                className="text-[13px] font-medium hover:text-white transition-colors"
                                onClick={_ => sendVerificationCode()}>
                                Resend
                            </button>
                        </div>
                    </div>
                </>
                :
                <div className="">Invalid token</div>
            }
        </div>
    );
}