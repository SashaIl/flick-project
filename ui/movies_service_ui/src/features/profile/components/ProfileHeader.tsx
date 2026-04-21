import { MailWarning } from 'lucide-react';
import { useProfileHeader } from '../hooks/useProfileHeader';

const ProfileHeader = () => {

    const {
        isEmailVerified,
        isPending,
        onClick
    } = useProfileHeader();
    return (
        <>
            {!isEmailVerified && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3.5">
                    <MailWarning size={18} className="mt-0.5 shrink-0 text-amber-400" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-amber-300/90 leading-relaxed">
                            Please verify your email address to unlock all features.
                            <button 
                                onClick={onClick}
                                disabled={isPending}
                                className="font-medium text-amber-400 underline underline-offset-2 hover:text-amber-300 transition-colors cursor-pointer">
                                {isPending ? "Sending..." : "Resend verification email"}
                            </button>
                        </p>
                    </div>
                </div>
            )}

            <div className="mb-8">
                <h1
                    className="font-light leading-none text-white/85"
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(36px, 5vw, 60px)",
                    }}>
                    <p>Your profile</p>
                </h1>
            </div>
        </>
    );
}

export default ProfileHeader;
