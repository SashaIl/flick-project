import { useState } from 'react';
import { Heart, Languages, User, Menu, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';

const NAV_ITEMS = [
    { to: "/favorites", icon: <Heart size={18} />, label: "Favorites" },
    // { to: "/inbox",     icon: <Inbox size={18} />, label: "Inbox" },
    { to: "/profile",   icon: <User size={18} />,  label: "Profile" },
];

const Header = () => {
    const { pathname } = useLocation();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const {isAuthenticated} = useAuth();
    return (
        <>
            <header className={`${pathname === "/" ? "fixed" : "relative"} top-3 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] z-50`}>
                <div
                    style={{ background: "rgba(33,35,39,0.92)", backdropFilter: "blur(16px)" }}
                    className="rounded-full px-6 py-4 flex items-center justify-between shadow-lg"
                >
                    <NavLink
                        to="/"
                        className="text-foreground hover:opacity-80 transition-opacity font-medium"
                        style={{ fontSize: "1.25rem" }}
                    >
                        Flick Guide
                    </NavLink>

                    {isAuthenticated ? 
                        <nav className="hidden lg:flex items-center gap-1">
                            {NAV_ITEMS.map(({ to, icon, label }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    className="flex items-center gap-2 px-4 py-2 text-foreground rounded-full hover:bg-white/10 transition-colors text-sm"
                                >
                                    {icon}
                                    <span>{label}</span>
                                </NavLink>
                            ))}
                            {/* <button className="flex items-center gap-2 px-4 py-2 text-foreground rounded-full hover:bg-white/10 transition-colors text-sm">
                                <Languages size={18} />
                                <span>Language</span>
                            </button> */}
                        </nav>
                        :
                        <NavLink 
                            to={"/login"}
                            className="flex items-center px-4 py-2 text-foreground rounded-full hover:bg-white/10 transition-colors"
                            >
                            Login
                        </NavLink>
                    }

                    {/* Бургер кнопка */}
                    <button
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className="lg:hidden p-2 text-foreground hover:opacity-70 transition-opacity rounded-full hover:bg-white/10"
                    >
                        {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Мобільне меню — виїжджає з-під хедера вниз */}
                <div
                    className="lg:hidden overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                        // Анімація через maxHeight — CSS transition не працює з height:auto
                        // тому використовуємо maxHeight: велике число коли відкрито, 0 коли закрито
                        maxHeight: showMobileMenu ? "400px" : "0px",
                        opacity: showMobileMenu ? 1 : 0,
                        transition: "max-height 0.3s ease, opacity 0.25s ease",
                    }}
                >
                    <nav
                        style={{ background: "rgba(33,35,39,0.96)", backdropFilter: "blur(16px)" }}
                        className="mt-2 rounded-3xl px-3 py-3 flex flex-col gap-1 shadow-xl"
                    >
                        {NAV_ITEMS.map(({ to, icon, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={() => setShowMobileMenu(false)}
                                className="flex items-center gap-3 px-4 py-3 text-foreground rounded-2xl hover:bg-white/10 transition-colors text-sm font-medium"
                            >
                                {icon}
                                <span>{label}</span>
                            </NavLink>
                        ))}

                        {/* Розділювач перед Language */}
                        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "4px 8px" }} />

                        <button
                            onClick={() => setShowMobileMenu(false)}
                            className="flex items-center gap-3 px-4 py-3 text-foreground rounded-2xl hover:bg-white/10 transition-colors text-sm font-medium w-full text-left"
                        >
                            <Languages size={18} />
                            <span>Language</span>
                        </button>
                    </nav>
                </div>
            </header>

            {/* Backdrop — темний оверлей за меню, закриває при кліку */}
            {showMobileMenu && (
                <div
                    className="lg:hidden fixed inset-0 z-40"
                    style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }}
                    onClick={() => setShowMobileMenu(false)}
                />
            )}
        </>
    );
};

export default Header;