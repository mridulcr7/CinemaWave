import React from 'react';
import mainLogo from "../Utilis/unnamed.png";
import Avatar from "../Utilis/user-avatar.png";
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Header = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    return (
        <header className="bg-gray-900 fixed w-full z-10">
            <div className="container mx-auto flex items-center justify-between p-4">
                <Link to="/" className="flex items-center">
                    <img src={mainLogo} alt="Logo" className="h-16 mr-2" />
                    <span className="text-white text-lg font-semibold">Your App Name</span>
                </Link>
                <nav className="flex items-center space-x-4">
                    {user && (
                        <div className="flex items-center space-x-4">
                            <Link to="/" className="text-white hover:text-gray-300 transition duration-300">
                                Dashboard
                            </Link>
                            <Link to="/income" className="text-white hover:text-gray-300 transition duration-300">
                                Income
                            </Link>
                            <Link to="/expense" className="text-white hover:text-gray-300 transition duration-300">
                                Expense
                            </Link>

                            <div className="flex items-center">
                                <img
                                    src={Avatar}
                                    //alt={`${user.name}'s Avatar`}
                                    className="w-8 h-8 rounded-full border-2 border-purple-500 mr-2"
                                />
                                <span className="text-purple-500 font-bold">{user.name}</span>
                            </div>

                            {user.avatar && (
                                <div className="flex flex-col items-center">
                                    <img
                                        src={user.avatar}
                                        alt={`${user.name}'s Avatar`}
                                        className="w-8 h-8 rounded-full border-2 border-purple-500 mb-2"
                                    />
                                    <span className="text-purple-500 font-bold">{user.name}</span>
                                </div>
                            )}

                            <button
                                onClick={handleClick}
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red transition duration-300"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                    {!user && (
                        <div className="flex items-center">
                            <Link
                                to="/login"
                                className="text-white hover:text-gray-300 transition duration-300 mr-4"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="text-white hover:text-gray-300 transition duration-300"
                            >
                                Signup
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
