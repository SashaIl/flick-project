import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';
import { NavLink } from 'react-router-dom';

const Login = () => {

    const {
        onSubmit,isPending
    } = useLogin();

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br ">
            <div className="w-full max-w-md">
                <div className="bg-card rounded-2xl shadow-lg p-8">
                    <div className="py-4">
                        <NavLink
                            to={"/"}
                            className="flex items-center gap-2 text-primary/110 hover:text-white transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back
                        </NavLink>
                    </div>
                    <div className="text-center mb-8">
                        <h2 className="mb-2">Sign In</h2>
                        <p className="text-muted-foreground">
                                Sign in to access your favorite books
                        </p>
                    </div>

                    <form  className="space-y-4" onSubmit={onSubmit} method='post'>
                        <div>
                            <label className="block mb-2">Email</label>
                            <div className="relative">
                                <Mail
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                                    size={20}
                                />
                                <input
                                    type="email"
                                    name='Email'
                                    placeholder="your.email@example.com"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2">Password</label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                                    size={20}
                                />
                                <input
                                    type="password"
                                    name='Password'
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors cursor-pointer"
                        >
                            {!isPending ? "Sign In" : "In procces..."}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <NavLink to={"/signup"}
                            className="text-primary/110 hover:text-white transition-colors"
                        >
                            Don't have an account? Sign up
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
