import { useAuth } from "@/shared/hooks/useAuth";
import { Mail } from "lucide-react";



const ProfileInfo = () => {

  const {user} = useAuth();


  const initials = `${user?.Name?.[0] ?? ""}${user?.Surname?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-primary backdrop-blur-xl">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="p-6 sm:p-8 md:p-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">

          {/* Avatar */}
          <div className="relative flex-shrink-0 group">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-sm flex items-center justify-center shadow-xl">
              <span
                className="font-light tracking-widest text-white/70 select-none"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 3vw, 24px)" }}
              >
                {initials}
              </span>
            </div>
            {/* Ring glow on hover */}
            <div className="absolute inset-0 rounded-full ring-1 ring-white/0 group-hover:ring-white/10 transition-all duration-500" />
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            <p className="text-[10px] tracking-[0.22em] uppercase text-white/25 mb-2">
              Profile
            </p>
            <h1
              className="text-white/90 font-light leading-none mb-3 truncate"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 42px)" }}
            >
              {`${user?.Name} ${user?.Surname}`}
            </h1>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-white/35 mb-5">
              <Mail className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="text-sm font-light tracking-wide truncate">{user?.Email}</span>
            </div>
            {/* <div className="flex items-center justify-center sm:justify-start gap-4">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.05] hover:bg-white/[0.09] hover:border-white/20 text-white/60 hover:text-white/85 transition-all duration-300 text-xs tracking-[0.12em] uppercase backdrop-blur-sm">
                <Edit className="h-3 w-3" />
                Edit
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;