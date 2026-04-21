import {MapPin, Phone, Mail } from 'lucide-react';
import { NavLink } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-card text-foreground mt-16">
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            
                            <span className="text-2xl font-medium">Movies</span>
                        </div>
                        <p className="mb-4 text-sm leading-relaxed">
                            Your destination for discovering amazing movies. Explore, watch, and share your cinematic journey.
                        </p>
                        {/* <div className="flex gap-3">
                            <a
                                href=''
                                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                                aria-label="Facebook"
                            >
                                FB
                            </a>
                            <a
                                href=''
                                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                                aria-label="Twitter"
                            >
                                X
                            </a>
                            <a
                                href=''
                                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                                aria-label="Instagram"
                            >
                                ING
                            </a>
                            <a
                                href=''
                                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                                aria-label="LinkedIn"
                            >
                                LKDIN
                            </a>
                        </div> */}
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <NavLink
                                    to={"/"}
                                    // onClick={() => navigate("/")}
                                    className="hover:text-white transition-colors text-sm"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/favorites"}
                                    // onClick={() => navigate("/favorites")}
                                    className="hover:text-white transition-colors text-sm"
                                >
                                    Favorites
                                </NavLink>
                            </li>
                            <li>
                                {/* <NavLink    
                                    to={"/inbox"}
                                    // onClick={() => navigate("/inbox")}
                                    className="hover:text-white transition-colors text-sm"
                                >
                                    Inbox
                                </NavLink> */}
                            </li>
                            <li>
                                <NavLink
                                    to={"/user"}
                                    // onClick={() => navigate("/user")}
                                    className=" hover:text-white transition-colors text-sm"
                                >
                                    My Account
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    {/* <div>
                        <h4 className="mb-4">Categories</h4>
                        <ul className="space-y-2">
                            <li>
                                <NavLink to={""} className=" hover:text-white transition-colors text-sm">
                                    Fiction
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={""} className=" hover:text-white transition-colors text-sm">
                                    Non-Fiction
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={""} className=" hover:text-white transition-colors text-sm">
                                    Mystery & Thriller
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={""} className=" hover:text-white transition-colors text-sm">
                                    Science Fiction
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={""} className=" hover:text-white transition-colors text-sm">
                                    Romance
                                </NavLink>
                            </li>
                        </ul>
                    </div> */}

                    {/* Contact Info */}
                    <div>
                        <h4 className="mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2  text-sm">
                                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                                <span>123 Book Street, Reading City, RC 12345</span>
                            </li>
                            <li className="flex items-center gap-2  text-sm">
                                <Phone size={18} className="flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2  text-sm">
                                <Mail size={18} className="flex-shrink-0" />
                                <span>hello@movies.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className=" text-sm text-center md:text-left">
                            © 2026 Flick Guide. All rights reserved.
                        </p>
                        {/* <div className="flex gap-6 text-sm">
                            <NavLink to={""} className=" hover:text-white transition-colors">
                                Privacy Policy
                            </NavLink>
                            <NavLink to={""} className=" hover:text-white transition-colors">
                                Terms of Service
                            </NavLink>
                            <NavLink to={""} className=" hover:text-white transition-colors">
                                Cookie Policy
                            </NavLink>
                        </div> */}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
