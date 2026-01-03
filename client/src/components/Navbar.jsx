import React, { useState } from 'react';
import { Menu, X, Globe, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-slate-100 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <Globe className="h-6 w-6 text-primary" />
                            </div>
                            <span className="font-display font-bold text-xl text-slate-900">
                               PlanKaro
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="#" className="text-slate-600 hover:text-primary font-medium transition-colors">
                            Destinations
                        </Link>
                        <Link to="#" className="text-slate-600 hover:text-primary font-medium transition-colors">
                            Hotels
                        </Link>
                        <Link to="#" className="text-slate-600 hover:text-primary font-medium transition-colors">
                            Flights
                        </Link>
                        <div className="h-6 w-px bg-slate-200 mx-2" />
                        <Link to="/login" className="text-slate-600 hover:text-primary font-medium transition-colors">
                            Login
                        </Link>
                        <Link to="/signup">
                            <Button size="sm">Sign Up</Button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-600 hover:text-slate-900 p-2"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link
                            to="#"
                            className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-primary font-medium"
                        >
                            Destinations
                        </Link>
                        <Link
                            to="#"
                            className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-primary font-medium"
                        >
                            Hotels
                        </Link>
                        <Link
                            to="#"
                            className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-primary font-medium"
                        >
                            Flights
                        </Link>
                        <div className="border-t border-slate-100 my-2" />
                        <Link
                            to="/login"
                            className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-primary font-medium"
                        >
                            Login
                        </Link>
                        <div className="px-3 pt-2">
                            <Link to="/signup">
                                <Button fullWidth>Sign Up</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
