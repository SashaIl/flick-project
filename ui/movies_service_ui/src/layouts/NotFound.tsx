import { MonitorPlay } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <MonitorPlay size={64} className="mx-auto text-primary mb-4" />
                <h1 className="mb-4" style={{ fontSize: "3rem" }}>404</h1>
                <h2 className="mb-4">Page Not Found</h2>
                <p className="text-muted-foreground mb-8">
                    The page you're looking for doesn't exist.
                </p>
                <NavLink
                    to="/"
                    className="flex justify-center py-3 text-foreground rounded-full transition-transform duration-300 linear hover:scale-105 hover:bg-primary cursor-pointer"
                >
                    Go Back Home
                </NavLink>
            </div>
        </div>
    );
}

export default NotFound;
