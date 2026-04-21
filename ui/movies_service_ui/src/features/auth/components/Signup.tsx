import { User, Lock, Mail, ArrowLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {

    const {onSubmit,isPending} = useSignup();

    return (
        <div className="min-h-screen flex items-center bg-background">
            <div className="w-full flex justify-around items-center">

                <div className="hidden xl:flex flex-col w-[650px] flex-shrink-0 rounded-2xl p-10 relative overflow-hidden bg-card">
                    <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #a855f7, transparent 70%)' }} />
                    <div className="relative z-10">
                        <p className="font-semibold text-lg tracking-wide mb-16">Flick Guide</p>

                        <h2 className="font-bold leading-tight mb-10" style={{ fontSize: '3.5rem' }}>
                            What's<br />Flick Guide?
                        </h2>
                        <ul className="space-y-4">
                            {[
                                'A service that helps you find great movies',
                                'AI-powered movie discovery in seconds',
                                'Personal watchlist & smart recommendations',
                                'Trusted by movie lovers worldwide',
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-white/90 text-sm">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/40 flex items-center justify-center text-white text-xs">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


                
                    <div className="w-full lg:w-[440px] flex-shrink-0 px-4 py-8 lg:px-0 lg:py-0">

                        <div className="bg-card rounded-2xl shadow-lg p-6 lg:p-8 w-full max-w-md mx-auto">
                            <div className="py-2 lg:py-4">
                                <NavLink
                                    to={"/"}
                                    className="flex items-center gap-2 text-primary/110 hover:text-white transition-colors"
                                >
                                    <ArrowLeft size={20} />
                                    Back
                                </NavLink>
                            </div>
                            <div className="text-center mb-6 lg:mb-8">
                                <h2 className="mb-2">Create Account</h2>
                                <p className="text-muted-foreground text-sm lg:text-base">
                                    Sign up to save your favorite movies
                                </p>
                            </div>

                            <form className="space-y-4" onSubmit={onSubmit} method='get'>
                                <div>
                                    <label className="block mb-2">Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                                        <input type="text" name='Name' placeholder="Your name" required className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2">Surname</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                                        <input type="text" name='Surname' placeholder="Your surname" required className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                                        <input type="email" name='Email' placeholder="your.email@example.com" required className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                                        <input type="password" name='Password' placeholder="••••••••" required className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                </div>

                                <button type="submit" className="w-full py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors cursor-pointer">
                                    {!isPending ? "Sign Up" : "In procces..."}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <NavLink to={"/login"} className="text-primary/110 hover:text-white transition-colors">
                                    Already have an account? Sign in
                                </NavLink>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Signup;