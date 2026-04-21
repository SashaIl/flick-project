import {Key, LogOut, ChevronRight, Eye, EyeOff} from "lucide-react";
import { useSettings } from "../hooks/useSettings";


const SettingsMenu = () => {

  const {
    passwordOpen, 
    setPasswordOpen,
    logoutConfirm,
    setLogoutConfirm,
    changePassInfo,
    handleLogout,
    onSubmit
  } = useSettings();

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-primary backdrop-blur-xl overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Header */}
      <div className="px-6 sm:px-8 py-5 border-b border-white/[0.06]">
        <p className="text-[10px] tracking-[0.22em] uppercase text-white/25">
          Settings
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-2">

        {/* Change Password */}
        <div>
          <button
            onClick={() => setPasswordOpen(!passwordOpen)}
            className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <Key className="h-4 w-4 text-white/30 group-hover:text-white/50 transition-colors duration-300 flex-shrink-0" />
              <span className="text-sm text-white/60 group-hover:text-white/80 font-light transition-colors duration-300">
                Change password
              </span>
            </div>
            <ChevronRight
              className={`h-4 w-4 text-white/20 group-hover:text-white/40 transition-all duration-300 ${
                passwordOpen ? "rotate-90" : ""
              }`}
            />
          </button>

          {/* Password form */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              passwordOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
            }`}
          >
            <form className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 sm:p-5 space-y-3" onSubmit={onSubmit} method="post">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/20 mb-4">
                Change password
              </p>

              {changePassInfo.map(({ name, label, show, toggle }) => (
                <div key={label}>
                  <label className="block text-[10px] tracking-[0.16em] uppercase text-white/25 mb-2">
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      name={`${name}`}
                      type={show ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white/70 placeholder-white/20 font-light focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all duration-300 pr-10"
                    />
                    <button
                      type="button"
                      onClick={toggle}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors duration-200"
                    >
                      {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex gap-2 pt-1">
                <button className="flex-1 py-2.5 rounded-full border border-white/10 bg-white/[0.06] hover:bg-white/[0.1] text-white/60 hover:text-white/85 text-xs tracking-[0.12em] uppercase transition-all duration-300"
                  type="submit"
                >
                  Update
                </button>
                <button
                  onClick={() => setPasswordOpen(false)}
                  className="px-4 py-2.5 rounded-full border border-white/[0.06] text-white/25 hover:text-white/45 text-xs tracking-[0.1em] uppercase transition-all duration-300"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>


        {/* Logout */}
        <div className="pt-1">
          {!logoutConfirm ? (
            <button
              onClick={() => setLogoutConfirm(true)}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border border-white/[0.05] text-white/25 hover:text-white/50 hover:border-white/[0.1] transition-all duration-300 group"
            >
              <LogOut className="h-4 w-4 flex-shrink-0 transition-colors duration-300" />
              <span className="text-sm font-light tracking-wide">Log out</span>
            </button>
          ) : (
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
              <p className="text-sm text-white/40 font-light mb-4 leading-relaxed">
                Are you sure you want to log out?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleLogout} 
                  className="flex-1 py-2.5 rounded-full border border-white/10 bg-white/[0.06] hover:bg-white/[0.1] text-white/55 hover:text-white/80 text-xs tracking-[0.12em] uppercase transition-all duration-300">
                  Yes, log out
                </button>
                <button
                  onClick={() => setLogoutConfirm(false)}
                  className="flex-1 py-2.5 rounded-full border border-white/[0.06] text-white/25 hover:text-white/45 text-xs tracking-[0.1em] uppercase transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsMenu; 