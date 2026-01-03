import React, { useState } from 'react';
import { Menu, X, Globe, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';
import logo from '../assets/logo.jpg';

interface User {
    name: string;
    avatar: string;
}

interface NavbarProps {
    user?: User;
}

const Navbar: React.FC<NavbarProps> = ({ user: userProp }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<User | undefined>(userProp);

    React.useEffect(() => {
        if (!userProp) {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                try {
                    const parsed = JSON.parse(savedUser);
                    setUser({
                        name: parsed.name,
                        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${parsed.name}`
                    });
                } catch (e) {
                    console.error('Failed to parse user:', e);
                }
            }
        } else {
            setUser(userProp);
        }
    }, [userProp]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <nav className="bg-cream border-b border-sand sticky top-0 z-40 backdrop-blur-sm bg-cream/95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <img src={logo} alt="PlanKaro Logo" className="h-10 w-auto object-contain" />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/dashboard" className="text-text-light hover:text-primary font-medium transition-colors">
                            Dashboard
                        </Link>
                        <Link to="/my-trips" className="text-text-light hover:text-primary font-medium transition-colors">
                            My Trips
                        </Link>
                        <Link to="/community" className="text-text-light hover:text-primary font-medium transition-colors">
                            Community
                        </Link>
                        <Link to="#" className="text-text-light hover:text-primary font-medium transition-colors">
                            Destinations
                        </Link>
                        <div className="h-6 w-px bg-sand mx-2" />

                        {user ? (
                            <Link to="/profile">
                                <div className="flex items-center gap-3 cursor-pointer group">
                                    <span className="text-text-dark font-medium group-hover:text-primary transition-colors">{user.name}</span>
                                    <div className="h-10 w-10 rounded-full border-2 border-white shadow-soft overflow-hidden group-hover:border-primary transition-colors">
                                        <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="text-text-light hover:text-primary font-medium transition-colors">
                                    Login
                                </Link>
                                <Link to="/signup">
                                    <Button size="sm">Sign Up</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-4">
                        {user && (
                            <div className="h-8 w-8 rounded-full border border-white shadow-sm overflow-hidden">
                                <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
                            </div>
                        )}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-text-light hover:text-text-dark p-2"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-cream border-t border-sand absolute w-full shadow-soft z-50">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {user && (
                            <div className="px-3 py-3 mb-2 border-b border-sand flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full border-2 border-white shadow-sm overflow-hidden">
                                    <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-semibold text-text-dark">{user.name}</p>
                                    <p className="text-xs text-text-light">View Profile</p>
                                </div>
                            </div>
                        )}
                        <Link
                            to="/dashboard"
                            className="block px-3 py-2 rounded-[16px] text-text-light hover:bg-sand hover:text-primary font-medium"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/my-trips"
                            className="block px-3 py-2 rounded-[16px] text-text-light hover:bg-sand hover:text-primary font-medium"
                        >
                            My Trips
                        </Link>
                        <Link
                            to="/community"
                            className="block px-3 py-2 rounded-[16px] text-text-light hover:bg-sand hover:text-primary font-medium"
                        >
                            Community
                        </Link>
                        <Link
                            to="#"
                            className="block px-3 py-2 rounded-[16px] text-text-light hover:bg-sand hover:text-primary font-medium"
                        >
                            Destinations
                        </Link>

                        {!user && (
                            <>
                                <div className="border-t border-sand my-2" />
                                <Link
                                    to="/login"
                                    className="block px-3 py-2 rounded-[16px] text-text-light hover:bg-sand hover:text-primary font-medium"
                                >
                                    Login
                                </Link>
                                <div className="px-3 pt-2">
                                    <Link to="/signup">
                                        <Button fullWidth>Sign Up</Button>
                                    </Link>
                                </div>
                            </>
                        )}
                        {user && (
                            <>
                                <div className="border-t border-sand my-2" />
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-3 py-2 rounded-[16px] text-accent hover:bg-red-50 font-medium"
                                >
                                    Log Out
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
