import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl font-bold text-blue-600">TaskManager</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link to="/dashboard">
                                    <Button variant="outline" className="text-sm">
                                        Dashboard
                                    </Button>
                                </Link>
                                <span className="text-gray-700">Hi, {user.name}</span>
                                <Button variant="secondary" onClick={handleLogout} className="text-sm">
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="outline" className="text-sm">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button variant="primary" className="text-sm">
                                        Sign Up
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
